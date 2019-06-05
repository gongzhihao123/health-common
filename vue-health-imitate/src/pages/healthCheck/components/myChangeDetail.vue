<template>
  <div class='myChange-detail'>
    <div class="myChange-detail-top">
      <header>
        体检信息
        <!-- <el-button type="primary" size="small">查看全部体检信息</el-button> -->
      </header>

      <main>
        <el-row>
          <el-col :span="6">
            <i>姓名：</i>
            <span>
              {{ detail.studentName }}
            </span>
          </el-col>
          <el-col :span="6">
            <i>教育ID：</i>
            <span>
              {{ detail.tempEduid ? detail.tempEduid : detail.jyid }}
            </span>
          </el-col>
          <el-col :span="6">
            <i>性别：</i>
            <span>
              {{ detail.sex === 1 ? '男' : '女' }}
            </span>
          </el-col>
          <el-col :span="6">
            <i>生日：</i>
            <span>
              {{ detail.birthday | dateFormat('yyyy-MM-dd') }}
            </span>
          </el-col>
          <el-col :span="6">
            <i>学校：</i>
            <span>
              {{ detail.schoolName }}
            </span>
          </el-col>
          <el-col :span="6">
            <i>年级：</i>
            <span>
              {{ detail.gradeName }}
            </span>
          </el-col>
          <el-col :span="6">
            <i>班级：</i>
            <span>
              {{ detail.className }}
            </span>
          </el-col>
          <el-col :span="6">
            <i>体检日期：</i>
            <span>
              {{ detail.examDate | dateFormat('yyyy-MM-dd') }}
            </span>
          </el-col>
        </el-row>

        <template>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label-class-name="head"
              prop="projectName"
              label="体检项目">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="currentVal"
              :label="detail.checkState === 1 ? '变更前' : '当前值'">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="val"
              label="变更后">
            </el-table-column>
          </el-table>
        </template>
      </main>
    </div>

    <div class="myChange-detail-middle">
      <header>
        申请信息
      </header>

      <main>
        <el-row>
          <el-col :span="12">
            <i>申请人姓名：</i>
            <span>
              {{ detail.createdUserName }}
            </span>
          </el-col>
          <el-col :span="12">
            <i>申请时间：</i>
            <span>
              {{ detail.createdTime | dateFormat('yyyy-MM-dd') }}
            </span>
          </el-col>
          <el-col :span="24">
            <i>变更原因：</i>
            <span>
              {{ detail.reason }}
            </span>
          </el-col>
        </el-row>
      </main>
    </div>

    <div class="myChange-detail-bottom" v-if="isMy && detail.checkState === 0">

      <header>
        审核信息
      </header>

      <main>
        <p>
          <span style="color: #FF9933;">
            待审核
          </span>
        </p>
      </main>
    </div>
    <div class="myChange-detail-bottom" v-if="detail.checkState === 1">

      <img src="../../../assets/images/pass.png" alt="">

      <header>
        审核信息
      </header>

      <main>
        <p>
          <span>
            已通过
          </span>
        </p>

        <el-row>
          <el-col :span="12">
            <i>审核人姓名：</i>
            <span>
              {{ detail.checkUserName }}
            </span>
          </el-col>
          <el-col :span="12">
            <i>审核时间：</i>
            <span>
              {{ detail.checkTime | dateFormat('yyyy-MM-dd') }}
            </span>
          </el-col>
        </el-row>
      </main>
    </div>
    <div class="myChange-detail-bottom" v-if="detail.checkState === 2">

      <img src="../../../assets/images/rejected.png" alt="">

      <header>
        审核信息
      </header>

      <main>
        <p>
          <span style="color: #F17B7B;">
            已驳回：{{ detail.checkOpinion }}
          </span>
        </p>

        <el-row>
          <el-col :span="12">
            <i>审核人姓名：</i>
            <span>
              {{ detail.checkUserName }}
            </span>
          </el-col>
          <el-col :span="12">
            <i>审核时间：</i>
            <span>
              {{ detail.checkTime | dateFormat('yyyy-MM-dd') }}
            </span>
          </el-col>
        </el-row>
      </main>
    </div>

    <footer v-if="!isMy">
      <el-button v-if="!detail.checkState" type="success" @click="check(1)"> 通过 </el-button>
      <el-button v-if="!detail.checkState" type="danger" @click="check(2)"> 驳回 </el-button>
      <el-button type="warning" @click="cancel"> 取消 </el-button>
    </footer>

    <el-dialog
      title="驳回原因"
      :visible.sync="dialogVisible"
      width="620px">

      <el-form :model="ruleForm" v-if="dialogVisible" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="reason">
          <span>请填写驳回原因</span>
          <el-input type="textarea" v-model.trim="ruleForm.reason" :maxlength="80" :rows="5"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
        <el-button type="danger" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myList from '../../../components/list.js'
export default {
  name: 'myChange-detail',
  data () {
    return {
      myList: myList,
      detail: {},
      dialogVisible: false,
      rules: {
        reason: [
          { required: true, message: '请填写驳回原因', trigger: 'blur' }
        ]
      },
      ruleForm: {
        reason: ''
      },
      tableData: [],
      isMy: true
    }
  },
  methods: {
    check (val) {
      if (val === 1) {
        this.$store.dispatch('examChangeCheckChange', {
          changeId: this.detail.id,
          checkState: 1,
          checkOpinion: ''
        })
        this.$router.push('/healthCheck/changeCheck')
      } else {
        this.dialogVisible = true
      }
    },
    // 确定按钮
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('examChangeCheckChange', {
            changeId: this.detail.id,
            checkState: 2,
            checkOpinion: this.ruleForm.reason
          })
          this.$router.push('/healthCheck/changeCheck')
        }
      })
    },
    // 取消按钮
    cancel () {
      this.$router.push('/healthCheck/changeCheck')
    }
  },
  watch: {
  },
  created () {
    this.detail = JSON.parse(sessionStorage.HEALTH_DETAIL)
    this.isMy = JSON.parse(sessionStorage.HEALTH_ISMY)
    this.detail.projectList.forEach(child => {
      if (child.projectId !== 'qc' && child.projectId !== 'yy' && child.projectId !== 'sg' && child.projectId !== 'tz' && child.projectId !== 'fhl' && child.projectId !== 'xss' && child.projectId !== 'xy1' && child.projectId !== 'xy2' && child.projectId !== 'sl' && child.projectId !== 'jzsl') {
        let i
        this.myList.forEach((item, index) => {
          if (item.projectId === child.projectId) {
            i = index
          }
        })
        if (!child.currentValue2) {
          child.currentValue2 = ''
        }
        if (this.detail.checkState === 1) {
          this.tableData.push({ projectName: child.projectName, currentVal: (child.historyValue1 ? this.myList[i].contentList.filter(item => child.historyValue1 === item.code)[0].name + (child.historyValue2 ? child.historyValue2 : '') : '未检测'), val: (child.value1 ? this.myList[i].contentList.filter(item => child.value1 === item.code)[0].name : '未检测') })
        } else {
          this.tableData.push({ projectName: child.projectName, currentVal: (child.currentValue1 ? this.myList[i].contentList.filter(item => child.currentValue1 === item.code)[0].name + child.currentValue2 : '未检测'), val: (child.value1 ? this.myList[i].contentList.filter(item => child.value1 === item.code)[0].name : '未检测') })
        }
      }
      if (child.projectId === 'qc') {
        if (!child.currentValue1) {
          child.currentValue1 = '99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99'
          child.currentValue2 = '99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99_99'
        }
        child.value1.split('_').forEach((item, index) => {
          child.currentValue1.split('_').forEach((cur, i) => {
            let name
            let num
            if (index <= 4) {
              name = '乳牙左上'
              num = 6 - (index + 1)
            } else if (index >= 5 && index <= 9) {
              name = '乳牙右上'
              num = index + 1 - 5
            } else if (index >= 10 && index <= 14) {
              name = '乳牙左下'
              num = 6 - (index + 1 - 10)
            } else if (index >= 15 && index <= 19) {
              name = '乳牙右下'
              num = index + 1 - 15
            }
            if (index === i && item !== cur) {
              this.tableData.push({ projectName: `${name}第${num}颗`, currentVal: this.myList[12].contentList.filter(a => cur === a.code)[0].name, val: this.myList[12].contentList.filter(a => item === a.code)[0].name })
            }
          })
        })
        child.value2.split('_').forEach((item, index) => {
          child.currentValue2.split('_').forEach((cur, i) => {
            let name
            let num
            if (index <= 6) {
              name = '恒牙左上'
              num = index + 1
            } else if (index >= 7 && index <= 13) {
              name = '恒牙右上'
              num = index + 1 - 7
            } else if (index >= 14 && index <= 20) {
              name = '恒牙左下'
              num = 8 - (index + 1 - 14)
            } else if (index >= 21 && index <= 27) {
              name = '恒牙右下'
              num = index + 1 - 21
            }
            if (index === i && item !== cur) {
              this.tableData.push({ projectName: `${name}第${num}颗`, currentVal: this.myList[12].contentList.filter(a => cur === a.code)[0].name, val: this.myList[12].contentList.filter(a => item === a.code)[0].name })
            }
          })
        })
      }
      if (child.projectId === 'sg' || child.projectId === 'tz' || child.projectId === 'fhl' || child.projectId === 'xss') {
        if (this.detail.checkState === 1) {
          this.tableData.push({ projectName: child.projectName, currentVal: (child.historyValue1 || child.historyValue2) ? child.historyValue1 + child.historyValue2 : '未检测', val: (child.value1 || child.value2) ? child.value1 + child.value2 : '未检测' })
        } else {
          this.tableData.push({ projectName: child.projectName, currentVal: (child.currentValue1 || child.currentValue2) ? child.currentValue1 + child.currentValue2 : '未检测', val: (child.value1 || child.value2) ? child.value1 + child.value2 : '未检测' })
        }
      }
      if (child.projectId === 'xy1' || child.projectId === 'xy2' || child.projectId === 'sl' || child.projectId === 'jzsl') {
        if (this.detail.checkState === 1) {
          this.tableData.push({ projectName: child.projectName, currentVal: (child.historyValue1 || child.historyValue2) ? child.historyValue1 + '、' + child.historyValue2 : '未检测', val: (child.value1 || child.value2) ? child.value1 + '、' + child.value2 : '未检测' })
        } else {
          this.tableData.push({ projectName: child.projectName, currentVal: (child.currentValue1 || child.currentValue2) ? child.currentValue1 + '、' + child.currentValue2 : '未检测', val: (child.value1 || child.value2) ? child.value1 + '、' + child.value2 : '未检测' })
        }
      }
      if (child.projectId === 'yy') {
        if (!child.currentValue1) {
          child.currentValue1 = '9_9_9_9_9_9'
        }
        child.value1.split('_').forEach((item, index) => {
          child.currentValue1.split('_').forEach((cur, i) => {
            let name
            if (index === 0) {
              name = '上方牙龈左侧'
            } else if (index === 1) {
              name = '上方牙龈中间'
            } else if (index === 2) {
              name = '上方牙龈右侧'
            } else if (index === 3) {
              name = '下方牙龈左侧'
            } else if (index === 4) {
              name = '下方牙龈中间'
            } else if (index === 5) {
              name = '下方牙龈右侧'
            }
            if (index === i && item !== cur) {
              this.tableData.push({ projectName: `${name}`, currentVal: this.myList[13].contentList.filter(a => cur === a.code)[0].name, val: this.myList[13].contentList.filter(a => item === a.code)[0].name })
            }
          })
        })
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/variable.scss';
@import '../../../assets/scss/mixin.scss';
.myChange-detail {
  margin-top: 20px;
  &>div {
    background: #fff;
    border-radius: 5px;
  }

  header {
    padding: 15px 20px;
    color: #7397FF;
    border-bottom: 1px solid #E6E6E6;
    font-size: 15px;
  }

  .el-col {
    padding-bottom: 10px;
    i {
      font-style: normal;
      color: #C8C8C8;
    }
    span {
      color: #6F6F6F;
    }
  }

  main {
    padding: 20px;
  }

  &>.myChange-detail-top {
    header {
      .el-button {
        float: right;
        margin-top: -5px;
      }
    }
    &>main {
      .el-table {
        margin-top: 10px;
        th {
          &:nth-child(3){
            // border-top-right-radius: 8px;
            // border-bottom-right-radius: 8px;
          }
        }
      }
    }
  }

  &>.myChange-detail-middle {
    margin: 20px 0;
  }

  &>.myChange-detail-bottom {
    position: relative;
    img {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    &>main {
      &>p {
        margin-bottom: 10px;
        span {
          color: #90DE9F;
          font-size: 15px;
        }
      }
    }
  }

  &>footer {
    margin-top: 20px;
    text-align: center;
    .el-button {
      padding: 10px 50px;
    }
  }

  .el-dialog__wrapper {
    background: transparent;
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
