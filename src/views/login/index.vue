<template>
  <div>
    <div class="weui-form__control-area">
      <div class="weui-cells__group weui-cells__group_form">
        <div class="weui-cells__title">登录</div>
        <div class="weui-cells weui-cells_form">
          <div class="weui-cell weui-cell_active">
            <div class="weui-cell__hd">
              <label class="weui-label">手机号</label>
            </div>
            <div class="weui-cell__bd">
              <input
                v-model="form.phoneNum"
                class="weui-input"
                placeholder="请输入"
              />
            </div>
          </div>
        </div>

        <div class="weui-cell weui-cell_active">
          <div class="weui-cell__hd">
            <label class="weui-label"
              >密码
              <svg
                t="1603079791394"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4857"
                width="20"
                height="20"
              >
                <path
                  d="M925.781333 379.733333l60.373334 60.330667a637.994667 637.994667 0 0 1-452.565334 187.477333 637.994667 637.994667 0 0 1-452.48-187.434666l60.330667-60.330667a552.96 552.96 0 0 0 392.149333 162.432c153.173333 0 291.84-62.08 392.192-162.474667z"
                  fill="#444444"
                  p-id="4858"
                ></path>
                <path
                  d="M127.99307 366.325395l60.339779 60.339779-60.339779 60.339778L67.653291 426.665174z"
                  fill="#444444"
                  p-id="4859"
                ></path>
                <path
                  d="M192.914258 501.311099l65.369126 54.851209-109.702419 130.738252L83.211839 632.049351z"
                  fill="#444444"
                  p-id="4860"
                ></path>
                <path
                  d="M391.512277 565.33021l80.187103 29.185719-58.371438 160.374207L333.140839 725.704417z"
                  fill="#444444"
                  p-id="4861"
                ></path>
                <path
                  d="M570.716052 592.382238l80.187104-29.185719 58.371438 160.374207L629.08749 752.756445z"
                  fill="#444444"
                  p-id="4862"
                ></path>
                <path
                  d="M765.839382 556.179743l65.369126-54.85121 109.702419 130.738252L875.541801 686.917994z"
                  fill="#444444"
                  p-id="4863"
                ></path>
                <path
                  d="M938.689036 366.337531l60.339779 60.339779-60.339779 60.339779L878.349258 426.67731z"
                  fill="#444444"
                  p-id="4864"
                ></path>
              </svg>
            </label>
          </div>
          <div class="weui-cell__bd">
            <input
              v-model="form.password"
              class="weui-input"
              placeholder="输入密码"
            />
          </div>
        </div>
      </div>
      <div class="weui-cell weui-cell_active">
        <div class="weui-cell__hd">
          <label class="weui-label">昵称(选填)</label>
        </div>
        <div class="weui-cell__bd">
          <input
            v-model="form.name"
            class="weui-input"
            placeholder="使用系统自动生成昵称?"
          />
        </div>
      </div>
    </div>
    <div class="weui-form__tips-area">
      <p class="weui-form__tips">
        <a class="weui-link">第一次登录,会自动注册</a>
      </p>
    </div>
    <div class="weui-form__opr-area">
      <a class="weui-btn weui-btn_primary" @click="onLogin">登录</a>
    </div>
  </div>
</template>
<script>
import { signIn } from "@/api/account.js";
import {setLoaclStorage} from '@/utils/localStorage.js'
export default {
  data() {
    return {
      form: {
        phoneNum: null,
        password: "",
        name: null,
      },
    };
  },

  methods: {
    async onLogin() {
      if (this.rulesOfForm()) {
        let res = await signIn(this.form);
        if (res.status === 200) {
          res.USERID && setLoaclStorage('USERID',res.USERID)
          this.$message({
            type: "success",
            message: res.message,
            delay: 1500,
            showClose: false,
          });
          this.$router.push('/')
        }
      }
    },
    // 判断数据是否合法
    rulesOfForm() {
      let phoneNumReg = /^[1]([3-9])[0-9]{9}$/;
      if (!phoneNumReg.test(this.form.phoneNum)) {
        this.$message({
          type: "info",
          message: "手机号格式错误",
          delay: 1500,
          showClose: false,
        });
        return false;
      }

      if (this.form.password.length < 6) {
        this.$message({
          type: "info",
          message: "密码至少为6位",
          delay: 1500,
          showClose: false,
        });
        return false;
      }
      if (this.form.name && this.form.name.includes(" ")) {
        this.$message({
          type: "info",
          message: "昵称不能有空格",
          delay: 1500,
          showClose: false,
        });
        return false;
      }

      return true;
    },
  },
};
</script>