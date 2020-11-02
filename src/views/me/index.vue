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
        <div class="weui-cell__bd" @click="routerToTasksType(40)">
          <span style="vertical-align: middle">紧急</span>
          <span
            v-if="tasksInfo.urgency"
            class="weui-badge"
            style="margin-left: 5px"
            >{{ tasksInfo.urgency }}</span
          >
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div
        class="weui-cell weui-cell_active weui-cell_access"
        @click="routerToTasksType(10)"
      >
        <div class="weui-cell__bd">
          <span style="vertical-align: middle">待办</span>
          <span
            v-if="tasksInfo.todo"
            class="weui-badge"
            style="margin-left: 5px"
            >{{ tasksInfo.todo }}</span
          >
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div
        class="weui-cell weui-cell_active weui-cell_access"
        @click="routerToTasksType(20)"
      >
        <div class="weui-cell__bd">
          <span style="vertical-align: middle">已办</span>
          <span
            v-if="tasksInfo.finished"
            class="weui-badge"
            style="margin-left: 5px"
            >{{ tasksInfo.finished }}</span
          >
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div
        class="weui-cell weui-cell_active weui-cell_access"
        @click="routerToTasksType(30)"
      >
        <div class="weui-cell__bd">
          <span style="vertical-align: middle">超时</span>
          <span
            v-if="tasksInfo.overdue"
            class="weui-badge"
            style="margin-left: 5px"
            >{{ tasksInfo.overdue }}</span
          >
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
  computed: {
    tasksInfo() {
      const tasks = this.$store.state.typeTask;
      return {
        todo: tasks.todo.length,
        finished: tasks.finished.length,
        overdue: tasks.overdue.length,
        urgency: tasks.urgency.length,
      };
    },
  },
  created() {},
  methods: {
    routerToTasksType(type) {
      this.$router.push({
        path: "/task",
        query: {
          sortType: type,
        },
      });
    },
  },
};
</script>
<style scoped>
</style>
