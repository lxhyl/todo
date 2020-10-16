
import Vue from 'vue'
import Message from "./Message"
import createID from "../../../utils/createID"


const DEFALUT_OPTION = {
    type: 'info',
    message: '这是一条信息',
    delay: 1500,
    showClose: false,
    bgColor:null,
}


let MessageNode = Vue.extend(Message);

// 所有message对象
let allMessages = Object.create({});
// 实例的个数
//  对象形式便于监听改动
let messagesNum = {}
Object.defineProperty(messagesNum, 'value', {
    get:function(){
        
        return Object.keys(allMessages).length
    },
    // 值改变时，按顺序设置message对象的style.top
    set: function (value) {
        let num = 0;
        for(let key in allMessages){
           if(num === 0){
               allMessages[key].$el.style.top = '10px'
           }else{
               allMessages[key].$el.style.top = `${num * 60 + 10}px`
           }
           num++;
        }
        return value
    }
})

/* 
*  关闭message
*  @param key message的id
*/
MessageNode.prototype.close = key => {
    if (key && key in allMessages) {
        allMessages[key].$el.parentNode.removeChild(allMessages[key].$el)
        /*
        *  必须先删除，再改变值，以解决 监听message数量时key比value多的bug
        */
        delete allMessages[key]
        messagesNum.value--
    }
}

// 关闭所有
MessageNode.prototype.closeAll = () => {
    for (let i in allMessages) {
        
        allMessages[i].$el.parentNode.removeChild(allMessages[i].$el)
        delete allMessages[i]
      
    }
}

/*

*/

/*
*  工厂函数 实例化组件
*  @param {Object} config  会注入到message的data中
*  @return message组件 
*/
const createMessage = config => {
    config = config ? config : {}
    return new MessageNode({
        el: document.createElement('div'),
        data: () => config
    })
}

/*
*  实例化组件，返回组件
*/
const message = option => {
    console.log('OPTION',option)
    // 定义KEY方便查找
    const _Key = createID(7);
    // 判断是否是为了关闭
    let _isClose = option ? false : true;
    option = Object.assign({}, DEFALUT_OPTION, option);
    let messageNode = createMessage(option);

    // 是关闭则直接返回实例 不挂载
    if (_isClose) { return messageNode };
    // 递增实例的对象
    // 如果是为了关闭而创建的实例，messagesNum是不应该增加的。所以放到return之后
    messagesNum.value ++;

    // 插入body
    let body = document.body;
    if (messagesNum.value === 0) {
        messageNode.$el.style.top = '10px'
    } else {
        messageNode.$el.style.top = `${(messagesNum.value) * 60 + 10}px`
    }
    body.appendChild(messageNode.$el)



    messageNode.MESSAGE_ID = _Key;
    allMessages[_Key] = messageNode;
    // 自动关闭
    if (!option.showClose) {
        let closeTimer = setTimeout(() => {
            messageNode.close(_Key);
            clearTimeout(closeTimer);
            closeTimer = null;
        }, option.delay);
    }
    return messageNode
}


export default message