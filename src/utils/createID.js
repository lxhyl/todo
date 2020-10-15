const DEFAULT_STRING = '1234567890abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const randomStr = (str, l) => {
    let len = str.length;
    l = l > len ? len : l;
    let result = '';
    for (let i = 0; i < l; i++) {
        result = `${result}${str[Math.floor(Math.random() * len)]}`
    }
    return result;
}

const createID = l => {
    return `${Date.now()}-${randomStr(DEFAULT_STRING,l)}`
}


export default createID