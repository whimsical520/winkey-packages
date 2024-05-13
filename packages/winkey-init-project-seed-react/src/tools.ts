/* eslint-disable @typescript-eslint/ban-types */
import path from 'path'
import fs from 'fs'

const fn = {
  type: function (obj: any) {
    let type
    const toString = Object.prototype.toString
    if (obj === null) {
      type = String(obj)
    } else {
      type = toString.call(obj).toLowerCase()
      type = type.substring(8, type.length - 1)
    }
    return type
  },
  isIgnore: function (iPath: string, filter: any) {
    let ignore: any = false
    if (filter) {
      if (fn.type(filter) === 'function') {
        ignore = !filter(iPath)
      } else if (fn.type(filter) === 'regexp') {
        ignore = iPath.match(filter)
      }
    }
    return ignore
  },
  formatPath: function (iPath: string) {
    return iPath.split(path.sep).join('/')
  }
}

export const readFilePaths = (fromPath: string, filter?: boolean, reverse?: boolean) => {
  let targetPaths: string | string[]
  if (fn.type(fromPath) === 'array') {
    targetPaths = fromPath
  } else {
    targetPaths = [fromPath]
  }

  const readPath = (iPath: string) => {
    let r: string[] = []

    if (!fs.existsSync(iPath)) {
      return Promise.resolve(r)
    }

    const runner = (next: Function, reject: Function) => {
      const stat = fs.statSync(iPath)
      if (stat.isDirectory()) {
        const rPaths = fs.readdirSync(iPath).map((name: string) => path.join(iPath, name))

        let padding = rPaths.length
        const paddingCheck = () => {
          if (!padding) {
            next(r)
          }
        }

        rPaths.forEach((iiPath: string) => {
          readPath(iiPath)
            .then((data) => {
              r = r.concat(data as string[])
              padding--
              paddingCheck()
            })
            .catch((er) => {
              reject(er)
            })
        })
        paddingCheck()
      } else {
        let isIgnore = fn.isIgnore(iPath, filter)
        if (reverse) {
          isIgnore = !isIgnore
        }
        if (!isIgnore) {
          r.push(iPath)
        }
        return next(r)
      }
    }

    return new Promise(runner)
  }

  const runner = (next: Function, reject: Function) => {
    let r: string[] = []
    let padding = targetPaths.length
    const paddingCheck = () => {
      if (!padding) {
        next(r)
      }
    }

    ;(targetPaths as string[]).forEach((iPath: string) => {
      readPath(iPath)
        .then((data) => {
          r = r.concat(data as string)
          padding--
          paddingCheck()
        })
        .catch((er) => {
          reject(er)
        })
    })

    paddingCheck()
  }

  return new Promise(runner)
}

const REG = {
  SUGAR_DATA: /__data\(['"]([a-zA-Z-_.]+)["']\)/g
}
export const dataRender = (cnt: string, data: any) => {
  if (typeof cnt === 'string') {
    return cnt.replace(REG.SUGAR_DATA, (str, $1) => {
      const keys = $1.split('.')
      let point = data
      keys.forEach((key: number) => {
        if (!point) {
          return
        }
        if ((point as string[])[key]) {
          point = point[key]
        } else if (point[key] === false) {
          point = 'false'
        } else {
          point = ''
        }
      })
      return point || ''
    })
  } else {
    throw 'cnt must be string'
  }
}
