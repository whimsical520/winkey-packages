import path from 'path'
const fs = require('fs')

function modifyDistPath(obj: {
  root: string
  outDir: string
  html: string
  assets: string
}): any {
  const { root, outDir, html, assets } = obj
  return {
    name: 'modifyDistPath',
    closeBundle() {
      const fileName = '/index.html'
      /** 转移html文件 */
      fs.mkdir(path.join(root + html), function (err: Error) {
        if (err) {
          return console.error(err)
        }

        fs.renameSync(path.join(outDir + fileName), path.join(root + html + fileName))
      })

      /** 转移manifest文件 */
      fs.mkdir(path.join(root + assets), function (err: Error) {
        if (err) {
          return console.error(err)
        }

        fs.renameSync(
          path.join(`${outDir}/rev-manifest.json`),
          path.join(`${root}${assets}/rev-manifest.json`)
        )
      })
    }
  }
}

export default modifyDistPath
