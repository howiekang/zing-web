<template>
  <div class="main">
    <div class="login-form">
      <a-tabs
          default-active-key="1"
          :tabBarGutter=2>
        <a-tab-pane key="1" tab="手机号">
          <a-form
              id="formLogin"
              class="user-layout-login"
              ref="formLogin"
              :form="form"
              @submit="handleSubmit"
          >
            <a-form-item>
              <a-row>
                <a-col :span="24">
                  <a-row class="login-input">
                    <a-col :span="2">
                      <span>+86</span>
                    </a-col>
                    <a-col :span="22">
                      <a-input v-decorator="['phone',{
                        rule:[
                            {
                              required: true,
                              message: '请输入手机号'
                            }
                        ]
                      }]" placeholder="手机号"/>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
              <a-row class="login-input" style="margin-top: 8px">
                <a-col :span="17">
                  <a-input v-decorator="['code',{
                    rule:[
                            {
                              required: true,
                              message: '请输入验证码'
                            }
                        ]
                  }]" placeholder="验证码"/>
                </a-col>
                <a-col :span="7">
                  <a-row>
                    <a-col :span="1">
                      <a-divider type="vertical"/>
                    </a-col>
                    <a-col :span="23" style="text-align: center;">
                      <a-button type="link" @click="getVerifyCode">
                        <span v-if="!state.verifyCodeBtn">获取验证码</span>
                        <span v-else>{{ state.time }}(s)</span>
                      </a-button>
                    </a-col>
                  </a-row>
                </a-col>
              </a-row>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" block>登录</a-button>
            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="账号密码">

        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>

import {mapActions} from "vuex";
import {getLoginCode} from "@/api/system/code";
import Router from "@/router";

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        time: 60,
        verifyCodeBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    handleSubmit(e) {
      e.preventDefault()
      const {
        Login
      } = this;

      this.form.validateFields((err, values) => {
        if (err) {
          return
        }

        Login(values).then((res)=>{this.loginSuccess(res)})
      });
    },
    getVerifyCode() {
      const {form: {validateFields}, state} = this

      validateFields(['phone'], {force: true}, (err, values) => {
        if (err || state.verifyCodeBtn) {
          return
        }

        state.verifyCodeBtn = true
        const interval = window.setInterval(() => {
          if (state.time-- <= 0) {
            state.time = 60
            state.verifyCodeBtn = false
            window.clearInterval(interval)
          }
        }, 1000)

        getLoginCode().then(res => {
          const {data} = res;
          if (!data) {
            return
          }

          this.$notification['success']({
            message: '提示',
            description: '验证码获取成功，您的验证码为：' + data,
            duration: 8
          })
        })
      })
    },
    loginSuccess() {
      Router.push("/index")
    }
  }
}
</script>

<style lang="less" scoped>

/deep/ .ant-tabs-bar {
  border: 0;
}

.main {
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
  //padding: 50px 0 84px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;

  .login-form {
    width: 400px;
    height: 400px;
    background-color: white;
    margin-right: 200px;
    box-shadow: rgb(0 0 0 / 15%) 0px 2px 15px;
    padding: 24px;

  }

  .login-input {
    border-bottom: 1px solid #d9d9d9;

    input {
      border: none;
      outline-style: none;
      width: 100%;
    }
  }
}
</style>
