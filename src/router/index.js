import Vue from 'vue';
import Router from 'vue-router';

import {getLoaclStorage} from '../utils/localStorage'

import Home from '../views/home/index'
import Login from "../views/login/index"


Vue.use(Router)

const route = [
    {
        path: '/',
        meta:{
            requireAuth:true,
        },
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        meta:{
            requireAuth:false,
        },
        component: Login
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
router.beforeEach((to,from,next) => {
    if(to.meta.requireAuth){
        if(getLoaclStorage('USERID')){
            next()
        }else{
            next({
                path:'/login',
                query:{
                    redirect:to.fullPath
                }
            })
        }
    }else{
        next()
    }
})
export default router