import Vue from 'vue'
import VueRouter from 'vue-router'
//import { Message } from 'element-ui'

Vue.use(VueRouter)

const routes = [
  {
    //path: '/login',
    path: '/',
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
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('../components/Admin.vue')
  },
  {
    path: '/Admin/usermanage',
    name: 'usermanage',
    component: () => import('../components/Admin/usermanage.vue'),
    children:[
      {
        path: '/Admin/usermanage/usercheck',
        name: 'usercheck',
        component: () => import('../components/Admin/usermanage/usercheck.vue')
      },
      {
        path: '/Admin/usermanage/useradd',
        name: 'useradd',
        component: () => import('../components/Admin/usermanage/useradd.vue')
      },
      /* {
        path: '/Admin/usermanage/useredit',
        name: 'useredit',
        component: () => import('../components/Admin/usermanage/useredit.vue')
      }, */
      /* {
        path: '/Admin/usermanage/userdelet',
        name: 'useredit',
        component: () => import('../components/Admin/usermanage/userdelet.vue')
      }, */
      {
        path: '/Admin/usermanage/userpassword',
        name: 'userpassword',
        component: () => import('../components/Admin/usermanage/userpassword.vue')
      }
    ]
  },
  {
    path: '/Admin/departmanage',
    name: 'departmanage',
    component: () => import('../components/Admin/departmanage.vue'),
    children:[
      {
        path: '/Admin/departmanage/departcheck',
        name: 'departcheck',
        component: () => import('../components/Admin/departmanage/departcheck.vue')
      },
      {
        path: '/Admin/departmanage/departadd',
        name: 'departadd',
        component: () => import('../components/Admin/departmanage/departadd.vue')
      }
    ]
  },
  {
    path: '/Admin/recordmanage',
    name: 'recordmanage',
    component: () => import('../components/Admin/recordmanage.vue'),
    children:[
      {
        path: '/Admin/recordmanage/recordcheck',
        name: 'recordcheck',
        component: () => import('../components/Admin/recordmanage/recordcheck.vue')
      },
      {
        path: '/Admin/departmanage/recordfiled',
        name: 'recordfiled',
        component: () => import('../components/Admin/recordmanage/recordfiled.vue')
      }
    ]
  }
]

//const notNeedAuthPath = ['/login']
const notNeedAuthPath = ['/']

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
