/*
* author Lxhyl
* desp 弹框组件
* startTime 2020-10-14/14:00
*/

//////////////////////////////////////////////////////////////////////////
/* 调用
*  this.$message(option)
*
*  option:{
*   type:'info','error', 消息类型  默认为info
*   message:String   显示的消息
*   showClose:Blooean 是否显示关闭按钮
*   delay:Number    毫秒 自动关闭的延时 
*  }
*
*  example:
*  this.$message({type:'error',message:'调用弹框',delay:2000})  
*/

/////////////////////////////////////////////////////////////////////////
/* 单独关闭
*  this.$message().close(messageID)
*  MESSAGE_ID 调用时会返回
*  
*  example:
*  const id = this.$message({message:'获取id'}).MESSAGE_ID
*  this.$message().close(id);
*/

/////////////////////////////////////////////////////////////////////////
/* 关闭全部
*  this.$message().closeAll()
*/



import message from './src/index'

export default {
    install(Vue) {
        Vue.prototype.$message = message
    },
}