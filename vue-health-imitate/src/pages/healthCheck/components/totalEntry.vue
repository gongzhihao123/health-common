<template>
  <div class='total-entry'>
    <header>
      <el-row>
        <el-col :span="2">
          <!-- <img src="../../../assets/images/nav_1_active.png" alt=""> -->
        </el-col>
        <el-col :span="16">
          <div>
            <p>
              姓名
            </p>
            <p>
              <span v-if="studentExam.studentName && studentExam.studentName.length < 5">
                {{ studentExam.studentName }}
              </span>
              <el-popover
                v-else
                placement="bottom"
                width="150"
                trigger="hover"
                :content="studentExam.studentName">
                <span slot="reference">{{ studentExam.studentName && studentExam.studentName.slice(0, 4) + '...' }}</span>
              </el-popover>
            </p>
          </div>
          <div>
            <p>
              教育ID
            </p>
            <p>
              {{ studentExam.tempFlag ? studentExam.tempEduid : studentExam.jyid }}
            </p>
          </div>
          <div>
            <p>
              性别
            </p>
            <p>
              {{ studentExam.sex === 1 ? '男' : '女' }}
            </p>
          </div>
          <div>
            <p>
              出生日期
            </p>
            <p>
              {{ studentExam.birthday | dateFormat('yyyy-MM-dd') }}
            </p>
          </div>
          <div>
            <p>
              学校
            </p>
            <p>
              <span v-if="studentExam.schoolName && studentExam.schoolName.length < 12">{{ studentExam.schoolName }}</span>
              <el-popover
                v-else
                placement="bottom"
                width="150"
                trigger="hover"
                :content="studentExam.schoolName">
                <span slot="reference">{{ studentExam.schoolName && studentExam.schoolName.slice(0, 11) + '...' }}</span>
              </el-popover>
            </p>
          </div>
          <div>
            <p>
              年级
            </p>
            <p>
              {{ studentExam.gradeName }}
            </p>
          </div>
          <div>
            <p>
              班级
            </p>
            <p>
              {{ studentExam.className }}
            </p>
          </div>
        </el-col>
        <el-col :span="8">
          <!-- <i></i> -->
          <span>
            体检日期：
          </span>
          <el-date-picker
            @change="dateChange"
            v-model="dateValue"
            :picker-options="pickerOptions"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-button size="small" type="primary" @click="fillDefault">填默认值</el-button>
        </el-col>
      </el-row>
    </header>

    <main>
      <div class="collection">
        <projectCollection v-bind:myList="myList" v-bind:studentExam="studentExam" v-bind:fill="fill" v-bind:checkout="checkout" @change="change"></projectCollection>
      </div>

      <div class="tooth">
        <tooth v-bind:myList="myList" v-bind:studentExam="studentExam" v-bind:fill="fill" v-bind:toothCheckout="toothCheckout" v-bind:yyCheckout="yyCheckout" @toothChange="toothChange" @yyChange="yyChange"></tooth>
      </div>

      <div class="body">
        <bodyComposition v-bind:studentExam="studentExam" @tcfChange="tcfChange" v-bind:tcfCheckout="tcfCheckout" v-bind:qgdCheckout="qgdCheckout" @qgdChange="qgdChange"></bodyComposition>
      </div>

      <footer>
        <input type="text" ref="sureSubmit" style="display:none;">
        <el-button type="primary" v-if="!isEdit" :disabled="canSave" @click="sureSub" @keyup.enter.native="sureSub">确 定</el-button>
        <el-button type="danger" @click="cancel">取 消</el-button>
      </footer>
    </main>

    <div class="mask-layer" v-if="isEdit">
    </div>
  </div>
</template>

<script>
import projectCollection from '../../../components/projectCollection.vue'
import tooth from '../../../components/tooth.vue'
import bodyComposition from '../../../components/bodyComposition.vue'
import { success } from '../../../utils/index'
import { dateFormat } from '../../../filters/index'
import myList from '../../../components/list.js'
export default {
  name: 'total-entry',
  data () {
    return {
      arrList: [],
      isEdit: false,
      myList: myList,
      saveList: [],
      toothList: [],
      yyList: [],
      tcfList: [],
      qgdList: [],
      examinationId: '',
      dateValue: '',
      studentExam: {},
      projectList: [],
      allData: {},
      checkout: true,
      toothCheckout: true,
      yyCheckout: true,
      tcfCheckout: true,
      qgdCheckout: true,
      fill: true,
      canSave: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  components: {
    tooth,
    bodyComposition,
    projectCollection
  },
  methods: {
    // 修改体检日期
    dateChange () {
      this.$store.dispatch('editExaminationDate', {
        studentId: this.$route.query.para,
        examinationDate: dateFormat(this.dateValue, 'yyyy-MM-dd HH:mm:ss')
      })
    },
    fillDefault () {
      this.fill = !this.fill
    },
    // 确定
    async confirm () {
      if (this.saveList.length === 0 && this.toothList.length === 0 && this.yyList.length === 0 && this.tcfList.length === 0 && this.qgdList.length === 0) {
        success('保存成功')
        this.$router.push('healthCheck/checkManage')
      } else {
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
        this.arrList = this.saveList.concat(this.toothList).concat(this.yyList).concat(this.qgdList).concat(this.tcfList)
        this.arrList.forEach((item, index) => {
          this.projectList.forEach(child => {
            if (!child.value1 && (item.projectId === 'yy' || item.projectId === 'qc' || item.projectId === 'qgd' || item.projectId === 'tcf')) {
              child.value1 = ''
            }
            if (!child.value2 && (item.projectId === 'yy' || item.projectId === 'qc' || item.projectId === 'qgd' || item.projectId === 'tcf')) {
              child.value2 = ''
            }
            if (item.projectId === child.projectId && (item.projectId === 'yy' || item.projectId === 'qc' || item.projectId === 'qgd' || item.projectId === 'tcf')) {
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
        if (para) {
          this.canSave = true
          await this.$store.dispatch('saveExamData', {
            projectJson: JSON.stringify(this.saveList.concat(this.tcfList.filter(item => item.projectId)).concat(this.qgdList.filter(item => item.projectId)).concat(this.arrList.filter(item => item.projectId)))
          })
          this.canSave = false
          await success('保存成功')
          await this.$router.push('healthCheck/checkManage')
        }
      }
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
    cancel () {
      this.$router.push(sessionStorage.HEALTH_BEFORE_PATH)
    },
    sureSub () {
      if (this.saveList.length || this.toothList.length || this.yyList.length || this.qgdList.length || this.tcfList.length) {
        let variab = true
        let arr1 = []
        arr1 = this.saveList.filter(item => item.sureSg === '1').concat(this.saveList.filter(item => item.sureTz === '1')).concat(this.saveList.filter(item => item.sureXss === '1')).concat(this.saveList.filter(item => item.sureFhl === '1')).concat(this.saveList.filter(item => item.sureXy1ss === '1')).concat(this.saveList.filter(item => item.sureXy1sz === '1')).concat(this.saveList.filter(item => item.sureXy2ss === '1')).concat(this.saveList.filter(item => item.sureXy2sz === '1')).concat(this.saveList.filter(item => item.sureSlz === '1')).concat(this.saveList.filter(item => item.sureSly === '1')).concat(this.saveList.filter(item => item.sureJzslz === '1')).concat(this.saveList.filter(item => item.sureJzsly === '1'))
        this.subMessg = arr1.map(item => { return item.name }).join()
        if (this.saveList.length) {
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
    // 获取学生体检信息详情
    async getStudentExamDetail () {
      let path
      if (sessionStorage.HEALTH_BEFORE_PATH === '/dataAnalysis/anomaly') {
        path = 'examProjectAbnormalGetStudentExamDetail'
        let data = await this.$store.dispatch(path, {
          xn: '2017',
          xsid: this.$route.query.para
        })
        this.studentExam = data
        this.dateValue = this.studentExam.examinationDate
      } else {
        if (sessionStorage.HEALTH_BEFORE_PATH === '/healthCheck/checkManage') {
          path = 'examInfoGetStudentExamDetail'
        } else {
          path = 'schoolExamInfoGetStudentExamDetail'
        }
        let data = await this.$store.dispatch(path, {
          studentId: this.$route.query.para
        })
        this.studentExam = data
        this.projectList = data.projectList
        this.dateValue = this.studentExam.examinationDate
      }
    }
  },
  watch: {
  },
  async created () {
    // await this.checkExaminationExisit()
    if (sessionStorage.HEALTH_BEFORE_PATH === '/healthCheck/checkManage') {
      this.isEdit = false
    } else {
      this.isEdit = true
    }
    await this.getStudentExamDetail()
    // let num = 0
    document.onkeydown = (e) => {
      const href = window.location.href
      let url = href.slice(href.indexOf('#') + 1)
      if (url.indexOf('/totalEntry') !== -1) {
        if (e.which === 13) {
          this.$refs.sureSubmit.focus()
          setTimeout(() => {
            this.sureSub()
          }, 400)
        }
        if (e.which === 113) {
          this.fill = !this.fill
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/variable.scss';
@import '../../../assets/scss/mixin.scss';
.total-entry {
  width: 1200px;
  margin-top: 20px;
  border-radius: 5px;
  position: relative;
  margin: 0 auto;
  header {
    padding: 10px 20px;
    background: #fff;
    border-radius: 5px;

    .el-row {
      height: 50px;
      .el-col:nth-child(1) {
        img {
          width: 50px;
        }
      }
      .el-col:nth-child(2) {
        padding-top: 5px;
        &>div {
          display: inline-block;
          width: 90px;
          p:nth-child(1) {
            padding-bottom: 5px;
            color: #BEBEBE;
          }
          p:nth-child(2) {
            color: #666666;
            font-size: 15px;
          }
          &:nth-child(1) {
            p:nth-child(2) {
              color: #6E94FF;
            }
          }
          &:nth-child(2) {
            width: 120px;
          }
          &:nth-child(3) {
            width: 50px;
          }
          &:nth-child(5) {
            width: 190px;
          }
          &:nth-child(6) {
            width: 70px;
          }
          &:nth-child(7) {
            width: 70px;
          }
        }
      }
      .el-col:nth-child(3) {
        text-align: right;
        padding-top: 5px;
        position: relative;
        &>span {
          color: #737373;
        }
        &>i {
          position: absolute;
          height: 20px;
          border-left: 1px solid #A4A4A4;
          left: 0;
          top: 15px;
        }
        &> .el-button {
          padding: 13px 15px;
        }
      }
    }
  }

  main {
    margin-top: 20px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;

    div.body,div.tooth {
      margin-top: 20px;
    }
    footer {
      margin-top: 20px;
      text-align: center;
      .el-button {
        padding: 10px 40px;
      }
    }
  }

  .mask-layer {
    position: absolute;
    background: rgba(234,239,248, 0.3);
    z-index: 1001;
    top: 0;
    bottom: 60px;
    left: 0;
    right: 0;
  }
}
</style>
