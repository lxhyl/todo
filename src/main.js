import Vue from 'vue'
import App from './App.vue'
// store
import store from "./store/index"

import './style/index.css'
import "weui";



import router from './router/index'
// Message组件
import Message from './components/Message/index'
Vue.use(Message)
Vue.use(store)

Vue.config.productionTip = false





new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
