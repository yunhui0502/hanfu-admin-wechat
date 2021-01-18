// pages/pingyou/pingyou.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    isscore:false,
    activeId: '',
    arr: [],
    arrid: [],
    txt: '',
    id: '',
    list: [],
    top:'',
    height:''
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
    let num = 0;
    for (var i = 0; i < main.data.arr.length; i++) {
      if (main.data.arr[i] == "") {
        wx.show
        
        Toast({
          title: '有未打分项',
          icon: 'none'
        })
        return;
      } else {
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
    console.log(num)

    // if (num > 100) {
    //   wx.showToast({
    //     title: '总分不能超过100分',
    //     icon: 'none'
    //   })
    //   return;
    // }
    console.log(main.data.arrid, main.data.arr)
    wx.request({
      url: app.globalData.url + '/wareHouse/recordScore',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        electedUserId: main.data.id,
        remark: main.data.arr,
        activityId: main.data.activeId,
        userId: main.data.userid,
        type:1
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.showToast({
            title: '提交成功'
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../activeList/activeList',
            })
          }, 1000)
        }
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
 

  check: function () {
    var main = this;
    console.log(main.data.id, main.data.activeId)
    wx.request({
      url: app.globalData.url + '/strategy/findUserEvaluationTemplate',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        electedId: main.data.id,
        userId: main.data.userid,
        type: 1,
        activityId: main.data.activeId,
      },
      success: function (res) {
        console.log(res);
        main.setData({
          list: res.data.data
        })
        let arr = [];
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
        type: 1,
        activityId: main.data.activeId,
        electedId: main.data.id,
        userId: main.data.userid
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        if (res.data.data) {
          console.log(2)
          main.setData({
            isscore: true
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
  

    this.setData({
      id: options.id,
      activeId: options.activeId
    })
    console.log(this.data.id);
    
    var that=this;
    var query = wx.createSelectorQuery();
    setTimeout(function(){
      wx.createSelectorQuery().select('#zuo').boundingClientRect(function (rect) {
        // rect.id      // 节点的ID
        // rect.dataset // 节点的dataset
        // rect.left    // 节点的左边界坐标
        // rect.right   // 节点的右边界坐标
        // rect.top     // 节点的上边界坐标
        // rect.bottom  // 节点的下边界坐标
        // rect.width   // 节点的宽度
        // rect.height  // 节点的高度
        console.log(rect);
        let windowHeight = wx.getSystemInfoSync().windowHeight
        that.setData({
          height: windowHeight - rect.top + 'px'
        })
        console.log(that.data.height);
      }).exec()
   
    },1000)
   
    //选择id
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