export interface FormatedEnv {
  [key: string]: boolean | string | number
}

/** 发布平台 */
export type MiniWkAppPlatform = 'wx' | 'swan' | 'tt' | 'ks'

export type Env = 'prod' | 'sit' | 'test' | 'dev' | 'local'

export type CommandArgs = {
  platform: MiniWkAppPlatform
  target: string
  env: Env
}

export type JSConfig = {
  /** @name 是否开启jsBundle */
  bundle?: boolean
  /** @name 是否支持配置alias */
  alias?: Record<string, string>
}

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
  ignores?: string[]
  /** 项目配置地址 */
  projectConfigPath?: string
  /** 秘钥地址 */
  privateKeyPath?: string
  /** 产出目录 */
  root?: string
  /** 环境配置 */
  env?: FormatedEnv
  /** npm包忽略信息 */
  npmIgnores?: string[]
  /** 异步信息 */
  syncResouce?: Record<string, string>
  /** js配置 */
  jsConfig?: JSConfig
}

export type WkMiniProgramOptions = {
  /** @name 入口文件 */
  entry: string
  /** @name 产出文件 */
  output: string
  /** @name 模板来源 */
  from: MiniWkAppPlatform
  /** @name 平台信息 */
  platform?: MiniWkAppPlatform
  /** @name 全局上下文 */
  context?: string
  /** npm保持最新包 */
  npmKeepLatest?: string[]
  /** tsconfig路径 */
  tsConfigPath?: string
  /** 有效目标 */
  effectTargets?: string[]
  /** 环境变量 */
  env?: FormatedEnv
  preview?: {
    list: unknown
  }
  /** @name 单独配置信息 */
  compilerOptions?: WkMiniProgramCompilerOption[]
  /** @name 钩子方法 */
  hooks?: [(config: Omit<WkMiniProgramOptions, 'hooks'>) => void]
  /** js配置 */
  jsConfig?: JSConfig
}
