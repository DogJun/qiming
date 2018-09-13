import fetch from './fetch'
// 登录
export const wxLogin = (data = {}, options = {}) => fetch.post('/wechat/user/login', data, options)
// 起名
export const getName = (data = {}, options = {}) => fetch.post('/api/qiming/queryName', data, options)
// 名字详情
export const getDetailName = (data = {}, options = {}) => fetch.post('/api/qiming/getDetailName', data, options)
