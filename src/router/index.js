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
  // 学生报销类型----------------------------------------
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
    path: '/uploadVoucher/:recordID',
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
  // 在职职工报销类型----------------------------------------
  {
    path: '/staffhome',
    name: 'staffhome',
    component: () => import('../views/staff/staffHome.vue')
  },
  {
    path: '/staffuploadVoucher',
    name: 'staffuploadVoucher',
    component: () => import('../views/staff/uploadVoucher.vue')
  },
  {
    path: '/staffuploadVoucher/:recordID',
    name: 'staffuploadVoucher',
    component: () => import('../views/staff/uploadVoucher.vue')
  },
  {
    path: '/staffmyRecords',
    name: 'staffmyRecords',
    component: () => import('../views/staff/myRecords.vue')
  },
  {
    path: '/staffmyInfo',
    name: 'staffmyInfo',
    component: () => import('../views/staff/myInfo.vue')
  },
  // 后台
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
        path: '/Admin/recordmanage/recdetail',
        name: 'recdetail',
        component: () => import('../components/Admin/recordmanage/recdetail.vue')
      },
      {
        path: '/Admin/departmanage/recordfiled',
        name: 'recordfiled',
        component: () => import('../components/Admin/recordmanage/recordfiled.vue')
      }
    ]
  },
  {
    path: '/checker',
    name: 'checker',
    component: () => import('../components/checker.vue'),
    children:[
      {
        path: '/checker/recording',
        name: 'recording',
        component: () => import('../components/checker/recording.vue')
      },
      {
        path: '/checker/recdetail',
        name: 'recdetail',
        component: () => import('../components/checker/recdetail.vue')
      },
      {
        path: '/checker/checkerpassword',
        name: 'checkerpassword',
        component: () => import('../components/checker/checkerpassword.vue')
      },
      {
        path: '/checker/completecheck',
        name: 'completecheck',
        component: () => import('../components/checker/completecheck.vue')
      },
      {
        path: '/checker/myInfo',
        name: 'recdetail',
        component: () => import('../components/checker/myInfo.vue')
      }
    ]
  },
  {
    path: '/checkerAdmin',
    name: 'checkerAdmin',
    component: () => import('../components/checkerAdmin.vue'),
    children:[
      {
        path: '/checkerAdmin/recording',
        name: 'recording',
        component: () => import('../components/checkerAdmin/recording.vue')
      },
      {
        path: '/checkerAdmin/recdetail',
        name: 'recdetail',
        component: () => import('../components/checkerAdmin/recdetail.vue')
      },
      {
        path: '/checkerAdmin/checkerAdminpassword',
        name: 'checkerAdminpassword',
        component: () => import('../components/checkerAdmin/checkerAdminpassword.vue')
      },
      {
        path: '/checkerAdmin/completecheck',
        name: 'completecheck',
        component: () => import('../components/checkerAdmin/completecheck.vue')
      },
      {
        path: '/checkerAdmin/myInfo',
        name: 'recdetail',
        component: () => import('../components/checkerAdmin/myInfo.vue')
      }
    ]
  },
  {
    path: '/shoudanyuan',
    name: 'shoudanyuan',
    component: () => import('../components/shoudanyuan.vue'),
    children:[
      {
        path: '/shoudanyuan/recording',
        name: 'recording',
        component: () => import('../components/shoudanyuan/recording.vue')
      },
      {
        path: '/shoudanyuan/recdetail',
        name: 'recdetail',
        component: () => import('../components/shoudanyuan/recdetail.vue')
      },
      {
        path: '/shoudanyuan/shoudanyuanpassword',
        name: 'shoudanyuanpassword',
        component: () => import('../components/shoudanyuan/shoudanyuanpassword.vue')
      },
      {
        path: '/shoudanyuan/myInfo',
        name: 'recdetail',
        component: () => import('../components/shoudanyuan/myInfo.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
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
