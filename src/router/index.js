import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index'

import { DB_isOpen } from "../indexedDB/index";


import Home from '../views/home/index'
import Login from "../views/login/index"


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const route = [
    {
        path: '/',
        meta: {
            requireAuth: false,
        },
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            requireAuth: false,
        },
        component: Login
    },
    {
        path: '/addTask',
        name:'addTask',
        meta: {
            requireAuth: false,
        },
        props:true,
        component: () => import('../views/addTask/index')
    },
    {
        path: '/me',
        meta: {
            requireAuth: false,
        },
        component: () => import('../views/me/index')
    }, {
        path: '/task',
        props: true,
        meta: {
            requireAuth: false
        },
        component: () => import('../views/task/index')
    }
]

const creatRouter = () => {
    return new Router({
        routes: route,
        scrollBehavior() {
            return {
                x: 0,
                y: 0
            };
        }
    });
};


const router = creatRouter();
//indexDB是异步的，打开后才能执行操作
let getAllData = () => {
    return new Promise((resolve, reject) => {
        let timer = setInterval(() => {
            clearInterval(timer);
            timer = null;
            if (DB_isOpen) {
                store.dispatch("queryAllTask").then((res) => {
                    resolve(res);
                })
                    .catch(err => {
                        reject(err);
                    })

            }
        }, 100);
    })

}

router.beforeEach((to, from, next) => {
    getAllData()
    // 如果需要登录
    if (to.meta.requireAuth) {
        if (localStorage.getItem('MAIL')) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})
export default router