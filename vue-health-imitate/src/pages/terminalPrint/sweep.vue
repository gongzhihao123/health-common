<template>
  <div class='sweep'  @contextmenu.prevent="prevent">
    <header>
      <el-row>
        <el-col :span="12">
          <img src="../../assets/images/small-logo.png" @click="$router.push('/navPage')">
          中小学网络化体检系统
        </el-col>
        <el-col :span="12">
          <span style="font-size: 15px;">{{ userName }}</span>
          <!-- <el-dropdown> -->
            <span class="el-dropdown-link">
              <img :src="userPath" v-if="userPath" alt="">
              <img v-else src="../../assets/images/default-avatar.png" alt="">
              <!-- <span v-else>
                {{ userName.substring(userName.length-2, userName.length) }}
              </span> -->
            </span>
            <!-- <el-dropdown-menu slot="dropdown" style="margin-top:0px;"> -->
              <!-- <el-dropdown-item @click.native="changePerson">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item> -->
              <!-- <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item> -->
            <!-- </el-dropdown-menu> -->
          <!-- </el-dropdown> -->
        </el-col>
      </el-row>
      <!-- <el-button size="small" @click="languageChange">
        切换语言
      </el-button> -->
    </header>
    <div>
      <p class="login-logo">
        <img src="../../assets/images/logo.png" @click="$router.push('/navPage')">
        <span>中小学网络化体检系统</span>
        <!-- <sup></sup> -->
      </p>

      <div>
        <el-input :maxlength="20" v-focus v-model.trim="eduId" @blur.prevent.stop='inputBlur' ref="eduId" @keyup.enter.native="entry"></el-input>
        <el-input class="empty" ref="empty"></el-input>
        <!-- <img src="../../assets/images/code.png" alt="" @click="$router.push('/terminalPrint/checkMessage')"> -->
        <p>请扫码或输入教育ID</p>
        <p v-if="!isEntry">今日签到学生数：{{ signCount.signCount }} 已打印反馈：{{ signCount.printCount }}</p>
        <p v-if="isEntry">今日已体检人数：{{ checkCount }}</p>
      </div>
    </div>
    <!-- <footer>
      <img src="./../../assets/images/nav-img.png" alt="">
    </footer> -->
    <audio id="audio" :src="audioUrl"></audio>
    <el-dialog
      title="录入"
      :fullscreen="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="1200px">
      <main v-if="dialogVisible">
        <div class="top">
          <el-row>
            <!-- <el-col :span="2">
              <span>
                学生信息：
              </span>
            </el-col> -->
            <el-col :span="24">
              <div>
                <p>
                  <span>姓名</span>
                  <span>教育ID</span>
                  <span>性别</span>
                  <span>出生日期</span>
                  <span>学校</span>
                  <span>年级</span>
                  <span>班级</span>
                </p>
                <p>
                  <span>{{ studentDetail.studentName }}</span>
                  <span>{{ studentDetail.tempFlag ? studentDetail.tempEduid : studentDetail.jyid }}</span>
                  <span>{{ studentDetail.sex === 1 ? '男' : '女' }}</span>
                  <span>{{ studentDetail.birthday | dateFormat('yyyy-MM-dd') }}</span>
                  <span v-if="studentDetail.schoolName.length < 16">{{ studentDetail.schoolName }}</span>
                  <el-popover
                    v-else
                    placement="bottom"
                    width="150"
                    trigger="hover"
                    :content="studentDetail.schoolName">
                    <span slot="reference">{{ studentDetail.schoolName && studentDetail.schoolName.slice(0, 15) + '...' }}</span>
                  </el-popover>
                  <span>{{ studentDetail.gradeName }}</span>
                  <span>{{ studentDetail.className }}</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="middle">
          <p>
            体检项目：（绿色：已经体检过的项目，红色：还未体检的项目，蓝色：正在体检的项目）
          </p>

          <div>
            <span v-for="(item, index) in projectList" :key="index" :class="{'red': item.myProjectFlag === false && item.flag === false, 'blue': item.myProjectFlag === true, 'green': item.myProjectFlag === false && item.flag === true}">
              {{ item.projectName }}
            </span>
          </div>
        </div>

        <div class="middle-history">
          <p>
            <span>
              既往病史：
            </span>
            {{ studentDetail.jwbs ? studentDetail.jwbs : '无' }}
          </p>
        </div>

        <div class="footer">
          <p>
            体检结果：
            <el-button type="primary" size="small" style="float: right;" @click="fillDefault" >填入默认值</el-button>
          </p>
          <singleProject :gradeName='studentDetail.gradeName' v-bind:myList="myList" :fill="fill" v-bind:studentExam="studentExam" v-bind:history="history" @change="change" v-bind:checkout="checkout"></singleProject>

          <tooth v-bind:myList="myList" :fill="fill" v-bind:studentExam="studentExam" v-bind:toothCheckout="toothCheckout" v-bind:yyCheckout="yyCheckout" @toothChange="toothChange" @yyChange="yyChange"></tooth>

          <bodyComposition v-bind:studentExam="studentExam" @tcfChange="tcfChange" v-bind:tcfCheckout="tcfCheckout" v-bind:qgdCheckout="qgdCheckout" @qgdChange="qgdChange"></bodyComposition>
        </div>
      </main>

      <el-dialog
        width="700px"
        title="需要输入原因"
        :visible.sync="innerVisible"
        append-to-body>
        <el-form :model="ruleForm" v-if="innerVisible" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="原因：" prop="reason">
            <el-input style="width: 500px;" :rows="5" ref="change" v-model.trim="ruleForm.reason" type="textarea" :maxlength="80"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmReason('ruleForm')">确定</el-button>
        </div>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :disabled="canSave" @click="sureSub" @keyup.enter.native="sureSub">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-input style="position: absolute;top: 0;z-index: -100"></el-input> -->
    <div class="swe_btn" style="display: none;">
      <h3>结束本组体检</h3>
      <ul>
        <h4>当前：<span>张浩然</span>组</h4>
        <li><i>1</i> <i>张浩然</i> <i></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import singleProject from '../../components/singleProject.vue'
import tooth from '../../components/singleTooth.vue'
import bodyComposition from '../../components/singleBody.vue'
import audioUrl from '../../../static/audio/1.mp3'
import { notice, success } from '../../utils/index.js'
import myList from '../../components/list.js'
export default {
  name: 'sweep',
  data () {
    return {
      userPath: '',
      userName: '',
      signCount: 0,
      myList: myList,
      checkCount: 0,
      rules: {
        reason: [
          { required: true, message: '请输入修改原因', trigger: 'blur' }
        ]
      },
      ruleForm: {
        reason: ''
      },
      projectList: [],
      dialogVisible: false,
      innerVisible: false,
      audioUrl,
      isEntry: true,
      eduId: '',
      studentId: '',
      studentDetail: {},
      studentExam: [],
      history: {},
      saveList: [],
      toothList: [],
      tcfList: [],
      qgdList: [],
      yyList: [],
      arrList: [],
      checkout: true,
      toothCheckout: true,
      yyCheckout: true,
      tcfCheckout: true,
      qgdCheckout: true,
      canSave: false,
      fill: true
    }
  },
  directives: {
    focus: {
      inserted: function (el, option) {
        var defClass = 'el-input'
        var defTag = 'input'
        var value = option.value || true
        if (typeof value === 'boolean') {
          value = { cls: defClass, tag: defTag, foc: value }
        } else {
          value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false }
        }
        if (el.classList.contains(value.cls) && value.foc) {
          el.getElementsByTagName(value.tag)[0].focus()
        }
      }
    }
  },
  methods: {
    // 失去焦点
    inputBlur () {
      if (!this.dialogVisible) {
        this.$refs.eduId.focus()
      }
    },
    // 禁止右击事件
    prevent () {
      console.log('禁止右击事件')
    },
    // 默认值
    fillDefault () {
      this.fill = !this.fill
      setTimeout(() => {
        let inputFocus = document.body.querySelectorAll('.input_focus input')
        if (inputFocus.length !== 0) {
          inputFocus[0].focus()
        }
      }, 100)
    },
    // 退出
    logout () {
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/logout`
      // this.$store.dispatch('logout')
    },
    // 体成分
    tcfChange (data) {
      this.tcfList.forEach((item, index) => {
        if (item.id === data.id) {
          this.tcfList.splice(index, 1)
        }
      })
      this.tcfList.push(data)
    },
    // 屈光度
    qgdChange (data) {
      this.qgdList.forEach((item, index) => {
        if (item.id === data.id) {
          this.qgdList.splice(index, 1)
        }
      })
      this.qgdList.push(data)
    },
    // 输入理由确认
    confirmReason (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.canSave = true
          await this.$store.dispatch('examEnteringSaveExamData', {
            studentId: this.studentId,
            projectJson: JSON.stringify(this.arrList.filter(item => item.projectId)),
            reason: this.ruleForm.reason
          })
          this.canSave = false
          this.dialogVisible = false
          this.innerVisible = false
          this.eduId = ''
          this.getStudentCount()
          this.$refs.eduId.focus()
        }
      })
    },
    // 录入取消
    cancel () {
      this.dialogVisible = false
      this.eduId = ''
      this.$refs.eduId.focus()
    },
    change (data) {
      this.saveList.forEach((item, index) => {
        if (item.id === data.id) {
          this.saveList.splice(index, 1)
        }
      })
      this.saveList.push(data)
    },
    toothChange (data) {
      this.toothList.forEach((item, index) => {
        if (item.id === data.id) {
          this.toothList.splice(index, 1)
        }
      })
      this.toothList.push(data)
    },
    yyChange (data) {
      this.yyList.forEach((item, index) => {
        if (item.id === data.id) {
          this.yyList.splice(index, 1)
        }
      })
      this.yyList.push(data)
    },
    sureSub () {
      if (this.saveList.length || this.toothList.length || this.yyList.length || this.qgdList.length || this.tcfList.length) {
        let variab = true
        let arr1 = []
        arr1 = this.saveList.filter(item => item.sureSg === '1').concat(this.saveList.filter(item => item.sureTz === '1')).concat(this.saveList.filter(item => item.sureXss === '1')).concat(this.saveList.filter(item => item.sureFhl === '1')).concat(this.saveList.filter(item => item.sureXy1ss === '1')).concat(this.saveList.filter(item => item.sureXy1sz === '1')).concat(this.saveList.filter(item => item.sureXy2ss === '1')).concat(this.saveList.filter(item => item.sureXy2sz === '1')).concat(this.saveList.filter(item => item.sureSlz === '1')).concat(this.saveList.filter(item => item.sureSly === '1')).concat(this.saveList.filter(item => item.sureJzslz === '1')).concat(this.saveList.filter(item => item.sureJzsly === '1'))
        this.subMessg = arr1.map(item => { return item.name }).join()
        for (let i = 0; i < this.saveList.length; i++) {
          if (this.saveList[i].sureSg === '1' || this.saveList[i].sureTz === '1' || this.saveList[i].sureXss === '1' || this.saveList[i].sureFhl === '1' || this.saveList[i].sureXy1ss === '1' || this.saveList[i].sureXy1sz === '1' || this.saveList[i].sureXy2ss === '1' || this.saveList[i].sureXy2sz === '1' || this.saveList[i].sureSlz === '1' || this.saveList[i].sureSly === '1' || this.saveList[i].sureJzslz === '1' || this.saveList[i].sureJzsly === '1') {
            variab = false
            this.$confirm(this.subMessg + '数值不在正常范围内, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.confirm()
              })
          }
        }
        if (variab) {
          this.confirm()
        }
      } else {
        success('您没有修改')
        this.eduId = ''
        this.$refs.eduId.focus()
      }
    },
    // 录入确定
    async confirm () {
      let para = true
      this.arrList = []
      for (let i = 0; i < this.saveList.length; i++) {
        if (this.saveList[i].name === '其他' && !this.saveList[i].value2) {
          this.checkout = !this.checkout
          para = false
          return
        }
        if (this.saveList[i].flag && !this.saveList[i].value1 && this.saveList[i].name) {
          this.checkout = !this.checkout
          para = false
          return
        }
        if ((this.saveList[i].name === '血压1' || this.saveList[i].name === '血压2' || this.saveList[i].name === '裸眼视力' || this.saveList[i].name === '矫正视力') && (!this.saveList[i].value2 || !this.saveList[i].value1)) {
          this.checkout = !this.checkout
          para = false
          return
        }
      }
      for (let i = 0; i < this.toothList.length; i++) {
        if (!this.toothList[i].flag && !this.toothList[i].value1 && !this.toothList[i].value2 && this.toothList[i].name) {
          this.toothCheckout = !this.toothCheckout
          para = false
          return
        }
      }
      for (let i = 0; i < this.yyList.length; i++) {
        if (!this.yyList[i].flag && !this.yyList[i].value1 && this.yyList[i].name) {
          this.yyCheckout = !this.yyCheckout
          para = false
          return
        }
      }
      if (this.tcfList.length !== 0 && this.tcfList[0].flag && (this.tcfList[0].unexamReason === '4')) {
        if (!this.tcfList[0].value1) {
          this.tcfCheckout = !this.tcfCheckout
          para = false
          return
        }
        if (this.tcfList[0].value1.split('_').length !== 10) {
          this.tcfCheckout = !this.tcfCheckout
          para = false
          return
        }
        for (let n = 0; n < this.tcfList[0].value1.split('_').length; n++) {
          if (!this.tcfList[0].value1.split('_')[n]) {
            this.tcfCheckout = !this.tcfCheckout
            para = false
            return
          }
        }
      }
      if (this.qgdList.length !== 0 && this.qgdList[0].flag && (this.qgdList[0].unexamReason === '4')) {
        if (!this.qgdList[0].value1) {
          this.qgdCheckout = !this.qgdCheckout
          para = false
          return
        }
        if (this.qgdList[0].value1.split('_').length !== 8) {
          this.qgdCheckout = !this.qgdCheckout
          para = false
          return
        }
        for (let n = 0; n < this.qgdList[0].value1.split('_').length; n++) {
          if (!this.qgdList[0].value1.split('_')[n]) {
            this.qgdCheckout = !this.qgdCheckout
            para = false
            return
          }
        }
      }
      this.arrList = this.saveList.concat(this.toothList).concat(this.yyList).concat(this.tcfList).concat(this.qgdList)
      this.arrList.forEach((item, index) => {
        this.projectList.forEach(child => {
          if (!item.value1) {
            item.value1 = ''
          }
          if (!item.value2) {
            item.value2 = ''
          }
          if (!child.value1) {
            child.value1 = ''
          }
          if (!child.value2) {
            child.value2 = ''
          }
          if (item.projectId === child.projectId) {
            if (item.projectId === 'yy' && !child.value1) {
              child.value1 = '9_9_9_9_9_9'
              child.flag = true
            }
            if (item.projectId === 'qc' && !child.value1) {
              child.flag = true
              child.value1 = '99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99'
              child.value2 = '99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99'
            }
            if (item.flag === child.flag && item.value1 === child.value1 && item.value2 === child.value2 && (item.unexamReason === child.unexamReason || item.unexamReason === undefined)) {
              item.projectId = ''
            }
          }
        })
      })
      if (this.arrList.filter(item => item.unexamReason).length === 0) {
        if (this.arrList.filter(item => item.projectId).length === 0) {
          success('您没有修改')
          // this.dialogVisible = false
          this.eduId = ''
          this.$refs.eduId.focus()
        } else {
          let time = await this.$store.dispatch('checkUpdateOverTime', {
            studentId: this.studentId
          })
          if (time === 999) {
            this.innerVisible = true
            setTimeout(() => {
              this.$refs.change.focus()
            }, 100)
          } else {
            if (para) {
              this.canSave = true
              await this.$store.dispatch('examEnteringSaveExamData', {
                studentId: this.studentId,
                projectJson: JSON.stringify(this.arrList.filter(item => item.projectId))
              })
              this.canSave = false
              this.dialogVisible = false
              this.eduId = ''
              this.getStudentCount()
              this.$refs.eduId.focus()
            }
          }
        }
      } else {
        let time = await this.$store.dispatch('checkUpdateOverTime', {
          studentId: this.studentId
        })
        if (time === 999) {
          this.innerVisible = true
          setTimeout(() => {
            this.$refs.change.focus()
          }, 100)
        } else {
          if (para) {
            this.canSave = true
            await this.$store.dispatch('examEnteringSaveExamData', {
              studentId: this.studentId,
              projectJson: JSON.stringify(this.arrList.filter(item => item.projectId))
            })
            this.canSave = false
            this.dialogVisible = false
            this.eduId = ''
            this.getStudentCount()
            this.$refs.eduId.focus()
          }
        }
      }
    },
    // 输入教育ID-回车
    async entry () {
      if (this.isEntry) {
        this.saveList = []
        this.toothList = []
        this.yyList = []
        this.arrList = []
        this.ruleForm.reason = ''
        let data = await this.$store.dispatch('examEnteringGetStudentExamDetail', {
          jyid: this.eduId
        })
        if (!data.now) {
          notice('请输入正确的教育ID')
          this.eduId = ''
          return
        }
        this.studentDetail = data.now
        this.studentId = data.now.studentId
        this.projectList = data.now.projectList
        this.dialogVisible = await true
        // setTimeout(() => {
        // 17048902
        // this.fillDefault()
        // })
        this.studentExam = await data.now
        if (data.history) {
          this.history = await data.history
        }
        setTimeout(() => {
          let bothInput = document.body.querySelectorAll("input[type='checkbox']")
          bothInput.forEach(item => {
            item.setAttribute('tabindex', '-1')
          })
          let inputFocus = document.body.querySelectorAll('.input_focus input')
          if (inputFocus.length !== 0) {
            inputFocus[0].focus()
          }
        }, 100)
      } else {
        let data = await this.$store.dispatch('examPrintCheckStudentExamExisit', {
          jyid: this.eduId
        })
        if (data) {
          sessionStorage.HEALTH_EDUID = this.eduId
          sessionStorage.TIME = 'time'
          this.$router.push('/terminalPrint/checkMessage')
        } else {
          this.eduId = ''
          this.examPrintSignCount()
          this.$refs.eduId.focus()
          let audio = document.getElementById('audio')
          audio.play()
        }
      }
    },
    // 查询今日已体检人数
    async getStudentCount () {
      let data = await this.$store.dispatch('getStudentCount')
      this.checkCount = data
    },
    // 查询今日签到人数
    async examPrintSignCount () {
      let data = await this.$store.dispatch('examPrintSignCount')
      this.signCount = data
    }
  },
  mounted () {
    let bothInput = document.body.querySelectorAll('.el-dropdown__caret-button')
    bothInput.forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
    if (!this.isEntry) {
      let audio = document.getElementById('audio')
      audio.play()
    }
  },
  components: {
    singleProject,
    bodyComposition,
    tooth
  },
  watch: {
  },
  async created () {
    if (this.$store.state.user.name) {
      this.userName = this.$store.state.user.name
    }
    if (this.$store.state.user.face) {
      this.userPath = await this.$store.dispatch('getUserFace', {
        userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
      })
    }
    if (sessionStorage.HEALTH_NAME === '体检信息录入') {
      this.isEntry = true
      this.getStudentCount()
    } else {
      this.isEntry = false
      this.examPrintSignCount()
    }
    if (!this.isEntry) {
      let audio = document.getElementById('audio')
      audio.play()
    }
    // let code = ''
    // let lastTime, nextTime
    // let lastCode, nextCode
    document.onkeydown = (e) => {
      // nextCode = e.which
      // nextTime = new Date().getTime()

      // if (lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
      //   code += String.fromCharCode(lastCode)
      // } else if (lastCode != null && lastTime != null && nextTime - lastTime > 100) {
      //   code = ''
      // }
      // lastCode = nextCode
      // lastTime = nextTime
      if (this.dialogVisible) {
        if (e.which === 13) {
          this.$refs.empty.focus()
          setTimeout(() => {
            this.sureSub()
          }, 400)
        }
      }
      const href = window.location.href
      let url = href.slice(href.indexOf('#') + 1)
      if (url === '/terminalPrint/sweep') {
        if (e.which === 9 && !this.dialogVisible) {
          if (!this.isEntry) {
            setTimeout(async () => {
              let data = await this.$store.dispatch('examPrintCheckStudentExamExisit', {
                jyid: this.eduId
              })
              if (data) {
                sessionStorage.HEALTH_EDUID = this.eduId
                sessionStorage.TIME = 'time'
                this.$router.push('/terminalPrint/checkMessage')
                this.$refs.eduId.focus()
              } else {
                this.eduId = ''
                let audio = document.getElementById('audio')
                audio.play()
                this.$refs.eduId.focus()
                this.examPrintSignCount()
              }
            }, 100)
          } else {
            setTimeout(() => {
              this.$refs.eduId.focus()
            }, 100)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.sweep {
  background: url(../../assets/images/bg.png);
  background-size: cover;
  min-width: 1200px;
  min-height: 570px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .empty {
    position: absolute;
    z-index: -1001;
  }
  &>header {
    height: 80px;
    line-height: 80px;
    background: #6B84FE;
    color: #fff;

    &>.el-row {
      .el-col:nth-child(1) {
        padding-left: 40px;
        font-size: 24px;
        img {
          width: 50px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      .el-col:nth-child(2) {
        padding-right: 40px;
        text-align: right;
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
  &>div:nth-child(2) {
    margin: 0 auto;
    margin-top: 10%;
    width: 580px;
    text-align: center;

    .login-logo{
      position: relative;
      img{
        vertical-align: middle;
        width: 70px;
      }
      span{
        vertical-align: middle;
        color: #fff;
        font-size: 36px;
        margin-left: $width;
      }
      sup {
        position: absolute;
        bottom: -60px;
        left: calc(50% - 25px);
        width: 50px;
        border: 2px solid #fff;
        border-bottom: 0;
      }
    }

    &>div {
      margin-top: 150px;
      .el-input {
        width: 500px;
        height: 70px;
        font-size: 50px;
        .el-input__inner {
          height: 70px;
        }
      }
      &>p {
        color: #fff;
        margin-top: 20px;
        font-size: 18px;
      }
      &>p:nth-child(3) {
        color: #fff;
        margin-top: 40px;
        font-size: 16px;
      }
    }
  }

  .el-dialog {
    margin-top: 30px !important;
    height: calc(100% - 40px);
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
      main {
        padding: 0;
        .top {
          font-size: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #E5E5E5;
          &>.el-row>.el-col {
            // padding-right: 20px;
            &>span {
              display: inline-block;
              margin-top: 10px;
              color: #ABBAC1;
            }
            .el-input {
              width: 350px;
            }
          }
          .el-col-24 {
            margin-top: 10px;
            margin-bottom: 10px;
            &>div {
              background: #ECEEF4;
              padding: 10px 20px;
              border-radius: 5px;
              p:nth-child(1) {
                margin-bottom: 5px;
                span {
                  display: inline-block;
                  width: 135px;
                  color: #B3B3B3;
                  &:nth-child(5) {
                    width: 270px;
                  }
                }
              }
              p:nth-child(2) {
                &>span {
                  display: inline-block;
                  width: 135px;
                  color: #717172;
                  &:nth-child(5) {
                    width: 270px;
                  }
                }
              }
            }
          }
        }

        .middle {
          padding: 10px 0;
          border-bottom: 1px solid #E5E5E5;
          &>p {
            color: #B3BFC6;
            font-size: 16px;
          }
          &>div {
            span {
              display: inline-block;
              text-align: center;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              width: 100px;
              line-height: 30px;
              border: 1px solid transparent;
              margin: 10px 10px 0 0;
              &.red {
                border: 3px solid #F17B7B;
              }
              &.blue {
                border: 3px solid #6E94FF;
              }
              &.green {
                border: 3px solid #73D586;
              }
            }
          }
        }

        .middle-history {
          padding: 10px 0;
          border-bottom: 1px solid #E5E5E5;
          font-size: 16px;
          span {
            color: #95A7B1;
          }
        }

        .footer {
          font-size: 16px;
          padding: 10px 0;
          &>p {
            color: #95A7B1;
          }
        }
      }
    }
  }
  // 结束本组体检
  .swe_btn {
    position: absolute;
    right: 60px;
    top: 142px;
    h3 {
      width:170px;
      height:36px;
      text-align: center;
      line-height: 36px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      color: #6B84FE;
      font-size: 14px;
    }
    ul {
      margin-top: 43px;
      width: 170px;
      height: 570px;
      background:rgba(255,255,255,0.18);
      h4 {
        height:48px;
        line-height: 48px;
        text-align: center;
        font-size:16px;
        font-family:MicrosoftYaHei-Bold;
        font-weight:bold;
        color: #fff;
        border-bottom: 1px solid #ccc;
      }
      li {
        // width: 100%;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        color: rgba(255,255,255,1);
        padding: 0 20px;
        i {
          font-style: normal;
          color: #fff;
          &:nth-child(2) {
            margin-left: 24px;
          }
          &:last-child {
            float: right;
            display: inline-block;
            margin-top: 10px;
            width: 8px;
            height: 16px;
            border-color: #7ED321;
            border-style: solid;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
}
</style>
