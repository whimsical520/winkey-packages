import { logger, LogType } from 'winkey-log'
import fs from 'fs'
import path from 'path'
import { runSpawn } from 'winkey-os'
import lang from '../lang'
import LocalConfig from '../lib/localConfig'
import { mkdirSync } from '../lib/utils'
import { CONFIG_PLUGIN_PATH } from '../lib/consts'
import type { ActionSturct } from '../model/action'

const localConfig = new LocalConfig()

const reset = async () => {
  await localConfig.reset().catch((err) => {
    throw err
  })
}

export async function installAction(names: string[], cmder?: ActionSturct) {
  logger(LogType.Start, lang.INSTALL.START)

  let targetPath = CONFIG_PLUGIN_PATH

  if (cmder && cmder.args && cmder.args[0]) {
    const res: string[] = cmder.args

    names = []

    res.forEach((item) => {
      if (!names.includes(item)) {
        names.push(item)
      }
    })
  }

  if (!fs.existsSync(targetPath)) {
    await mkdirSync(targetPath).catch((er) => {
      throw er
    })

    await reset().catch((er) => {
      throw er
    })
  }

  await runSpawn({
    cmd: `npm install ${names.join(' ')} --save`,
    targetPath: targetPath,
    logger: logger
  }).catch((er) => {
    throw er
  })

  await localConfig.updateSeedInfo().catch((er) => {
    throw er
  })
}
