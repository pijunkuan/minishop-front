import Vue from 'vue'
import App from './App.vue'

import routes from './routes'
import store from './store'

require('@/utils/mock')

new Vue({
  routes,
  store,
  render: h => h(App),
}).$mount('#app')
