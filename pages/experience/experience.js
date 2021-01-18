// pages/pingjia/pingjia.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var that = this;
    that.setData({
      code:options.content
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,

        })
        console.log(that.data.user)

      },
      fail: function () {

        console.log(1111111111)
        that.setData({
          show: true
        })

      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindKeyInput: function (e) {
    console.log(e);
    this.setData({
      code: e.detail.value
    })

  },
  ping: function () {

    var main = this;
    console.log(main.data.code, main.data.user)
    wx.request({
      url: app.globalData.url + '/wareHouse/updateUserExperience',
      method: 'post',
      data: {
        jobContent: main.data.code,
        userId: main.data.user

      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.status) {
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../information/information'
            })
          }, 1000)

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})