import Store from './src/index'
import Vue from 'vue'

import { DB_getAll } from "../indexedDB/index"
import {formatTask} from "../utils/formatTask"
Vue.use(Store);


const option = {
    state: {
        isLogin: localStorage.getItem('MAIL'),
        allTask: null,
        typeTask:{},//分类好的任务
    },
    mutations: {
        changeState(state, key, newValue) {
            state[key] = newValue;
        },
        setAllTask(state, payload) {
            state.allTask = payload
        },
        setTypeTask(state,payload){
            state.typeTask = payload
        }
    },
    actions: {
        queryAllTask({commit}) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await DB_getAll();
                    commit('setAllTask', res);
                    commit('setTypeTask',formatTask(res));
                    resolve(res);
                }
                catch{
                    reject('读取数据出错')
                }
            })
        }
    }
}

export default new Store(option)





