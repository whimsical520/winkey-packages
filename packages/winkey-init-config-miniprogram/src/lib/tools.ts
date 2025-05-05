import fs from 'fs'
import path from 'path'

/** 获取文件后缀 */
export function getFileExtension(filePath) {
  const regex = /\.([^\.]+)$/
  const match = filePath.match(regex)
  if (match) {
    return match[1] // 返回文件后缀
  }
  return '' // 如果没有找到后缀，返回空字符串
}

/** 递归删除文件 */
export function deepDeleteFolder(folderPath: string) {
  try {
    if (fs.statSync(folderPath).isFile()) return
    console.log('??????')
    const files = fs.readdirSync(folderPath)
    console.log('files:', files)
    console.log('folderPath:', folderPath)
    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(folderPath, files[i]);

      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath)
      } else {
        fs.rmSync(filePath, {
          recursive: true,
          force: true
        })
      }
    }
  } catch (e) {
    throw e
  }
}