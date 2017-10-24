import Vue from 'vue'
import axios from 'axios'

/**
 * 请求配置
 * @see https://github.com/mzabriskie/axios
 */
const service = axios.create({
  timeout: 12000000,                  // 请求超时时间
  withCredentials: true          // 跨域
})
// loading 组
let ARR_LOADING = []
let IS_LOADING = false
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.user.token) {
  //   // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = store.user.token
  // }
  if (config.isLoading) {
    ARR_LOADING.push(config.url)
    if (!IS_LOADING) {
      IS_LOADING = true
      Vue.prototype.$loading()
      // Vue.prototype.$loading()
      // Vue.$indicator.open()
    }
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    let {data: {code, message, data}, config} = response
    if (config.isLoading) {
      let index = ARR_LOADING.indexOf(config.url)
      ARR_LOADING.splice(index, 1)
      if (ARR_LOADING.length === 0) {
        Vue.prototype.$loading().close()
        IS_LOADING = false
      }
    }
    // 如果不是code 返回值
    if (Vue.bqUtils.isUndefined(code)) {
      return response.data
    }
    if (code !== 200) {
      // 是否自动提示消息
      if (config.isAutoMsg) {
        Vue.prototype.$notify.error(message)
      }
      if (code === 401) {
        window.location.href = '/login'
      }
      return Promise.reject({code, message}) // eslint-disable-line
    } else {
      return data
    }
  },
  error => {
    console.log('error,' + error)
    Vue.prototype.$loading().close()
    Vue.prototype.$notify.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)

export default service
