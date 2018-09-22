// pages/index/index.js
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 6,
    start: 0,
    count: 6,
    movies: [],
    isLoading: true,
    isNodata: false,
    movieType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 显示加载中
    wx.showLoading({
      title: '加载中'
    })
    this.setData({
      movieType: options.type
    })
    this.getMoivesList()
  },
  // 获取数据列表
  getMoivesList: function () {
    this.setData({ isLoading: true })
    const { start, count, movies, movieType } = this.data
    wx.request({
      url: util.doUrl(`/v2/movie/${movieType}`),
      method: 'GET',
      header: { "content-type": "json" },
      data: {
        start: start,
        count: count
      },
      success: (res) => {
        let da = res.data.subjects
        if (da.length > 0) {
          for (let i = 0; i < da.length; i += 2) {
            if (da[i + 1]) {
              movies.push([da[i], da[i + 1]])
            } else {
              movies.push([da[i]])
            }
          }
          this.setData({
            movies,
            isLoading: false
          })
        } else {
          this.setData({
            isLoading: false,
            isNodata: true
          })
        }
        // 隐藏加载中
        wx.hideLoading()
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },
  // 滚动加载
  scrollHandler: function () {
    const { page, size, count, isNodata } = this.data
    this.setData({
      page: page + 1,
      start: page * size,
      count: count
    })
    if (!isNodata) {
      this.getMoivesList()
    }
  },
  // 影片详情
  goDetail: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
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