// pages/dailyPraise/dailyPraise.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    userdata:[],
    elected:'',
    ispraise:0,
  },
  

  praiseimg:function(e){
    console.log(e);
    let arr = this.data.userdata;
    console.log(arr)
    for (var i = 0; i < arr.length;i++){
      if (arr[i].select==1){
        arr[i].select =0;
      }
    }
    this.setData({
      userdata: arr
    })
    arr[e.currentTarget.dataset.index].select = 1;

    this.setData({
      elected: arr[e.currentTarget.dataset.index].userId
    })
    this.setData({
      userdata: arr
    })
    console.log(this.data.elected)
    
  },
praise:function(){
  // wx.showLoading({
  //   title: '请稍后',
  // })
  var main = this;
  // main.todaypraise();

  wx.request({
    url: app.globalData.url + '/wareHouse/clickPraise',
    method: 'post',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      activityId: 3,
      electedUserId: main.data.elected,
      userId: main.data.elected
    },
    success: function (res) {
      console.log("查找成功：");
      console.log(res);
      // wx.hideLoading();
      // if (res.data.data) {
      //   wx.showToast({
      //     title: '今天已经投完票',
      //     icon:'none'
      //   })
      //   return false;
      // }
      if (res.data.status == 200) {
        main.setData({
          show: true
        })
      }
      setTimeout(function(){
        main.setData({
          show: false
        })
      },2000)
      setTimeout(function () {
       wx.switchTab({
         url: '../index/index',
       })
      }, 1000)
    },
    fail: function (res) {
      console.log("查找失败：");
      console.log(res);
      // wx.hideLoading();
    }
  })
},


  // 获取被投票人
  user: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    wx.request({
      url: app.globalData.url + '/activity/listActivityUser',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId:3
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].select=0;
          if (res.data.data[i].fileId) {
            res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
          } else {
            res.data.data[i].img = '../img/pic.png';
          }
        }
        main.setData({
          userdata: res.data.data,
          
        })
        
        wx.hideLoading();
        console.log(main.data.userdata)
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.user()
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