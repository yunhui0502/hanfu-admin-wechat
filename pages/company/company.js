// pages/company/company.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    user:'',
    num: '',
    index:'',
    array: []
  },
  bindPickerChange: function (e) {
    var that=this;
    
    that.setData({
      index: that.data.array[e.detail.value]
    })
    console.log(that.data.flag)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  num:function(e){
    var that = this;
    that.setData({
      num: e.detail.value
    })
  },
  submit:function(){
    var that = this;

    console.log(that.data.index, that.data.user)
    if (that.data.num != "") {
      wx.request({
        url: app.globalData.url + '/strategy/intoActivity',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          departmentName: that.data.index,
          userId: that.data.user,
          code: that.data.num
        },
        success: function (res) {
          console.log("查找成功");
          console.log(res);
          if (res.data.data ==true){
            console.log(123456789)
            wx.setStorage({
              key: 'companyid',
              data: that.data.num
            })
              wx.switchTab({
                url:'../index/index'
                // url: '../companysec/companysec?num='+that.data.num+'&userid='+that.data.user,
              })
          } else {
              wx.showToast({
                title: '输入有误',
                icon:'none'
              })
          }
        },
        fail: function (res) {
          console.log("查找失败：", res);
        }
      })
    } 
  },
  getnumber:function(){
    console.log();
    var that =this;
   
    console.log(that.data.num)
    if (that.data.num!=""){
      console.log(159)
      wx.request({
        url: app.globalData.url + '/strategy/findDepartmentByCompany',
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          // userId: that.data.user,
          companyCode:that.data.num,
        },
        success: function (res) {
          console.log("查找成功");
          console.log(res);
          if (res.data.data =="您输入的公司编码不存在"){
            that.setData({
              num:''
            })
            wx.showToast({
              title: '您输入的公司编码不存在',
              icon:'none'
            })
            that.setData({
              array: []
            })
          }else{
            that.setData({
              array: res.data.data
            })
          }

        },
        fail: function (res) {
          console.log("查找失败：");
        }
      })
    }

  },
  onLoad() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,

        })

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