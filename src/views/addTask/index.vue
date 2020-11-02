<template>
  <div>
    <div class="weui-form" style="padding: 0">
      <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
          <div class="weui-cells__title">新建任务</div>
          <div class="weui-cells weui-cells_form">
            <p class="error-text" v-if="rules.title">{{ rules.title }}</p>
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd">
                <label class="weui-label">标题</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  v-model="form.title"
                  class="weui-input"
                  placeholder="填写标题"
                />
              </div>
            </div>

            <div class="weui-cells__group weui-cells__group_form">
              <div
                class="weui-cells__title"
                style="color: var(--weui-FG-0); font-size: 17px"
              >
                描述
                <span class="error-text" v-if="rules.des">{{ rules.des }}</span>
              </div>
              <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                  <div class="weui-cell__bd">
                    <textarea
                      v-model="form.des"
                      class="weui-textarea"
                      placeholder="请描述任务"
                      rows="3"
                    ></textarea>
                    <div class="weui-textarea-counter">
                      <span :style="{ color: desWordNum > 200 ? 'red' : '' }">{{
                        desWordNum
                      }}</span>
                      /200
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p class="error-text" v-if="rules.date">{{ rules.date }}</p>
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd">
                <label class="weui-label">日期</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  type="datetime-local"
                  v-model="form.date"
                  class="weui-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <a @click="onSubmit" class="weui-btn weui-btn_primary">提交</a>
    </div>
  </div>
</template>
<script>
import createID from "../../utils/createID";
import { isFutureDate } from "../../utils/date";
import { DB_add, DB_change } from "../../indexedDB/index";
export default {
  props: ["task"],
  computed: {
    desWordNum() {
      return this.form.des.length;
    },
  },
  watch: {
    "form.title": function (n) {
      if (n) {
        if (n.length >= 15) {
          this.rules.title = "标题最长为10";
        } else {
          this.rules.title = null;
        }
      } else {
        this.rules.title = "标题不能为空";
      }
    },
    "form.des": function (n) {
      if (n) {
        if (n.length >= 200) {
          this.rules.des = "描述最长200字";
        } else {
          this.rules.des = null;
        }
      } else {
        this.rules.des = "描述不能为空";
      }
    },
    "form.data": function (n) {
      if (n) {
        if (!isFutureDate(n, 10)) {
          this.rules.date = "至少十分钟以后";
        } else {
          this.rules.date = null;
        }
      } else {
        this.rules.date = "日期不能为空";
      }
    },
  },
  data() {
    return {
      form: {
        title: "",
        des: "",
        date: "",
        type: 10,
      },
      rules: {
        title: null,
        des: null,
        date: null,
      },
    };
  },
  created() {
    // 修改数据回显
    if (this.task) {
      this.form = this.task;
    }
  },
  methods: {
    conformRules() {
      for (let index in this.rules) {
        if (this.rules[index]) {
          return false;
        }
      }
      for (let index in this.form) {
        if (!this.form[index]) {
          return false;
        }
      }
      return true;
    },
    async onSubmit() {
      if (!this.conformRules()) {
        this.$message({ message: "检查表单", type: "error" });
        return;
      }
      // 如果是修改的
      if (this.task) {
        await DB_change(this.task.id, Object.assign(this.form, { type: 10 }));
      } else {
        await DB_add(this.form);
      }

      this.$message({ message: "提交成功", type: "success" });
      this.$router.push({
        path: "/task",
        params: {
          type: "todo",
        },
      });
    },
  },
};
</script>
<style scoped>
.error-text {
  position: absolute;
  height: 16px;
  font-size: 9px;
  color: red;
}
.weui-label {
  width: 40px;
}
</style>