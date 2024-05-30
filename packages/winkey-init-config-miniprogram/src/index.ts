import path from 'path'
import WkMiniProgram from './wkMiniprogram'
import fs from 'fs'
import { logger, LogType } from 'winkey-log'
import esbuild from 'esbuild'
import { formatWkConfig } from './lib/wkConfig'

export enum ExecType {
  /** 开发模式 */
  Dev = 'dev',
  /** 打包模式 */
  Build = 'build'
}

export async function initWinkeyConfig(type: ExecType, context?: string) {
  const [err, config] = await getWkConfig(context)

  if (err) {
    return
  }

  const wkMiniProgram = new WkMiniProgram(config)

  wkMiniProgram.init(type)
}

async function getWkConfig(context) {
  const cwd = process.cwd()
  const root = context ? path.resolve(cwd, context) : cwd
  const configTsPath = path.resolve(root, 'winkey.config.ts')
  const configJsPath = path.resolve(root, 'winkey.config.js')
  const pkgPath = path.join(root, 'package.json')
  if (fs.existsSync(configTsPath)) {
    const outfile = path.join(root, '_bat.config.js')
    const pkg = require(pkgPath)
    const external = Object.keys(pkg.dependencies || {})
      .concat(Object.keys(pkg.devDependencies || {}))
      .concat(['*.json', '*.js'])

    const buildRes = await esbuild.build({
      sourceRoot: root,
      entryPoints: [configTsPath],
      bundle: true,
      platform: 'node',
      external,
      outfile
    })

    if (buildRes.errors.length) {
      logger(LogType.Error, buildRes.errors[0].text)
      return [buildRes.errors, undefined]
    } else {
      const config = await formatWkConfig({
        config: {
          ...require(outfile).default,
          context: root
        }
      })

      fs.unlinkSync(outfile)

      return [undefined, config]
    }
  } else if (fs.existsSync(configJsPath)) {
    try {
      const config = await formatWkConfig({
        config: {
          ...require(configJsPath),
          context: root
        }
      })

      return [undefined, config]
    } catch (err) {
      logger(LogType.Error, err)
      return [err, undefined]
    }
  } else {
    logger(LogType.Info, '未找到配置文件')
    return [new Error('未找到配置文件'), undefined]
  }
}
