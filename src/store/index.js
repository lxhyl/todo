import Store from './src/index'
import Vue from 'vue'
Vue.use(Store);

const option = {
    state:{
        isLogin:localStorage.getItem('MAIL')
    },
    mutations:{
        changeState(state,key,newValue){
            state[key] = newValue;
        }
    }
}

export default new Store(option)




