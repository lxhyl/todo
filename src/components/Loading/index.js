import Vue from 'vue'

import load from './src/index'

export default {
    install(Vue) {
        Vue.prototype.$loading = load
    },
}