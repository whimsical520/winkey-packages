import { logger, LogType } from 'winkey-log'
import { listSeed } from '../lib/search'
import lang from '../lang'

export interface listActionOptions {
  seeds?: boolean
}

export const listAction = async (val: listActionOptions) => {
  if (val.seeds) {
    logger(LogType.Start, lang.SEEDS.START)
    logger(LogType.Wait, lang.SEEDS.LOADING)
    const seeds = await listSeed()
    logger(LogType.Finish, lang.SEEDS.END)

    seeds.forEach((item: string) => {
      logger(LogType.Info, `seed包名称：${item}`)
    })
    return
  }

  logger(LogType.Info, lang.WINKEY.DEFAULT)
  logger(LogType.Tip, lang.WINKEY.DEV)
  logger(LogType.Tip, lang.WINKEY.BUILD)
  logger(LogType.Tip, lang.WINKEY.LISTSEEDS)
  logger(LogType.Tip, lang.WINKEY.UPDATESEEDS)
}
