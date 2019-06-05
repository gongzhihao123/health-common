<template>
  <div class='data-management-unusualMessage'>
    <div class="buttons">
      <el-button @click="flag = 1">体检项目管理</el-button>
      <el-button @click="flag = 2">项目内容管理</el-button>
      <el-button @click="flag = 3">体检反馈标准</el-button>
    </div>
    <div class="content">
      <!-- 体检项目管理 -->
      <div class="checkM" v-if="flag === 1" v-loading="loading">
        <h2>体检项目管理</h2>
        <div class="checkbox">
            <el-checkbox v-for="(check, index) in checklist" :label="check.name" :key="index" v-model="check.flag">{{check.name}}</el-checkbox>
        </div>
        <div class="slot">
          <el-button @click="submit">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
      <div class="prograM" v-if="flag === 2">
        <div class="item">
          <ul>
            <li v-for="(item, index) in checks" :key="index" @click="choose(index)" :class="{active: activeIndex === index}"><span>{{item.name}}</span></li>
          </ul>
        </div>
        <div class="item-content">
        <el-table
              v-loading="loading"
              :data="tableData"
              stripe
              width="100%">
              <el-table-column
                label="项目内容"
                show-overflow-tooltip
                label-class-name="head"
                prop="name">
              </el-table-column>
              <el-table-column
                prop="code"
                label="对应代码"
                show-overflow-tooltip
                label-class-name="head">
              </el-table-column>
              <el-table-column
                prop="suggest"
                show-overflow-tooltip
                label-class-name="head"
                label="反馈建议">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                label-class-name="head"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button  @click="edit(scope.row)">编辑</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="standard"  v-if="flag === 3">
        <el-radio-group v-model="stand" @change="set">
          <el-radio :label="1">85标准</el-radio>
          <el-radio :label="2">BMI标准</el-radio>
        </el-radio-group>
      </div>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialog"
      class="addDia"
      :before-close="handleClose">
      <el-form :model="ruleForm" v-if="dialog" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="反馈意见:" prop="message">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model.trim="ruleForm.message">
          </el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          <el-button @click="dialog = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'data-management-unusualMessage',
  data () {
    return {
      loading: false,
      dialog: false,
      row: {},
      checked: [],
      ruleForm: {
        message: ''
      },
      rules: {
        message: [
          { required: true, message: '请输入反馈意见', trigger: 'blur' }
        ]
      },
      tableData: [],
      list: [
        {name: '心脏'},
        {name: '肺'},
        {name: '肝脾'},
        {name: '心率'},
        {name: '头颈'},
        {name: '脊柱'},
        {name: '皮肤'},
        {name: '四肢关节'},
        {name: '胸部'},
        {name: '沙眼'},
        {name: '色觉'},
        {name: '结膜炎'},
        {name: '龋齿'},
        {name: '牙龈'},
        {name: '肝功能'},
        {name: '便检'},
        {name: 'PPD实验'}
      ],
      flag: 1,
      stand: '',
      checks: [],
      checklist: [],
      checkedCities: [],
      activeIndex: 0
    }
  },
  methods: {
    choose (index) {
      this.activeIndex = index
      this.projectContentList()
    },
    async projectContentList () {
      this.loading = true
      this.tableData = await this.$store.dispatch('projectContentList', {
        projectId: this.checks[this.activeIndex].id
      })
      this.loading = false
    },
    async submit () {
      await this.$store.dispatch('projectChange', {
        listJson: '[' + this.checklist.map(item => JSON.stringify(item)).join(',') + ']'
      })
      this.projectLists()
    },
    cancel () {
      this.checklist = []
      this.projectLists()
      this.checklist.map(item => {
        if (item.flag) {
          this.checkedCities.push(item.name)
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('editContentSuggest', {
            contentId: this.row.id,
            suggest: this.ruleForm.message
          })
          this.dialog = false
          this.projectContentList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    edit (row) {
      this.row = row
      this.dialog = true
      this.ruleForm.message = row.suggest
    },
    handleClose () {
      this.dialog = false
    },
    async getproject () {
      this.checks = await this.$store.dispatch('getproject', {
        userId: this.$store.state.user.id
      })
      this.projectContentList()
    },
    async set () {
      await this.$store.dispatch('set', {
        standard: this.stand
      })
    },
    async setting () {
      const data = await this.$store.dispatch('setting')
      this.stand = data.feedbackStandard
    },
    async projectLists () {
      this.checkedCities = []
      this.loading = true
      this.checklist = await this.$store.dispatch('projectLists')
      this.checklist.map(item => {
        if (item.flag) {
          this.checkedCities.push(item.name)
        }
      })
      this.loading = false
    }
  },
  watch: {},
  async created () {
    this.loading = true
    await this.getproject()
    await this.setting()
    await this.projectLists()
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-management-unusualMessage {
  ::-webkit-scrollbar {
      width: 5px;
      // display: none;
      color: #ddd;
    }
  .buttons {
    margin-bottom: 22px;
    .el-button {
      margin-right: 20px;
      padding: 10px 22px;
      background: #6E94FF;
      border-color: #6E94FF;
      color: #fff;
    }
  }
  .content {
    height: 772px;
    background: #fff;
    border-radius: 4px;
    .checkM {
      position: relative;
      height: inherit;
      h2 {
        font-size: 16px;
        // font-weight: normal;
        border-bottom: 1px solid #ccc;
        padding: 20px;
        margin-bottom: 30px;
        color: #6E94FF;
      }
      .checkbox {
        padding: 0px 50px;
        margin-top: 20px;
        .el-checkbox {
          margin: 20px 0px 50px 0px;
          width: 150px;
        }
      }
      .slot {
        position: absolute;
        bottom: 20px;
        text-align: center;
        left: 50%;
        transform: translateX(-50%);
        .el-button {
          padding: 10px 55px;
          color: #fff;
          &:nth-child(1) {
            background: #6E94FF;
            border-color: #6E94FF;
          }
          &:nth-child(2) {
            background: #F17B7B;
            border-color: #F17B7B;
          }
        }
      }
    }
    .prograM {
      height: inherit;
      @extend .clearfix;

    .el-table {
        margin-top: 4px;
      }
      .el-table::before {
        display: none;
      }
      .el-table td {
        padding-top: 5px;
        padding-bottom: 5px;
        color: #666;
        &:last-child {
          .el-button {
            padding: 10px 18px;
            background: #6E94FF;
            border-color: #6E94FF;
            color: #fff;
          }
        }
      }
      .el-table th.is-leaf {
        border: none !important;
        padding-top: 10px;
        padding-bottom: 10px;
      }

        .el-table .head  {
          background: #ABC1FE;
        }
        .el-table__body {
          tr {
            &:hover {
              td {
                &:first-child {
                  border-top-left-radius: 8px;
                  border-bottom-left-radius: 8px;
                }
                &:nth-child(4){
                  border-top-right-radius: 8px;
                  border-bottom-right-radius: 8px;
                }
              }
            }
          }
        }
        .el-table__header {
          // width: auto !important;
          margin-bottom: 20px;

          tr {
            /* background: #EBEEF7; */
            border-radius: 4px;
            th {
              &:first-child {
                border-top-left-radius: 8px;
                border-bottom-left-radius: 8px;
              }
              &:nth-child(4){
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
              }
            }
          }
        }
      .item {
        width: 170px;
        float: left;
        border-right: 1px solid #ccc;
        padding: 0px 30px;
        box-sizing: border-box;
        overflow-y: scroll;
        height: inherit;
        ul {
          width: 90px;
          display: block;
          margin: 20px auto 0px auto;
          li {
            cursor: pointer;
            line-height: 40px;
            text-align: center;
            margin-bottom: 20px;
            span {
              color: #6E94FF;
            }
          }
          .active {
            span {
            background: #9EB4F1;
            color: #fff;
            width: 90px;
            height: 32px;
            display: inline-block;
            border-radius: 4px;
            line-height: 32px;
            }
          }
        }
      }
      .item-content {
        padding: 20px;
        float: left;
        width: calc(100% - 210px);
      }
    }
    .standard {
      .el-radio-group {
        margin-top: 60px;
        margin-left: 60px;
        .el-radio {
          margin-right: 65px;
        }
      }
    }
  }
    .el-dialog {
      width: 435px;
      height: 395px;
      position: relative;
    }
    .el-dialog .el-dialog__header span {
      font-size: 16px;
    }
    .el-dialog__body {
      @extend .clearfix;
      margin-top: 30px;

      .el-textarea__inner {
        resize: none;
      }
    }
    .el-form-item__content {
      margin-left: 70px !important;
    }
    .el-form-item {
      height: 40px;
      margin-bottom: 20px;
      &:nth-child(2) {
        @extend .clearfix;
        .el-select {
          float: left;
          width: 100px;
          margin-right: 12px;
          .el-input {
            width: 100px;
          }
        }
        .el-select .el-input__inner {
          width: 100px;
        }
        .el-input {
          float: left;
          width: 198px;
        }
        .el-input__inner {
          width: 198px;
        }
      }
      .el-input__inner {
        height: 33px;
      }
    }
    .el-form-item__label {
      display: block;
      text-align: justify;
      padding: 0px;
      height: 40px;
      width: 65px !important;
      &::before {
        display: none;
      }
      &:after{
        display: inline-block;
        content: '';
        overflow: hidden;
        width: 100%;
        height: 0;
        line-height: 0;
      }
    }
    .el-dialog .el-dialog__footer {
        width: 80%;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      .dialog-footer {
        .el-button {
          padding: 10px 32px;
          color: #fff;
          &:first-child {
            background: #6E94FF;
            border-color: #6E94FF;
          }
          &:nth-child(2) {
            background: #F17B7B;
            border-color: #F17B7B;
          }
        }
      }
    }
}
</style>
