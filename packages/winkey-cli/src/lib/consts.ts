import path from 'path'

export const cwd = process.cwd()

export const platform = process.platform

export const getRootName = () => {
  let rootPath = cwd

  // linux 环境
  if (platform.indexOf('win') === -1) {
    rootPath.replace(/\//g, '\\')
  } 

  const arr = rootPath.split('\\')

  return arr[arr.length - 1]
}

export const IS_WINDOWS = process.platform === 'win32'

/** 用户根目录 */
export const USERPROFILE =
  process.env[IS_WINDOWS ? 'USERPROFILE' : 'HOME']

/** 配置目录 */
export const CONFIG_PATH = path.join(USERPROFILE, '.init-project')

/** 插件目录 */
export const CONFIG_PLUGIN_PATH = path.join(CONFIG_PATH, 'plugins')