const REG = {
  SUGAR_DATA: /__data\(['"]([a-zA-Z-_.]+)["']\)/g
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
