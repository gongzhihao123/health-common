<template>
  <div class='system-settings-role'>
    <el-button type="primary" icon="el-icon-plus" size="small" @click="add">添加</el-button>

    <main>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label-class-name="head"
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            width="300"
            label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
              <el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </main>

    <!-- 添加弹出框 -->
    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      width="780px">

      <el-form :model="ruleForm" v-if="dialogVisible" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model.trim="ruleForm.name" :maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="权限设置：">
        </el-form-item>

        <el-form-item>
          <div v-for="(item, index) in permissionOption" :key="index">
            <el-checkbox v-model="item.checkAll" @change="handleCheckAllChange(item)"> {{ item.name }} </el-checkbox>
            <el-checkbox-group v-model="item.checked" @change="handleChange(item)">
              <el-row>
                <el-col :span="8" v-for="(child, index) in item.childs" :key="index">
                  <el-checkbox :label="child"> {{child.name}} </el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
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
import { notice } from '@/utils/index'
export default {
  name: 'system-settings-role',
  data () {
    return {
      canSave: false,
      permissionOption: [],
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      ruleForm: {
        name: ''
      },
      titleName: '',
      dialogVisible: false,
      nameContent: '',
      tableData: [],
      roleId: ''
    }
  },
  methods: {
    // 确定
    confirm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let resourcesIds = []
          this.permissionOption.forEach(item => {
            if (item.checked.length !== 0) {
              resourcesIds.push({id: item.id})
              resourcesIds = resourcesIds.concat(item.checked)
            }
            if (item.checked.length === 0 && item.checkAll) {
              resourcesIds.push({id: item.id})
            }
          })
          if (resourcesIds.length === 0) {
            notice('请选择权限')
            return
          }
          this.canSave = true
          let meth = ''
          if (this.titleName === '编辑') meth = 'roleEdit'
          else meth = 'roleAdd'
          await this.$store.dispatch(meth, {
            roleId: meth === 'roleAdd' ? null : this.roleId,
            roleName: this.ruleForm.name,
            resourcesIds: resourcesIds.map(item => (item.id)).join(',')
          })
          this.canSave = false
          this.dialogVisible = false
          await this.getRoleList()
        }
      })
    },
    // 删除
    del (val) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$store.dispatch('roleDetele', val)
        await this.getRoleList()
      })
    },
    handleCheckAllChange (item) {
      item.checked = item.checkAll ? item.childs : []
    },
    handleChange (item) {
      let checkedCount = item.childs.length
      item.checkAll = checkedCount === item.checked.length
    },
    // 添加按钮
    add () {
      this.dialogVisible = true
      this.titleName = '添加'
      this.ruleForm = {
        name: ''
      }
      this.canSave = false
      this.getRoleResourceList()
    },
    // 编辑按钮
    async edit (val) {
      this.titleName = '编辑'
      this.roleId = val.id
      await this.getRoleResourceList()
      let data = await this.$store.dispatch('roleDetail', {
        roleId: val.id
      })
      this.permissionOption.forEach((item) => {
        data.forEach(child => {
          if (item.id === child.id) {
            child.childs.forEach(b => {
              if (!b.selectedFlag) {
                item.checkAll = false
              }
            })
            item.childs.forEach(a => {
              child.childs.forEach(b => {
                if (a.id === b.id && b.selectedFlag) {
                  item.checked.push(a)
                }
              })
            })
          }
        })
      })
      this.ruleForm.name = val.name
      this.dialogVisible = true
      this.canSave = false
    },
    // 获取数据列表
    async getRoleList () {
      this.tableData = await this.$store.dispatch('roleList')
    },
    // 获取权限列表
    async getRoleResourceList () {
      this.permissionOption = await this.$store.dispatch('roleResourceList')
      this.permissionOption.forEach((item) => {
        this.$set(item, 'checkAll', this.titleName === '编辑' || false)
        this.$set(item, 'checked', [])
      })
    }
  },
  watch: {
  },
  async created () {
    await this.getRoleList()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.system-settings-role {

  &>main {
    background: #fff;
    margin-top: 20px;
    min-height: calc(100vh - 215px);
    padding: 20px;
    border-radius: 5px;

    .el-table {
      th {
        &:nth-child(2){
          // border-top-right-radius: 8px;
          // border-bottom-right-radius: 8px;
        }
      }
    }
  }

  .el-dialog {
    .el-dialog__body {
      .el-form {
        .el-input {
          width: 300px;
        }
        .el-form-item__content {
          margin-left: 10px !important;
          .el-form-item__error {
            margin-left: 80px;
          }
          .el-checkbox__label {
            color: #666;
            font-size: 15px;
          }
          .el-row {
            .el-checkbox__label {
              color: #AFAFAF;
              font-size: 14px;
            }
          }
          .el-checkbox-group {
            padding-left: 25px;
          }
        }
        .el-form-item__label {
          width: 90px !important;
        }
        .el-form-item:nth-child(2) {
          border-bottom: 1px solid #ddd;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
