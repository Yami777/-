import axios from 'axios'
import store from '@/store'
// axios.defaults.baseURL = 'http://toutiao.itheima.net'
// axios.defaults.timeout = 3000

// axios.create():克隆axios
const request = axios.create({
  timeout: 5000,
  baseURL: 'http://toutiao.itheima.net'
})

// 封装请求拦截器：在请求的时候做
// config:每一次请求的配置对象
request.interceptors.request.use(
  function (config) {
    // 每一次发请求都会执行，发送之前做些什么，登录了所有的请求都加上请求头Authorization
    const {
      getters: { isLogin },
      state: { tokenObj }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObj.token}`
    }
    return config // 必须返回config
  },
  function (error) {
    console.log(error)
  }
)
export default request
