/** 获取文件后缀 */
export function getFileExtension(filePath) {
  const regex = /\.([^\.]+)$/
  const match = filePath.match(regex)
  if (match) {
    return match[1] // 返回文件后缀
  }
  return '' // 如果没有找到后缀，返回空字符串
}
