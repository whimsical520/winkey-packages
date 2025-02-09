import axios from 'axios'
import { logger, LogType } from 'winkey-log'
import { SeedMapStruct } from '../model/seed'

/** sleep 函数 */
function wait(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, num)
  })
}

/** 搜索winkey seeds 包 */
async function searchWinkeyNpm(key: string) {
  if (!key) return []

  try {
    await wait(2000)

    const result = await axios.get(`https://www.npmjs.com/search/suggestions?q=${key}`, {
      timeout: 3000
    })

    return result.data || []
  } catch (err) {
    logger(LogType.Error, `seeds 包拉取失败: ${err}`)
    return []
  }
}


/** 返回seed包 */
export async function listSeed() {
  let winkeySeeds: string[] = ['winkey-init-project-seed-react', 'winkey-init-project-seed-npm', 'winkey-init-project-seed-miniprogram']

  // try {
  //   const result = await searchWinkeyNpm('winkey-init-project')
  //   console.log('result:', result)
  //   // 兜底接口挂了，就用默认配置了
  //   if (!result.length) {
  //     winkeySeeds = ['winkey-init-project-seed-react']
  //   } else {
  //     result.forEach((item) => {
  //       if (item.name.indexOf('winkey-init-project-') > -1) {
  //         winkeySeeds.push(item.name)
  //       }
  //     })
  //   }
  //   return winkeySeeds
  // } catch (err) {
  //   logger(LogType.Error, `seeds 包返回错误: ${err}`)
  // }

  return winkeySeeds
}

export async function listSeedMap() {
  let winkeySeeds: SeedMapStruct | Object = {}

  try {
    const result = await searchWinkeyNpm('winkey-init-project-')
    // 兜底接口挂了，就用默认配置了

    winkeySeeds = {}
    result.forEach((item) => {
      winkeySeeds[item.name] = item
    })

    return winkeySeeds
  } catch (err) {
    logger(LogType.Error, `seeds 包返回错误: ${err}`)
  }

  return winkeySeeds
}
