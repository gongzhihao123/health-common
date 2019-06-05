<template>
  <div :class="deviceFlag == false ? 'loginpad' : 'login'">
    <p class="login-logo">
      <!-- <img src="../assets/images/logo.png" alt=""> -->
      <span>中小学网络化体检系统</span>
    </p>
    <!-- 版本号 -->
    <!-- <div class="version-number">
      {{this.version}}
    </div> -->
    <div class="login-box">
      <p>
        <img src="../assets/images/people.png" alt="">
        <br>
        <sup></sup>
      </p>
      <div :class="{active: activeOne}">
        <span>
          <img src="../assets/images/username.png" alt="">
        </span>
        <el-input v-model="username" ref='userName' placeholder="请输入用户名" @focus="userNameFocus" @blur="userNameBlur">
        </el-input>
      </div>

      <div :class="{active: activeTwo}">
        <span>
          <img src="../assets/images/password.png" alt="">
        </span>
        <el-input v-model="password" ref="passWord" placeholder="请输入密码" type="password" @focus="passwordFocus" @blur="passwordBlur" @keyup.enter.native="login">
        </el-input>
      </div>
      <el-button @click="login" type="primary" :disabled="canLogin">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
      <sup class="error-message" v-if="errorShow">
        您的账号或密码输入有误，请重新输入
      </sup>
    </div>
    <div class="login-img">
      <img src="./../assets/images/bg3.png" alt="">
    </div>
  </div>
</template>

<script>
import { notice } from '@/utils/index'
export default {
  name: 'login',
  data () {
    return {
      canLogin: false,
      username: '',
      password: '',
      errorShow: false,
      openLoginUrl: '',
      activeOne: false,
      accessType: '',
      version: '',
      deviceFlag: true,
      activeTwo: false
    }
  },
  methods: {
    // 识别设备
    device () {
      let ua = navigator.userAgent
      let isWindowsPhone = /(?:Windows Phone)/.test(ua)
      let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
      let isAndroid = /(?:Android)/.test(ua)
      let isFireFox = /(?:Firefox)/.test(ua)
      // let isChrome = /(?:Chrome|CriOS)/.test(ua)
      let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua))
      let isPhone = /(?:iPhone)/.test(ua) && !isTablet
      let isPc = !isPhone && !isAndroid && !isSymbian
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
      }
    },
    // 分辨率处理
    getRem (pwidth, prem) {
      var html = document.getElementsByTagName('html')[0]
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth
      html.style.fontSize = oWidth / pwidth * prem + 'px'
    },
    userNameFocus () {
      this.activeOne = true
    },
    userNameBlur () {
      this.activeOne = false
    },
    passwordFocus () {
      this.activeTwo = true
    },
    passwordBlur () {
      this.activeTwo = false
    },
    to () {
    },
    async login () {
      if (!this.username) {
        notice('请输入用户名')
        return
      }
      if (!this.password) {
        notice('请输入密码')
        return
      }
      this.canLogin = true
      const data = await this.$store.dispatch('login', {
        account: this.username,
        password: this.password
      })
      if (data.code === 1) {
        let url = '/navPage'
        this.device().isTablet === true ? this.accessType = 'app' : this.accessType = 'web'
        await this.$store.dispatch('init', { url, accessType: this.accessType })
      } else {
        // this.username = ''
        // this.password = ''
        notice(data.message)
      }
      this.canLogin = false
    }
  },
  mounted () {
    this.version = document.querySelector('#version').value
    this.device().isTablet === true ? this.deviceFlag = false : this.deviceFlag = true
  },
  watch: {
    errorShow () {
      if (this.errorShow) {
        setTimeout(() => {
          this.errorShow = false
        }, 2000)
      }
    }
  },
  async created () {
    if (this.device().isTablet) {
      this.deviceFlag = false
      this.accessType = 'app'
      this.getRem(1920, 100)
    } else {
      this.deviceFlag = true
      this.accessType = 'web'
    }
    let url = '/navPage'
    await this.$store.dispatch('init', { url, accessType: this.accessType })
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
.login {
  // background: url(../assets/images/bg2.png);
  // background-size: cover;
  min-width: 1366px;
  min-height: 570px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .login-logo{
    position: absolute;
    top: 25%;
    margin-top: -50px;
    left: 48%;
    margin-left: -240px;
    img{
      vertical-align: middle;
      width: 70px;
    }
    span{
      vertical-align: middle;
      color: #000;
      font-size: 32px;
      margin-left: 100px;
    }
  }
  .version-number {
    position: absolute;
    top: 16%;
    left: 69%;
    font-size: 16px;
    color: #222;
  }
  .login-box{
    // background: url(../assets/images/login-bg.png);
    // background-size: 100% 100%;
    width: 392px;
    height: 390px;
    position: absolute;
    top: 33%;
    margin-top: -90px;
    left: 48%;
    margin-left: -178px;
    box-sizing: border-box;
    text-align: center;
    padding: 50px 40px;
    &>p {
      display: none;
      text-align: center;
      sup {
        display: inline-block;
        width: 20px;
        border: 0.5px solid #fff;
        border-bottom: 0;
      }
    }
    &>div{
      margin-top: $width*0.75;
      border: 1px solid #A2AEFE;
      border-radius: 4px;
      background: transparent;
      &.active {
        background: #fff;
      }
      &>span{
        display: inline-block;
        width: 40px;
        height: 39px;
        line-height: 39px;
        img {
          vertical-align: middle;
        }
      }
      .el-input__inner::-webkit-input-placeholder {
        color: #ccc;
        font-size: 16px;
      }
      input:-webkit-autofill {
        background: #fff;
        color: #222;
      }
      input:-webkit-autofill{
        -webkit-box-shadow: 0 0 0 400px #fff inset;
        -webkit-text-fill-color: #222;
      }
      .el-input{
        margin-left: -13px;
        width: 268px;
        border-radius: 0;
        .el-input__inner{
          border: 0;
          border-radius: 0;
          background: transparent;
          color: #222;
        }
      }
      &:nth-child(2){
        span{
        }
      }
    }

    .el-button{
      margin-top: 32px;
      padding: 8px 128px;
      font-size: 18px;
      background: #4B76FF;
    }
    .error-message{
      position: absolute;
      top: 38%;
      right: 40px;
      font-size: 14px;
      color: #ff4949;
    }
  }
  .login-img {
    position: absolute;
    left: 0;
    bottom: 0;
    img {
      width: 100%;
      display: inherit;
    }
  }
}
// pad样式
.loginpad {
  background: url(../assets/images/bg2.png);
  background-size: 100% 100%;
  min-width: 100%;
  min-height: 11rem;
  // height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .login-logo{
    position: absolute;
    top: 16%;
    margin-top: -0.5rem;
    left: 69%;
    margin-left: -4rem;
    img{
      vertical-align: middle;
      width: 1rem;
    }
    span{
      vertical-align: middle;
      color: #fff;
      font-size: 0.56rem;
      margin-left: $width;
    }
  }

  .login-box{
    background: url(../assets/images/login-bg.png);
    background-size: 100% 100%;
    width: 7rem;
    height: 5rem;
    position: absolute;
    top: 33%;
    margin-top: -0.90rem;
    left: 69%;
    margin-left: -3.4rem;
    box-sizing: border-box;
    text-align: center;
    padding: 0.5rem 0.4rem;
    &>p {
      display: none;
      text-align: center;
      sup {
        display: inline-block;
        width: 0.2rem;
        border: 0.5px solid #fff;
        border-bottom: 0;
      }
    }
    &>div{
      margin-top: $width*0.5;
      border: 1px solid #A2AEFE;
      border-radius: 4px;
      background: transparent;
      &.active {
        background: #fff;
      }
      &>span{
        display: inline-block;
        width: 0.4rem;
        height: 0.39rem;
        line-height: 0.39rem;
        img {
          vertical-align: middle;
        }
      }
      .el-input__inner::-webkit-input-placeholder {
        color: #fff;
      }
      .el-input{
        // margin-left: -0.13rem;
        width: 5rem;
        border-radius: 0;
        ::-webkit-input-placeholder {
          font-size: 0.3rem;
          }
        .el-input__inner{
          border: 0;
          border-radius: 0;
          background: transparent;
          color: #222;
        }
      }
    }
    .el-button{
      margin-top: 0.32rem;
      padding: 0.15rem 2.14rem;
      font-size: 0.38rem;
    }
    .error-message{
      position: absolute;
      top: 38%;
      right: 0.4rem;
      font-size: 0.14rem;
      color: #ff4949;
    }
  }
}
</style>
