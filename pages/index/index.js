//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    auto:{},
    loginflag:true,
    dianguo: 0,
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

    personList: [],
    type: '',
    isTimingStart: ''

  },

  nologin: function() {
    var that = this;
    that.setData({
      loginflag:true,
      show: false
    })
  },
  
  // autoImage: function (e) {
  //   console.log(e)
  //   var imageWidth = e.detail.width;
  //   var imageHeight = e.detail.height;
  //   var imagescale = imageWidth / imageHeight;

  //   var autoWidth = 324 / imagescale;
  //   var autoHeight = 286 / imagescale;

  //   var image = this.data.auto;
  //   image[e.target.dataset.index] = {
  //       width:autoWidth,
  //       height:autoHeight
  //   };
  //   console.log(image)
  //   console.log(e.target.dataset.index)
  //  this.setData({
  //    auto:image
  //  })
  // },
  praise: function() {
    // wx.showLoading({
    //   title: '请稍后',
    // })
    console.log(111);
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
      success: function(res) {
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
        setTimeout(function() {
          main.setData({
            show: false
          })
        }, 2000)
        setTimeout(function() {
          wx.switchTab({
            url: '../index/index',
          })
        }, 1000)
      },
      fail: function(res) {
        console.log("查找失败：");
        console.log(res);
        // wx.hideLoading();
      }
    })
  },
  goinfer: function(e) {
    var that=this
    // console.log(that.data.loginflag)
    // console.log(e, that.data.type, that.data.activeId);
    // console.log(that.data.personList)
   let arrimg = e.currentTarget.dataset.img.split('=')
    console.log(arrimg)
    wx.getStorage({
      key: 'user',
      success: function(res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,
        })
        wx.navigateTo({
          url: '../persondetail/persondetail?id=' + e.currentTarget.dataset.userid + '&type=' + that.data.type + '&activeId=' + that.data.activeId + '&common=0' + '&imgid=' + arrimg[1]
        })
      },
      fail: function() {

        console.log(1111111111)
        that.setData({
          loginflag:true,
          show: true
        })

      }

    })
  },
  topNavChange: function(e) {
    console.log(e)
    console.log(e.currentTarget.dataset.current);

    this.setData({
      isTimingStart: this.data.activeList[e.currentTarget.dataset.current].isTimingStart,
      type: e.currentTarget.dataset.type,
      currentTab: e.currentTarget.dataset.current,
      activeId: this.data.activeList[e.currentTarget.dataset.current].id
    })
    this.getPerson()
  },
  list: function(even) {
    var main = this;
    wx.showLoading({
      title: '请稍后',
      mask: true
    })
    console.log(1111)
    wx.request({
      url: app.globalData.url + '/activity/listActivity',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
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
            isTimingStart: main.data.activeList[0].isTimingStart
          })
        }
        main.getPerson1()
      },
      fail: function(res) {
        console.log("查找失败：");

      }
    })
  },
  canclezan: function(e) {
    wx.showLoading({
      title: '请稍等',
      mask: true
    })
    var that = this;
    wx.request({
      url: app.globalData.url + '/wareHouse/deleteclickPraise',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: that.data.activeId,
        electedUserId: that.data.personList[e.currentTarget.dataset.index].userId,
        userId: that.data.user
      },
      success: function(res) {
        console.log("查找成功：");
        console.log(res);
        if (res.data.status == 200) {
          wx.showToast({
            title: '取消成功 ',
            mask: true
          })
          that.pan()
          let arr = that.data.personList;
          if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
              if (arr[i].select == 1) {
                arr[i].select = 0;
              }
            }
          }


          // that.setData({
          //   personList: arr
          // })
          wx.request({
            url: app.globalData.url + '/activity/listActivityUser',
            method: 'get',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              activityId: that.data.activeId,
              userId: that.data.user
            },
            success: function(res) {
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


              that.setData({
                personList: res.data.data
              })
              wx.hideLoading();
            },
            fail: function(res) {
              console.log("查找失败：");
              console.log(res);
              wx.hideLoading();
            }
          })
        }
      },
      fail: function(res) {
        console.log("查找失败：");
        console.log(res);
        // wx.hideLoading();
      }
    })
  },
  dianzan: function(e) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,
        })
          that.goinforyz(e);
      },
      fail: function () {
          that.setData({
            loginflag: true,
            show: true
          })
      }

    })
  },
goinforyz:function(e){
  var that=this;
  wx.showLoading({
    title: '请稍等',
    mask: true
  })


  that.pan()
  console.log(that.data.dianguo);
  if (that.data.dianguo == 1) {
    wx.showToast({
      title: '每天只能点赞一次',
      icon: 'none',
      mask: true
    })
    return false;
  }
  if (that.data.isTimingStart == 0) {
    wx.showToast({
      title: '活动尚未开始',
      icon: 'none',
      mask: true
    })
    return false;
  }
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
        if (res.data.data == "活动未开始") {
          wx.showToast({
            title: '活动未开始',
            icon: 'none',
            mask: true
          })
          return false;
        }
        // wx.hideLoading();
        // for (var i = 0; i < arr.length; i++) {
        //     arr[i].select = 0;
        // }
        // that.setData({
        //   personList: arr
        // })
        if (res.data.data == '今日票数已经用完') {
          wx.showToast({
            title: '每天只能点赞一人',
            icon: 'none',
            mask: true
          })

          return false;
        } else {
          wx.showToast({
            title: '点赞成功',
            mask: true
          })
          that.pan();
          wx.request({
            url: app.globalData.url + '/activity/listActivityUser',
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


              that.setData({
                personList: res.data.data
              })
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

 


  pan: function() {
    var main = this;
    wx.request({
      url: app.globalData.url + '/wareHouse/findIsPraise',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: main.data.user
      },
      success: function(res) {
        console.log(res);
        if (res.data.data == '已经点过了') {
          main.setData({
            dianguo: 1
          })
        } else {
          main.setData({
            dianguo: 0
          })
        }

      },
      fail: function(res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  getPerson1: function() {
    wx.showLoading({
      title: '请稍后',
      mask: true
    })
    var main = this;
    if (main.data.activeList[0] && main.data.activeList[0].type == 'praise') {
      wx.request({
        url: app.globalData.url + '/activity/listActivityUser',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: main.data.activeList[0].id,
          userId: main.data.user
        },
        success: function(res) {
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
        fail: function(res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
    } else if (main.data.activeList[0] && main.data.activeList[0].type != 'praise') {
      wx.request({
        url: app.globalData.url + '/activity/listActivityUser',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: main.data.activeList[0].id,

        },
        success: function(res) {
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
        fail: function(res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
      wx.hideLoading();
    }


  },
  getPerson: function() {
    wx.showLoading({
      title: '请稍后',
      mask: true
    })
    var main = this;
    console.log(main.data.user, main.data.type)
    if (main.data.type == 'praise') {
      console.log(main.data.user)
      wx.request({
        url: app.globalData.url + '/activity/listActivityUser',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          userId: main.data.user,
          activityId: main.data.activeId
        },
        success: function(res) {
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
        fail: function(res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
    } else {
      wx.request({
        url: app.globalData.url + '/activity/listActivityUser',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: main.data.activeId
        },
        success: function(res) {
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
        fail: function(res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
    }

  },
  // 获取轮播图
  getPic: function() {
    wx.showLoading({
      title: '请稍后',
      mask: true
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
      success: function(res) {
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
      fail: function(res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow: function() {


    this.getPic();
    this.list();
    this.setData({
      currentTab: 0
    })
  },
  everyday: function(e) {
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
        success: function(res) {
          console.log(res);
          if (res.data.data) {

          } else {
            wx.navigateTo({
              url: '../dailyPraise/dailyPraise',
            })
          }

        },
        fail: function(res) {
          console.log("查找失败：");
          console.log(res);
          // wx.hideLoading();
        }
      })

      console.log(1);

    }
  },

  getUserInfo: function(e) {


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
                    success: function(res) {
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

                        success: function(res) {
                          console.log("登录", res);
                          if (res.data.status == 200) {
                            wx.setStorage({
                              key: 'user',
                              data: res.data.data
                            })
                            wx.hideLoading();
                            wx.showToast({
                              title: '登录成功',
                              icon: '',
                              mask: true,
                            })
                            main.setData({
                              loginflag:true,
                              show:false
                            })

                          }else{
                            wx.hideLoading();
                            main.setData({
                              loginflag: false,
                              show: true
                            })
                          }
                        },
                        fail: function(res) {
                          wx.hideLoading();
                          main.setData({
                            loginflag: false,
                            show:true
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
  onLoad() {
    var that = this;
    that.getPic();
    that.list();
    // wx.getStorage({
    //   key: 'user',
    //   success: function(res) {
    //     console.log('缓存', res)
    //     that.setData({
    //       user: res.data.userId,

    //     })
        
        
    //     that.pan();
    //     console.log(19009)
    //   },
    //   fail: function() {

    //     console.log(1111111111)
    //     that.setData({
    //       show: true
    //     })

    //   }

    // })


  }
})