import path from "path";
import WkMiniProgram from "./wkMiniprogram";
import fs from "fs";
import { logger, LogType } from "winkey-log";
import esbuild from "esbuild";

export enum ExecType {
  /** 开发模式 */
  Dev = "dev",
  /** 打包模式 */
  Build = "build",
}

export async function initWinkeyConfig(type: ExecType, context?: string) {
  const cwd = process.cwd();
  const root = context ? path.resolve(cwd, context) : cwd;
  const configTsPath = path.resolve(root, "winkey.config.ts");
  const configJsPath = path.resolve(root, "winkey.config.js");
  const pkgPath = path.join(root, "package.json");

  if (fs.existsSync(configTsPath)) {
    const outfile = path.join(root, "_bat.config.js");
    const pkg = require(pkgPath);
    const external = Object.keys(pkg.dependencies || {})
      .concat(Object.keys(pkg.devDependencies || {}))
      .concat(["*.json", "*.js"]);

    const buildRes = await esbuild.build({
      sourceRoot: root,
      entryPoints: [configTsPath],
      bundle: true,
      platform: "node",
      external,
      outfile,
    });

    if (buildRes.errors.length) {
      logger(LogType.Error, buildRes.errors[0].text);
    } else {
      // const config = await formatBatConfig({
      //   config: {
      //     ...require(outfile),
      //     context: root
      //   },
      //   ...op
      // })
      // extFs.removeFiles([outfile])
      // r = [undefined, config]
    }
  } else if (fs.existsSync(configJsPath)) {
  } else {
    logger(LogType.Info, "未找到配置文件");
  }
  const config = require(path.resolve(process.cwd(), "winkey.config.ts"));

  const wkMiniProgram = new WkMiniProgram(config);

  wkMiniProgram.init(type);
}
