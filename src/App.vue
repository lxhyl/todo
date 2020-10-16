<template>
  <div id="app">
    <button @click="show" class="weui-btn weui-btn_primary">test</button>
    <button @click="close" class="weui-btn weui-btn_warn">关闭</button>
     <button @click="closeAll" class="weui-btn weui-btn_warn">关闭所有</button>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
   
  },
  data(){
    return {
      messageId:null,
    }
  },
  created(){
  },
  methods:{
    show(){
       let isShow = [true,false]
       this.messageId = this.$message(
         { 
           message:`信息-${Math.random()}`,
           showClose:isShow[parseInt(Math.random()*2-0.1)]
         }
       ).MESSAGE_ID
    },
    close(){
      this.$message().close(this.messageId);
    },
    closeAll(){
       this.$message().closeAll();
    }
  }
}
</script>

<style>

</style>
