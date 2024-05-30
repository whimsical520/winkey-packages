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
      const { fileType } = params

      const fileRegex = new RegExp(`\\.${fileType}$`)

      build.onLoad({ filter: fileRegex }, async (args) => {
        let contents: string = fs.readFileSync(args.path).toString();

        if (params.from !== params.platform) {
          const regex = new RegExp(`${params.from}`, 'gi')
          contents = contents.replace(regex, params.platform)
        }

        if (params.env) {
          Object.keys(params.env).forEach(i => {
            const regex = new RegExp(`${i}`, 'gi')
            contents = contents.replace(regex, `'${params.env[i]}'`)
          })
        }

        return { contents: contents, loader: loaderMap[fileType] };
      })
    }
  }
}