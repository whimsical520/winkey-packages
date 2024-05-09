import path from 'path'
import fs from 'fs'
import LocalStorage from './localStorage'

const pkg = require('../../package.json')

const DEFAULT_PKG_CONFIG = {
  name: 'init-project-plugins',
  version: pkg.version,
  description: 'plugin manage',
  license: 'ISC',
  repostory: {},
  repository: {},
  dependencies: {},
  devDependencies: {}
}

const DEFAULT_CONFIG = {
  seeds: [],
  seedMap: {}
}

const DEFAULT_LOCAL_SEED_CONFIG = {}

class LocalConfig {
  private handle: LocalStorage
  private pkgHandle: LocalStorage
  private seedHandle: LocalStorage

  constructor() {
    this.handle = new LocalStorage('config', DEFAULT_CONFIG)
    this.pkgHandle = new LocalStorage('plugins/package', DEFAULT_PKG_CONFIG)
    this.seedHandle = new LocalStorage(
      'local-seed.config',
      DEFAULT_LOCAL_SEED_CONFIG
    )
  }
}

export default LocalConfig