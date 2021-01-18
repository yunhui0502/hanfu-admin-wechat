// pages/pingyou/pingyou.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    activeId:'',
    arr: [],
    arrid: [],
    txt: '',
    id: '',
    list: [],
    isscore:false
  },
  getVal: function (e) {
    console.log(e.detail.value);
    let arr = this.data.arr;
    arr[e.currentTarget.dataset.index] = e.detail.value;
    this.setData({
      arr: arr
    })
    console.log(this.data.arr);
  },
  tijiao: function () {
    var main = this;
    let num=0;
    for (var i = 0; i < main.data.arr.length;i++){
      if (main.data.arr[i]==""){
        wx.showToast({
          title: '有未打分项',
          icon: 'none'
        })
        return;
      }else{
        num += Number(main.data.arr[i]) 
      }
      if (main.data.arr[i] > 100) {
        wx.showToast({
          title: '每一项大于0小于100分',
          icon: 'none'
        })
        return;
    }
    }
    // if (num>400){
    //   wx.showToast({
    //     title: '总分不能超过400分',
    //     icon:'none'
    //   })
    //   return;
    // }
    console.log(num)
    console.log(main.data.userid,main.data.arrid, main.data.arr)
    wx.request({
      url: app.globalData.url + '/wareHouse/recordScore',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        electedUserId:main.data.id,
        remark: main.data.arr,
        activityId: main.data.activeId,
        userId: main.data.userid,
        type: 0
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.showToast({
            title: '打分成功'
          })
        setTimeout(function(){
          wx.switchTab({
            url: '../activeList/activeList',
          })
        },1000)
        }
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  // 查看是否给此人打过份
  isvote: function () {
    var main = this;
    console.log(main.data.activeId)
    wx.request({
      url: app.globalData.url + '/strategy/findUserIsRecord',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        type: 0,
        activityId: main.data.activeId,
        electedId: main.data.id,
        userId: main.data.userid
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        if(res.data.data){
          console.log(2)
          main.setData({
            isscore:true
          })
         
        }

      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  check: function () {
    var main = this;
    console.log(main.data.id)
    wx.request({
      url: app.globalData.url + '/strategy/findUserEvaluationTemplate',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
       
        type: 0,
        activityId: main.data.activeId,
        electedId: main.data.id,
        userId: main.data.userid


      },
      success: function (res) {
        console.log(res);
        main.setData({
          list: res.data.data
        })

        let arr = [];
        let arr1 = [];
        if (main.data.list.length>0){
          for (var i = 0; i < main.data.list.length; i++) {
            arr[i] = '';
            
          }
          main.setData({
            arr: arr,
            
          })
        }
        
        
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
      activeId: options.activeId
    })
    console.log(this.data.id);
    
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          userid: res.data.userId,

        })
        that.check();
        that.isvote();
        
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
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          userid: res.data.userId,

        })
        that.check();
        that.isvote();

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