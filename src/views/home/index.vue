<template>
  <div>
    <article class="weui-article">
      <h1>TODO</h1>
      <section>
        <h2>无账号？</h2>
        <section>
          <p>数据会全部存储在本地，但会失去推送提醒功能</p>
        </section>
        <h2>注册并绑定KEY</h2>
        <section>
          <h3>绑定server酱</h3>
          <p>
            去<a class="weui-link" href="http://sc.ftqq.com/3.version">
              server酱官网</a
            >获取SCKEY，在
            <a class="weui-link" @click="$router.push('/me')">我</a
            >中绑定key即可
          </p>
        </section>
      </section>
    </article>
    <div class="button-sp-area" style="text-align: center">
      <a class="weui-btn weui-btn_mini weui-btn_default"
        >不想注册</a
      >
      <a @click="$router.push('/login')" class="weui-btn weui-btn_mini weui-btn_primary"
        >去注册(登录)</a
      >
    </div>
  </div>
</template>
<script>
export default {
  beforeCreate(){
     if(localStorage.getItem('MAIL')){
       this.$router.push({
         path:'/task',
         params:{
           type:'todo'
         }
       })
     }
  },
  created(){
     
  },
  methods: {},
};
</script>
<style scoped>
a {
  margin: 10px;
}
</style>