// pages/updatePerson/updatePerson.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    show:true,
    imgs:'../img/person.png',
    phone:'',
    name:'',
    pic:{},
    date: '',
    imageList:'',
    dizhi:'',
    avatar:'',
    index: '',
    array: [],
    showpicker: false,
    num: ''
  },

  bindPickerChange: function (e) {
    var that = this;
    that.setData({
      index: that.data.array[e.detail.value]
    })
  },

  getdetail: function () {

  },
  getnumber: function () {
    var that = this;
    that.setData({
      showpicker: true
    })
    console.log(that.data.userid)
    wx.request({
      url: app.globalData.url + '/strategy/findDepartmentByCompany',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: that.data.userid,
        companyCode: that.data.num,
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        that.setData({
          array: res.data.data
        })
        console.log(that.data.array)
      },
      fail: function (res) {
        console.log("查找失败：");
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'companyid',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          num: res.data,
        })
        console.log(that.data.num)
      },
      fail: function () {
        console.log('获取部门id失败')
      }
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          userid: res.data.userId,
        })
        that.getnumber();
        that.getinfor();
      },
      fail: function () {
        console.log(1111111111)
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          avatar: res.data.avatarUrl,
        })
      },
      fail: function () {
        console.log(22222)
      }
    })
  },
  getinfor: function () {
    var main = this;
    // main.todaypraise();
    console.log(main.data.userid)
    wx.request({
      url: app.globalData.url + '/wareHouse/findUserFormInfo',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: main.data.userid
      },
      success: function (res) {

        console.log(res);
        let imgUrl = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data.fileId;
        main.setData({
          name: res.data.data.username,
          date: res.data.data.date,
          phone: res.data.data.phone,
          index:res.data.data.departmentName,
          imageList:imgUrl
        })

      }
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  chooseImage: function () {
    var that = this;
    console.log('aaaaaaaaaaaaaaaaaaaa')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: function (res) {
        console.log('ssssssssssssssssssssssssss')
        //缓存下 
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000,
          success: function (ress) {
            console.log('成功加载动画');
          }
        })

        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        //获取第一张图片地址 
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 
        console.log(filep)
        // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址 
        wx.uploadFile({
          url: app.globalData.url + '/wareHouse/updateUserAvatar',
          filePath: filep,
          name: 'fileInfo',
          formData:{userId:that.data.userid},
          success: function (res) {
            console.log(res)
            console.log(res.data)
            var sss = JSON.parse(res.data)
            var dizhi = sss.dizhi;
            //输出图片地址 
            console.log(dizhi);
            that.setData({
              "dizhi": dizhi
            })

            //do something  
          }, fail: function (err) {
            console.log(err)
          }
        });
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({

      current: current,
      urls: this.data.imageList
    })
  },
  pic:function(){
    var main=this;
    
    wx.chooseImage({
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        main.setData({
          pic: tempFilePaths,
          imgs: tempFilePaths[0],
          show:false
        })

        console.log(main.data.pic)
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },
  ming: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phonedate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  phoneperson: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  departmentName:function(){
    this.setData({
      departmentName: e.detail.value
    })
  },
  ping: function () {

    var main = this;
    console.log(main.data.pic[0], main.data.date, main.data.phone, main.data.name)
    wx.request({
      url: app.globalData.url + '/wareHouse/updateUserBaseInfo',
      method: 'post',
      data: {
        fileInfo: main.data.imageList,
        userId: main.data.userid,
        hiredate: main.data.date,
        phone:main.data.phone,
        username: main.data.name,
        departmentName:main.data.index
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res);
        main.setData({
          dizhi:res.data.data
        })
        if (res.data.status) {
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../person/person'
            })
          }, 1000)

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