// pages/navpic/navpic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
  },
  //  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
  },
  nologin: function () {
    this.setData({
      show: false
    })
    wx:wx.navigateBack({
      delta: 1,
    })
  },
  gologin: function (e) {
    let main = this;
    // console.log(e)
    // 获取用户信息
   wx.navigateTo({
     url: '../company/company',
   })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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