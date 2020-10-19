import axios from 'axios';
import Vue from 'vue'
import router from "../../router/index.js"
import Message from '../../components/Message/src/index'

const service = axios.create({
    timeout: 10000,
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true,
})

Vue.prototype.$axios = axios;

console.log('USERID',localStorage.getItem('USERID'))
// 请求拦截
service.interceptors.request.use(
    config => {
        config.params = {
            _t: Date.parse(new Date()),
            _COOKIE:localStorage.getItem('USERID'),
            ...config.params
        }
        return config
    },
    error => {
        Message({
            type: "error",
            message: "请求出错,请检查请求参数",
            delay: 1500,
            showClose: false,
        });
        Promise.reject(error);
    }
)


// 响应拦截
service.interceptors.response.use(
    response => {
        const code = response.status;
        if (code === 200) {
            return Promise.resolve(response.data)
        } else {
            Message({
                type: "error",
                message: "服务器出错",
                delay: 1500,
                showClose: false,
            });
            return Promise.reject(response)
        }
    },
    error => {

        Message({
            type: "error",
            message: "服务器出错",
            delay: 1500,
            showClose: false,
        });
        return Promise.reject(error)
    }
)

export default service