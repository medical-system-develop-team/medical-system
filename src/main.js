import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.withCredentials = true
import {setCookie,getCookie,delCookie} from '@/assets/cookie.js'
import Router from 'vue-router'
import htmlToPdf from '@/components/utils/htmlToPdf.js'
import fileUtil from '@/components/utils/fileUtil.js'

Vue.config.productionTip = false
Vue.prototype.$cookieStore={setCookie,getCookie,delCookie}

Vue.use(htmlToPdf)
Vue.use(fileUtil)
Vue.use(ElementUI)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')