import wepy from 'wepy'
// import config from './config'
const BASE_URL = 'https://qiming.jiaohuanziyuan.xin'
async function fetch (options = {}) {
  // if (!options.hideBarLoading) {
  //   wepy.showNavigationBarLoading()
  // }
  wepy.showLoading({
    title: '拼命加载中...'
  })
  let token = wepy.getStorageSync('token') || ''
  if (token) {
    options.data = options.data || {}
    options.data.thirdSessionKey = token
  }
  options.url = BASE_URL + options.url
  console.log(options)
  return wepy.request({
    ...options
  }).then((res) => {
    // wepy.hideNavigationBarLoading()
    wepy.hideLoading()
    console.log(res)
    const response = res.data

    if (response && response.code !== 0) {
      return Promise.reject(response)
    }
    return response
    // return res.data
  }).catch((e) => {
    wepy.hideLoading()
    console.log(JSON.stringify(e))
    // 微信的报错信息或自己服务器的报错信息
    let err = e.errMsg || e.msg
    // wepy.hideNavigationBarLoading()
    if (!options.noShowModal) {
      wepy.showModal({
        title: '',
        content: err,
        showCancel: false
      })
    }
    return Promise.reject(e)
  })
}


function get (url, data = {}, options = {}) {
  options.header = options.header || {}
  // options.header['token'] = wepy.getStorageSync('token') || ''

  return fetch({
    url,
    data,
    ...options,
    method: 'GET'
  })
}

function post (url, data = {}, options = {}) {
  options.header = options.header || {}
  options.header['Content-Type'] = 'application/x-www-form-urlencoded'
  // options.header['token'] = wepy.getStorageSync('token') || ''

  return fetch({
    url,
    data,
    ...options,
    method: 'POST'
  })
}

fetch.get = get
fetch.post = post

export default fetch
