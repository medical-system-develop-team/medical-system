import Vue from 'vue'
import VueRouter from 'vue-router'
//import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/stdhome',
    name: 'stdhome',
    component: () => import('../views/student/stdHome.vue')
  },
  {
    path: '/uploadVoucher',
    name: 'uploadVoucher',
    component: () => import('../views/student/uploadVoucher.vue')
  },
  
  {
    path: '/myRecords',
    name: 'myRecords',
    component: () => import('../views/student/myRecords.vue')
  },
  {
    path: '/myInfo',
    name: 'myInfo',
    component: () => import('../views/student/myInfo.vue')
  }
]

const notNeedAuthPath = ['/login']

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (notNeedAuthPath.indexOf(to.path) < 0 && !sessionStorage.getItem('loginStatus')) {
    //为方便前端代码合作，此处暂时可以未登录进入主页，与后台连接后再进行设置
    //Message({ message: '请先登录', type: 'warning' })
    //next('/login')
    next()
  } else {
    next()
  }
})

export default router
