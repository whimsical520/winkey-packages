import type { IAppOption } from './models/base'

// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    console.log('??2132??2322')
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})