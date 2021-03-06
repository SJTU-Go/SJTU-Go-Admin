//index.js
const app = getApp()

Page({
  data: {
    step : 0,
  routeplan:new Array(),
  arrive:"上院",
  begin: "东下院",
  time:1200,
  },
  navigatePage:function()
  {wx.navigateTo({url: '../SearchPage/SearchPage', })},


  onLoad: function() {
    var tem;
    var that = this;
    wx.request({
      url: 'https://api.ltzhou.com/navigate/bus',
      method:'POST',
      header: {
      'content-type': 'application/json'
      },
      data:{
      "arrivePlace": "交通大学闵行校区上院",
      "beginPlace": "交通大学闵行校区东下院",
      "departTime": "2020/05/11 12:05:12",
      "passPlaces": [],},

      success (res) {
        tem = res.data
        that.setData({routeplan:tem.routeplan})
        console.log(tem.routeplan)
  }})},

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  
  

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
