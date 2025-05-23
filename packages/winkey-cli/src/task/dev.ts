import path from 'path'
import fs from 'fs'
import { runSpawn } from 'winkey-os'
import { initWinkeyConfig, ExecType } from 'winkey-init-config-miniprogram'
import { logger, LogType } from 'winkey-log'
import { ActionSturct } from '../model/action'
import { cwd, WinkeyWorkFlow } from '../lib/consts'

export const devAction = async (args, cmder: ActionSturct) => {
  let targetPath = cwd
  if (cmder.args && cmder.args[0]) {
    targetPath = path.resolve(targetPath, cmder.args[0])
  }

  if (!fs.existsSync(targetPath)) {
    logger(LogType.Error, '所选目录不存在')
    return
  }

  if (args?.env) {
    process.env.NODE_ENV = args.env
    logger(LogType.Info, `当前环境变量--${args.env}`)
  }

  const pkg = require(path.resolve(targetPath, 'package.json'))

  if (pkg.winkeyWorkFlow === WinkeyWorkFlow.Vite) {
    runSpawn({
      cmd: 'vite --config ./winkey.config.ts',
      targetPath: targetPath,
      type: 'inherit'
    })
  } else if (pkg.winkeyWorkFlow === WinkeyWorkFlow.Miniprogram) {
    initWinkeyConfig(ExecType.Dev, targetPath, args)
  }
}
