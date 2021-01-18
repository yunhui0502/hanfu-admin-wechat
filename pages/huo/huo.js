// pages/activeList/activeList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeList: [],
    user: ''
  },
  
  goVote: function (e) {
    console.log(this.data.user)

    wx.request({
      url: app.globalData.url + '/activity/isUseCode',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: e.currentTarget.dataset.id,
        userId: this.data.user
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        wx.hideLoading();
        if (res.data.data == "没有权限") {
          wx.showToast({
            title: '没有权限',
            icon: 'none'
          })
          return
        }
        if (res.data.data == false) {
          wx.navigateTo({
            url: '../power/power?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
          })
        } else {
          wx.navigateTo({
            url: '../vote/vote?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
          })
        }

      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })



  },
  // 活动列表
  list: function (even) {
    var main = this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log()
    console.log(main.data.user)
    wx.request({
      url: app.globalData.url + '/activity/findUserAddActivity',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: main.data.user
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        wx.hideLoading();
        main.setData({
          activeList: res.data.data
        })
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,

        })
        console.log(that.data.user)
        that.list();
      },
      fail: function () {

        console.log(1111111111)
        that.setData({
          show: true
        })

      }

    })
  },
  pingyou:function(e){
    wx.navigateTo({
      url: '../pingyou/pingyou?id=' + e.currentTarget.dataset.id,
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