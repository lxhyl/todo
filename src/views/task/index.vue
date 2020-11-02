<template>
  <div>
    <div
      class="weui-flex"
      style="text-align: center; margin-top: 20px; margin-bottom: 20px"
    >
      <div class="weui-flex__item"><div class="placeholder"></div></div>
      <div class="weui-flex__item">
        <div class="placeholder">{{ sortTypeName }}</div>
      </div>
      <div class="weui-flex__item">
        <a
          @click="selectPikerVisible = true"
          class="weui-btn weui-btn_mini weui-btn_default"
          >Select</a
        >
      </div>
    </div>
    <div style="margin-bottom: 80px" v-if="allTypeTask && allTypeTask.length > 0">
      <div
        v-for="(item, index) in allTypeTask"
        :key="item.id"
        class="weui-form-preview card"
      >
        <div class="weui-form-preview__hd">
          <div class="weui-form-preview__item">
            <label
              :style="{ color: getTypeColor(item.type) }"
              class="weui-form-preview__label"
              >{{ item.type | formatType }}</label
            >
            <em
              class="weui-form-preview__value"
              style="color: rgba(0, 0, 0, 0.5)"
              >{{ index + 1 }}</em
            >
          </div>
        </div>
        <div class="weui-form-preview__bd">
          <div class="weui-form-preview__item">
            <label class="weui-form-preview__label">标题</label>
            <span class="weui-form-preview__value">{{ item.title }}</span>
          </div>
          <div v-if="item.type !== 20" class="weui-form-preview__item">
            <label class="weui-form-preview__label">计划时间</label>
            <span class="weui-form-preview__value"
              >{{ item.date | formatDate }}
            </span>
          </div>
          <div v-if="item.type === 20" class="weui-form-preview__item">
            <label class="weui-form-preview__label">完成时间</label>
            <span class="weui-form-preview__value"
              >{{ item.finishedDate | formatFullDate }}
            </span>
          </div>
          <div class="weui-form-preview__item">
            <span class="weui-form-preview__value">
              <label class="weui-form-preview__label">描述</label
              >{{ item.des }}</span
            >
          </div>
        </div>
        <div class="weui-form-preview__ft">
          <div class="item-icon">
            <Edit @click.native="editTask(item)" :width="20" :height="20" />
          </div>
          <div class="item-icon icon-mid">
            <Delete
              @click.native="deleteTask(item.id)"
              :width="20"
              :height="20"
            />
          </div>
          <div v-if="item.type != 20" class="item-icon icon-right">
            <Finished
              @click.native="finishTask(item)"
              :width="20"
              :height="20"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 200px; text-align: center">
      <p>暂无任务</p>
    </div>
    <Picker
      v-if="selectPikerVisible"
      :visible.sync="selectPikerVisible"
      :list="sortType"
      @change="(e) => (nowChooseSortTypeValue = e)"
    />
  </div>
</template>
<script>
import Picker from "../../components/Picker/index";
import Delete from "../../components/Icons/Delete";
import Finished from "../../components/Icons/Finished";
import Edit from "../../components/Icons/Edit";
import { getDateBase, formatNearDate, getFullDate } from "../../utils/date";
import { DB_delete, DB_change } from "../../indexedDB/index";
const TASK_TYPE_MAP = {
  10: "待办😀",
  20: "已完成😊",
  30: "已过期😔",
  40: "紧急!😵",
};
const TASK_TITLE_COLOR = {
  10: "#06ae56",
  20: "#10aeff",
  30: "#fa5151",
  40: "#fa9d3b",
};
export default {
  components: {
    Picker,
    Delete,
    Finished,
    Edit,
  },
  computed: {
    allTypeTask() {
      let value = this.nowChooseSortTypeValue;
      let result = [];
      switch (true) {
        case value === 100:
          result = this.$store.state.typeTask.allTask;
          break;
        case value === 10:
          result = this.$store.state.typeTask.todo;
          break;
        case value === 20:
          result = this.$store.state.typeTask.finished;
          break;
        case value === 30:
          result = this.$store.state.typeTask.overdue;
          break;
        case value === 40:
          result = this.$store.state.typeTask.urgency;
          break;
        case value === 110:
          result = this.$store.state.typeTask.sortByDate;
      }
      return result;
    },
    sortTypeName() {
      return this.sortType.find(
        (item) => item.value === this.nowChooseSortTypeValue
      ).label;
    },
  },
  watch: {},
  data() {
    return {
      sortType: [
        { label: "待办😀", value: 10 },
        { label: "已完成😊", value: 20 },
        { label: "已过期😔", value: 30 },
        { label: "紧急!😵", value: 40 },
        { label: "建立顺序", value: 100 },
        { label: "时间顺序", value: 110 },
      ],
      nowChooseSortTypeValue: 110,
      selectPikerVisible: false,
    };
  },
  created() {
    if (this.$route.query && this.$route.query.sortType) {
      this.nowChooseSortTypeValue = parseInt(this.$route.query.sortType);
    }
  },
  methods: {
    // 获取标题颜色
    getTypeColor(e) {
      return TASK_TITLE_COLOR[e];
    },
    // 删除任务
    async deleteTask(id) {
      await DB_delete(id);
      this.$store
        .dispatch("queryAllTask")
        .then(() => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message({
            message: "删除失败",
            type: "error",
          });
        });
    },
    // 完成任务
    async finishTask(item) {
      item = Object.assign(item, { type: 20, finishedDate: Date() });
      await DB_change(item.id, item);
      this.$message({
        message: "已完成！",
        type: "success",
      });
    },
    // 修改数据
    async editTask(item) {
      this.$router.push({
        name: "addTask",
        params: {
          task: item,
        },
      });
    },
  },
  filters: {
    formatType(value) {
      return TASK_TYPE_MAP[value];
    },
    formatDate(value) {
      return formatNearDate(value);
    },
    formatFullDate(value) {
      return getFullDate(value);
    },
  },
};
</script>
<style scoped>
.card {
  margin: 10px;
  border-radius: 5px;
}
.item-icon {
  margin-left: 20px;
  margin-right: 20px;
}
.icon-right {
  position: absolute;
  right: 0;
}
.icon-mid {
  position: absolute;
  left: 50%;
  transform: translate(-30px);
}
</style>