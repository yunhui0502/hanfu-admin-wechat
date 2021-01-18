//app.js

App({
  onLaunch: function() {
    var main=this;
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              // console.log("获取用户信息成功", res)
              // that.setData({
              //   name: res.userInfo.nickName
              // })
              main.globalData.userInfo = res.userInfo;
              console.log(main.globalData.userInfo);
              main.globalData.encryptedData = res.encryptedData;
              main.globalData.iv = res.iv;
              main.globalData.rawData = res.rawData;
              main.globalData.signature = res.signature;    
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo 
              })  
              // wx.login({
              //   success: function(res){
              //     // console.log(main.globalData.urlLogin + '/user/wxLogin');
              //     // console.log(main.globalData.encryptedData, main.globalData.iv, main.globalData.rawData, main.globalData.signature)
              //     wx.request({
              //       url: main.globalData.urlLogin + '/user/wxLogin',
              //       method: 'get',
              //       header: {
              //         "Content-Type": "application/x-www-form-urlencoded"
              //       },
              //       data:{
              //         code:res.code,
              //         encryptedData: main.globalData.encryptedData,
              //         iv: main.globalData.iv,
              //         rawData: main.globalData.rawData,
              //         signature: main.globalData.signature
              //       },

              //       success: function (res) {
              //         console.log("登录",res);
              //         if(res.data.status==200){
              //           wx.setStorage({
              //             key: 'user',
              //             data: res.data.data
              //           })  
                      
              //         }
                     
              //       },
              //       fail: function (res) {
              //         console.log("查找失败：");

              //       }
              //     })
              //   }
              // })
            },
            fail(res) {
              
            }
          })
        } else {
          console.log("未授权=====");
          // wx.reLaunch({
          //   url: '/pages/empower/empower',
          // })
          // that.showSettingToast("请授权")
        }
      }
    })
  },
  globalData: {
    rawData:'',
    signature:"",
    rawData:'',
    iv:'',
    encryptedData:'',
    userInfo: null,
    // url: 'http://192.168.1.128:9200',
    // urlLogin: 'http://192.168.1.106:8082'
    url: 'https://swcloud.tjsichuang.cn:1445/api/activity',
    urlLogin: 'https://swcloud.tjsichuang.cn:1445/api/user'
  }
})