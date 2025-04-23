import fs from 'fs'
import type { PluginBuild } from 'esbuild'

const loaderMap = {
  ts: 'ts',
  less: 'css'
}

export const esbuildPlugin = (params) => {
  return {
    name: 'esbuild-plugin',
    setup(build: PluginBuild) {
      const { fileType, from, platform, env, jsConfig } = params

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

        if (jsConfig.alias) {
          Object.keys(jsConfig.alias).forEach((key) => {
            const regex = new RegExp(`${key}`, 'gi')
            let result = jsConfig.alias[key]

            result = result.replace(/\\/g, '/')

            contents = contents.replace(regex, result)
          })
        }

        return { contents: contents, loader: loaderMap[fileType] }
      })
    }
  }
}
