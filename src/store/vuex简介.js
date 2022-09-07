import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 声明一个变量，放到Vuex里面
// vuex声明的变量放到state里面
// 取数据：$store.state.属性名
// vuex修改数据（自产自销）
// 规范：函数命名采用大驼峰
// - mutations：函数
// - mutations里的函数的参数：
// - state（第一个参数）
// - payload：载荷，触发mutation的参数
// 触发mutations里面的方法
// - this.$store.commit('mutations方法名字')
// - getters --> 想当与computed计算属性
// mapState --> 将vuex里面的state映射到computed
// 使用：引入mapState:函数，返回值是一个对象
// 参数：['映射的属性']
// mapGetters --> 将vuex里面的getters映射到computed
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    bigNum(state) {
      return state.count * 10
    }
  },
  mutations: {
    SET_COUNT(state, payload) {
      state.count += payload
    }
  }
})
