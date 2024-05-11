import { runCMD, runSpawn, openBrowser } from "winkey-os";
import inquirer from "inquirer";
import path from "path";
import chalk from "chalk";
import fs from "fs";
import { lang } from "./lang";
import { dataRender } from "./tools";

let initData = {
  name: "",
  platform: "",
  type: "",
  yarn: "true",
  winkeyVersion: "2.0.0",
};

const config = {
  path: "./seeds/base",
  hooks: {
    /**
     * seed 包执行前 hooks
     * 可以通过 inquirer 配置成多个 seed 包
     * @param targetPath: string 复制目标路径 cwd
     * @return Promise<any>
     * beforeStart({env, targetPath})
     */
    async beforeStart({ targetPath }: { targetPath: string }) {
      const questions = [];

      questions.push({
        type: "input",
        name: "name",
        default: targetPath.split(/[\\/]/).pop(),
        message: `${lang.QUESTION_NAME}`,
      });

      const isYarn = await inquirer.prompt([
        {
          type: "confirm",
          name: "yarn",
          message: `${lang.QUEATION_USE_YARN}`,
          default: true,
        },
      ]);

      initData = Object.assign(initData, isYarn);
    },
    /**
     * 复制操作后 hooks
     * 可以在在此执行 项目初始化如 npm install 操作
     * @param  fileMap   : {[oriPath: string]: string[]} 复制操作映射表
     * @param  targetPath: string 复制目标路径 cwd
     * @return Promise<any>
     * afterCopy({fileMap, targetPath, env })
     */
    async afterCopy({
      targetPath,
      logger,
    }: {
      targetPath: string;
      logger: (type: string, text: string) => void;
    }) {
      const targetPkgPath = path.join(targetPath, "package.json");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const targetPkg = require(targetPkgPath);
      fs.writeFileSync(targetPkgPath, JSON.stringify(targetPkg, null, 2));
      logger("update", targetPkgPath);

      logger("info", lang.FORMAT_FILE_START);
      let rPaths = [];

      rPaths = [
        path.join(targetPath, "winkey.config.ts"),
        path.join(targetPath, "package.json"),
        path.join(targetPath, "README.md"),
      ];

      rPaths.forEach((iPath) => {
        if (fs.existsSync(iPath)) {
          const cnt = fs.readFileSync(iPath).toString();
          fs.writeFileSync(iPath, dataRender(cnt, initData));
          logger("update", lang.FORMAT_FILE_START);
        }
      });
      logger("success", lang.FORMAT_FILE_FINISHED);
      // - format

      // + install
      logger("info", lang.NPM_INSTALL_START);
      let cmd = "";
      let initCmd = "";
      if (initData.yarn) {
        try {
          const version = await runCMD({
            cmd: "yarn -v",
            targetPath: process.cwd(),
            logger,
          });
          logger("info", `${lang.YARN_VERSION}: ${chalk.green(version)}`);
          cmd = `yarn install`;
          initCmd = "yarn init -y";
        } catch (er) {
          logger(
            "warn",
            `${lang.NEED_INSTALL_YARN}: ${chalk.green("npm i yarn -g")}`,
          );
        }
      } else {
        cmd = `npm install`;
        initCmd = "npm init -y";
      }

      if (cmd) {
        logger("cmd", cmd);

        await runSpawn({
          cmd,
          targetPath,
          type: "inherit",
          logger,
        });
        if (initData.platform === "both") {
          await runCMD({
            cmd,
            targetPath: path.join(targetPath, "pc"),
          });
          await runCMD({
            cmd,
            targetPath: path.join(targetPath, "mobile"),
          });
        }
        logger("info", lang.INIT_PKG);
        logger("cmd", initCmd);
        await runCMD({
          cmd: initCmd,
          targetPath: targetPath,
        });
      }

      logger("info", `${lang.OPEN_PATH}: ${chalk.green(targetPath)}`);
      await openBrowser(targetPath);

      const readmePath = path.join(targetPath, "README.md");
      logger("info", `${lang.OPEN_README}: ${chalk.green(readmePath)}`);
      await openBrowser(readmePath);

      logger("success", lang.NPM_INSTALL_FINISHED);
    },
  },
};

export default config;
