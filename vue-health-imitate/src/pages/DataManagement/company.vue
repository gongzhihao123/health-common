<template>
  <div class='data-management-company'>
    <el-button icon="el-icon-search" @click="getSearch">搜索</el-button>
    <el-input v-model="input" placeholder="请输入单位名称"></el-input>
<el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="学校代码"
        show-overflow-tooltip
        label-class-name="head"
        prop="xxdm">
      </el-table-column>
      <el-table-column
        prop="xxmc"
        label="单位名称"
        show-overflow-tooltip
        label-class-name="head">
      </el-table-column>
      <el-table-column
        prop="xxdz"
        show-overflow-tooltip
        label-class-name="head"
        label="详细地址">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="联系人">
        <template slot-scope="scope">
          <span>{{scope.row.lxrxm ? scope.row.lxrxm : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="联系电话">
        <template slot-scope="scope">
          <span>{{scope.row.lxfs ? scope.row.lxfs : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="区域划分">
        <template slot-scope="scope">
          <span v-if="scope.row.qyhf && scope.row.qyhf === 1">城区</span>
          <span v-if="scope.row.qyhf && scope.row.qyhf === 2">平原</span>
          <span v-if="scope.row.qyhf && scope.row.qyhf === 3">山区</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button  @click="editPeo(scope.row)" v-if="scope.row.qyhf">编辑</el-button>
          <el-button  @click="addPeo(scope.row)" v-if="!scope.row.qyhf">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="totalCount !== 0"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    <el-dialog
      :title="tit === 1 ? '添加联系人信息' : '编辑联系人信息'"
      :visible.sync="dialog"
      class="addDia"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="dialog">
        <el-form-item label="单位:">
          <span>{{companyName}}</span>
        </el-form-item>
        <el-form-item label="联系人:" prop="name">
          <el-select v-model="ruleForm.role" @change="choose(roles.filter(item => item.id === ruleForm.role)[0].id)">
            <el-option :label="item.name" :value="item.id" v-for="item in roles" :key="item.name"></el-option>
          </el-select>
          <!-- <el-autocomplete
            class="inline-input"
            v-model.trim="ruleForm.name"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete> -->
          <el-select v-model="ruleForm.name" filterable placeholder="请选择" class="nameSelect" size="medium">
            <el-option
              v-for="item in people"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话:" prop="tel">
            <el-input v-model.trim="ruleForm.tel" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="区域划分:" prop="area">
          <el-radio-group v-model="ruleForm.area">
            <el-radio :label="1">城区</el-radio>
            <el-radio :label="2">平原</el-radio>
            <el-radio :label='3'>山区</el-radio>
          </el-radio-group>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { notice } from '../../utils/index.js'
export default {
  name: 'data-management-company',
  data () {
    // var tel = (rule, value, callback) => {
    //   if (!value) {
    //     // callback(new Error('请输入电话号码'))
    //   } else {
    //     if (this.ruleForm.tel !== '') {
    //       var re = new RegExp(/^[\d-]{1,20}$/)
    //       var result = re.exec(value)
    //       if (!result) {
    //         callback(new Error('电话号码只能是20位以内数字-组成'))
    //       } else {
    //         callback()
    //       }
    //     }
    //   }
    // }
    return {
      dialog: false,
      companyName: '',
      input: '',
      tableData: [],
      people: [],
      pageSize: 12,
      totalCount: 0,
      currentPage: 1,
      xxdm: '',
      roles: [],
      tit: 1,
      loading: false,
      restaurants: [],
      ruleForm: {
        name: '',
        role: '',
        tel: '',
        area: ''
      },
      rules: {
        name: [
          { required: false, message: '请输入联系人姓名', trigger: 'change' }
        ],
        tel: [
          { required: false, message: '电话号码只能是20位以内数字', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择区域划分', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getSearch () {
      this.currentPage = 1
      this.getSchoolExtendList()
    },
    choose (id) {
      this.people = []
      this.ruleForm.name = ''
      if (id) {
        this.restaurants.map(item => {
          if (item.roles.filter(m => m.id === id).length > 0) {
            this.people.push(item)
          }
        })
      } else {
        this.people = this.restaurants
      }
    },
    async editPeo (row) {
      this.ruleForm = {
        role: '',
        name: row.lxrxm,
        area: row.qyhf,
        tel: row.lxfs
      }
      this.xxdm = row.xxdm
      this.tit = 2
      this.dialog = true
      this.ruleForm.role = ''
      this.companyName = row.xxmc
      this.people = this.restaurants
      // this.$refs['ruleForm'].resetFields()
    },
    async addPeo (row) {
      this.ruleForm = {
        role: '',
        name: '',
        area: '',
        tel: ''
      }
      this.tit = 1
      this.xxdm = row.xxdm
      this.companyName = row.xxmc
      this.dialog = true
      this.people = this.restaurants
      // this.$refs['ruleForm'].resetFields()
    },
    cancel () {
      this.dialog = false
      // this.$refs['ruleForm'].resetFields()
    },
    handleSelect (item) {
      this.ruleForm.name = item.name
    },
    // querySearch (queryString, cb) {
    //   var restaurants = this.people
    //   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
    //   // 调用 callback 返回建议列表的数据
    //   cb(results)
    // },
    // createFilter (queryString) {
    //   return (restaurant) => {
    //     return (restaurant.value.indexOf(queryString) === 0)
    //   }
    // },
    handleClose () {
      this.dialog = false
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getSchoolExtendList()
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!new RegExp(/^[\d-]{1,20}$/).test(this.ruleForm.tel)) {
          if (this.ruleForm.tel && !new RegExp(/^[\d-]{1,20}$/).test(this.ruleForm.tel)) {
            notice('电话号码只能是20位以内数字')
            return
          }
        }
        if (valid) {
          await this.$store.dispatch('updateSchoolExtend', {
            xxdm: this.xxdm,
            lxr: this.ruleForm.name ? this.people.filter(item => item.name === this.ruleForm.name)[0].id : '',
            lxfx: this.ruleForm.tel,
            qyhf: this.ruleForm.area
          })
          this.dialog = false
          await this.getSchoolExtendList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getSchoolExtendList () {
      this.loading = true
      let data = {}
      data = await this.$store.dispatch('getSchoolExtendList', {
        keyword: this.input,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.totalCount = data.totalCount
      this.tableData = data.list
      this.loading = false
    }
  },
  watch: {
  },
  async mounted () {
    const data = await this.$store.dispatch('allList')
    data.map(item => {
      let obj = {}
      obj.value = item.name
      obj.name = item.name
      obj.roles = item.roles
      obj.id = item.id
      this.restaurants.push(obj)
      this.people = this.restaurants
    })
  },
  async created () {
    this.loading = true
    let data = {}
    data = await this.$store.dispatch('getSchoolExtendList', {
      keyword: this.input,
      pageNo: this.currentPage,
      pageSize: this.pageSize
    })
    this.totalCount = data.totalCount
    this.tableData = data.list
    this.loading = false
    this.roles = await this.$store.dispatch('roles')
    let obj = {}
    obj.name = '全部'
    obj.id = ''
    this.roles.unshift(obj)
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-management-company {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  position: relative;
  box-sizing: border-box;

  &>.el-input {
    width: 300px;
    float: right;
    &>.el-input__inner {
      width: 300px;
      height: 36px;
    }
  }
  &>.el-button {
    float: right;
    padding: 10px 25px;
    background: #73D586;
    border-color: #73D586;
    color: #fff;
    margin-left: 20px;
  }
  /* .nameSelect {
    .el-input {
      width: 198px !important;
    }
    .el-input__inner {
      width: 198px !important;
    }
  } */
  .el-table {
    margin-top: 56px;
    height: 672px;
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
            &:nth-child(8){
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
          &:nth-child(8){
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
    .addDia {
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
    }
    .el-form-item__content {
      margin-left: 80px !important;
      height: 40px;
    }
    .el-form-item {
      height: 40px;
      margin-bottom: 20px;
      &:nth-child(2) {
        @extend .clearfix;
        .el-form-item__error {
          left: 110px;
        }
        .el-select {
          float: left;
          width: 100px;
          margin-right: 12px;
          .el-input {
            width: 100px;
          }
        }
        .el-select .el-input__inner {
          width: 105px;
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
        width: 268px;
        position: absolute;
        bottom: 20px;
        padding-top: 0px;
        padding-bottom: 0px;
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
    .el-pagination {
      /* position: absolute;
      bottom: 20px; */
      margin-left: 50%;
      margin-top: 30px;
      transform: translateX(-50%);
    }
}
</style>
