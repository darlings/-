// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatar: '',
    userNickname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserBaseInfo()
  },
  // 获取用户头像、昵称
  getUserBaseInfo: function () {
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          userAvatar: res.userInfo.avatarUrl,
          userNickname: res.userInfo.nickName
        })
      }
    })
  },
  // 观看历史
  watchHistory: function () {
    wx.navigateTo({
      url: '../history/history',
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