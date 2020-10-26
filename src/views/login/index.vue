<template>
  <div>
    <div class="weui-form">
      <div class="weui-form__text-area">
        <h2 class="weui-form__title">登录</h2>
      </div>
      <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd">
                <label class="weui-label">邮箱</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  v-model="form.mail"
                  class="weui-input"
                  placeholder="请输入邮箱"
                />
              </div>
            </div>
            <div class="weui-cell weui-cell_active weui-cell_vcode">
              <div class="weui-cell__hd">
                <label class="weui-label">验证码</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  v-model="form.code"
                  placeholder="输入验证码"
                  maxlength="6"
                />
              </div>
              <div class="weui-cell__ft">
                <button
                  v-if="haveCode"
                  class="weui-btn weui-btn_default weui-vcode-btn"
                >
                  {{ time}}s
                </button>
                <button
                  @click="getCode"
                  v-else
                  class="weui-btn weui-btn_default weui-vcode-btn"
                >
                  获取验证码
                </button>
              </div>
            </div>
          </div>
          <div class="weui-cells__tips">
            <a class="weui-link" href="mailto:zhangpengfan6@gmail.com"
              >收不到验证码?</a
            >
          </div>
        </div>
      </div>

      <div class="weui-form__tips-area">
        <p class="weui-form__tips">第一次登录会自动注册</p>
      </div>

      <div class="weui-form__opr-area">
        <a class="weui-btn weui-btn_primary" @click="login">确定</a>
      </div>
    </div>
  </div>
</template>
<script>
import { signIn, getMailCode } from "@/api/account.js";
export default {
  data() {
    return {
      form: {
        mail: null,
        code: null,
      },
      timer: null,
      haveCode: false,
      time: 60,
    };
  },
  methods: {
    async getCode() {
      let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (reg.test(this.form.mail)) {
        this.haveCode = true;
        this.timer = setInterval(() => {
            this.time --;
            if(this.time <= 0){
               clearInterval(this.timer);
               this.timer = null;
               this.time = 60;
               this.haveCode = false;
            }
        }, 1000);
        const res = await getMailCode({ mail: this.form.mail });
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "验证码发送成功,请查收",
            showClose: false,
            delay: 2000,
          });
        }
      } else {
        this.$message({
          type: "info",
          message: "邮箱格式错误",
          showClose: false,
          delay: 2000,
        });
      }
    },
    async login() {
      if (this.rules()) {
        const res = await signIn(this.form);
        if (res.status === 200) {
          localStorage.setItem('MAIL',this.form.mail)
          this.form.code = '';
          this.$message({
            type: "success",
            message: res.message,
            showClose: false,
            delay: 2000,
          });
          this.$router.push("/");
        } else {
          this.form.code = '';
          this.$message({
            type: "error",
            message: res.message,
            showClose: false,
            delay: 2000,
          });
        }
      }
    },
    rules() {
      let mailreg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
      if (mailreg.test(this.form.mail) && this.form.code.length == 6) {
        return true;
      } else {
        this.$message({
          type: "info",
          message: "检查输入项",
          showClose: false,
          delay: 2000,
        });
        return false;
      }
    },
  },
};
</script>