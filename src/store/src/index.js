import Vue from 'vue'

class Store {
    constructor(option){
       this.state = new Vue({
           data:option.state
       }).$data
       this.mutations = option.mutations
       this.actions = option.actions       
    }
    commit(funName,...args){
        this.mutations[funName](this.state,...args)
    }
}

Store.install  = _Vue => {
    _Vue.mixin({
        beforeCreate(){
            if (this.$options.store) {
                Vue.prototype.$store=this.$options.store;
            }
        }
    })
}

export default Store
