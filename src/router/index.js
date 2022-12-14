import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 单页面：首屏加载速度很慢
// 路由懒加载：使用到了路由页面，再去请求该页面
const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:'base' */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:'base' */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName:'Search' */ '@/views/Search')
  },
  {
    path: '/user',
    component: () => import(/* webpackChunkName:'User' */ '@/views/User')
  },
  {
    path: '/detail',
    component: () => import(/* webpackChunkName:'Detail' */ '@/views/Detail')
  }
]

const router = new VueRouter({
  routes
})

export default router
