import path from 'path'
import fs from 'fs'
import { runSpawn } from 'winkey-os'
import { logger, LogType } from 'winkey-log'
import { ActionSturct } from '../model/action'
import { cwd } from '../lib/consts'

export const devAction = async (_, cmder: ActionSturct) => {
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
      cmd: 'vite --config ./winkey.config.ts',
      targetPath: targetPath,
      type: 'inherit'
    })
  }
}