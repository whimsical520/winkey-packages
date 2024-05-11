import { initWinkeyConfig, WinkeyProjectConfig } from 'winkey-init-config-vite'
const pkg = require('./package.json')

const PROJECT_NAME = pkg.name
const WORKFLOW = 'vite'
const PLATFORM = '__data("platform")'
const SRC_ROOT = './src/'
const VERSION = pkg.version
const USE_YARN = __data('yarn')

const winkeyConfig: WinkeyProjectConfig = {
  name: PROJECT_NAME,
  workflow: WORKFLOW,
  platform: PLATFORM,
  version: VERSION,
  yarn: USE_YARN,
  component: true,
  cssModules: true,
  alias: {
    srcRoot: SRC_ROOT
  },
  server: {
    port: 7107,
    cors: true
  },
  winkeyTool: false
}

export default initWinkeyConfig.bind(this, winkeyConfig)
