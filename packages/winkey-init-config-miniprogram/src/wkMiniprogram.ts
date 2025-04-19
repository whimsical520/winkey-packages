import { logger, LogType } from 'winkey-log'
import fs from 'fs'
import path from 'path'
import esbuild from 'esbuild'
import { lessLoader } from 'esbuild-plugin-less'
import moment from 'moment'
import chokidar from 'chokidar'
import inquirer from 'inquirer'
import { ExecType } from './index'
import type { WkMiniProgramOptions, WkMiniProgramCompilerOption } from './types/index'
import { styleFileSuffixMap, apiPrefixMap } from './lib/consts'
import chalk from 'chalk'
import { esbuildPlugin } from './lib/esbuildPlugin'

const { exec } = require('child_process')

class WkMiniProgram {
  private baseOutputPath: string
  private baseEntryPath: string
  private rootPath: string
  private compilerOptions: WkMiniProgramCompilerOption[] = []
  private from: string

  constructor(config: WkMiniProgramOptions) {
    this.rootPath = path.resolve(process.cwd(), config.context || './')
    this.baseEntryPath = path.resolve(this.rootPath, config.entry || './src')
    this.baseOutputPath = path.resolve(this.rootPath, config.output || './output')
    this.compilerOptions = config.compilerOptions || []
    this.from = config.from

    if (!fs.existsSync(this.baseOutputPath)) {
      fs.mkdirSync(this.baseOutputPath)
    }

    if (this.compilerOptions.length) {
      for (let i = 0; i < this.compilerOptions.length; i++) {
        if (!fs.existsSync(this.compilerOptions[i].root)) {
          fs.mkdirSync(this.compilerOptions[i].root)
        }
      }
    }
  }

  async init(type: ExecType) {
    logger(LogType.Start, '开始转换')
    logger(LogType.Wait, '请稍等')

    try {
      if (this.compilerOptions.length) {
        for (let i = 0; i < this.compilerOptions.length; i++) {
          this.handleCopy(i)
        }
      } else {
        this.handleCopy()
      }

      logger(LogType.Success, '转换成功')

      if (type === ExecType.Dev) {
        const watcher = chokidar.watch(path.join(this.rootPath, 'src'), {
          ignored: /(^|[/\\])\../, // 忽略以点开头的文件和文件夹
          persistent: true, // 持续监听
          ignoreInitial: true, // 忽略初始化时的事件
          awaitWriteFinish: true // 等待写入完成后触发事件
        })

        watcher.on('all', (event, filepath) => {
          if (this.compilerOptions.length) {
            for (let i = 0; i < this.compilerOptions.length; i++) {
              const outputPath = path.join(this.compilerOptions[i].root, filepath.split('src')[1])

              this.handleWatchFile(event, filepath, outputPath, i)
            }
          } else {
            const outputPath = path.join(this.baseOutputPath, filepath.split('src')[1])

            this.handleWatchFile(event, filepath, outputPath)
          }
        })
        logger(LogType.Info, '正在监听中...')
      } else if (type === ExecType.Build) {
        logger(LogType.Info, '打包结束')
      }
    } catch (e) {
      logger(LogType.Error, '转换失败:' + e)
    }

    logger(LogType.Finish, '转换结束')
  }

  private async handleCopy(index?: number) {
    const outputPath = index !== undefined ? this.compilerOptions[index].root : this.baseOutputPath
    this.copyFolder(this.baseEntryPath, outputPath, index)

    // 转移配置文件
    await this.getProjectJson(index)

    // 转移node_modules
    await this.handleNodeModules()
  }

  private handleWatchFile(event: string, filepath, outputPath, index?: number) {
    switch (event) {
      case 'change':
        this.handleFile(filepath, outputPath, LogType.Update, index)
        break
      case 'add':
      case 'addDir':
        this.handleFile(filepath, outputPath, LogType.Add, index)
        break
      case 'unlink':
      case 'unlinkDir':
        fs.stat(outputPath, (err) => {
          if (!err) {
            this.handleFile(filepath, outputPath, LogType.Delete, index)
          }
        })
        break
    }
  }

  private copyFolder(entry, output, index?: number) {
    const files = fs.readdirSync(entry)
    for (let i = 0; i < files.length; i++) {
      const entryPath = path.join(entry, files[i])
      const outputPath = path.join(output, files[i])

      this.handleFile(entryPath, outputPath, null, index)
    }
  }

  private copyFile(entry, output) {
    fs.copyFileSync(entry, output)
  }

  private handleFile(entryPath, outputPath, type?: LogType, index?: number) {
    const filename = path.basename(entryPath)
    if (filename.includes('.ts') && !filename.includes('.d.ts')) {
      // 处理ts文件
      const match = filename.match(/(.*).ts/)

      esbuild
        .build({
          entryPoints: [entryPath],
          outfile: path.resolve(path.resolve(outputPath, '../'), match[1] + '.js'),
          bundle: true,
          sourcemap: false,
          charset: 'utf8',
          plugins:
            index !== undefined
              ? [
                  esbuildPlugin({
                    fileType: 'ts',
                    from: this.from,
                    ...this.compilerOptions[index]
                  })
                ]
              : []
        })
        .catch((err) => {
          logger(LogType.Error, err)
          process.exit(1)
        })

      this.log(
        `[ts-js][${path.resolve(path.resolve(outputPath, '../'), match[1] + '.js')}]`,
        type || LogType.Success,
        index
      )
    } else if (new RegExp(`(.*)${this.from}`, 'i').test(filename)) {
      const fileNameMatch = filename.match(/(.*)\.[^.]+$/)
      const preFileName = fileNameMatch![1] || ''
      const platform = index === undefined ? this.from : this.compilerOptions[index].platform

      let suffix = platform

      if (suffix === 'wx') {
        suffix = 'wxml' 
      }
      
      outputPath = path.resolve(path.resolve(outputPath, '../'), preFileName + `.${platform}`)

      // 处理模板
      if (platform === this.from) {
        // 相同类似的文件，直接copy

        fs.copyFileSync(entryPath, outputPath)
      } else {
        const data = fs.readFileSync(entryPath, 'utf8')

        const originApiPrefix = apiPrefixMap[this.from]
        const targetApiPrefix = apiPrefixMap[platform]

        const modifiedData = data.replace(
          new RegExp(`${originApiPrefix}:`, 'g'),
          `${targetApiPrefix}:`
        )

        fs.writeFileSync(outputPath, modifiedData)
      }

      this.log(`[${this.from}-${platform}] [${outputPath}]`, type || LogType.Correct, index)
    } else if (/(.*).json/.test(filename)) {
      fs.copyFileSync(entryPath, outputPath)

      this.log(
        `[json-json] [${path.resolve(path.resolve(outputPath, '../'), filename)}]`,
        type || LogType.Correct,
        index
      )
    } else if (fs.statSync(entryPath).isDirectory()) {
      // 复制文件
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath)
      }

      this.copyFolder(entryPath, outputPath, index)
    } else if (/(.*).less/.test(filename)) {
      // 处理样式文件
      const match = filename.match(/(.*).less/)
      const newSuffix =
        styleFileSuffixMap[index !== undefined ? this.compilerOptions[index].platform : 'wx']

      esbuild
        .build({
          entryPoints: [entryPath],
          outfile: path.resolve(path.resolve(outputPath, '../'), match[1] + `.${newSuffix}`),
          bundle: true,
          plugins: [lessLoader()]
        })
        .catch((err) => {
          logger(LogType.Error, err)
          process.exit(1)
        })

      this.log(
        `[less-${newSuffix}] [${path.resolve(path.resolve(outputPath, '../'), match[1] + `.${newSuffix}`)}]`,
        type || LogType.Success,
        index
      )
    } else {
      // 其他文件，一律复制
      this.copyFile(entryPath, outputPath)
    }
  }

  private getProjectJson(index?: number) {
    const projectConfigPath =
      index !== undefined ? this.compilerOptions[index].projectConfigPath : 'project.config.json'
    const outputPath = index !== undefined ? this.compilerOptions[index].root : this.baseOutputPath
    // 默认取project.config.json
    if (fs.existsSync(projectConfigPath)) {
      const jsonResult = require(projectConfigPath)
      const projectname = index !== undefined && this.compilerOptions[index].projectName
      const appid = index !== undefined && this.compilerOptions[index].appid

      jsonResult.projectname = projectname || jsonResult.projectname
      jsonResult.appid = appid || jsonResult.appid

      fs.writeFileSync(
        path.resolve(outputPath, 'project.config.json'),
        JSON.stringify(jsonResult, null, 2),
        'utf-8'
      )
      return
    }
  }

  private async handleNodeModules() {
    if (!fs.existsSync(path.resolve(this.rootPath, 'node_modules'))) {
      logger(LogType.Stop, '')
      const result = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'install',
          message: `检测到未安装依赖，是否需要安装依赖？（Y/N）`,
          default: true
        }
      ])

      if (result.install) {
        logger(LogType.Wait, '执行 yarn install...')

        exec('yarn install', { cwd: this.rootPath }, (error, stdout, stderr) => {
          if (error) {
            logger(LogType.Error, `安装依赖失败:${error.message}`)
          } else {
            logger(LogType.Success, '依赖安装成功!')

            this.getNodeModulesDataByDependencies()
          }
        })
      } else {
        logger(LogType.Tip, '未执行安装依赖命令')
      }
    } else {
      this.getNodeModulesDataByDependencies()
    }
  }

  private getNodeModulesDataByDependencies() {
    logger(LogType.Start, '开始处理node_modules')

    // 先获取根目录下的package.json里的dependencies
    const packageJSON = require(path.resolve(this.rootPath, 'package.json'))

    const dependencies = packageJSON.dependencies || {}

    if (!Object.keys(dependencies).length) {
      logger(LogType.Success, '未检测到dependencies，处理结束')
      return
    }

    const that = this

    if (this.compilerOptions.length) {
      for (let i = 0; i < this.compilerOptions.length; i++) {
        const miniprogramPath = path.resolve(this.compilerOptions[i].root, 'miniprogram_npm')

        transferMiniProgramNpm(this.rootPath, miniprogramPath, i)
      }
    } else {
      const miniprogramPath = path.resolve(this.baseOutputPath, 'miniprogram_npm')

      transferMiniProgramNpm(this.rootPath, miniprogramPath)
    }

    function transferMiniProgramNpm(rootPath, miniprogramPath, index?: number) {
      if (!fs.existsSync(miniprogramPath)) {
        fs.mkdirSync(miniprogramPath)
      }

      const nodeModulesPath = path.join(rootPath, 'node_modules')

      for (const key in dependencies) {
        const npmPath = path.resolve(nodeModulesPath, key)
        const subPackageJSON = require(path.resolve(npmPath, 'package.json'))
        const folderPath = path.resolve(miniprogramPath, key)

        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath)
        }

        if (subPackageJSON.main) {
          const filepath = path.resolve(npmPath, subPackageJSON.main)
          const filename = path.basename(filepath)
          const resultPath = path.resolve(folderPath, filename)
          fs.copyFileSync(filepath, resultPath)

          that.log(`[npm-npm] [${resultPath}]`, LogType.Correct, index)
        }

        if (subPackageJSON.module) {
          const filepath = path.resolve(npmPath, subPackageJSON.module)
          const filename = path.basename(filepath)
          const resultPath = path.resolve(folderPath, filename)
          fs.copyFileSync(filepath, resultPath)

          that.log(`[npm-npm] [${resultPath}]`, LogType.Correct, index)
        }
      }
    }

    logger(LogType.Success, 'node_modules 处理完成')
  }

  private log(text, type, index) {
    let logType = LogType.Info
    let tip = 'done'

    switch (type) {
      case LogType.Update:
        logType = LogType.Update
        tip = 'update'
        break
      case LogType.Success:
        logType = LogType.Success
        tip = 'create'
        break
      case LogType.Correct:
        logType = LogType.Correct
        tip = 'copy'
        break
      case LogType.Delete:
        logType = LogType.Delete
        tip = 'delete'
        break
    }

    logger(
      logType,
      `[${moment().format('HH:mm:ss')}] ${index !== undefined ? chalk.green(`[appid: ${this.compilerOptions[index].appid}]`) : ''} ${chalk.yellow(text)} ${tip}`
    )
  }
}

export default WkMiniProgram
