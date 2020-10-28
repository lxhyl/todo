import Vue from 'vue'

class Store {
    constructor(option) {
        this.state = new Vue({
            data: option.state
        }).$data
        this.mutations = option.mutations
        this.actions = option.actions

        // 将this一直绑定到此对象上，避免调用时this指向错误
        const store = this;
        const { commit, dispatch } = this;
        this.commit = function (funName, ...args) {
            return commit.call(store, funName, ...args);
        }
        this.dispatch = function (funName, ...args) {
            return dispatch.call(store, funName, ...args)
        }
    }
    commit(funName, ...args) {
        return this.mutations[funName](this.state, ...args)
    }
    dispatch(funName, ...args) {
        return this.actions[funName](this, ...args)
    }
}

Store.install = _Vue => {
    _Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

export default Store
