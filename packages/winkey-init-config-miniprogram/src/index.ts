import path from 'path'
import WkMiniProgram from './wkMiniprogram'

export enum ExecType {
  /** 开发模式 */
  Dev = 'dev',
  /** 打包模式 */
  Build = 'build'
}

export function initWinkeyConfig(type: ExecType) {
  const config = require(path.resolve(process.cwd(), 'winkey.config.ts'))

  const wkMiniProgram = new WkMiniProgram(config)

  wkMiniProgram.init(type)
}