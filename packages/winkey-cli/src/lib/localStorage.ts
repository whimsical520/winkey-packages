import path from 'path'
import fs from 'fs'
import type { SeedDataStruct } from '../model/seed'

const USERPROFILE = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
const CONFIG_PATH = path.join(USERPROFILE, '.init-project')

class LocalStorage {
  savePath: string
  private defaultData: SeedDataStruct
  private data: SeedDataStruct

  constructor(name, data) {
    const savePath = path.join(CONFIG_PATH, `${name}.json`)
    let iData = data || {}

    console.log('iData:', iData)
    console.log('savePath:', savePath)
  }
}

export default LocalStorage