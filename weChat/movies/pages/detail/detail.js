// pages/detail/detail.js
import util from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    showAllDesc: false,
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getMovieInfo()
  },
  // 获取影片详情信息
  getMovieInfo: function () {
    const { id } = this.data
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    wx.request({
      url: util.doUrl(`/v2/movie/subject/${id}`),
      method: 'GET',
      header: { "content-type": "json" },
      success: (res) => {
        let data = res.data;
        let readyData = {};
        let directorsAndCasts = [];
        for (let i in data.directors) {
          directorsAndCasts.push(data.directors[i]);
        }
        for (let j in data.casts) {
          directorsAndCasts.push(data.casts[j]);
        }
        let genres = "";
        let separate = " / ";
        for (let k in data.genres) {
          genres += data.genres[k] + separate;
        }
        genres = genres.substring(0, genres.length - separate.length);
        let countries = "国家：";
        for (let g in data.countries) {
          countries += data.countries[g] + separate;
        }
        countries = countries.substring(0, countries.length - separate.length);
        readyData["movie"] = {
          id: data.id,
          title: data.title,
          images: data.images,
          directorsAndCasts: directorsAndCasts,
          collectCount: data.collect_count,
          commentsCount: data.comments_count,
          wishCount: data.wish_count,
          reviewsCount: data.reviews_count,
          countries: countries,
          doCount: data.do_count,
          genres: genres,
          originalTitle: "原名：" + data.original_title,
          rating: data.rating,
          subtype: data.subtype,
          summary: data.summary,
          shareUrl: data.share_url,
          year: data.year,
          casts: data.casts
        };
        this.setData(readyData)
        // 添加缓存历史
        this.setHistory(data)
      },
      fail: (res) => {
        console.log(res)
      },
      complete: function () {
        wx.hideToast()
      }
    })
  },
  /** 设置观看历史缓存  */
  setHistory: function (obj) {
    let arr = wx.getStorageSync('history') || []
    let newArr = []
    if (arr.length > 0) {
      for (let i in arr) {
        if (arr[i].id !== obj.id) {
          newArr.push(arr[i])
        }
      }
    }
    newArr.push(obj)
    wx.setStorageSync('history', newArr.reverse())
  },
  /** 展开简介   */
  handleExtensiontap: function (event) {
    this.setData({
      showAllDesc: true
    });
  },
  /** 用户点击想看 */
  handleWishtap: function (event) {
    wx.showModal({
      title: '提示',
      content: '买票，一起去看吧',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      },
      showCancel: false
    });
  },
  /** 用户点击看过 */
  handleDotap: function (event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../rating/rating?id=' + id
    });
  },
  /** 查看影人信息 */
  handleCelebrity: function (event) {
    let id = event.currentTarget.dataset.id;
    let avatar = event.currentTarget.dataset.avatar;
    let name = event.currentTarget.dataset.name;
    wx.redirectTo({
      url: `../celebrity/celebrity?id=${id}&avatar=${avatar}&name=${name}`
    });
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