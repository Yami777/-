import Vue from 'vue'
import Vuex from 'vuex'

// 引入：
import createPersistentStore from 'vuex-persistedstate'
Vue.use(Vuex)

//  1、下载：vuex-persistedstate --->持久化state
// yarn add vuex-persistedstate@3.2.1
// 2、引入：import createPersistentStore from 'vuex-persistedstate'
// 配置项：
// key：默认值：vuex
// storage：默认是本地
// reducer：函数，指定持久化哪些数据，return一个对象，对象就作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistentStore({
      key: 'HEIMA_TOUTIAO',
      // storage: window.sessionStorage,
      reducer({ tokenObj }) {
        return { tokenObj }
      }
    })
  ],
  state: {
    // tokenObj:
    //   JSON.parse(window.localStorage.getItem('HEIMATOUTIAO_TOKEN')) || {}
    tokenObj: {}
  },
  getters: {
    isLogin(state) {
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
      // window.localStorage.setItem(
      //   'HEIMATOUTIAO_TOKEN',
      //   JSON.stringify(state.tokenObj)
      // )
    }
  }
})
