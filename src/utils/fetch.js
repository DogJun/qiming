import wepy from 'wepy'
// import config from './config'
const BASE_URL = 'https://qiming.jiaohuanziyuan.xin'
async function fetch (options = {}) {
  if (!options.hideBarLoading) {
    wepy.showNavigationBarLoading()
  }
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
    wepy.hideNavigationBarLoading()
    console.log(res)
    const response = res.data

    if (response && response.success === false) {
      return Promise.reject(response)
    }
    return response
    // return res.data
  }).catch((e) => {
    console.log(JSON.stringify(e.message))
    wepy.hideNavigationBarLoading()

    if (!options.noShowModal) {
      wepy.showModal({
        title: '',
        content: e.message,
        showCancel: false
      }).then(res => {
        // 非法请求，重新获取token
        if (e.errorCode === 10010) {
          refreshToken()
        }
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
