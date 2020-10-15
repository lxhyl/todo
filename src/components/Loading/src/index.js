
import Vue from 'vue'
import loading from './Loading'





const loadingDom = Vue.extend(loading);


// 全局 loading 对象
let allLoading = {};

loadingDom.prototype.close = (id) => {
    let willCloseLoad = allLoading[id];
    if (willCloseLoad) {
        willCloseLoad.$el.parentNode.removeChild(willCloseLoad.$el)
        delete allLoading[id];
    }
}

const createLoading = loadConfig => {
    return new loadingDom({
        el: document.createElement('div'),
        data: () => {
            return loadConfig
        }
    })
}

const load = loadConfig => {
    // config不存在直接返回实例，不挂载
    if (!loadConfig) {
        return createLoading(loadConfig);
    }

    // 实例loading对象
    let loadingNode = createLoading(loadConfig);
    let body = document.body;
    body.appendChild(loadingNode.$el)
    const LOAD_Key = `${Date.parse(new Date())}-${allLoading.length}`
    loadingNode.LOAD_ID =  LOAD_Key;
    allLoading[LOAD_Key] = loadingNode;
    return loadingNode
}


export default load