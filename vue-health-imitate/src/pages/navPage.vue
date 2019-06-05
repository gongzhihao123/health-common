<template>
  <div :class="deviceFlag == false ? 'nav-pagepad' : 'nav-page' "  >
    <header>
      <el-row>
        <el-col :span="12">
          <img src="../assets/images/small-logo.png">
          中小学网络化体检系统
        </el-col>
        <el-col :span="12">
          <a v-if="deviceFlag" style="margin-right: 24px;" href="http://hrbaojiansuo.bjedu.cn/" target="_black">怀柔区中小学卫生保健所网站</a>
          <span>{{ userName }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="userPath" v-if="userPath" alt="">
              <img v-else src="../assets/images/default-avatar.png" alt="">
              <!-- <span v-else>
                {{ userName.substring(userName.length-2, userName.length) }}
              </span> -->
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
              <el-dropdown-item v-if="deviceFlag" @click.native="changePerson">个人信息</el-dropdown-item>
              <el-dropdown-item v-if="deviceFlag" @click.native="changePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </header>

    <div>
      <el-row>
        <i  v-if='lengthFlag' style="display: block; height: 150px;"></i>
        <div v-if="item.show" v-for="(item, index) in navList" :key="index" id="nav_content">
          <div @click="route(item)" :class="item.class">
            <span></span>
            <p>
              {{ item.name }}
            </p>
          </div>
        </div>
      </el-row>
    </div>
    <footer>
      <img src="./../assets/images/nav-img.png" alt="">
    </footer>
    <!-- 个人信息弹框 -->
    <el-dialog
      title="个人信息"
      class="person"
      :visible.sync="personVisible"
      width="720px">
        <el-row>
          <el-col :span="8">姓名：{{ userInfo.name }}</el-col>
          <el-col :span="16">账号：{{ userInfo.account }}</el-col>
          <el-col :span="8">角色：{{ userInfo.role }}</el-col>
          <el-col :span="16">单位：{{ userInfo.school }}</el-col>
        </el-row>
        <my-upload
          v-if="personVisible"
          field="file"
          v-model="show"
          :width="300"
          :height="300"
          :url="url"
          :params="params"
          :headers="headers"
          @crop-upload-success="uploadSuccess"
          img-format="png"></my-upload>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
    <!--修改密码弹框 -->
    <el-dialog
      title="修改密码"
      class="password-visible"
      :visible.sync="passwordVisible"
      width="620px">
        <el-form :model="ruleForm" v-if="passwordVisible" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="请输入原密码：" prop="old">
            <el-input v-model.trim="ruleForm.old" type="password"></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码：" prop="new">
            <el-input v-model.trim="ruleForm.new" :maxlength="14" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="newAgain">
            <el-input v-model.trim="ruleForm.newAgain" :maxlength="14" type="password"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmPassword('ruleForm')">确 定</el-button>
        <el-button type="danger" @click="passwordVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { notice } from '../utils/index.js'
import 'babel-polyfill' // es6 shim
import myUpload from '../components/upload'
export default {
  name: 'nav-page',
  data () {
    return {
      userInfo: {
        name: '',
        account: '',
        role: '',
        school: ''
      },
      show: true,
      params: {
        token: '',
        name: ''
      },
      headers: {},
      rules: {
        old: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        new: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        newAgain: [
          { required: true, message: '确认新密码', trigger: 'blur' }
        ]
      },
      ruleForm: {
        old: '',
        new: '',
        newAgain: ''
      },
      personVisible: false,
      passwordVisible: false,
      userPath: '',
      userName: '',
      deviceFlag: true,
      lengthFlag: true,
      navList: [
        { class: 'nav-1 nav', show: false, name: '体检信息录入', path: '/terminalPrint/sweep' },
        { class: 'nav-2 nav', show: false, name: '健康体检信息', path: '/healthCheck/checkManage' },
        { class: 'nav-3 nav', show: false, name: '学校体检信息查询', path: '/schoolMessage/schoolMessage' },
        { class: 'nav-4 nav', show: false, name: '终端打印', path: '/terminalPrint/sweep' },
        { class: 'nav-5 nav', show: false, name: '数据统计分析', path: '/dataAnalysis/anomaly' },
        { class: 'nav-6 nav', show: false, name: '数据管理', path: '/dataManagement/studentCMIS' },
        { class: 'nav-7 nav', show: false, name: '身高与课桌椅', path: '/heightAndDesk/studentDesk' },
        { class: 'nav-8 nav', show: false, name: '系统设置', path: '/systemSettings/role' },
        { class: 'nav-9 nav', show: false, name: '体检质量管理', path: '/qualityManage/testManage' },
        { class: 'nav-10 nav', show: false, name: '体检质量检测', path: '/qualityCheck/checkPhysique' }
      ]
    }
  },
  components: {
    'my-upload': myUpload
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
    async uploadSuccess (res) {
      this.userPath = await this.$store.dispatch('getUserFace', {
        userFace: res.result
      })
      localStorage.HEALTH_USERPATH = res.result
      // this.init('1')
    },
    confirmPassword (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (!new RegExp(/^[a-zA-Z0-9]{6,14}$/).test(this.ruleForm.new)) {
            notice('新密码要求是字母或数字，且长度6-14为之间')
            return
          }
          if (this.ruleForm.new === this.ruleForm.newAgain) {
            let data = await this.$store.dispatch('editPassword', {
              oldPassword: this.ruleForm.old,
              newPassword: this.ruleForm.new
            })
            if (data === 1) {
              this.passwordVisible = false
            }
          } else {
            notice('确认密码与新密码不一致')
          }
        }
      })
    },
    // 个人信息
    async changePerson () {
      let data = await this.$store.dispatch('getUserInfo')
      this.userInfo = {
        name: data.name,
        account: data.account,
        role: data.roles.length !== 0 ? data.roles.map(item => item.name).join('、') : '无',
        school: data.school ? data.school.xxmc : '无'
      }
      this.personVisible = true
    },
    // 修改密码
    changePassword () {
      this.passwordVisible = true
      this.ruleForm = {
        old: '',
        new: '',
        newAgain: ''
      }
    },
    // 退出
    logout () {
      // this.$store.dispatch('logout')
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/logout`
    },
    route (item) {
      this.$router.push(item.path)
      sessionStorage.HEALTH_NAME = item.name
    }
  },
  mounted () {
    this.device().isTablet === true ? this.deviceFlag = false : this.deviceFlag = true
    let navArr = this.$store.state.user.resources.length
    if (navArr > 6) {
      this.lengthFlag = false
    }
  },
  watch: {
  },
  computed: {
    url () {
      const path = document.querySelector('#contextPath').value
      return `${path}/common/editUserFace`
    }
  },
  created () {
    if (this.device().isTablet) {
      this.deviceFlag = false
      this.getRem(1920, 100)
    } else {
      this.deviceFlag = true
    }
    setTimeout(async () => {
      this.$store.state.user.resources.forEach(item => {
        if ((new RegExp('体检质量管理')).test(item.name)) {
          this.navList[8].show = true
        }
        if ((new RegExp('体检质量检测')).test(item.name)) {
          this.navList[9].show = true
        }
        if ((new RegExp('系统设置')).test(item.name)) {
          this.navList[7].show = true
          for (let i = 0; i < item.childs.length; i++) {
            if ((new RegExp('/role/*')).test(item.childs[i].url)) {
              this.navList[7].path = '/systemSettings/role'
              break
            } else {
              if ((new RegExp('/user/*')).test(item.childs[i].url)) {
                this.navList[7].path = '/systemSettings/user'
                break
              } else {
                if ((new RegExp('/project/*')).test(item.childs[i].url)) {
                  this.navList[7].path = '/systemSettings/project'
                }
              }
            }
          }
        }
        if ((new RegExp('身高与课桌椅')).test(item.name)) {
          this.navList[6].show = true
          for (let i = 0; i < item.childs.length; i++) {
            if ((new RegExp('/deskRule/*')).test(item.childs[i].url)) {
              this.navList[6].path = '/heightAndDesk/studentDesk'
              break
            } else {
              if ((new RegExp('/desk/*')).test(item.childs[i].url)) {
                this.navList[6].path = '/heightAndDesk/deskContrast'
              }
            }
          }
        }
        if ((new RegExp('数据管理')).test(item.name)) {
          this.navList[5].show = true
          for (let i = 0; i < item.childs.length; i++) {
            if ((new RegExp('/cmis/*')).test(item.childs[i].url)) {
              this.navList[5].path = '/dataManagement/studentCMIS'
              break
            } else {
              if ((new RegExp('/company/*')).test(item.childs[i].url)) {
                this.navList[5].path = '/dataManagement/company'
                break
              } else {
                if ((new RegExp('/projectInfo/*')).test(item.childs[i].url)) {
                  this.navList[5].path = '/dataManagement/unusualMessage'
                }
              }
            }
          }
        }
        if ((new RegExp('数据统计分析')).test(item.name)) {
          this.navList[4].show = true
          for (let i = 0; i < item.childs.length; i++) {
            if ((new RegExp('/examProjectAbnormal/*')).test(item.childs[i].url)) {
              this.navList[4].path = '/dataAnalysis/anomaly'
              break
            } else {
              if ((new RegExp('/statisticsExport/*')).test(item.childs[i].url)) {
                this.navList[4].path = '/dataAnalysis/checkTable'
                break
              } else {
                if ((new RegExp('/statisticsObesity/*')).test(item.childs[i].url)) {
                  this.navList[4].path = '/dataAnalysis/eyesightTable'
                  break
                } else {
                  if ((new RegExp('/statisticsVision/*')).test(item.childs[i].url)) {
                    this.navList[4].path = '/dataAnalysis/eyesightAndFat'
                    break
                  } else {
                    if ((new RegExp('/statisticsIndividualization*')).test(item.childs[i].url)) {
                      this.navList[4].path = '/dataAnalysis/individuation'
                      break
                    } else {
                      if ((new RegExp('/statisticsEvaluate/*')).test(item.childs[i].url)) {
                        this.navList[4].path = '/dataAnalysis/evaluate'
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if ((new RegExp('终端打印')).test(item.name)) {
          this.navList[3].show = true
        }
        if ((new RegExp('学校体检信息查询')).test(item.name)) {
          this.navList[2].show = true
        }
        if ((new RegExp('健康体检信息')).test(item.name)) {
          this.navList[1].show = true
          for (let i = 0; i < item.childs.length; i++) {
            if ((new RegExp('/examInfo/*')).test(item.childs[i].url)) {
              this.navList[1].path = '/healthCheck/checkManage'
              break
            } else {
              if ((new RegExp('/examMyChange/*')).test(item.childs[i].url)) {
                this.navList[1].path = '/healthCheck/myChange'
                break
              } else {
                if ((new RegExp('/examChange/*')).test(item.childs[i].url)) {
                  this.navList[1].path = '/healthCheck/changeCheck'
                  break
                } else {
                  if ((new RegExp('/examDownload/*')).test(item.childs[i].url)) {
                    this.navList[1].path = '/healthCheck/downloadMessage'
                    break
                  } else {
                    if ((new RegExp('/examCrowd/*')).test(item.childs[i].url)) {
                      this.navList[1].path = '/healthCheck/people'
                    }
                  }
                }
              }
            }
          }
        }
        if ((new RegExp('体检信息录入')).test(item.name)) {
          this.navList[0].show = true
        }
      })
      if (this.$store.state.user.name) {
        this.userName = this.$store.state.user.name
      }
      if (this.$store.state.user.face) {
        this.userPath = await this.$store.dispatch('getUserFace', {
          userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
        })
      }
    }, 100)
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
.nav-page {
  min-width: 1200px;
  min-height: 580px;
  // background: url(../assets/images/bg.png);
  background-size: cover;
  position: relative;
  &>header {
    height: 80px;
    line-height: 80px;
    color: #fff;
    background: linear-gradient(135deg,rgba(76,124,251,1) 0%,rgba(82,125,255,0.82) 50%,rgba(65,114,255,1) 100%);

    &>.el-row {
      width: 1200px;
      margin: 0 auto;
      .el-col:nth-child(1) {
        font-size: 24px;
        img {
          vertical-align: middle;
          width: 50px;
          margin-right: 10px;
        }
      }

      .el-col:nth-child(2) {
        padding-right: 20px;
        font-size: 16px;
        text-align: right;
        &>span {
          font-size: 16px;
        }
        .el-dropdown-link{
          cursor: pointer;
          display: inline-block;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #96BBF8;
          color: #fff;
          text-align: center;
          line-height: 36px;
          vertical-align: middle;
          img{
            width: 36px;
            height: 36px;
            border-radius: 50%;
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }
  }

  &>div {
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;
    height: calc(100vh - 141px);
    &>.el-row {
      text-align: center;
      &>div {
        width: 230px;
        margin-top: 40px;
        display: inline-block;
        div {
          display: inline-block;
          cursor: pointer;
          width: 170px;
          height: 170px;
          // background: #7B89F5;
          border-radius: 5px;
          &>span {
            display: inline-block;
            width: 46px;
            height: 46px;
            margin-top: 60px;
          }
          &>p {
            margin-top: 70px;
            color: #666;
            font-size: 18px;
            font-weight: 400;
          }
        }
        &:nth-child(1) div {
          background: url(../assets/images/navs-1.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(1):hover div {
          background: url(../assets/images/navs_1_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(2) div {
          background: url(../assets/images/navs-2.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(2):hover div {
          background: url(../assets/images/navs_2_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(3) div {
          background: url(../assets/images/navs-3.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(3):hover div {
          background: url(../assets/images/navs_3_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(4) div {
          background: url(../assets/images/navs-4.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(4):hover div {
          background: url(../assets/images/navs_4_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(5) div {
          background: url(../assets/images/navs-5.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(5):hover div {
          background: url(../assets/images/navs_5_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(6) div {
          background: url(../assets/images/navs-1.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(6):hover div {
          background: url(../assets/images/navs_1_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(7) div {
          background: url(../assets/images/navs-2.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(7):hover div {
          background: url(../assets/images/navs_2_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(8) div {
          background: url(../assets/images/navs-3.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(8):hover div {
          background: url(../assets/images/navs_3_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(9) div {
          background: url(../assets/images/navs-4.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(9):hover div {
          background: url(../assets/images/navs_4_active.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(10) div {
          background: url(../assets/images/navs-5.png) no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(10):hover div {
          background: url(../assets/images/navs_5_active.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .nav-1 {
          span {
            background: url(../assets/images/navs_1.png) no-repeat;
            background-size: 100% 100%;
          }
        &:hover {
          span {
            background: url(../assets/images/navs_1.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-2 {
        span {
          background: url(../assets/images/navs_2.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_2.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-3 {
        span {
          background: url(../assets/images/navs_3.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_3.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-4 {
        span {
          background: url(../assets/images/navs_4.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_4.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-5 {
        span {
          background: url(../assets/images/navs_5.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_5.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-6 {
        span {
          background: url(../assets/images/navs_6.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
             background: url(../assets/images/navs_6.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-7 {
        span {
          background: url(../assets/images/navs_7.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_7.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-8 {
        span {
          background: url(../assets/images/navs_8.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_8.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-9 {
        span {
          background: url(../assets/images/navs_9.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_9.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .nav-10 {
        span {
          background: url(../assets/images/navs_10.png) no-repeat;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navs_10.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  &>footer {
    position: fixed;
    left: 0;
    bottom: 0;
    img {
      display: inherit;
    }
  }
  .password-visible {
    .el-form-item__label {
      width: 150px !important;
    }
    .el-form-item__content {
      margin-left: 150px !important;
    }
    .el-input {
      width: 370px;
    }
  }
  .person {
    .el-row {
      .el-col {
        padding-left: 40px;
        color: #BBBBBB;
      }
    }
    .el-dialog {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      .el-dialog__body {
        padding-top: 10px;
        padding-bottom: 0;
      }
      // .el-dialog__footer {
      //   margin-top: 30px;
      // }
    }
  }
  .vue-image-crop-upload {
    position: static;
    background: white;
    padding: 10px 0 20px;
    .vicp-wrap {
      position: static;
      display: flex;
      justify-content: space-around;
      height: 400px;
      .vicp-step2 {
        display: flex;
        justify-content: space-around;
        .vicp-crop {
          display: flex;
          justify-content: space-around;
          width: 100%;
          .vicp-crop-left {
            width: 340px;
          }
          .vicp-crop-right {
            width: 210px;
          }
        }
        .vicp-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          // height: 100%;
          height: 350px !important;

          p {
            text-align: left;
            width: 100%;
            margin-bottom: 10px;
            color: #3f90cd;
          }
        }
        .vicp-operate {
          position: absolute;
          bottom: 20px;
          right: 40px;
          a {
            width: 80px;
            margin: 0;
          }
          .vicp-operate-btn {
            margin-left: 0;
          }
        }
      }

      .vicp-close {
        display: none;
      }
    }
  }
}
// pad样式
.nav-pagepad {
  min-width: 12rem;
  min-height: 5.8rem;
  background: url(../assets/images/bg.png);
  background-size: cover;
  &>header {
    height: 1.14rem;
    line-height: 1.14rem;
    padding-top: 0.4rem;
    color: #fff;

    &>.el-row {
      width: 18rem;
      margin: 0 auto;
      .el-col:nth-child(1) {
        font-size: 0.54rem;
        img {
          vertical-align: middle;
          width: 1.2rem;
          margin-right: 0.1rem;
        }
      }

      .el-col:nth-child(2) {
        font-size: 0.4rem;
        &>span {
            font-size: 0.42rem;
          }
        padding-right: 0rem;
        text-align: right;
        .el-dropdown-link{
          cursor: pointer;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #96BBF8;
          color: #fff;
          text-align: center;
          line-height: 0.8rem;
          vertical-align: middle;
          img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }
  }

  &>div {
    width: 15rem;
    margin: 0 auto;
    margin-top: 0.5rem;
    height: calc(100vh - 2.05rem);
    &>.el-row {
      text-align: center;
      &>div {
        width: 7.5rem;
        margin-top: 1.67rem;
        display: inline-block;
        div {
          display: inline-block;
          cursor: pointer;
          width: 5.4rem;
          height: 4.5rem;
          background: #7B89F5;
          border-radius: 0.05rem;
          &:hover {
            background: #4053A5;
          }
          &>span {
            display: inline-block;
            width: 1.77rem;
            height: 1.77rem;
            margin-top: 0.89rem;
          }
          &>p {
            margin-top: 0.59rem;
            color: #fff;
            font-size: 0.57rem;
          }
        }
      }
      .nav-9 {
        span {
          background: url(../assets/images/navPad_9.png) no-repeat center;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navPad_9_active.png) no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
      .nav-10 {
        span {
          background: url(../assets/images/navPad_10.png) no-repeat center;
          background-size: 100% 100%;
        }
        &:hover {
          span {
            background: url(../assets/images/navPad_10_active.png) no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .password-visible {
    .el-form-item__label {
      width: 1.5rem !important;
    }
    .el-form-item__content {
      margin-left: 1.5rem !important;
    }
    .el-input {
      width: 3.7rem;
    }
  }
  .person {
    .el-row {
      .el-col {
        padding-left: 0.4rem;
        color: #BBBBBB;
      }
    }
    .el-dialog {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      .el-dialog__body {
        padding-top: 0.1rem;
        padding-bottom: 0;
      }

    }
  }
  .vue-image-crop-upload {
    position: static;
    background: white;
    padding: 0.1rem 0 0.2rem;
    .vicp-wrap {
      position: static;
      display: flex;
      justify-content: space-around;
      height: 4rem;
      .vicp-step2 {
        display: flex;
        justify-content: space-around;
        .vicp-crop {
          display: flex;
          justify-content: space-around;
          width: 100%;
          .vicp-crop-left {
            width: 3.4rem;
          }
          .vicp-crop-right {
            width: 2.1rem;
          }
        }
        .vicp-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          // height: 100%;
          height: 3.5rem !important;

          p {
            text-align: left;
            width: 100%;
            margin-bottom: 0.1rem;
            color: #3f90cd;
          }
        }
        .vicp-operate {
          position: absolute;
          bottom: 0.2rem;
          right: 0.4rem;
          a {
            width: 0.8rem;
            margin: 0;
          }
          .vicp-operate-btn {
            margin-left: 0;
          }
        }
      }

      .vicp-close {
        display: none;
      }
    }
  }
}
</style>
