// pages/power/power.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId:'',
    code:'',
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      activeId: options.id,
      type: options.type,
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 根据邀请码进入投票页面
  ma : function () {
    var main=this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(main.data.code)
    console.log(main.data.activeId)
    wx.request({
      url: app.globalData.url +'/activity/listActivityCode',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId,
        code:main.data.code
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        wx.hideLoading();
        if(res.data.data==true){
          wx.navigateTo({
            url: '../vote/vote?id=' + main.data.activeId + '&type=' + main.data.type
          })
        }else{
          wx.showToast({
            icon:'none',
            title: '参与码不正确',
          })
        }
        
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
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