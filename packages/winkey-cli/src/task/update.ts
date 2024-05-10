import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import inquirer from 'inquirer' 
import { logger, LogType } from 'winkey-log'
import { SeedDataStruct, SeedItemStruct } from '../model/seed'
import { seedFull2Short } from '../lib/formatter'
import { listSeedMap } from '../lib/search'
import { installAction } from './install'
import LocalConfig from '../lib/localConfig'
import type { ActionSturct } from '../model/action'
import lang from '../lang'

const localConfig = new LocalConfig()

export const updateAction = async (_, cmder?: ActionSturct) => {
  logger(LogType.Start, lang.UPDATE.START)
  logger(LogType.Wait, lang.UPDATE.LIST_START)

  let targetPath = process.cwd()

  if (cmder.args && cmder.args[0]) {
    targetPath = path.resolve(cmder.args[0])
  }

  if (!fs.existsSync(targetPath)) {
    logger(LogType.Error, '所选目录不存在')
    return
  }

  const seedsMap = await listSeedMap()

  logger(LogType.Finish, lang.INIT.LIST_FINISHED)

  let config: SeedDataStruct | Object = (await localConfig.get()) || {}

  const installedSeeds = (config as SeedDataStruct).seeds || []

  let seedItems: SeedItemStruct[] = installedSeeds.map((seed: string) => {
    const seedItem = (config as SeedDataStruct).seedMap[seed]
    const { dev } = seedItem
    const name = seed
    const shortName = seedFull2Short(name)
    
    return {
      name,
      shortName,
      installed: true,
      dev,
      choice: `${chalk.yellow.bold(shortName)} ${chalk.gray('(')}${
        dev ? 'local' : seedsMap[seed].version
      }${chalk.gray(')')}`
    }
  })

  const seeds = Object.keys(seedsMap).map((name) => name)

  seedItems = seedItems.concat(
    seeds
      .filter((name) => installedSeeds.indexOf(name) === -1)
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
      message: `${lang.UPDATE.QUEATION_SELECT_TYPE}:`,
      default: choices[0],
      choices: choices
    }
  ])

  iSeed = seedItems.filter((item) => item.choice === r.seed)[0].name

  const seedInfo = seedItems.filter((item) => item.name === iSeed)[0]

  let seedName = seedInfo.name

  if (seedInfo.installed) {
    seedName = seedName + `@${seedsMap[seedName].version}`
  }

  logger(LogType.Start, lang.UPDATE.SEED_INSTALLSTART)
  logger(LogType.Wait, lang.UPDATE.SEED_INSTALLING)

  await installAction([seedName]).catch((er) => {
    logger(LogType.Finish, er)
  })

  logger(LogType.Finish, lang.UPDATE.SEED_INSTALLED)
}