import { logger, LogType } from 'winkey-log'
import path from 'path'
import chalk from 'chalk'
import fs, { mkdirSync } from 'fs'
import inquirer from 'inquirer'
import lang from '../lang'
import LocalConfig from '../lib/localConfig'
import { listSeed } from '../lib/search'
import { copyFiles, readFilePaths } from '../lib/utils'
import { seedFull2Short } from '../lib/formatter'
import { installAction } from './install'
import type { ActionSturct } from '../model/action'
import type { SeedDataStruct, SeedItemStruct } from '../model/seed'

const localConfig = new LocalConfig()

export const initAction = async (_: any, cmder: ActionSturct) => {
  logger(LogType.Start, lang.INIT.START)
  logger(LogType.Wait, lang.INIT.LIST_START)

  let targetPath = process.cwd()

  if (cmder.args && cmder.args[0]) {
    targetPath = path.resolve(targetPath, cmder.args[0])
  }

  if (!fs.existsSync(targetPath)) {
    logger(LogType.Tip, '所选目录不存在')

    mkdirSync(targetPath)

    logger(LogType.Info, '正在新建中')
  }

  const seeds = await listSeed()

  logger(LogType.Finish, lang.INIT.LIST_FINISHED)

  let config: SeedDataStruct | Object = (await localConfig.get()) || {}

  const installedSeeds = (config as SeedDataStruct).seeds || []

  let seedItems: SeedItemStruct[] = installedSeeds.map((seed: string) => {
    const seedItem = (config as SeedDataStruct).seedMap[seed]

    const { version, dev } = seedItem
    const name = seed
    const shortName = seedFull2Short(name)
    
    return {
      name,
      shortName,
      installed: true,
      dev,
      choice: `${chalk.yellow.bold(shortName)} ${chalk.gray('(')}${
        dev ? 'local' : version
      }${chalk.gray(')')}`
    }
  })

  seedItems = seedItems.concat(
    seeds.filter((name) => installedSeeds.indexOf(name) === -1)
    .map((name) => {
      const shortName = seedFull2Short(name)

      return {
        name,
          shortName,
          installed: false,
          dev: false,
          choice: chalk.gray(shortName)
      }
    })
  )

  seedItems.sort((a, b) => {
    if (a.installed && !b.installed) {
      return -1
    } else if (!a.installed && b.installed) {
      return 1
    } else if (a.installed && b.installed) {
      if (a.dev && !b.dev) {
        return -1
      } else if (!a.dev && b.dev) {
        return 1
      } else {
        return a.name.localeCompare(b.name)
      }
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  let iSeed = ''

  const choices = seedItems.map((item) => item.choice)

  const r = await inquirer.prompt([
    {
      type: 'list',
      name: 'seed',
      message: `${lang.INIT.QUEATION_SELECT_TYPE}:`,
      default: choices[0],
      choices: choices
    }
  ])

  iSeed = seedItems.filter((item) => item.choice === r.seed)[0].name

  const seedInfo = seedItems.filter((item) => item.name === iSeed)[0]

  // 判断选中的 seed 是否已经安装
  if (!seedInfo.installed) {
    logger(LogType.Start, lang.INIT.SEED_INSTALLSTART)
    logger(LogType.Wait, lang.INIT.SEED_INSTALLING)

    await installAction([seedInfo.name]).catch((er) => {
      logger(LogType.Finish, er)
    })

    logger(LogType.Finish, lang.INIT.SEED_INSTALLED)

    config = await localConfig.get()
  }

  const iSeedPack = require((config as SeedDataStruct).seedMap[seedInfo.name].main)

   // 启动前 hooks
   if (iSeedPack?.hooks?.beforeStart) {
    logger(LogType.Info, lang.INIT.HOOKS_BEFORE_START_RUN)
    await iSeedPack.hooks.beforeStart({
      targetPath: targetPath
    }).catch((err) => {
      logger(LogType.Error, err)
    })
    logger(LogType.Info, lang.INIT.HOOKS_BEFORE_START_FINISHED)
  }

  // 准备需要复制的文件
  if (!iSeedPack.path) {
    logger(LogType.Error, lang.INIT.SEED_COPY_PATH_UNDEFINED)
    return
  }

  let fileMap = {}
  const iSeedConfig = (config as SeedDataStruct).seedMap[iSeed]
  const seedSourcePath = path.resolve(
    path.dirname(iSeedConfig.main),
    iSeedPack.path
  )

  logger(LogType.Info, lang.INIT.SEED_COPY_MAP_PRINT)

  if (!fs.existsSync(seedSourcePath)) {
    logger(LogType.Error, lang.INIT.SEED_COPY_PATH_NOT_EXISTS)

    return
  }

  let files: any = []

  try {
    files = await readFilePaths(seedSourcePath)
  } catch (err) {
    throw err    
  }

  files.forEach((iPath) => {
    fileMap[iPath] = [
      path.resolve(targetPath, path.relative(seedSourcePath, iPath))
    ]
  })

  // 复制前 hooks
  if (iSeedPack.hooks && iSeedPack.hooks.beforeCopy) {
    logger(LogType.Info, lang.INIT.HOOKS_BEFORE_COPY_RUN)

    let rMap 

    try {
      rMap = await iSeedPack.hooks.beforeCopy({
        fileMap,
        targetPath,
      })
    } catch (er) {
      throw er
    }

    if (typeof rMap === 'object') {
      fileMap = rMap
    }

    logger(LogType.Info, lang.INIT.HOOKS_BEFORE_START_FINISHED)
  }

  logger(LogType.Info, lang.INIT.SEED_COPY_MAP_PRINT)

  Object.keys(fileMap).forEach((iPath) => {
    logger(LogType.Info, `${chalk.yellow(iPath)} => ${chalk.green(fileMap[iPath].join(','))}`)
  })

  // 复制
  let iLog
  try {
    iLog = await copyFiles(fileMap)
  } catch (err) {
    throw err
  }

  iLog.add.forEach((iPath) => {
    logger(LogType.Add, iPath)
  })

  iLog.update.forEach((iPath) => {
    logger(LogType.Update, iPath)
  })

  // 复制后hook
  if (iSeedPack.hooks && iSeedPack.hooks.afterCopy) {
    logger(LogType.Info, lang.INIT.HOOKS_AFTER_COPY_RUN)

    await iSeedPack.hooks.afterCopy({
      fileMap,
      targetPath,
      logger
    })

    logger(LogType.Info, lang.INIT.HOOKS_AFTER_COPY_FINISHED)
  }
} 