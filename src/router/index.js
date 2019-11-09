import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  }
]

const notNeedAuthPath = ['/login']

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (notNeedAuthPath.indexOf(to.path) < 0 && !sessionStorage.getItem('loginStatus')) {
    Message({ message: '请先登录', type: 'warning' })
    next('/login')
  } else {
    next()
  }
})

export default router
