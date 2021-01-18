//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activityName:'',
    global: {},
    user: '',
    activeId: '',
    activeList: [],
    picdata: [],
    show: false,
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

    picdata: [],
    personList: [],
    type: ''

  },
  praise: function () {
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
        activityId: main.data.activeId,
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
        setTimeout(function () {
          main.setData({
            show: false
          })
        }, 2000)
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
  goinfer: function (e) {
    console.log(e, this.data.type, this.data.activeId);
    wx.navigateTo({
      url: '../persondetail/persondetail?id=' + e.currentTarget.dataset.userid + '&type=' + this.data.type + '&activeId=' + this.data.activeId + '&common=0'
    })
  },
  topNavChange: function (e) {
    console.log(e)
    console.log(e.currentTarget.dataset.current);

    this.setData({
      type: e.currentTarget.dataset.type,
      currentTab: e.currentTarget.dataset.current,
      activeId: this.data.activeList[e.currentTarget.dataset.current].id,
      activityName: this.data.activeList[e.currentTarget.dataset.current].activityName,
    })
    this.getPerson()
  },
  list: function (even) {
    var main = this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(1111)
    wx.request({
      url: app.globalData.url + '/activity/findUserActivityVote',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        userId: main.data.user
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        wx.hideLoading();

        main.setData({
          activeList: res.data.data


        })
        if (main.data.activeList.length > 0) {
          main.setData({
            type: main.data.activeList[0].type,
            activeId: main.data.activeList[0].id,
            activityName: main.data.activeList[0].activityName
          })
        }
        main.getPerson1()
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  dianzan: function (e) {
    console.log(e);
    var that = this;
    let arr = that.data.personList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].select == 1) {
        arr[i].select = 0;
      }
    }
    that.setData({
      personList: arr
    })
    if (arr[e.currentTarget.dataset.index].select == 0) {
      arr[e.currentTarget.dataset.index].select = 1;
      console.log(that.data.activeId, that.data.personList[e.currentTarget.dataset.index].userId, that.data.user)
      wx.request({
        url: app.globalData.url + '/wareHouse/clickPraise',
        method: 'post',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: that.data.activeId,
          electedUserId: that.data.personList[e.currentTarget.dataset.index].userId,
          userId: that.data.user
        },
        success: function (res) {
          console.log("查找成功：");
          console.log(res);
          // wx.hideLoading();
          for (var i = 0; i < arr.length; i++) {
            arr[i].select = 0;
          }
          that.setData({
            personList: arr
          })
          if (res.data.data == '今日票数已经用完') {
            wx.showToast({
              title: '每天只能投一票',
              icon: 'none'
            })
            return false;
          } else {
            wx.showToast({
              title: '投票成功',
            })
            wx.request({
              url: app.globalData.url + '/activity/voteRecords',
              method: 'get',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                activityId: that.data.activeId,
                userId: that.data.user
              },
              success: function (res) {
                console.log("查找成功：");
                console.log(res);
                if (res.data.data) {
                  for (var i = 0; i < res.data.data.length; i++) {

                    res.data.data[i].select = 0;

                    if (res.data.data[i].fileId) {
                      res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
                    } else {
                      res.data.data[i].img = '../img/pic.png';
                    }

                  }
                }

                wx.hideLoading();
                that.setData({
                  personList: res.data.data
                })

              },
              fail: function (res) {
                console.log("查找失败：");
                console.log(res);
                wx.hideLoading();
              }
            })
          }
        },
        fail: function (res) {
          console.log("查找失败：");
          console.log(res);
          // wx.hideLoading();
        }
      })

    } else {


    }
    that.setData({
      personList: arr
    })


  },
  getPerson1: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    if (main.data.activeList[0] && main.data.activeList[0].type == 'praise') {
      wx.request({
        url: app.globalData.url + '/activity/voteRecords',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: main.data.activeList[0].id,
          userId: main.data.user
        },
        success: function (res) {
          console.log("查找成功：");
          console.log(res);
          if (res.data.data) {
            for (var i = 0; i < res.data.data.length; i++) {

              res.data.data[i].select = 0;

              if (res.data.data[i].fileId) {
                res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
              } else {
                res.data.data[i].img = '../img/pic.png';
              }

            }
          }

          wx.hideLoading();
          main.setData({
            personList: res.data.data
            
          })

        },
        fail: function (res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
    } else if (main.data.activeList[0] && main.data.activeList[0].type != 'praise') {
      wx.request({
        url: app.globalData.url + '/activity/voteRecords',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: main.data.activeList[0].id,
          userId:main.data.user
        },
        success: function (res) {
          console.log("查找成功：");
          console.log(res);
          if (res.data.data) {
            for (var i = 0; i < res.data.data.length; i++) {

              res.data.data[i].select = 0;

              if (res.data.data[i].fileId) {
                res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
              } else {
                res.data.data[i].img = '../img/pic.png';
              }

            }
          }

          wx.hideLoading();
          main.setData({
            personList: res.data.data
          })

        },
        fail: function (res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
      wx.hideLoading();
    }


  },
  getPerson: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    console.log(main.data.user, main.data.type)
    if (main.data.type == 'praise') {
      console.log(main.data.user)
      wx.request({
        url: app.globalData.url + '/activity/voteRecords',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          userId: main.data.user,
          activityId: main.data.activeId
        },
        success: function (res) {
          console.log("查找成功：");
          console.log(res);
          if (res.data.data) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].select = 0;
              if (res.data.data[i].fileId) {
                res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
              } else {
                res.data.data[i].img = '../img/pic.png';
              }

            }
            main.setData({
              personList: res.data.data
            })
          } else {
            main.setData({
              personList: []
            })
          }



          console.log(main.data.personList)
          wx.hideLoading();
        },
        fail: function (res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + '/activity/voteRecords',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: main.data.activeId,
          userId:main.data.user
        },
        success: function (res) {
          console.log("查找成功：");
          console.log(res);
          if (res.data.data) {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].select = 0;
              if (res.data.data[i].fileId) {
                res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
              } else {
                res.data.data[i].img = '../img/pic.png';
              }

            }
            main.setData({
              personList: res.data.data
            })
          } else {
            main.setData({
              personList: []
            })
          }



          console.log(main.data.personList)
          wx.hideLoading();
        },
        fail: function (res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
    }

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
        if (res.data.data.length > 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].id;
          }

          main.setData({
            picdata: res.data.data
          })
        } else {

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
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow: function () {


    this.getPic();
   
  },
  everyday: function (e) {
    var main = this;
    if (e.currentTarget.dataset.id == 34) {
      wx.request({
        url: app.globalData.url + '/wareHouse/findIsPraise',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          userId: main.data.user.userId
        },
        success: function (res) {
          console.log(res);
          if (res.data.data) {

          } else {
            wx.navigateTo({
              url: '../dailyPraise/dailyPraise',
            })
          }

        },
        fail: function (res) {
          console.log("查找失败：");
          console.log(res);
          // wx.hideLoading();
        }
      })

      console.log(1);

    }
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
                              data: res.data.data
                            })

                          }

                        },
                        fail: function (res) {
                          console.log("查找失败：");

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
  onLoad() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,

        })
        that.list()
        console.log(19009)
      },
      fail: function () {

        console.log(1111111111)
        that.setData({
          show: true
        })

      }

    })


  }
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   // this.setData({
  //   //   userInfo: e.detail.userInfo,
  //   //   hasUserInfo: true
  //   // })
  // }
})
