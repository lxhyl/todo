import Vue from 'vue'
import App from './App.vue'


import './style/index.css'
import "weui";

import router from './router/index'

import Message from './components/Message/index'
Vue.use(Message)

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
