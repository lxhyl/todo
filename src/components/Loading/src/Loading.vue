<template>
  <div>
    <div class="full loadbg"></div>
    <div class="full">
      <div class="center content">加载中</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
};
</script>
<style scoped>
.loadbg {
  background-color: var(--weui-BG-0);
  opacity: 0.5;
}
.content {
  width: 60%;
  height: 50px;
  text-align: center;
}
</style>