// pages/persondetail/persondetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://swcloud.tjsichuang.cn:1445/api/activity/wareHouse/getFile?fileId=',
    handover: false,
    imgid:'',
    wo:{},
    id:'',
    activeId:'',
    type:"",
    common:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.imgid=='undefined') {
      this.setData({
        handover:true
      })
    }
    this.setData({
      id: options.id,
      imgid: options.imgid,
      type: options.type,
      activeId: options.activeId,
      common: options.common
    })
    console.log(this.data.id)
    this.getinfor()
  },
  getinfor: function () {
    var main = this;
    // main.todaypraise();
    console.log(main.data.id)
    wx.request({
      url: app.globalData.url + '/wareHouse/findUserFormInfo',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {

        userId: main.data.id
      },
      success: function (res) {

        console.log('信息',res);
        main.setData({
          wo: res.data.data
        })

      }
    })
  },
  check:function(){
    wx.navigateTo({
      url: '../checkperson/checkperson?id=' + this.data.id + '&activeId=' + this.data.activeId
    })
  },
  xianchang:function(){
    wx.navigateTo({
      url: '../xianChang/xianChang?id=' + this.data.id + '&activeId=' + this.data.activeId
    })
  },
  pingyou:function(){
    if(this.data.type=='score'&&this.data.common==1){
      wx.navigateTo({
        url: '../score/score?id=' + this.data.id + '&activeId=' + this.data.activeId
      })
    }else{
      wx.navigateTo({
        url: '../scorecommon/scorecommon?id=' + this.data.id + '&activeId=' + this.data.activeId
      })
      
    }
    
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