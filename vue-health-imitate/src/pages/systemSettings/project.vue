<template>
  <div class='system-settings-project'>
    <main>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label-class-name="head"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="account"
            label-class-name="head"
            label="账号">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="getProjectProject(scope.row)">体检项目设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <el-pagination
        v-if="totalCount !== 0"
        @current-change="handleCurrentChange"
        :current-page.sync="pageNo"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </main>

    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      width="620px">

      <el-form :model="ruleForm" v-if="dialogVisible" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="role">
          <el-checkbox @change="change(item)" v-model="item.selectedFlag" v-for="(item, index) in dialogList" :key="index">{{ item.name }}</el-checkbox>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="confirm('ruleForm')">关 闭</el-button> -->
        <!-- <el-button type="danger" @click="dialogVisible = false">取 消</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'system-settings-project',
  data () {
    return {
      pageNo: 1,
      totalCount: 0,
      rules: {
        role: [
          { required: false, message: '请选择体检项目', trigger: 'change' }
        ]
      },
      ruleForm: {
        role: []
      },
      dialogVisible: false,
      titleName: '体检项目设置',
      tableData: [],
      dialogList: [],
      userId: ''
    }
  },
  methods: {
    // 确定
    confirm (formName) {
      this.dialogVisible = false
      // this.ruleForm.role = this.dialogList.filter(item => item.flag === true)
      // this.$refs[formName].validate(async (valid) => {
      //   if (valid) {
      //     await this.$store.dispatch('projectProjectEdit', {
      //       userId: this.userId,
      //       projectId: this.dialogList.filter(item => item.flag === true).map(item => item.id).join(',')
      //     })
      //     this.dialogVisible = false
      //     await this.getProjectList()
      //   }
      // })
    },
    async change (item) {
      await this.$store.dispatch('projectProjectEdit', {
        userId: this.userId,
        projectId: item.id
      })
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getProjectList()
    },
    // 获取列表
    async getProjectList () {
      let data = await this.$store.dispatch('projectList', {
        pageNo: this.pageNo,
        pageSize: 10
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
    },
    async getProjectProject (val) {
      this.dialogVisible = true
      this.userId = val.id
      let data = await this.$store.dispatch('projectProject', {
        userId: val.id
      })
      this.dialogList = data.map(item => ({...item, selectedFlag: item.userProjectId != null}))
    }
  },
  watch: {
    dialogVisible () {
      if (!this.dialogVisible) {
        this.dialogList = []
      }
    }
  },
  created () {
    this.getProjectList()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.system-settings-project {
  background: #fff;
  main {
    padding: 20px;
     min-height: calc(100vh - 165px);
    .el-table {
      th {
        &:nth-child(3){
          // border-top-right-radius: 8px;
          // border-bottom-right-radius: 8px;
        }
      }
    }
  }

  .el-dialog {
    .el-dialog__body {
      padding-left: 60px;
    }
    .el-form-item__content {
      margin-left: 0!important;
      .el-checkbox {
        margin-left: 0;
        // margin-right: 30px;
        width: 100px;
      }
    }
  }
}
</style>
