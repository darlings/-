// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    isLoading: false,
    isNodata: false,
    isHistory: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory()
  },
  /** 获取历史数据 */
  getHistory: function () {
    let { movies } = this.data
    let da = wx.getStorageSync('history')
    if (da.length >0) {
      for (let i = 0; i < da.length; i += 2) {
        if (da[i+1]) {
          movies.push([da[i], da[i+1]])
        } else {
          movies.push([da[i]])
        }
      }
      this.setData({
        movies,
        isHistory: true
      })
    }
  },
  // 影片详情
  goDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  },
  // 清除历史缓存
  handelClear: function () {
    wx.clearStorageSync()
    this.setData({
      movies: [],
      isHistory: false
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