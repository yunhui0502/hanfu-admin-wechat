//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showbtn:true,
    type:'',//活动类型
    listId:'',
    userdata:[],
    userdata1:[],
    imgs: [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }],
    starId: 0,
    src1: '../img/xing2.png',
    src2: '../img/xing1.png',
    "bnrUrl": [{
      "url": "../img/img.png"
    }, {
      "url": "../img/img.png"
    }, {
      "url": "../img/img.png"
    }, {
      "url": "../img/img.png"
    }],
    topNavs: ['全部', '红包', '折扣券', '实物奖励', '0000', '1234', '0123', '2345', '11111', '22222', '3333', '4444', '5555', '6666'],
    /**
    * 当前激活的当航索引
    */
    currentTab: 0,
    /**
     * 上一个激活的当航索引
     */
    prevIndex: -1,
    /**
     * scroll-view 横向滚动条位置
     */
    scrollLeft: 0,
    list: [],
    activeId:'',
    listId:'',
    picdata:[],
    userid:''

  },
  
   commit:function(){
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    wx.request({
      url: app.globalData.url + '/wareHouse/findElection',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId,
        userId: main.data.userid
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        if (res.data.data==true){
          
          main.setData({
            showbtn:false
          })
        }
       
        wx.hideLoading();
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  neitui:function(){
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    wx.request({
      url: app.globalData.url + '/wareHouse/addElection',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId,
        userId: main.data.userid
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        if (res.data.status==200){
          wx.showToast({
            title: '提交成功',
          })
          main.setData({
            showbtn:false
          })
          setTimeout(
            function() 
             {
            wx.switchTab({
              url: '../activeList/activeList'
            })
           
         
          },1000)
          
        }

        wx.hideLoading();
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  // 获取轮播图
  getPic: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    wx.request({
      url: app.globalData.url + '/strategy/findlunbotu',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].id;
        }
        main.setData({
          picdata: res.data.data
        })
        wx.hideLoading();
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },

  // 获取被投票人
  user: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main =this;
    wx.request({
      url: app.globalData.url + '/activity/listActivityUser',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId,
        userId: main.data.userid
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
       
          if (res.data.data[i].fileId) {
            res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
          } else {
            res.data.data[i].img = '../img/pic.png';
          }
        }
        main.setData({
           userdata: res.data.data
        })
        let arr = [{
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }]
        let datalist = main.data.userdata;
        for (var i = 0; i < datalist.length;i++){
          datalist[i].imgs = arr;
          datalist[i].starId = '';
        }
        main.setData({
          userdata: datalist
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
 
  select(e) {
    console.log(111)
    console.log(e);
    var main=this;
    main.data.starId = e.currentTarget.dataset.index;
    let arr = main.data.userdata;
    console.log(arr[e.currentTarget.dataset.parent].imgs[e.currentTarget.dataset.index])
    arr[e.currentTarget.dataset.parent].starId = arr[e.currentTarget.dataset.parent].imgs[e.currentTarget.dataset.index].id;
    main.setData({
      userdata: arr
    })
    console.log(arr[e.currentTarget.dataset.parent].id, arr[e.currentTarget.dataset.parent].imgs[e.currentTarget.dataset.index].id);
    wx.showLoading({
      title: '请稍后',
    })
    console.log();
    wx.request({
      url: app.globalData.url + '/wareHouse/voteTicket',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        remark: arr[e.currentTarget.dataset.parent].imgs[e.currentTarget.dataset.index].id,
        ruleInstanceId:2,
        electedUserId: arr[e.currentTarget.dataset.parent].userId,
        userId:main.data.userid,
        activityId: main.data.activeId
        // electedUserId: arr[e.currentTarget.dataset.parent].
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        if (res.data.data == "不能重复投"){
          wx.showToast({
            icon:'none',
            title: '不能重复投此人',
          })

        }else if (res.data.data == "此分数已经使用") {
          wx.showToast({
            icon: 'none',
            title: '此分数不能重复使用',
          })
        }else{
          wx.showToast({
          
            title: '投票成功',
          })
        }  
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })



  },

 
  // 根据邀请码进入投票页面
  ma : function (even) {
    wx.showLoading({
      title: '请稍后',
    })
    wx.request({
      url: app.globalData.url +'/wareHouse/voteTicket',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        code:'asd'
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        wx.hideLoading();
        wx.switchTab({
          url: '../vote/vote'
        })
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 
  onLoad: function (options) {
    console.log(options);

  
    this.setData({
      activeId: options.id,
      type: options.type
    })
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
   
  },
  ping: function (e) {
    console.log(e)
    if (this.data.type == 'score') {
      wx.navigateTo({
        url: '../persondetail/persondetail?id=' + e.currentTarget.dataset.userid + '&activeId=' + this.data.activeId+'&type='
          + this.data.type + '&common=1'
      })
    }

  },
  onShow:function(){
    this.getPic();
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          userid: res.data.userId,

        })
        if (that.data.type == 'election') {
          that.commit()
        }
        that.user();

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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
