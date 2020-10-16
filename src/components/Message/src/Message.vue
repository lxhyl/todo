<template>
  <div class="fixed-top">
    <div v-if="type === 'info'" class="info message">
      <div class="weui-flex">
        <div>
          <div class="placeholder"><i class="weui-icon-info"></i></div>
        </div>
        <div class="weui-flex__item">
          <div class="placeholder">{{ message }}</div>
        </div>
        <div v-if="showClose">
          <div class="placeholder" @click="closeMessage">
            <svg
              t="1602729860862"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1151"
              width="30"
              height="30"
            >
              <path
                d="M512 451.669333L421.504 361.130667A42.666667 42.666667 0 0 0 361.130667 421.546667L451.669333 512l-90.538666 90.496a42.666667 42.666667 0 0 0 60.373333 60.373333L512 572.330667l90.496 90.538666a42.666667 42.666667 0 0 0 60.373333-60.373333L572.330667 512l90.538666-90.496a42.666667 42.666667 0 1 0-60.373333-60.373333L512 451.669333z m-271.530667 331.861334A384 384 0 1 1 783.530667 240.469333 384 384 0 0 1 240.469333 783.530667z"
                p-id="1152"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div v-if="type === 'error'" class="error">
      <div>
        <p class="icon-box__desc message">
          <i class="weui-icon-info"></i>{{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods:{
      closeMessage(){
          this.$message().close(this.MESSAGE_ID)
      }
  }
};
</script>

<style scoped>
.message {
  line-height: 50px;
  border-radius: 5px;
  text-align: center;
}

.info {
  background: #b2ebf2;
}
.icon{
    position: relative;
    top:10px;
}
</style>