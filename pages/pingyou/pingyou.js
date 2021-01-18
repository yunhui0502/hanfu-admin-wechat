// pages/pingyou/pingyou.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    arr:[],
    arrid:[],
    txt:'',
    id:'',
    list:[]
  },
  getVal:function(e){
    console.log(e.detail.value);
    let arr = this.data.arr;
    arr[e.currentTarget.dataset.index] = e.detail.value;
    this.setData({
     arr :arr
    })
    console.log(this.data.arr);
  },
  tijiao:function(){
    
    var main = this;
    console.log(main.data.arrid, main.data.arr)
    wx.request({
      url: app.globalData.url + '/strategy/userAddEvaluation',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        evaluateTemplateId: main.data.arrid,
        evaluateContent:main.data.arr,
        userId:main.data.userid
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode==200){
         wx.showToast({
           title:'提交成功'
         })
        }
        setTimeout(function(){
          wx.navigateTo({
            url: '../huo/huo',
          })
        },1000)
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  check:function(){
      var main=this;
    console.log(main.data.id)
    wx.request({
      url: app.globalData.url + '/strategy/findUserEvaluationTemplate',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        electedId:main.data.userid,
        type:0,
        activityId:main.data.id,
      },
      success: function (res) {
        console.log(res);
        main.setData({
          list  :res.data.data
        })
        let arr=[];
        let arr1 = [];
        for (var i = 0; i < main.data.list.length;i++){
          if (main.data.list[i].evaluateContent){
            arr[i] = main.data.list[i].evaluateContent;
          }else{
            arr[i] ='';
          }
          

          arr1[i] = main.data.list[i].evaluateTemplateId;
        }
        console.log(arr1);
        main.setData({
          arr: arr,
          arrid:arr1
        })
        console.log(arr1)
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  // goVote: function (e) {
  //   console.log(this.data.user)
  // var main=this;
  //   wx.request({
  //     url: app.globalData.url + '/strategy/findUserEvaluationTemplate',
  //     method: 'post',
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     data: {
  //       activityId:,
  //       userId: this.data.user
  //     },
  //     success: function (res) {
        

  //     },
  //     fail: function (res) {
  //       console.log("查找失败：");

  //     }
  //   })



  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
    })
    console.log(this.data.id);
   
   
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
          userid: res.data.userId,

        })
        that.check();

        console.log(19009)
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