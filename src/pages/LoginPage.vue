<template>
  <div class="body-box">
    <div id="topBar-login">
      <div class="webLogo-box">
        <img class="webLogo" src="../assets/logo.png" alt=""/>
      </div>
      <div class="logo-font-box">
        <div style="padding-top: 10px;">PawPrints</div>
      </div>
    </div>
    <div class="main-box">
      <div :class="['container', 'container-login', 'is-txl is-z200']">
        <el-form :rules="loginRules" :model="loginForm">
          <h2 class="title">登录</h2>
          <el-form-item prop="email">
            <el-input v-model="loginForm.email" class="form__input" type="text" placeholder="邮箱"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" class="form__input" type="password" placeholder="密码" show-password/>
          </el-form-item>
          <el-form-item>
            <div class="primary-btn" @click="login">立即登录</div>
          </el-form-item>
        </el-form>
      </div>
      <div :class="['switch', { login: true }]">
        <div class="switch__circle"></div>
        <div class="switch__circle switch__circle_top"></div>
        <div class="switch__container">
          <h2>期待您的加入</h2>
          <p>这里是PawPrints管理端</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from "qs";

export default {
  name: "LoginPage",
  data() {
    let checkNewPwd = (rule, value, callback) => {
      // let pwdReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,18}$/;
      //如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
      // if (!pwdReg.test(value)) {
      //   callback(new Error("密码长度8-18位，且需同时包含英文和数字"));
      // }
      callback();
    }
    let checkEmail = (rule, value, callback) => {
      let mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!mailReg.test(value)) {	//匹配成功返回
        callback(new Error("邮箱格式：xx@xx.xx，只含数字、大小写字母、下划线、横杠"));
      }
      callback();
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      loginRules: {
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'}, {validator: checkEmail, trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}, {validator: checkNewPwd, trigger: 'blur'}],
      },
    }
  },
  methods:{
    login: function () {
      if(this.loginForm.email==='') {
        this.$message.error("输入的邮箱不能为空")
      } else if(this.loginForm.password==='') {
        this.$message.error("输入的密码不能为空")
      } else {
        let con = {};
        con['username'] = this.loginForm.email;
        con['password'] = this.loginForm.password;
        con['code'] = 0;
        this.$axios({
          url: 'https://anitu1.2022martu1.cn:8443/login',
          method: 'post',
          data: Qs.stringify(con),
        }).then((ret) => {
          // console.log(ret.data)
          if (ret.data.code === 200) {
            if (ret.data.data.authority === 'ROLE_USER') {
              this.$message.error("用户账号无法登录管理端！")
            } else if (ret.data.data.authority === 'ROLE_VISITOR') {
              this.$message.error("游客账号无法登录管理端！")
            } else {
              localStorage.setItem('token', ret.data.token);
              this.$message.success("登录成功");
              this.$router.push('/usercenter');
            }
          } else this.$notify.error(ret.data.message + "，登录失败");
        }).catch((error) => {
          // console.log(error)
          if (error.message === 'Request failed with status code 403') {
            this.$message.error("邮箱或密码错误！")
          }
        })
      }
    },
  },
  created () {
    localStorage.clear()
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  margin-left: 17%;
  position: relative;
  width: 66%;
  min-width: 1000px;
  min-height: 600px;
  height: 600px;
  padding: 25px;
  background-color: #ecf0f3;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: all 1.25s;
    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: #a0a5a8;
      .title {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      .text {
        margin-top: 30px;
        margin-bottom: 12px;
      }
      .form__input {
        width: 350px;
        height: 35px;
        margin: 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        // font-family: 'Montserrat', sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        &::placeholder {
          color: #a0a5a8;
        }
      }
    }
  }
  .container-register {
    z-index: 100;
    left: calc(100% - 600px);
  }
  .container-login {
    left: calc(100% - 600px);
    z-index: 0;
  }
  .is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
  }
  .is-z200 {
    z-index: 200;
    transition: 1.25s;
  }
  .switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #f9f9f9;
    color: #a0a5a8;
    .switch__circle {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #d1d9e6, inset -8px -8px 12px #f9f9f9;
      bottom: -37%;
      left: -60%;
      transition: 1.25s;
    }
    .switch__circle_top {
      top: -30%;
      left: 60%;
      width: 300px;
      height: 300px;
    }
    .switch__container {
      display: flex;
      justify-content: center !important;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: 400px;
      padding: 50px 55px;
      transition: 1.25s;
      h2 {
        font-size: 34px;
        font-weight: 700;
        line-height: 3;
        color: #181818;
      }
      p {
        font-size: 14px;
        letter-spacing: 0.25px;
        text-align: center;
        line-height: 1.6;
      }
    }
  }
  .login {
    left: calc(100% - 400px);
    .switch__circle {
      left: 0;
    }
  }
  .primary-btn {
    transition: all 0.3s;
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 25px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    letter-spacing: 2px;
    background-color: #4b70e2;
    color: #f9f9f9;
    cursor: pointer;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    &:hover {
      box-shadow: 4px 4px 6px 0 rgb(255 255 255 / 50%),
      -4px -4px 6px 0 rgb(116 125 136 / 50%),
      inset -4px -4px 6px 0 rgb(255 255 255 / 20%),
      inset 4px 4px 6px 0 rgb(0 0 0 / 40%);
    }
  }
}
.verify-btn{
  cursor: pointer;
  width: 80px;
  padding: 0 5px 0 5px;
  margin-top: 4px;
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  border-radius: 8px;
  background-color: #ecf0f3;
  box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
}
.verify-btn:hover{
  box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}
.verify-btn:active{
  font-weight: bold;
  background-color: ghostwhite;
}
::v-deep .el-input__inner{
  background-color: #ecf0f3 !important;
  border: none 0 !important;
  padding-left: 0 !important;
  height: 30px !important;
  line-height: 30px !important;
}
.body-box{
  height: calc(100vh);
}
#topBar-login{
  position: relative;
  display: flex;
  height: 70px;
  padding: 0;
}
.webLogo-box{
  margin-left: 5px;
  float: left;
  height: 70px;
  width: 120px;
}
.webLogo{
  padding-top: 5px;
  height: 60px;
  width: 120px;
}
.logo-font-box{
  padding-top: 5px;
  font-family:华文行楷,serif;
  display: table-cell;
  width: 70px;
  font-size: 35px;
}
</style>
