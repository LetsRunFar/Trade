// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'

import 'font-awesome/css/font-awesome.css'

import  { ToastPlugin, LoadingPlugin, ConfirmPlugin, DatetimePlugin } from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)

Vue.config.productionTip = false

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh-CN',
  messages: {
    'zh-CN': require('./assets/js/lang/zh'),
    'zh-CN2': require('./assets/js/lang/zh2'),
    'en-US': require('./assets/js/lang/en')
  }
})

// 手动封装
let getObjectProp = (obj, key) => {
  if(!key){
    return obj
  }
  let keyPath = key.split('.')
  let currentVal = obj[keyPath[0]]
  keyPath.splice(0,1)
  if(currentVal && currentVal instanceof Object && keyPath.length > 0){
    return getObjectProp(currentVal, keyPath.join('.'))
  }
  return currentVal
}

Vue.prototype.$st = (key) => {
  return getObjectProp(i18n.messages[i18n.locale], key)
}




/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
