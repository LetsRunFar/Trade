import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Order from '@/pages/order'

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
    }
  ]
})
