// pages/companysec/companysec.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    user: '',
    num: '',
    index: '',
    array: []
  },


  bindPickerChange: function (e) {
    var that = this;
    that.setData({
      index: that.data.array[e.detail.value]
    })
  },

  submit: function () {
    var that = this;

    console.log(that.data.index, that.data.user)
    if (that.data.index != "") {
      wx.request({
        url: app.globalData.url + '/strategy/intoActivity',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          departmentName: that.data.index,
          userId: that.data.user,
          // code: that.data.num
        },
        success: function (res) {
          console.log("查找成功");
          console.log(res);
          if (that.data.index!= '') {
            wx.switchTab({
              url: '../index/index',
            })
          } else {
            wx.showToast({
              title: '输入有误',
              icon: 'none'
            })
          }
        },
        fail: function (res) {
          console.log("查找失败：");

        }
      })
    }
  },
  getdetail:function(){

  },
  getnumber: function () {
    console.log();
    var that = this;
    that.setData({
      show:true
    })
      wx.request({
        url: app.globalData.url + '/strategy/findDepartmentByCompany',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          userId: that.data.user,
          companyCode: that.data.num,
        },
        success: function (res) {
          console.log("查找成功");
          console.log(res);
            that.setData({
              array: res.data.data
            })
          console.log(that.data.array)
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
    this.setData({
      num:options.num,
      user:options.userid
    })
    this.getnumber();
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