import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Order from '@/pages/order'
import Setting from '@/pages/setting'
import BindEmail from '@/pages/bindEmail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/bindEmail',
      name: 'bindEmail',
      component: BindEmail
    }
  ]
})
