// pages/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dlflag:true,
    global: {},
    userInfo:{},
    userId:'',
    user:'',
    avator:'',
    nickName:'',
    show:false,
    loginflag:true
  },

  nologin: function () {
    var that = this;
    that.setData({
      show: false
    })
  },


loginPerson:function(){
  var that=this;
  wx.getStorage({
    key: 'userInfo',
    success: function (res) {
      that.setData({
        avator: res.data.avatarUrl,
        nickName: res.data.nickName
      })
      console.log(that.data.userInfo)
    }
  })
  wx.getStorage({
    key: 'user',
    success: function (res) {
      console.log('缓存', res)
      let uid = res.data.userId
      that.setData({
        user: res.data.userId,
      })
      that.getinfor()
    },
    fail: function () {
      that.setData({
        loginflag: true,
        show: true
      })
      console.log(that.data.loginflag)
    }
  })
},

  personalEvaluation: function () {
    // wx.navigateTo({
    //   url: '../personalEvaluation/personalEvaluation?id='',
    // })
  },

  jiang:function(){
    wx.navigateTo({
      url: '../huo/huo',
    })
  },
  contact: function () {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  record: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  inforava:function(){
    wx.navigateTo({
      url: '../updatePerson/updatePerson',
    })
  },
  canxun: function () {
    wx.navigateTo({
      url: '../choose/choose',
    })
  },
  xtSet:function(){
    wx.navigateTo({
      url: '../xtset/xtset',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(that.data.show)
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          avator: res.data.avatarUrl,
          nickName:res.data.nickName
        })
      }
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        let uid = res.data.userId
        that.setData({
          user: res.data.userId,
          dlflag:false
        })
        that.getinfor()
      },
      fail:function(res){
        that.setData({
          dlflag: true
        })
      }
    })
  },
  getinfor: function () {
    var main = this;
    // main.todaypraise();
    console.log(main.data.user)
    wx.request({
      url: app.globalData.url + '/wareHouse/findUserFormInfo',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: main.data.user
      },
      success: function (res) {

        console.log(res);
        main.setData({
          userInfo: res.data.data
        })
        console.log(main.data.userInfo)
      }
    })
  },
  infor: function () {
    wx.navigateTo({
      url: '../information/information',
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
    wx.hideShareMenu();
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          avator: res.data.avatarUrl,
          nickName: res.data.nickName
        })
      }
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        let uid = res.data.userId
        that.setData({
          user: res.data.userId,
          dlflag:false
        })
        that.getinfor()
      },
      fail: function () {
        that.setData({
          userInfo: {},
          dlflag:true
        })
      }
    })
  },


  getUserInfo: function (e) {


    let main = this;
    // console.log(e)
    // 获取用户信息
    main.setData({
      show: false
    })
    console.log(main.data.show)
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              wx.getUserInfo({
                success(res) {
                  console.log("获取用户信息成功", res)
                  // that.setData({
                  //   name: res.userInfo.nickName
                  // })
                  main.data.global.userInfo = res.userInfo;
                  // console.log(main.globalData.userInfo);
                  main.data.global.encryptedData = res.encryptedData;
                  main.data.global.iv = res.iv;
                  main.data.global.rawData = res.rawData;
                  main.data.global.signature = res.signature;
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.userInfo
                  })
                  wx.login({
                    success: function (res) {
                      wx.showLoading({
                        title: '正在登录',
                        mask: true
                      })
                      // console.log(main.globalData.urlLogin + '/user/wxLogin');
                      // console.log(main.globalData.encryptedData, main.globalData.iv, main.globalData.rawData, main.globalData.signature)
                      wx.request({
                        url: app.globalData.urlLogin + '/user/wxLogin',
                        method: 'get',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          code: res.code,
                          encryptedData: main.data.global.encryptedData,
                          iv: main.data.global.iv,
                          rawData: main.data.global.rawData,
                          signature: main.data.global.signature
                        },

                        success: function (res) {
                          console.log("登录", res);
                          if (res.data.status == 200) {
                            wx.setStorage({
                              key: 'user',
                              data: res.data.data,
                            })
                            wx.hideLoading();
                            wx.getStorage({
                              key: 'userInfo',
                              success: function (res) {
                                main.setData({
                                  avator: res.data.avatarUrl,
                                  nickName: res.data.nickName
                                })
                                console.log(main.data.userInfo)
                              }
                            })
                            wx.getStorage({
                              key: 'user',
                              success: function (res) {
                                let uid = res.data.userId
                                main.setData({
                                  user: res.data.userId,
                                })
                                main.getinfor();
                                console.log(main.data.user)
                              },
                              // fail: function () {
                              //   that.setData({
                              //     loginflag: false,
                              //     show: true
                              //   })
                              // }
                            })
                            
                            wx.showToast({
                              title: '登录成功',
                              icon: '',
                              mask: true,
                            })
                            main.setData({
                              loginflag: true,
                              show: false,
                              dlflag:false
                            })
                          } else {
                            wx.hideLoading();
                            main.setData({
                              loginflag: true,
                              show: true
                            })
                          }
                        },
                        fail: function (res) {
                          wx.hideLoading();
                          main.setData({
                            loginflag: true,
                            show: true
                          })

                        }
                      })
                    }
                  })
                },
                fail(res) {

                }
              })
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          // that.showSettingToast("请授权")
        }
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