import fetch from './fetch'
// 登录
export const wxLogin = (data = {}, options = {}) => fetch.post('/wechat/user/login', data, options)
// 起名
export const getName = (data = {}, options = {}) => fetch.post('/api/qiming/queryName', data, options)
// 名字详情
export const getDetailName = (data = {}, options = {}) => fetch.post('/api/qiming/getDetailName', data, options)
// 轮播图
export const getAd = (data = {}, options = {}) => fetch.post('/api/qiming/getAd', data, options)
// 常见问题
export const getQa = (data = {}, options = {}) => fetch.post('/api/qiming/getHelp', data, options)
// 反馈意见
export const getFeedBack = (data = {}, options = {}) => fetch.post('/api/qiming/saveQuestion', data, options)
// 获取起名记录
export const getRecord = (data = {}, options = {}) => fetch.post('/api/qiming/getQimingRecord', data, options)
