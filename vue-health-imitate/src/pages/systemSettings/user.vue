<template>
  <div class='system-settings-user'>
    <header>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入姓名或单位名称的搜索" v-model.trim="keyword"></el-input>
          <el-button size="small" type="success" icon="el-icon-search" @click="getUserList">搜索</el-button>
        </el-col>
        <el-col :span="16">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="add">添加</el-button>
          <el-button :disabled="selectedUser.length === 0" size="small" type="primary" icon="el-icon-circle-check-outline" @click="lock">批量启用 / 禁用</el-button>
          <!-- <el-button :disabled="selectedUser.length === 0" size="small" type="warning" icon="el-icon-remove-outline" @click="lock">批量禁用</el-button> -->
          <el-button size="small" type="danger" icon="el-icon-download" @click="downloadTemplate">下载模板</el-button>
          <el-upload
            style="display: inline-block;"
            class="upload-demo"
            :show-file-list="false"
            :action="action"
            :on-success="success"
            :before-upload="beforeUpload">
            <el-button size="small" type="primary"><i style="font-size: 12px;margin-right: 5px;" class="iconfont icon-daoru"></i>批量导入</el-button>
          </el-upload>
          <el-button size="small" type="primary" @click="batchExport"><i style="font-size: 12px;margin-right: 5px;" class="iconfont icon-daochu"></i>批量导出</el-button>
        </el-col>
      </el-row>
    </header>

    <main>
      <template>
        <el-table
          @selection-change="handleSelectionChange"
          stripe
          :data="tableData"
          style="width: 100%">
          <el-table-column
            type="selection"
            label-class-name="head"
            width="55">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="account"
            label="账号">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="name"
            show-overflow-tooltip
            label="角色">
             <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.roles" :key="index">
                {{ item.name }}
                <i v-if="index !== scope.row.roles.length - 1">、</i>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="school.xxmc"
            show-overflow-tooltip
            label="单位">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="name"
            width="160"
            show-overflow-tooltip
            label="最近登录时间">
            <template slot-scope="scope">
              {{ scope.row.lastLoginTime | dateFormat('yyyy-MM-dd HH:mm') }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            label="状态">
            <template slot-scope="scope">
              {{ scope.row.lockFlag === true ? '禁用' : '正常' }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            width="270"
            label="操作">
            <template slot-scope="scope">
              <el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
              <el-button type="primary" size="small" @click="userReset(scope.row)">重置密码</el-button>
              <el-button :type="scope.row.lockFlag === true ? 'success' : 'warning'" size="small" @click="singleLock(scope.row)">
                {{ scope.row.lockFlag === true ? '启用' : '禁用' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          v-if="totalCount !== 0"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNo"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </template>
    </main>

    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      width="620px">

      <el-form :model="ruleForm" v-if="dialogVisible" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号：" prop="code">
          <el-input v-model.trim="ruleForm.code" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="单位：" prop="company">
          <el-select style="width: 420px;" clearable filterable v-model="ruleForm.company" placeholder="请选择">
          <el-option
            v-for="item in schoolList"
            :key="item.xxdm"
            :label="item.xxmc"
            :value="item.xxdm">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="角色：" prop="role">
          <el-checkbox v-model="item.flag" v-for="(item, index) in userRoleList" :key="index">{{ item.name }}</el-checkbox>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm('ruleForm')" :disabled="canSave">确 定</el-button>
        <el-button type="danger" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { success, notice } from '../../utils/index'
export default {
  name: 'system-settings-user',
  data () {
    return {
      canSave: false,
      action: '',
      keyword: '',
      totalCount: 0,
      pageNo: 1,
      titleName: '',
      rules: {
        code: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        company: [
          { required: false, message: '', trigger: '' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },
      ruleForm: {
        code: '',
        name: '',
        company: '',
        role: []
      },
      dialogVisible: false,
      tableData: [],
      userRoleList: [],
      selectedUser: [],
      schoolList: [],
      userId: ''
    }
  },
  methods: {
    // 重置密码
    async userReset (val) {
      await this.$store.dispatch('userReset', {
        userId: val.id
      })
      await this.getUserList()
    },
    // 下载模版
    downloadTemplate () {
      var path = document.getElementById('contextPath').value
      window.location.href = `${path}/user/template`
    },
    beforeUpload (file) {
      if (file.name.indexOf('xls') === -1) {
        this.$message.error('请上传指定的excel文件')
        return false
      }
    },
    success (res) {
      if (res.code === 1) {
        success('导入成功')
        this.getUserList()
      } else {
        notice(res.message)
      }
    },
    // 批量禁用-启用
    async lock () {
      await this.$store.dispatch('userLock', {
        userIds: this.selectedUser.map(item => item.id).join(',')
      })
      await this.getUserList()
    },
    async singleLock (val) {
      await this.$store.dispatch('userLock', {
        userIds: val.id
      })
      await this.getUserList()
    },
    // 批量导出
    batchExport () {
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/user/batchExport`
    },
    handleSelectionChange (val) {
      this.selectedUser = val
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getUserList()
    },
    // 确定
    confirm (formName) {
      if (!(/^[0-9a-zA-Z]{4,23}$/).test(this.ruleForm.code)) {
        notice('账号需为数字或字母，最少4位')
        return
      }
      if (this.userRoleList.filter(item => item.flag === true).length === 0) {
        this.rules.role[0].required = true
      } else {
        this.rules.role[0].required = false
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.canSave = true
          let meth = ''
          if (this.titleName === '编辑') meth = 'userEdit'
          else meth = 'userAdd'
          await this.$store.dispatch(meth, {
            userId: meth === 'userAdd' ? null : this.userId,
            account: this.ruleForm.code.toLowerCase(),
            name: this.ruleForm.name,
            roleIds: this.userRoleList.filter(item => item.flag === true).map(item => item.id).join(','),
            xxdm: this.ruleForm.company
          })
          await this.getUserList()
          this.canSave = false
          this.dialogVisible = false
        }
      })
    },
    // 添加按钮
    async add () {
      this.titleName = '添加'
      this.ruleForm = {
        code: '',
        name: '',
        company: '',
        role: []
      }
      await this.getUserRoleList()
      this.dialogVisible = true
    },
    // 编辑按钮
    async edit (val) {
      this.titleName = '编辑'
      this.userId = val.id
      this.ruleForm = {
        code: val.account,
        name: val.name,
        company: val.school ? val.school.xxdm : '',
        role: []
      }
      await this.getUserRoleList()
      this.dialogVisible = true
      this.userRoleList.forEach((item) => {
        val.roles.forEach(child => {
          if (item.id === child.id) {
            item.flag = true
          }
        })
      })
    },
    // 获取用户列表
    async getUserList () {
      const data = await this.$store.dispatch('userList', {
        keyword: this.keyword,
        pageNo: this.pageNo,
        pageSize: 10
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
    },
    // 获取角色列表
    async getUserRoleList () {
      this.userRoleList = await this.$store.dispatch('userRoleList')
      this.userRoleList = this.userRoleList.map(item => ({...item, flag: false}))
    },
    // 获取学校列表
    async getSchoolList () {
      this.schoolList = await this.$store.dispatch('schoolList')
    }
  },
  mounted () {
    var path = document.getElementById('contextPath').value
    this.action = `${path}/user/batchImport`
  },
  watch: {
  },
  async created () {
    await this.getUserList()
    await this.getSchoolList()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.system-settings-user {
  header {
    .el-col:nth-child(1) {
      .el-input {
        width: 240px;
        .el-input__inner {
          height:34px;
        }
      }
    }
    .el-col:nth-child(2) {
      text-align: right;
      .el-button:nth-child(5) {
        // margin-left: 40px;
      }
    }
  }

  &>main {
    background: #fff;
    margin-top: 20px;
    min-height: calc(100vh - 215px);
    padding: 20px;
    border-radius: 5px;

    .el-table {
      th {
        &:nth-child(8){
          // border-top-right-radius: 8px;
          // border-bottom-right-radius: 8px;
        }
      }
    }
  }

  .el-dialog {
    .el-dialog__body {
      padding-right: 80px;
      .el-checkbox {
        margin-right: 20px;
        margin-left: 0px;
      }
    }
  }
}
</style>
