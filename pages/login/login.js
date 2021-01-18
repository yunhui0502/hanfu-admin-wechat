// pages/login/login.js


var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telphone:'',
    authKey: '',
    passwd: '',
    code:''
  },
  getPhone: function (e) {
    var val = e.detail.value;
    this.setData({
      telphone: val
    });
    console.log(111)
  },

  // 拿到验证码
  getCode: function (e) {
    var val = e.detail.value;
    this.setData({
      code: val
    });
    console.log(111)
  },
  //获取输入账号
  usernameInput: function (e) {
    console.log(e)
    this.setData({
      authKey: e.detail.value
    })
  },
  // 获取输入密码 
  passwordInput: function (e) {
    console.log(11)
    this.setData({
      passwd: e.detail.value
    })
  },

  //注册
   register:function(){
     var that=this;
     if (that.data.authKey == "" || that.data.passwd==""){
       wx.showToast({
         title: '账号密码不能为空',
         icon:'none',
         duration:2000
       })
     }else{
       wx.request({
         url: app.globalData.url +'/user/register',
         method:'GET',
         data:{
             authKey:84561,
             passwd:123456,
             authType:2
         },
         header: {
           'Content-Type':'application/json'    
                },
            success(res){
            console.log(res.data.status)
            if(res.data.status){ 
             wx.showToast({
               title: '注册成功',
               icon:'none',
               duration:2000
             })
              wx.navigateTo({
                url: 'pages/means/means'　　 
              })
            }
         }      
       })
     }
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
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