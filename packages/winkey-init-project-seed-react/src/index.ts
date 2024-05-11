import { runCMD, runSpawn, openBrowser } from 'winkey-os'
import { lang } from './lang'
import { readFilePaths, dataRender } from './tools'

const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const SEED_PATH = path.join(__dirname, './seeds')
const COMMON_PATH = path.join(SEED_PATH, '_commons')
const COMMON_PKG = require(path.join(COMMON_PATH, 'package.json'))

let initData = {
  name: '',
  platform: '',
  type: '',
  yarn: 'true',
  winkeyVersion: '2.0.0'
}

const config = {
  path: './seeds/base',
  hooks: {
    /**
     * seed 包执行前 hooks
     * 可以通过 inquirer 配置成多个 seed 包
     * @param  targetPath: string 复制目标路径 cwd
     * @return Promise<any>
     * beforeStart({env, targetPath})
     */
    async beforeStart({ targetPath }: { targetPath: string }) {
      const questions = []

      questions.push({
        type: 'input',
        name: 'name',
        default: targetPath.split(/[\\/]/).pop(),
        message: `${lang.QUESTION_NAME}`
      })

      const types = fs
        .readdirSync(path.join(__dirname, './seeds/'))
        .filter((name: string) => {
          return !name.match(/^\.|\_/)
        })
        .filter((name: string) => {
          return !name.match(/-both$/)
        })
        .sort((a: string, b: string) => {
          if (a === 'base') {
            return -1
          } else if (b === 'base') {
            return 1
          } else {
            return a.localeCompare(b)
          }
        })
      if (types.length === 1) {
        initData.type = types[0]
      } else {
        questions.push({
          type: 'list',
          name: 'type',
          message: `${lang.QUEATION_SELECT_TYPE}:`,
          default: types[0],
          choices: types
        })
      }

      if (questions.length) {
        const r = await inquirer.prompt(questions)

        if (r.name) {
          initData = Object.assign(initData, r)
        }
      }

      const platforms = ['pc', 'mobile']

      if (fs.existsSync(path.join(__dirname, './seeds', `${initData.type}-both`))) {
        platforms.push('both')
      }

      const r = await inquirer.prompt([
        {
          type: 'list',
          name: 'platform',
          message: `${lang.QUEATION_SELECT_PLATFORM}`,
          default: platforms[0],
          choices: platforms
        }
      ])

      if (r.platform) {
        initData = Object.assign(initData, r)
      }

      if (initData.platform === 'both') {
        initData.type = `${initData.type}-both`
      }

      const isYarn = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'yarn',
          message: `${lang.QUEATION_USE_YARN}`,
          default: true
        }
      ])

      initData = Object.assign(initData, isYarn)

      config.path = path.join(SEED_PATH, initData.type)
    },
    /**
     * 复制操作前 hooks
     * 可以在此执行重命名，调整模板路径操作
     * @param  fileMap   : {[oriPath: string]: string[]} 复制操作映射表
     * @param  targetPath: string 复制目标路径 cwd
     * @return Promise<fileMap>
     * beforeCopy({fileMap, targetPath})
     */
    async beforeCopy({ fileMap, targetPath }: { fileMap: any; targetPath: string }) {
      /** 复制 _commons 内容, 如config.path 里面有，则不拷贝 */
      const commonFiles: any = await readFilePaths(COMMON_PATH)
      commonFiles.forEach((iPath: string) => {
        const basePath = path.relative(COMMON_PATH, iPath)
        const matchPath = path.join(config.path, basePath)
        if (!fileMap[matchPath]) {
          fileMap[iPath] = [path.join(targetPath, basePath)]
        }
      })

      fileMap[path.join(COMMON_PATH, 'gitignore')] = [path.join(targetPath, '.gitignore')]

      return fileMap
    },
    /**
     * 复制操作后 hooks
     * 可以在在此执行 项目初始化如 npm install 操作
     * @param  fileMap   : {[oriPath: string]: string[]} 复制操作映射表
     * @param  targetPath: string 复制目标路径 cwd
     * @return Promise<any>
     * afterCopy({fileMap, targetPath, env })
     */
    async afterCopy({
      targetPath,
      logger
    }: {
      targetPath: string
      logger: (type: string, text: string) => void
    }) {
      // + merge package.json
      if (initData.platform === 'both') {
        const targetPcPkgPath = path.join(targetPath, 'pc/package.json')
        const targetPcPkg = require(targetPcPkgPath)
        const targetMobilePkgPath = path.join(targetPath, 'mobile/package.json')
        const targetMobilePkg = require(targetMobilePkgPath)
        const mergedPcPkg = Object.assign({}, COMMON_PKG, targetPcPkg)
        const mergedMobilePkg = Object.assign({}, COMMON_PKG, targetMobilePkg)

        Object.keys(targetPcPkg).forEach((key) => {
          if (typeof targetPcPkg[key] === 'object') {
            mergedPcPkg[key] = Object.assign(COMMON_PKG[key] || {}, targetPcPkg[key])
          }
        })

        Object.keys(targetMobilePkg).forEach((key) => {
          if (typeof targetMobilePkg[key] === 'object') {
            mergedMobilePkg[key] = Object.assign(COMMON_PKG[key] || {}, targetMobilePkg[key])
          }
        })
        fs.writeFileSync(targetPcPkgPath, JSON.stringify(mergedPcPkg, null, 2))
        logger('update', targetPcPkgPath)
        fs.writeFileSync(targetMobilePkgPath, JSON.stringify(mergedMobilePkg, null, 2))
        logger('update', targetMobilePkgPath)
      } else {
        const targetPkgPath = path.join(targetPath, 'package.json')
        const targetPkg = require(targetPkgPath)
        const mergedPkg = Object.assign({}, COMMON_PKG, targetPkg)
        Object.keys(targetPkg).forEach((key) => {
          if (typeof targetPkg[key] === 'object') {
            mergedPkg[key] = Object.assign(COMMON_PKG[key] || {}, targetPkg[key])
          }
        })
        fs.writeFileSync(targetPkgPath, JSON.stringify(mergedPkg, null, 2))
        logger('update', targetPkgPath)
      }
      // - merge package.json

      // + format
      logger('info', lang.FORMAT_FILE_START)
      let rPaths = []
      if (initData.platform === 'both') {
        rPaths = [
          path.join(targetPath, 'package.json'),
          path.join(targetPath, 'README.md'),
          path.join(targetPath, 'pc/winkey.config.ts'),
          path.join(targetPath, 'pc/package.json'),
          path.join(targetPath, 'mobile/winkey.config.ts'),
          path.join(targetPath, 'mobile/package.json')
        ]
      } else {
        rPaths = [
          path.join(targetPath, 'winkey.config.ts'),
          path.join(targetPath, 'package.json'),
          path.join(targetPath, 'README.md')
        ]
      }

      rPaths.forEach((iPath) => {
        if (fs.existsSync(iPath)) {
          const cnt = fs.readFileSync(iPath).toString()
          fs.writeFileSync(iPath, dataRender(cnt, initData))
          logger('update', lang.FORMAT_FILE_START)
        }
      })
      logger('success', lang.FORMAT_FILE_FINISHED)
      // - format

      // + install
      logger('info', lang.NPM_INSTALL_START)
      let cmd = ''
      let initCmd = ''
      if (initData.yarn) {
        try {
          const version = await runCMD({
            cmd: 'yarn -v',
            targetPath: process.cwd(),
            logger
          })
          logger('info', `${lang.YARN_VERSION}: ${chalk.green(version)}`)
          cmd = `yarn install`
          initCmd = 'yarn init -y'
        } catch (er) {
          logger('warn', `${lang.NEED_INSTALL_YARN}: ${chalk.green('npm i yarn -g')}`)
        }
      } else {
        cmd = `npm install`
        initCmd = 'npm init -y'
      }

      if (cmd) {
        logger('cmd', cmd)

        await runSpawn({
          cmd,
          targetPath,
          type: 'inherit',
          logger
        })
        if (initData.platform === 'both') {
          await runCMD({
            cmd,
            targetPath: path.join(targetPath, 'pc')
          })
          await runCMD({
            cmd,
            targetPath: path.join(targetPath, 'mobile')
          })
        }
        logger('info', lang.INIT_PKG)
        logger('cmd', initCmd)
        await runCMD({
          cmd: initCmd,
          targetPath: targetPath
        })
      }

      logger('info', `${lang.OPEN_PATH}: ${chalk.green(targetPath)}`)
      await openBrowser(targetPath)

      const readmePath = path.join(targetPath, 'README.md')
      logger('info', `${lang.OPEN_README}: ${chalk.green(readmePath)}`)
      await openBrowser(readmePath)

      logger('success', lang.NPM_INSTALL_FINISHED)
      // - install
    }
  }
}

export default config
