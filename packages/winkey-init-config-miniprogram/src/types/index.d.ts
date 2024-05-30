export interface FormatedEnv {
  [key: string]: boolean | string | number
}

/** 发布平台 */
export type MiniWkAppPlatform = 'wx' | 'swan' | 'tt' | 'ks'

export type WkMiniProgramCompilerOption = {
  /** 项目名称 */
  projectName: string
  /** appid */
  appid: string
  /** 平台信息 */
  platform: MiniWkAppPlatform
  /** 唯一key */
  key: string
  /** 忽略的信息 */
  ignores: string[]
  /** 项目配置地址 */
  projectConfigPath: string
  /** 秘钥地址 */
  privateKeyPath: string
  /** 产出目录 */
  root: string
  alias: Object
  /** 环境配置 */
  env: Record<string, string>
  /** npm包忽略信息 */
  npmIgnores: string[]
  /** 异步信息 */
  syncResouce: Record<string, string>
}

export type WkMiniProgramOptions = {
  /** @name 入口文件 */
  entry: string
  /** @name 产出文件 */
  output: string
  /** @name 模板来源 */
  from: MiniWkAppPlatform
  /** @name 全局上下文 */
  context: string
  /** npm保持最新包 */
  npmKeepLatest: string[]
  /** tsconfig路径 */
  tsConfigPath: string
  /** 有效目标 */
  effectTargets: string[]
  /** ??? */
  preview: {
    list: unknown
  }
  /** 单独配置信息 */
  compilerOptions: WkMiniProgramCompilerOption[]
}
