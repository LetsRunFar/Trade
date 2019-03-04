import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Order from '@/pages/order'
import Setting from '@/pages/setting'
import BindEmail from '@/pages/bindEmail'
import BindAccount from '@/pages/bindAccount'
import Mine from '@/pages/mine'
import Index from '@/pages/index'
import Purchase from '@/pages/purchase'
import SetLang from '@/pages/setLanguage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
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
    },
    {
      path: '/bindAccount',
      name: 'bindAccount',
      component: BindAccount
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: Purchase
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/lang',
      name: 'setLang',
      component: SetLang
    }
  ]
})
