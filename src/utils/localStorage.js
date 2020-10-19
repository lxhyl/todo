

const setLoaclStorage = (key, value) => {
    if (key) {
        let _value = localStorage.getItem(key)
        if (!_value) {
           localStorage.setItem(key, JSON.stringify(value));
           return true
        }
    } else {
        return new Error('请设置key')
    }
}
const removeLoaclStorage = key => {
    if (key) {
        localStorage.removeItem(key)
        return true
    } else {
        return new Error('请设置key')
    }
}

const getLoaclStorage = key => {
    if (key) {
        return JSON.parse(localStorage.getItem(key))
    } else {
        return new Error('请设置key')
    }
}

const clearLocalStorage = () => {
    localStorage.clear();
    return true
}

export {
    setLoaclStorage,
    removeLoaclStorage,
    getLoaclStorage,
    clearLocalStorage
}