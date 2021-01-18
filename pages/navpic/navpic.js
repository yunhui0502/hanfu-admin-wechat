// pages/navpic/navpic.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    global: {},
    issub:false
  },
  //  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data,

        })
        if (that.data.user) {
          wx.request({
            url: app.globalData.url + '/strategy/findUserIsDepartment',
            method: 'get',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              userId: that.data.user.userId
            },
            success: function (res) {
              console.log("查找成功：");
              console.log(res);
              if(res.data.data==true){
                that.setData({
                  issub:true
                })
              }
            },
            fail: function (res) {
              console.log("查找失败：");
              console.log(res);
              // wx.hideLoading();
            }
          })
           



          setTimeout(function () {
            
            if (that.data.issub==true){
              wx.switchTab({
                url: '../index/index',
              })
            }else{
              wx.navigateTo({
               url: '../company/company',
              })
            }
           
          }, 1000)
        }else{
          
        }
        console.log(19009)
      },
      fail: function () {
        setTimeout(function(){
          that.setData({
            show: true
          })
        },700)
       
        

      }

    })
  
  },
  nologin:function(){
   this.setData({
     show:false
   })
  wx.navigateBack({
    delta: 1,
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
                           
                              wx.navigateTo({
                                url: '../company/company',
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