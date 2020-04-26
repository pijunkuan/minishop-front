import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './utils/theme.js'

import index from '@/components/index'
Vue.use(index)

require('@/utils/mock')

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
