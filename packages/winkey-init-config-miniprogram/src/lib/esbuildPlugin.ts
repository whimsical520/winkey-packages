import fs from 'fs'
import path from 'path'
import type { PluginBuild } from 'esbuild'

const loaderMap = {
  ts: 'ts',
  less: 'css'
}

// 提取导入语句的正则表达式
const importRegexTS = /import\s+.*?\s+from\s+['"][^'"]+['"];?/g
// const importRegexLess = /@import\s+["'](.*?)["'];/g;

export const esbuildPlugin = (params) => {
  return {
    name: 'esbuild-plugin',
    setup(build: PluginBuild) {
      const { fileType, from, platform, env, jsConfig, filePath } = params

      const fileRegex = new RegExp(`\\.${fileType}$`)

      build.onLoad({ filter: fileRegex }, async (args) => {
        let contents: string = fs.readFileSync(args.path).toString()

        if (from !== platform) {
          const regex = new RegExp(`${from}`, 'gi')
          contents = contents.replace(regex, platform)
        }

        if (env) {
          Object.keys(env).forEach((i) => {
            const regex = new RegExp(`${i}`, 'gi')
            contents = contents.replace(regex, `'${env[i]}'`)
          })
        }

        if (jsConfig?.alias) {
          const matches = contents.match(importRegexTS)

          if (matches) {
            matches.forEach((importPath) => {
              const pathRegex = /from\s+['"]([^'"]+)['"]/
              const pathMatch = importPath.match(pathRegex)

              if (pathMatch[1]) {
                const pre = pathMatch[1].split('/')[0]

                Object.keys(jsConfig.alias).forEach((key) => {
                  if (pre === key) {
                    let aliasPath = jsConfig.alias[key]

                    if (!path.isAbsolute(aliasPath)) {
                      aliasPath = path.resolve(process.cwd(), aliasPath)
                    }

                    // 移除别名前缀，获取实际路径
                    const regex = new RegExp(`${key}(.*)`)
                    const importPathMatch = importPath.match(regex)

                    if (importPathMatch[1]) {
                      const contentAfterSymbol = importPathMatch[1].trim()
                      // 去掉末尾的单引号或双引号
                      const actualPath = contentAfterSymbol.replace(/['"]+$/, '')

                      const absoluteImportPath = path.join(aliasPath, actualPath)

                      // 计算相对路径
                      const fileDir = path.dirname(filePath)

                      const relativePath = path
                        .relative(fileDir, absoluteImportPath)
                        .split(path.sep)
                        .join('/')

                      // 确保相对路径以 ./ 或 ../开头
                      const finalPath = relativePath.startsWith('.')
                        ? relativePath
                        : './' + relativePath

                      const originalImport = importPathMatch[0].replace(/['"]+$/, '')
                      // 替换原始导入语句
                      contents = contents.replace(originalImport, finalPath)
                    }
                  }
                })
              }
            })
          }
        }

        return { contents: contents, loader: loaderMap[fileType] }
      })
    }
  }
}
