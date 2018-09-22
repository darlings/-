App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // doubanBase: "https://api.douban.com",
    // inTheaters正在上映: "/v2/movie/in_theaters",
    // comingSoon即将上映: "/v2/movie/coming_soon",
    // top250: "/v2/movie/top250",
    // weekly口碑榜: "/v2/movie/weekly",
    // usBox北美票房榜: "/v2/movie/us_box",
    // newMovies新片榜: "/v2/movie/new_movies",
    // subject: "/v2/movie/subject/",
    // celebrity: "/v2/movie/celebrity/",
    // search: "/v2/movie/search?q="
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
