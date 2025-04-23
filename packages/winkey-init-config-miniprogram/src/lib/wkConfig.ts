import path from 'path'
import chalk from 'chalk'
import { logger, LogType } from 'winkey-log'
import fs from 'fs'
import wkFs from 'winkey-fs'
import type { FormatedEnv, MiniWkAppPlatform, WkMiniProgramCompilerOption } from '../types'

export function formatEnv(env?: string[]): FormatedEnv {
  const r: FormatedEnv = {}
  if (env) {
    env.forEach((ctx) => {
      const [key, valueStr] = ctx.split('=')

      let value: string | boolean | number = ''
      if (valueStr === 'false') {
        value = false
      } else if (valueStr === 'true') {
        value = true
      } else if (!isNaN(+valueStr)) {
        value = +valueStr
      } else {
        value = valueStr
      }
      r[key] = value
    })
  }
  return r
}

export async function formatWkConfig(op) {
  const { config, target, silent, platform, args } = op
  const logPrefix = 'formatWkConfig'
  const cwd = process.cwd()
  const context = path.resolve(cwd, config.context || process.cwd())
  const entry = config.entry || path.join(context, 'src')
  const output = config.output || path.join(context, 'output')
  const npmKeepLatest = config.npmKeepLatest || []
  const tsConfigPath = path.resolve(context, config.tsConfigPath || 'tsconfig.json')
  const pkgPath = path.resolve(cwd, 'package.json')

  // env 初始化
  const iEnv = formatEnv(op.env)

  logger(LogType.Info, `${logPrefix} 当前配置 context: ${chalk.green(context)}`)

  // version
  let pkg: { version: string } = {
    version: '0.0.1'
  }
  if (fs.existsSync(pkgPath)) {
    pkg = require(pkgPath)
  } else {
    logger(
      LogType.Info,
      `${logPrefix} package.json 没找到, 使用默认 version: ${pkg.version}: ${chalk.green(pkgPath)}`
    )
  }
  const version = pkg.version

  // preview 初始化
  let preview = {
    list: []
  }
  if (config.preview?.list.length) {
    preview = config.preview
  }

  // dev server
  let devServer = {
    port: 5000
  }
  if (config.devServer) {
    devServer = {
      ...devServer,
      ...config.devServer
    }
  }

  // env 同步 types 路径初始化
  const envSyncPath = config.envSyncPath
    ? path.resolve(context, config.envSyncPath)
    : path.resolve(entry, 'types')

  // hooks 初始化
  const hooks = config.hooks || {}

  // from 初始化
  let from = config.from

  if (!from) {
    // 尝试解析源码属于哪个框架
    // 根据项目中的 ksml, ttml, swan, wxml 判断 from
    const swanFiles: string[] = []
    const wxmlFiles: string[] = []
    const ttmlFiles: string[] = []
    const ksmlFiles: string[] = []

    wkFs.readFilesSync(entry, (iPath: string) => {
      const isNodeModules = /node_modules/.test(path.relative(entry, iPath))
      const isHideFile = /\/\./.test(iPath)
      const isSwan = /\.swan$/.test(iPath)
      const isWxml = /\.wxml$/.test(iPath)
      const isKsml = /\.ksml$/.test(iPath)
      const isTtml = /\.ttml$/.test(iPath)
      if (isWxml) {
        wxmlFiles.push(iPath)
      } else if (isSwan) {
        swanFiles.push(iPath)
      } else if (isTtml) {
        ttmlFiles.push(iPath)
      } else if (isKsml) {
        ksmlFiles.push(iPath)
      }
      return !isNodeModules && !isHideFile
    })
    if (swanFiles.length) {
      from = 'swan'
    } else if (wxmlFiles.length) {
      from = 'wx'
    } else if (ttmlFiles.length) {
      from = 'tt'
    } else if (ksmlFiles.length) {
      from = 'ks'
    }
  }
  if (!from) {
    throw new Error(
      `config 解析失败, 配置项 from 未定义，且 src 目录缺少平台特定文件 swan|wxml|ksml|ttml`
    )
  }

  let compilerOptions: WkMiniProgramCompilerOption[] = config.compilerOptions || []

  // 过滤掉没有必要参数的配置
  compilerOptions = compilerOptions.filter((opt: WkMiniProgramCompilerOption, index) => {
    const missKey: string[] = []
    if (!opt.appid) {
      missKey.push('appid')
    }
    if (!opt.platform) {
      missKey.push('platform')
    }
    if (!opt.projectName) {
      missKey.push('platform')
    }
    if (!opt.key) {
      missKey.push('key')
    }
    if (missKey.length > 0) {
      logger(
        LogType.Warn,
        `${logPrefix} ${chalk.cyan(`compilerOptions[${index}]`)} 略过: 缺少以下配置项: ${missKey.join(', ')}`
      )
      return false
    } else if (args && Object.keys(args).length) {
      if (args.platform && args.target) {
        return opt.platform === args.platform && opt.appid === args.target
      } else if (args.platform) {
        return opt.platform === args.platform
      } else if (args.target) {
        return opt.appid === args.target
      }

      return false
    } else {
      return true
    }
  })

  // 有效的 tagets 初始化
  let effectTargets = compilerOptions.map((opt) => opt.key)

  // compilerOptions 格式化
  const pjConfigPathMap: Record<MiniWkAppPlatform, string> = {
    ks: path.join(context, 'project.ks.json'),
    swan: path.join(context, 'project.swan.json'),
    tt: path.join(context, 'project.tt.json'),
    wx: path.join(context, 'project.wx.json')
  }

  const nextCompilerOptions = compilerOptions.map((opt) => {
    const projectName = opt.projectName
    const appid = opt.appid
    const platform = opt.platform
    const key = opt.key
    const ignores = opt.ignores || []
    const projectConfigPath = opt.projectConfigPath
      ? path.join(context, opt.projectConfigPath)
      : pjConfigPathMap[platform]
    const privateKeyPath = opt.privateKeyPath ? path.resolve(context, opt.privateKeyPath) : ''
    const pjRoot = path.resolve(path.join(context, output), `${platform}-${key}`)
    const env = opt.env || {}
    const npmIgnores = opt.npmIgnores || []
    const syncResouce = opt.syncResouce || {}
    const jsConfig = opt.jsConfig || config.jsConfig || {}

    return {
      projectName,
      appid,
      platform,
      key,
      ignores,
      projectConfigPath,
      privateKeyPath,
      root: pjRoot,
      env,
      npmIgnores,
      syncResouce,
      jsConfig: jsConfig
    }
  })

  let r = {
    entry,
    from,
    context,
    output,
    npmKeepLatest,
    tsConfigPath,
    effectTargets,
    preview,
    compilerOptions: nextCompilerOptions,
    devServer,
    version,
    envSyncPath,
    hooks
  }

  logger(
    LogType.Info,
    `[${logPrefix}] 执行 ${chalk.cyan('hooks.initConfig')} 前， ${chalk.cyan('compilerOptions')} 共有 ${chalk.green(compilerOptions.length as any)} 个配置`
  )

  // 初始化配置hooks
  if (hooks.initConfig) {
    logger(LogType.Info, `[${logPrefix}] 开始执行 - ${chalk.cyan('hooks.initConfig')}`)
    r = await hooks.initConfig({ wkConfig: r, logger: logger, env: iEnv })
    logger(
      LogType.Success,
      `[${logPrefix}] 执行完成 - ${chalk.cyan('hooks.initConfig')}， ${chalk.cyan('compilerOptions')} 共有 ${chalk.green(r.compilerOptions.length as any)} 个配置`
    )

    // 重新初始化 effectTargets
    effectTargets = r.compilerOptions.map((item) => item.key)

    logger(
      LogType.Info,
      `[${logPrefix}] 当前配置可指定 target 有 ${effectTargets.map((target) => chalk.cyan(target)).join(',')}`
    )
  }

  if (target) {
    const targets = target.split(/[|, ]+/)
    const printTargets = targets.map((target) => chalk.cyan(target)).join(',')
    logger(LogType.Info, `[${logPrefix}] 初始化需筛选出指定 targets: ${printTargets}`)
    r.compilerOptions = r.compilerOptions.filter((opt) => {
      return targets.includes(opt.key)
    })
    logger(
      LogType.Info,
      `[${logPrefix}] 筛选后 ${chalk.cyan('key')} 符合 ${printTargets} 的配置项有 ${chalk.green(compilerOptions.length as any)} 个`
    )
  }

  // 如果设置 platfrom，则过滤掉非 platfrom 的其他配置
  if (platform) {
    const platforms = platform.split(/[|, ]+/)
    const printPlatforms = platforms.map((platform) => chalk.cyan(platform)).join(',')
    logger(LogType.Info, `[${logPrefix}] 初始化需筛选出指定 platforms: ${printPlatforms}`)
    r.compilerOptions = r.compilerOptions.filter((opt) => {
      return platforms.includes(opt.platform)
    })
    logger(
      LogType.Info,
      `[${logPrefix}] 筛选后 ${chalk.cyan('platform')} 符合 ${printPlatforms} 的配置项有 ${chalk.green(compilerOptions.length as any)} 个`
    )
  }

  if (hooks.beformCompile) {
    logger(LogType.Info, `[${logPrefix}] 开始执行 - ${chalk.cyan('hooks.beforeCompile')}`)
    await hooks.beforeCompile({ batConfig: r, logger: logger, env: iEnv })
    logger(LogType.Success, `[${logPrefix}] 执行完成 - ${chalk.cyan('hooks.beforeCompile')}`)
  }

  if (!silent) {
    const relativeRoot = (iPath: string) => path.relative(r.context, iPath)
    logger(LogType.Info, logPrefix)
    logger(LogType.Info, `[${logPrefix}] 配置信息:`)
    logger(LogType.Info, `[${logPrefix}] -------------------------------------`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('项目地址 - context')}:`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.cyan(r.context)}`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('源码地址 - src')}:`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.cyan(relativeRoot(r.entry))}`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('源码类型 - from')}:`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.cyan(relativeRoot(r.from))}`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('输出目录 - output')}:`)
    logger(LogType.Info, `[${logPrefix}] ${chalk.cyan(relativeRoot(r.output))}`)

    if (r.npmKeepLatest.length) {
      logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('保持最新 - npmKeepLatest')}:`)
      r.npmKeepLatest.forEach((ctx) => {
        logger(LogType.Info, `[${logPrefix}] - ${chalk.cyan(ctx)}`)
      })
    }
    logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('编译相关 - compilerOptions')}:`)
    r.compilerOptions.forEach((opt) => {
      logger(LogType.Info, `[${logPrefix}] ${chalk.cyan(opt.projectName)}(${opt.key}):`)
      logger(LogType.Info, `[${logPrefix}] > appid: ${chalk.magenta(opt.appid)}`)
      logger(LogType.Info, `[${logPrefix}] > 平台 platform: ${chalk.magenta(opt.platform)}`)
      logger(
        LogType.Info,
        `[${logPrefix}] > 密钥 privateKeyPath: ${chalk.magenta(relativeRoot(opt.privateKeyPath))}`
      )
      logger(
        LogType.Info,
        `[${logPrefix}] > 配置 projectConfigPath: ${chalk.magenta(relativeRoot(opt.projectConfigPath))}`
      )
      logger(LogType.Info, `[${logPrefix}] > 根目录 root: ${chalk.magenta(relativeRoot(opt.root))}`)
      if (opt.ignores.length) {
        logger(LogType.Info, `[${logPrefix}] > ignores:`)
        opt.ignores.forEach((ctx) => {
          logger(LogType.Info, `[${logPrefix}] > - ${chalk.magenta(ctx)}`)
        })
      }
      if (Object.keys(opt.env).length) {
        logger(LogType.Info, `[${logPrefix}] > env:`)
        Object.entries(opt.env).forEach(([key, val]) => {
          logger(
            LogType.Info,
            `[${logPrefix}] > - ${chalk.magenta(key)} - ${chalk.magentaBright(val as string)}`
          )
        })
      }
    })
    if (r.preview.list.length) {
      logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('预览配置 - preview')}`)
      r.preview.list.map((opt) => {
        logger(LogType.Info, `[${logPrefix}] ${chalk.cyan(opt.key)}:`)
        logger(LogType.Info, `[${logPrefix}] > path: ${chalk.cyan(opt.path)}:`)
        logger(LogType.Info, `[${logPrefix}] > query: ${chalk.cyan(opt.query || '[blank]')}:`)
      })
    }
    if (r.devServer) {
      logger(LogType.Info, `[${logPrefix}] ${chalk.yellow('服务器配置 - devServer')}:`)
      Object.entries(r.devServer).forEach(([key, val]) => {
        logger(LogType.Info, `[${logPrefix}] > ${key}: ${chalk.cyan(JSON.stringify(val))}:`)
      })
    }
    logger(LogType.Info, `[${logPrefix}]`)
  }
  return r
}
