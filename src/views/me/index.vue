<template>
  <div class="page">
    <div class="weui-cells" style="margin: 0">
      <div class="weui-cell weui-cell_active" v-if="$store.state.isLogin">
        <div class="weui-cell__bd">
          <p>名称</p>
          <p style="font-size: 13px; color: #888">编辑信息</p>
        </div>
      </div>
      <div
        class="weui-cell weui-cell_active"
        v-else
        style="background-color: var(--weui-BG-0)"
      >
        <div class="weui-cell__bd">
          <a
            @click="$router.push('/login')"
            class="weui-btn_cell weui-btn_cell-primary"
            >去登陆</a
          >
        </div>
      </div>
      <div class="weui-cells__title">LIST</div>
      <div class="weui-cell weui-cell_active weui-cell_access">
        <div class="weui-cell__bd">
          <span style="vertical-align: middle">待办</span>
          <span class="weui-badge" style="margin-left: 5px">8</span>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_active weui-cell_access">
        <div class="weui-cell__bd">
          <span style="vertical-align: middle">已办</span>
          <span class="weui-badge" style="margin-left: 5px">8</span>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell weui-cell_active weui-cell_access">
        <div class="weui-cell__bd">
          <span style="vertical-align: middle">超时</span>
          <span class="weui-badge" style="margin-left: 5px">New</span>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
    </div>
  </div>
</template>
<script>
import createID from "../../utils/createID";
export default {
  data() {
    return {};
  },
  computed: {},
  created() {
  },
  methods: {},
};
</script>
<style scoped>
</style>
