<template>
  <div class='home' @click="userFlag = false">
    <main>
      <!-- 左侧导航 -->
      <div class="home-left">
        <header>
          <h1 @click="$router.push('/navPage')">中小学网络化体检系统</h1>
          <div class="header-user">
              <span class="el-dropdown-link">
                <img :src="userPath" v-if="userPath" alt="">
                <img v-else src="../assets/images/default-avatar.png" alt="">
              </span>
            <dl>
              <dt>
                <span>{{ userName }}</span> <i @click.stop="userFlag = !userFlag">···</i>
                <ul v-if="userFlag">
                  <li @click="changePerson">个人信息</li>
                  <li @click="changePassword">修改密码</li>
                  <li @click="logout">退出系统</li>
                </ul>
              </dt>
              <dd>体检大夫</dd>
            </dl>
          </div>
        </header>
        <el-menu
          :default-active="defaultPath"
          class="el-menu-vertical-demo"
          router
          unique-opened
          background-color=""
          text-color="#fff"
          active-text-color="">
          <template v-for="(item,index) in leftMenu">
            <el-submenu :key="index" :index="index+''" v-if="item.show && item.children.length !== 0">
              <template slot="title">
                <img :src="item.img" alt="">
                <span class="title">{{item.name}}</span>
              </template>
              <el-menu-item v-for="(child, i) in item.children" v-if="child.show" :key="i" :index="child.pathUrl">
                <span class="text">
                  {{child.name}}
                </span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :key="index" v-if="item.show && item.children.length === 0" :index="item.pathUrl">
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
        <!-- dsa -->

      </div>

      <!-- 右侧路由 -->
      <div class="home-right">
        <router-view/>
      </div>
    </main>

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
import { mapActions } from 'vuex'
import vueCropper from 'vue-cropper'
import img1 from '../assets/images/leftMenu_1.png'
import img2 from '../assets/images/leftMenu_2.png'
import img3 from '../assets/images/leftMenu_3.png'
import img4 from '../assets/images/leftMenu_4.png'
import img5 from '../assets/images/leftMenu_5.png'
import img6 from '../assets/images/leftMenu_6.png'
import { notice } from '../utils/index.js'
import 'babel-polyfill' // es6 shim
import myUpload from '../components/upload'
export default {
  name: 'home',
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
      userFlag: false,
      userPath: '',
      userName: '',
      defaultPath: '',
      leftMenu: [
        { name: '数据管理',
          img: img1,
          children: [
            { name: '学生CMIS信息', pathUrl: '/dataManagement/studentCMIS', show: false },
            { name: '单位信息', pathUrl: '/dataManagement/company', show: false },
            { name: '体检项目及标准', pathUrl: '/dataManagement/unusualMessage', show: false }
          ],
          show: false
        },
        { name: '健康体检信息',
          img: img2,
          children: [
            { name: '体检信息管理', pathUrl: '/healthCheck/checkManage', show: false },
            { name: '我的变更申请', pathUrl: '/healthCheck/myChange', show: false },
            { name: '体检信息变更审核', pathUrl: '/healthCheck/changeCheck', show: false },
            { name: '下载体检信息', pathUrl: '/healthCheck/downloadMessage', show: false },
            { name: '受检/未受检人群', pathUrl: '/healthCheck/people', show: false }
          ],
          show: false
        },
        { name: '学校体检信息查询',
          img: img3,
          children: [
            { name: '学校体检信息查询', pathUrl: '/schoolMessage/schoolMessage', show: false }
          ],
          show: false
        },
        { name: '数据统计分析',
          img: img4,
          children: [
            { name: '体检项目异常筛查', pathUrl: '/dataAnalysis/anomaly', show: false },
            { name: '分类导出体检表', pathUrl: '/dataAnalysis/checkTable', show: false },
            { name: '视力数据列表', pathUrl: '/dataAnalysis/eyesightTable', show: false },
            { name: '视力不良及肥胖', pathUrl: '/dataAnalysis/eyesightAndFat', show: false },
            { name: '个性化报表', pathUrl: '/dataAnalysis/individuation', show: false },
            { name: '评价统计', pathUrl: '/dataAnalysis/evaluate', show: false }
          ],
          show: false
        },
        { name: '身高与课桌椅对照',
          img: img5,
          children: [
            { name: '学生课桌椅参照', pathUrl: '/heightAndDesk/studentDesk', show: false },
            { name: '身高课桌椅对照表', pathUrl: '/heightAndDesk/deskContrast', show: false },
            { name: '学生课桌椅参照', pathUrl: '/heightAndDesk/studentDeskSchool', show: false }
          ],
          show: false
        },
        { name: '系统设置',
          img: img6,
          children: [
            { name: '角色管理', pathUrl: '/systemSettings/role', show: false },
            { name: '用户管理', pathUrl: '/systemSettings/user', show: false },
            { name: '体检项目管理', pathUrl: '/systemSettings/project', show: false }
          ],
          show: false
        }
      ]
    }
  },
  components: {
    vueCropper,
    'my-upload': myUpload
  },
  methods: {
    ...mapActions([
      'init'
    ]),
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
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/logout`
      // this.$store.dispatch('logout')
    },
    // 语言切换
    languageChange () {
      if (this.$i18n.locale === 'zh-CN') this.$i18n.locale = 'en-US'
      else this.$i18n.locale = 'zh-CN'
      localStorage.LANGUAGE = this.$i18n.locale
    }
  },
  watch: {
    '$route' (to) {
      this.defaultPath = to.path
    }
  },
  computed: {
    url () {
      const path = document.querySelector('#contextPath').value
      return `${path}/common/editUserFace`
    }
  },
  async created () {
    // this.$i18n.locale = localStorage.LANGUAGE
    this.defaultPath = this.$route.path
    setTimeout(async () => {
      this.$store.state.user.resources.forEach(item => {
        if ((new RegExp('系统设置')).test(item.name)) {
          this.leftMenu[5].show = true
          item.childs.forEach(child => {
            if ((new RegExp('/role/*')).test(child.url)) {
              this.leftMenu[5].children[0].show = true
            }
            if ((new RegExp('/user/*')).test(child.url)) {
              this.leftMenu[5].children[1].show = true
            }
            if ((new RegExp('/project/*')).test(child.url)) {
              this.leftMenu[5].children[2].show = true
            }
          })
        }
        if ((new RegExp('身高与课桌椅')).test(item.name)) {
          this.leftMenu[4].show = true
          item.childs.forEach(child => {
            if (child.url === '/desk/*') {
              this.leftMenu[4].children[0].show = true
            }
            if ((new RegExp('/deskRule/*')).test(child.url)) {
              this.leftMenu[4].children[1].show = true
            }
            if ((new RegExp('/deskSchool/*')).test(child.url)) {
              this.leftMenu[4].children[2].show = true
            }
          })
        }
        if ((new RegExp('数据统计分析')).test(item.name)) {
          this.leftMenu[3].show = true
          item.childs.forEach(child => {
            if ((new RegExp('/examProjectAbnormal/*')).test(child.url)) {
              this.leftMenu[3].children[0].show = true
            }
            if ((new RegExp('/statisticsExport/*')).test(child.url)) {
              this.leftMenu[3].children[1].show = true
            }
            if ((new RegExp('/statisticsVision/*')).test(child.url)) {
              this.leftMenu[3].children[2].show = true
            }
            if ((new RegExp('/statisticsObesity/*')).test(child.url)) {
              this.leftMenu[3].children[3].show = true
            }
            if ((new RegExp('/statisticsIndividualization*')).test(child.url)) {
              this.leftMenu[3].children[4].show = true
            }
            if ((new RegExp('/statisticsEvaluate/*')).test(child.url)) {
              this.leftMenu[3].children[5].show = true
            }
          })
        }
        if ((new RegExp('学校体检信息查询')).test(item.name)) {
          item.childs.forEach(child => {
            if ((new RegExp('/schoolExamInfo/*')).test(child.url)) {
              this.leftMenu[2].show = true
              this.leftMenu[2].children[0].show = true
            }
          })
        }
        if ((new RegExp('健康体检信息')).test(item.name)) {
          this.leftMenu[1].show = true
          item.childs.forEach(child => {
            if ((new RegExp('/examInfo/*')).test(child.url)) {
              this.leftMenu[1].children[0].show = true
            }
            if ((new RegExp('/examMyChange/*')).test(child.url)) {
              this.leftMenu[1].children[1].show = true
            }
            if ((new RegExp('/examChange/*')).test(child.url)) {
              this.leftMenu[1].children[2].show = true
            }
            if ((new RegExp('/examDownload/*')).test(child.url)) {
              this.leftMenu[1].children[3].show = true
            }
            if ((new RegExp('/examCrowd/*')).test(child.url)) {
              this.leftMenu[1].children[4].show = true
            }
          })
        }
        if ((new RegExp('数据管理')).test(item.name)) {
          this.leftMenu[0].show = true
          item.childs.forEach(child => {
            if ((new RegExp('/cmis/*')).test(child.url)) {
              this.leftMenu[0].children[0].show = true
            }
            if ((new RegExp('/company/*')).test(child.url)) {
              this.leftMenu[0].children[1].show = true
            }
            if ((new RegExp('/projectInfo/*')).test(child.url)) {
              this.leftMenu[0].children[2].show = true
            }
          })
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
    }, 0)
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
.home {
  min-width: 1358px;
  background: #EAEFF8;
  height: 100%;
  &>main {
    display: flex;
    overflow-y: hidden;
    height: 100%;
    .home-left {
      background:linear-gradient(180deg,rgba(81,129,255,1) 0%,rgba(152,120,255,1) 100%);
      width: 263px;
      // height: calc(100vh - 82px);
      box-sizing: border-box;
      overflow-x: hidden;
      &>header {
        height: 200px;
        width: 100%;
        line-height: 69px;
        h1 {
          font-size: 22px;
          color: rgba(255,255,255,1);
          text-align: center;
          font-weight: 400;
          cursor: pointer;
          background:rgba(108,148,253,1);
        }
        .header-user {
          display: flex;
          margin-top: 25px;
          .el-dropdown-link {
            img {
              display: inline-block;
              width: 64px;
              height: 64px;
              margin: 0 20px;
              border-radius: 50%;
              background: #fff;
            }
          }
          &>dl {
            display: flex;
            flex-direction: column;
            dt {
              width: 150px;
              display: flex;
              height: 22px;
              margin: 10px 0px;
              font-size: 16px;
              color: #fff;
              line-height: 22px;
              justify-content: space-between;
              position: relative;
              i {
                text-align: right;
                font-style: normal;
                font-weight: 800;
                color: #fff;
                cursor: pointer;
              }
              ul {
                position: absolute;
                right: 6px;
                top: 30px;
                background: #fff;
                z-index: 2000;
                li {
                  color: #444;
                  padding: 6px 10px;
                  &:hover {
                    background: #3f90cd;
                    color: #fff;
                  }
                }
              }
            }
            dd {
              font-size: 12px;
              line-height: 17px;
              color: #fff;
              font-family:PingFangSC-Regular;
            }
          }
        }
      }
      .el-menu-vertical-demo{
        border-right: 0px;
        background: none;
        &>.is-active {
          background: rgba($color: #255FF6, $alpha: 0.4);
        }
        &>li{
          img{
            margin-left: $width;
          }
          span{
            margin-left: 15px;
            font-size: 16px;
          }
          ul{
            background: none !important;
            li:hover {
              background:rgba(255,255,255,0.2);
            }
            span {
              margin-left: 55px;
            }
          }
        }
        .el-submenu__title:hover {
            background:rgba(255,255,255,0.2) !important;
          }
        .el-menu {
          .is-active {
            background: rgba(255, 255, 255, 0.2) !important;
            color: #fff !important;
          }
        }
        .el-submenu .el-menu-item{
          // margin: 5px 30px;
          border-radius: 5px;
          height: 38px;
          line-height: 38px;
          .el-menu {
            background: none !important;
          }
          .text {
            margin-left: 44px;
          }
          &:hover {
            background:rgba(255,255,255,0.2) !important;
          }
        }
        i{
          color: #fff;
          font-size: 16px;
        }
      }
    }

    .home-right {
      flex: 1;
      padding: 20px;
      // height: calc(100vh - 80px);
      box-sizing: border-box;
      overflow-x: hidden;
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
      // .el-dialog__body {
      //   padding-bottom: 0;
      // }
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
</style>
