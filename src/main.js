import Vue from 'vue'
import App from './App.vue'


import './style/index.css'
import "weui";

import Loading from './components/Loading/index' 
import Message from './components/Message/index'
Vue.use(Loading)
Vue.use(Message)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
