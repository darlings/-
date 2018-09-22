// pages/search/search.js
import util from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    showDelete: false,
    result: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /** 搜索影视 */
  bindSearchInput: function (event) {
    var value = event.detail.value;
    var readyData = { showDelete: false };
    if (value.length > 0) {
      readyData = { showDelete: true };
      this.handleSearchData(value);
    }
    this.setData(readyData);
  },
  /**清空输入框 */
  bindSearchDelete: function (event) {
    var readyData = { searchValue: "", showDelete: false, result: {} };
    this.setData(readyData);
  },
  /**点击取消 */
  bindSearchCancel: function (event) {
    wx.navigateBack();
  },
  /** 提交搜索请求 */
  handleSearchData: function (value) {
    wx.request({
      url: util.doUrl('/v2/movie/search'),
      header: { "content-type": "json" },
      data: {
        q: value,
        start: 0,
        count: 10
      },
      success: (res) => {
        // success
        var data = res.data;
        this.processSearchData(data);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  /**组装搜索数据 */
  processSearchData: function (data) {
    var movies = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var directors = "";
      var separate = " / ";
      for (let i in subject.directors) {
        directors += subject.directors[i].name + separate;
      }
      directors = directors.substring(0, directors.length - separate.length);
      var summary = subject.rating.average + "分" + separate + subject.year + separate + directors;
      var temp = {
        id: subject.id,
        casts: subject.casts,
        collect_count: subject.collect_count,
        directors: subject.directors,
        title: subject.title,
        images: subject.images,
        rating: subject.rating,
        year: subject.year,
        summary: summary
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData["result"] = {
      subjects: movies
    }

    this.setData(readyData);
  },
  /** 点击进入搜索条目 */
  handletap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
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