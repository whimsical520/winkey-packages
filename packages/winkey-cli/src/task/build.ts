import * as path from 'path'
import * as fs from 'fs'
import { runSpawn } from 'winkey-os'
import { logger, LogType } from 'winkey-log'
import { initWinkeyConfig, ExecType } from 'winkey-init-config-miniprogram'
import { ActionSturct } from '../model/action'
import { cwd, WinkeyWorkFlow } from '../lib/consts'

export const buildAction = async (args, cmder: ActionSturct) => {
  let targetPath = cwd

  if (cmder.args && cmder.args[0]) {
    targetPath = path.resolve(targetPath, cmder.args[0])
  }

  if (!fs.existsSync(targetPath)) {
    logger(LogType.Error, '所选目录不存在')
    return
  }

  const pkg = require(path.resolve(targetPath, 'package.json'))

  if (pkg.winkeyWorkFlow === 'vite') {
    runSpawn({
      cmd: 'vite build --config ./winkey.config.ts',
      targetPath: targetPath,
      type: 'inherit'
    })
  } else if (pkg.winkeyWorkFlow === WinkeyWorkFlow.Miniprogram) {
    initWinkeyConfig(ExecType.Build, targetPath, args)
  }
}
