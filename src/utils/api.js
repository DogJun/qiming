import fetch from './fetch'
// 登录
export const wxLogin = (data = {}, options = {}) => fetch.post('/wechat/user/login', data, options)
