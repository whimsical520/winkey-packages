import { logger, LogType } from "winkey-log";
import fs from "fs";
import path from "path";
import esbuild from "esbuild";
import { lessLoader } from "esbuild-plugin-less";
import moment from "moment";
import chokidar from "chokidar";
import inquirer from "inquirer";
import { ExecType } from "./index";

const { exec } = require("child_process");

type WkMiniProgramOptions = {
  entry: string;
  output: string;
};

class WkMiniProgram {
  private baseOutputPath: string;
  private baseEntryPath: string;
  private rootPath: string;

  constructor(config: WkMiniProgramOptions) {
    this.rootPath = process.cwd();
    this.baseEntryPath = path.join(this.rootPath, config.entry || "./src");
    this.baseOutputPath = path.join(this.rootPath, config.output || "./output");

    if (!fs.existsSync(this.baseOutputPath)) {
      fs.mkdirSync(this.baseOutputPath);
    }
  }

  async init(type: ExecType) {
    logger(LogType.Start, "开始转换");
    logger(LogType.Wait, "请稍等");

    try {
      function copyFile(entry, output) {
        const files = fs.readdirSync(entry);
        for (let i = 0; i < files.length; i++) {
          const entryPath = path.join(entry, files[i]);
          const outputPath = path.join(output, files[i]);

          handleFile(entryPath, outputPath);
        }
      }

      const handleFile = (entryPath, outputPath, type?: LogType) => {
        const filename = path.basename(entryPath);
        if (filename.includes(".ts")) {
          const match = filename.match(/(.*).ts/);

          esbuild
            .build({
              entryPoints: [entryPath],
              outfile: path.resolve(
                path.resolve(outputPath, "../"),
                match[1] + ".js",
              ),
              bundle: true,
              platform: "node",
              sourcemap: false,
            })
            .catch((err) => {
              logger(LogType.Error, err);
              process.exit(1);
            });

          this.log(
            `[ts-js] [${path.resolve(path.resolve(outputPath, "../"), match[1] + ".js")}]`,
            type || LogType.Success,
          );
        } else if (/(.*).wxml/.test(filename)) {
          fs.copyFileSync(entryPath, outputPath);

          this.log(
            `[wxml-wxml] [${path.resolve(path.resolve(outputPath, "../"), filename)}]`,
            type || LogType.Correct,
          );
        } else if (/(.*).json/.test(filename)) {
          fs.copyFileSync(entryPath, outputPath);

          this.log(
            `[json-json] [${path.resolve(path.resolve(outputPath, "../"), filename)}]`,
            type || LogType.Correct,
          );
        } else if (fs.statSync(entryPath).isDirectory()) {
          if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
          }

          copyFile(entryPath, outputPath);
        } else if (/(.*).less/.test(filename)) {
          const match = filename.match(/(.*).less/);

          esbuild
            .build({
              entryPoints: [entryPath],
              outfile: path.resolve(
                path.resolve(outputPath, "../"),
                match[1] + ".wxss",
              ),
              bundle: true,
              plugins: [lessLoader()],
            })
            .catch((err) => {
              logger(LogType.Error, err);
              process.exit(1);
            });

          this.log(
            `[less-wxss] [${path.resolve(path.resolve(outputPath, "../"), match[1] + ".wxss")}]`,
            type || LogType.Success,
          );
        }
      };

      copyFile(this.baseEntryPath, this.baseOutputPath);

      // 转移配置文件
      this.getProjectJson();

      // 转移node_modules
      await this.handleNodeModules();

      logger(LogType.Success, "转换成功");

      if (type === ExecType.Dev) {
        const watcher = chokidar.watch(path.join(__dirname, "src"), {
          ignored: /(^|[/\\])\../, // 忽略以点开头的文件和文件夹
          persistent: true, // 持续监听
          ignoreInitial: true, // 忽略初始化时的事件
          awaitWriteFinish: true, // 等待写入完成后触发事件
        });

        watcher.on("all", (event, filepath) => {
          const outputPath = path.join(
            __dirname,
            "output",
            filepath.split("src")[1],
          );
          switch (event) {
            case "change":
              handleFile(filepath, outputPath, LogType.Update);
              break;
            case "add":
            case "addDir":
              handleFile(filepath, outputPath, LogType.Add);
              break;
            case "unlink":
            case "unlinkDir":
              fs.stat(outputPath, (err) => {
                if (!err) {
                  handleFile(filepath, outputPath, LogType.Delete);
                }
              });
              break;
          }
        });

        logger(LogType.Info, "正在监听中...");
      } else if (type === ExecType.Build) {
        logger(LogType.Info, "打包结束");
      }
    } catch (e) {
      logger(LogType.Error, "转换失败:" + e);
    }

    logger(LogType.Finish, "转换结束");
  }

  private getProjectJson() {
    // 默认取project.config.json
    if (fs.existsSync("project.config.json")) {
      fs.copyFileSync(
        "project.config.json",
        path.resolve(this.baseOutputPath, "project.config.json"),
      );
      return;
    }
  }

  private async handleNodeModules() {
    if (!fs.existsSync(path.resolve(this.rootPath, "node_modules"))) {
      logger(LogType.Stop, "");
      const result = await inquirer.prompt([
        {
          type: "confirm",
          name: "install",
          message: `检测到未安装依赖，是否需要安装依赖？（Y/N）`,
          default: true,
        },
      ]);

      if (result.install) {
        logger(LogType.Wait, "执行 yarn install...");

        exec(
          "yarn install",
          { cwd: this.rootPath },
          (error, stdout, stderr) => {
            if (error) {
              logger(LogType.Error, `安装依赖失败:${error.message}`);
            } else {
              logger(LogType.Success, "依赖安装成功!");

              this.getNodeModulesDataByDependencies();
            }
          },
        );
      } else {
        logger(LogType.Tip, "未执行安装依赖命令");
      }
    } else {
      this.getNodeModulesDataByDependencies();
    }
  }

  private getNodeModulesDataByDependencies() {
    logger(LogType.Start, "开始处理node_modules");

    // 先获取根目录下的package.json里的dependencies
    const packageJSON = require(path.resolve(this.rootPath, "package.json"));

    const dependencies = packageJSON.dependencies || {};

    if (!Object.keys(dependencies).length) {
      logger(LogType.Success, "未检测到dependencies，处理结束");
      return;
    }

    const miniprogramPath = path.resolve(
      this.baseOutputPath,
      "miniprogram_npm",
    );

    if (!fs.existsSync(miniprogramPath)) {
      fs.mkdirSync(miniprogramPath);
    }

    const nodeModulesPath = path.join(this.rootPath, "node_modules");

    for (const key in dependencies) {
      const npmPath = path.resolve(nodeModulesPath, key);
      const subPackageJSON = require(path.resolve(npmPath, "package.json"));
      const folderPath = path.resolve(miniprogramPath, key);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      if (subPackageJSON.main) {
        const filepath = path.resolve(npmPath, subPackageJSON.main);
        const filename = path.basename(filepath);
        const resultPath = path.resolve(folderPath, filename);
        fs.copyFileSync(filepath, resultPath);

        logger(
          LogType.Correct,
          `[${moment().format("HH:mm:ss")}] [npm-npm] [${resultPath}] copy`,
        );
      }

      if (subPackageJSON.module) {
        const filepath = path.resolve(npmPath, subPackageJSON.module);
        const filename = path.basename(filepath);
        const resultPath = path.resolve(folderPath, filename);
        fs.copyFileSync(filepath, resultPath);

        logger(
          LogType.Correct,
          `[${moment().format("HH:mm:ss")}] [npm-npm] [${resultPath}] copy`,
        );
      }
    }

    logger(LogType.Success, "node_modules 处理完成");
  }

  private log(text, type) {
    let logType = LogType.Info;
    let tip = "done";

    switch (type) {
      case LogType.Update:
        logType = LogType.Update;
        tip = "update";
        break;
      case LogType.Success:
        logType = LogType.Success;
        tip = "create";
        break;
      case LogType.Correct:
        logType = LogType.Correct;
        tip = "copy";
        break;
      case LogType.Delete:
        logType = LogType.Delete;
        tip = "delete";
        break;
    }

    logger(logType, `[${moment().format("HH:mm:ss")}] ${text} ${tip}`);
  }
}

export default WkMiniProgram;
