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
    const files = fs.readdirSync(folderPath)

    for (let i = 0; i < files.length; i++) {
      const filePath = path.join(folderPath, files[i])

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

export function getArgsEnv(str: string) {
  if (!str) {
    return {}
  }

  if (str.indexOf('=') > -1) {
    const arrs = str.split('=')

    return {
      [arrs[0]]: arrs[1]
    }
  } else {
    return {
      env: str
    }
  }
}
