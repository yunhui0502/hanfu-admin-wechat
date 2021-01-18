// pages/choose/choose.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    show:true,
    list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getlist(){
    var that = this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(that.data.index, that.data.user)

      wx.request({
        url: app.globalData.url + '/activity/activityRecords',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
        
          userId: that.data.user,
          
        },
        success: function (res) {
          wx.hideLoading();
          console.log("查找成功");
          console.log(res);
          if(res.data.data.length>0){
            that.setData({
              show:true,
              list:res.data.data
            })

          }else{
            that.setData({
              show: false,
             
            })
          }
        },
        fail: function (res) {
          wx.hideLoading();
          console.log("查找失败：");

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
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,

        })
        that.getlist()
        console.log(19009)
      },
      fail: function () {

       

      }

    })
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