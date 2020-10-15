import axios from 'axios';
import router from "../../router/index.js"

const request = axios.create({
    timeout:10000,
    baseURL:process.env.VUE_APP_BASE_API,
    withCredentials:true,
})

Vue.prototype.$axios = axios;
request.interceptors.request.use(
    config => {
        config.params = {
            _t:Date.parse(new Date()),
            ...config.params
        }
    }
)