import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 单页面：首屏加载速度很慢
// 路由懒加载：使用到了路由页面，再去请求该页面
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
