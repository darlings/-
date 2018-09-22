const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// https://api.douban.com  https://www.newfq.com/doubanapi https://douban.uieee.com http://t.yushu.im
let doUrl = 'https://douban.uieee.com'
function serverUrlFactory (url) {
  return doUrl + url
}
module.exports = {
  formatTime: formatTime,
  doUrl: serverUrlFactory
}
