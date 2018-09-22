// pages/celebrity/celebrity.js
import util from "../../utils/util.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    avatar: "",
    name: "",
    bornPlace: "xxxxxx",
    showAllDesc: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      avatar: options.avatar,
      name: options.name
    });
    // this.getCelebrityData();
  },
  /** 展开简介   */
  handleExtensiontap: function (event) {
    this.setData({
      showAllDesc: true
    });
  },
  /** 获取影人信息 */
  getCelebrityData: function () {
    let { id } = this.data
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: util.doUrl(`/v2/movie/celebrity/${id}`),
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: (res) => {
        let data = res.data;
        this.processCelebrityData(data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    });
  },
  /** 组装影人数据 */
  processCelebrityData: function (data) {
    let movies = [];
    for (let idx in data.works) {
      let subject = data.works[idx].subject;
      movies.push(subject);
    }
    let temp = {
      id: data.id,
      avatars: data.avatars,
      bornPlace: data.born_place,
      gender: data.gender,
      name: data.name,
      name_en: data.name_en,
      movie: movies
    };
    let readyData = {};
    readyData["celebrity"] = temp;
    this.setData(readyData);
  },
  /** 跳转电影详情页 */
  bindMovieDetail: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.redirectTo({
      url: '../detail/detail?id=' + id
    });
  },
  /** 查看海报 */
  bindPoster: function (event) {
    let posterUrl = event.currentTarget.dataset.posterUrl;
    // wx.navigateTo({
    //   url: '/pages/movie/movie-detail/movie-poster/movie-poster?posterUrl=' + posterUrl
    // });
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