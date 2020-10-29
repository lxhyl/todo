<template>
  <div>
    <div
      class="weui-flex"
      style="text-align: center; margin-top: 20px; margin-bottom: 20px"
    >
      <div class="weui-flex__item"><div class="placeholder">weui</div></div>
      <div class="weui-flex__item">
        <div class="placeholder">{{ sortTypeName }}</div>
      </div>
      <div class="weui-flex__item">
        <a
          @click="pikerVisible = true"
          class="weui-btn weui-btn_mini weui-btn_default"
          >Select</a
        >
      </div>
    </div>
    <div  style="margin-bottom:80px;">
    <div
      v-for="item in allTypeTask"
      :key="item.id"
      class="weui-form-preview card"
    >
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">{{
            item.type | formatType
          }}</label>
          <em class="weui-form-preview__value">{{ 1 }}</em>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">标题</label>
          <span class="weui-form-preview__value">{{ item.title }}</span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">日期</label>
          <span class="weui-form-preview__value"
            >{{ item.date | formatDate }}
          </span>
        </div>
        <div class="weui-form-preview__item">
          <label class="weui-form-preview__label">描述</label>
          <span class="weui-form-preview__value">{{ item.des }}</span>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <a
          class="weui-form-preview__btn weui-form-preview__btn_primary"
          href="javascript:"
          >操作</a
        >
      </div>
    </div>
    </div>
    <Picker
      v-if="pikerVisible"
      :visible.sync="pikerVisible"
      :list="sortType"
      @change="getChooseIndex"
    />
  </div>
</template>
<script>
import Picker from "../../components/Picker/index";
import { getDateBase, formatNearDate } from "../../utils/date";
const TASK_TYPE_MAP = {
  10: "待做",
  20: "已完成",
  30: "过期",
  100: "紧急",
};
export default {
  components: {
    Picker,
  },
  computed: {
    allTypeTask() {
      return this.$store.state.typeTask.allTask;
    },
    sortTypeName() {
      return this.sortType[this.nowChooseSortTypeIndex].label;
    },
  },
  watch: {},
  data() {
    return {
      sortType: [
        { label: "建立顺序", value: 2 },
        { label: "时间顺序", value: 1 },
        { label: "时间顺序", value: 3 },
      ],
      nowChooseSortTypeIndex: 0,
      pikerVisible: false,
    };
  },
  methods: {
    getChooseIndex(e) {
      this.nowChooseSortTypeIndex = e;
      console.log("父组件得到值", e);
    },
  },
  filters: {
    formatType(value) {
      return TASK_TYPE_MAP[value];
    },
    formatDate(value) {
      return formatNearDate(value);
    },
  },
};
</script>
<style scoped>
.card {
  margin: 10px;
  border-radius: 5px;
}
</style>