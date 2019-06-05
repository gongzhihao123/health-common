<template>
  <div class='school-basic-studentDesk'>
    <header>
      <ul>
        <li>
          <span>学校:</span>
            <el-select v-model="school" filterable placeholder="请选择" @change="gradeList">
            <el-option
              v-for="item in schools"
              :key="item.xxdm"
              :label="item.xxmc"
              :value="item.xxdm">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>年级:</span>
          <el-select v-model="grade" placeholder="请选择" @change="classList">
              <el-option
                v-for="item in grades"
                :key="item.njid"
                :label="item.njmc"
                :value="item.njid">
              </el-option>
            </el-select>
        </li>
        <li>
          <span>班级:</span>
          <el-select v-model="classa" placeholder="请选择">
              <el-option
                v-for="item in classas"
                :key="item.bjid"
                :label="item.bjmc"
                :value="item.bjid">
              </el-option>
            </el-select>
        </li>
        <li>
          <el-button icon="el-icon-search" @click="getList">查询</el-button>
        </li>
        <li>
          <el-button class="download" @click="getDown" :distabled="totalCount === 0"><img src="../../assets/img/btn_out.png">导出</el-button>
        </li>
      </ul>
    </header>
    <div class="content">
    <el-row :gutter="20">
      <el-col :span="18" :offset="6">
        <el-autocomplete
          class="inline-input"
          v-model="input"
          ref="model"
          popper-class="ulList"
          :fetch-suggestions="querySearch"
          placeholder="请输入教育ID或学生姓名或拼音搜索"
          :trigger-on-focus="false"
          @select="handleSelect"
          @focus="onFocus"
        ></el-autocomplete>
        <el-button icon="el-icon-search" @click="getkey">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="教育ID"
        width="200"
        show-overflow-tooltip
        label-class-name="head">
        <template slot-scope="scope">
          <span>{{scope.row.jyid}}</span>
          <i class="lin" v-if="scope.row.lsFlag">临</i>
        </template>
      </el-table-column>
      <el-table-column
        prop="xm"
        label="姓名"
        show-overflow-tooltip
        label-class-name="head">
      </el-table-column>
      <el-table-column
        prop="xxmc"
        show-overflow-tooltip
        label-class-name="head"
        label="学校">
      </el-table-column>
      <el-table-column
        prop="njmc"
        show-overflow-tooltip
        label-class-name="head"
        label="年级">
      </el-table-column>
      <el-table-column
        prop="bjmc"
        show-overflow-tooltip
        label-class-name="head"
        label="班级">
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.xb === 1">男</span>
          <span v-if="scope.row.xb === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sg"
        show-overflow-tooltip
        label-class-name="head"
        label=身高>
      </el-table-column>
      <el-table-column
        prop="desk"
        show-overflow-tooltip
        label-class-name="head"
        label=课桌椅型号>
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
    </div>
    <el-dialog
      title="临时添加学生信息"
      :visible.sync="dialog"
      class="addDia"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="教育ID:" prop="id">
          <el-input v-model.trim="ruleForm.id"></el-input>
          <el-button>随机产生</el-button>
        </el-form-item>
        <el-form-item label="学生姓名:" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
            <el-select v-model="ruleForm.sex">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            placeholder="请输入出生日期"
            type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学校:" prop="school">
            <el-select v-model="ruleForm.school">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="学段:" prop="section">
              <el-select v-model="ruleForm.section">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="grade">
              <el-select v-model="ruleForm.grade">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="班级:" prop="classes">
              <el-select v-model="ruleForm.classes">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
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
import { notice } from '../../utils/index.js'
export default {
  name: 'school-basic-studentDesk',
  data () {
    return {
      school: '',
      schools: [],
      grades: [],
      state: true,
      item: '',
      grade: '',
      classa: '',
      classas: [],
      loading: false,
      dialog: false,
      tableData: [],
      options: [],
      schoolname: '',
      restaurants: [],
      pageNo: 1,
      result: '',
      radio: '1',
      input: '',
      keyName: '',
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      ruleForm: {
        id: '',
        name: '',
        sex: '',
        birthday: '',
        school: '',
        section: '',
        grade: '',
        classes: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入教育ID', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择出生日期', trigger: 'change' }
        ],
        school: [
          { required: true, message: '请选择学校', trigger: 'change' }
        ],
        section: [
          { required: true, message: '请选择学段', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ],
        classes: [
          { required: true, message: '请选择班级', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSelect (item) {
      this.item = item
      this.keyword = item.name
      this.keyName = this.keyword
      var container = this.$refs.model.$children[1].popperElm.firstElementChild.childNodes[0]
      container.style.display = 'none'
    },
    async querySearch (queryString, cb) {
      this.result = cb
      this.restaurants = []
      const data = await this.$store.dispatch('searchStudent', {
        keyword: this.input,
        pageNo: this.pageNo,
        pageSize: 10
      })
      if (data.length !== 0) {
        data.map(item => {
          let obj = {}
          obj.value = `${item.xm}(${item.lsFlag ? item.lsJyid : item.jyid})`
          obj.name = item.lsFlag ? item.lsJyid : item.jyid
          this.restaurants.push(obj)
        })
      } else {
        let objs = {
          value: '暂无数据',
          name: '暂无数据'
        }
        this.restaurants.push(objs)
      }
      var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant !== '')
      }
    },
    getList () {
      if (!this.school) {
        notice('请先选择学校再进行查询')
        return
      }
      this.currentPage = 1
      this.input = ''
      this.getStudentDeskList()
    },
    getkey () {
      this.currentPage = 1
      if (this.input === '') {
        this.restaurants = []
      }
      if (this.item === '') {
        this.keyword = this.input
        this.keyName = this.keyword
      }
      this.getkeywordList()
    },
    async getkeywordList () {
      if (!this.keyword) {
        notice('请选择学生')
      }
      this.loading = true
      this.school = ''
      this.grade = ''
      this.classa = ''
      const data = this.tableData = await this.$store.dispatch('getStudentDeskList', {
        xxdm: this.school,
        njid: this.grade,
        bjid: this.classa,
        keyword: this.restaurants && this.restaurants.length !== 0 ? this.keyName : '',
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.keyword = ''
      this.totalCount = data.totalCount
      this.tableData = data.list
      this.loading = false
    },
    getDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/desk/exportList?xxdm=${this.school}&njid=${this.grade}&bjid=${this.classa}&keyword=${this.input}`
    },
    async gradeList () {
      this.grade = ''
      this.classa = ''
      this.grades = await this.$store.dispatch('gradeList', {
        xxdm: this.school
      })
    },
    async classList () {
      this.classa = ''
      this.classas = await this.$store.dispatch('classList', {
        xxdm: this.school,
        njid: this.grade
      })
    },
    add () {
      this.dialog = true
      this.$refs['ruleForm'].resetFields()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.dialog = false
          this.input = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClose () {
      this.dialog = false
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.input !== '') {
        this.getkeywordList()
      } else {
        this.getStudentDeskList()
      }
    },
    async schoolList () {
      this.schools = await this.$store.dispatch('schoolList')
    },
    async getStudentDeskList () {
      this.loading = true
      const data = this.tableData = await this.$store.dispatch('getStudentDeskList', {
        xxdm: this.school,
        njid: this.grade,
        bjid: this.classa,
        keyword: this.input,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.totalCount = data.totalCount
      this.tableData = data.list
      this.loading = false
    },
    async getMore () {
      this.state = false
      const data = await this.$store.dispatch('searchStudent', {
        keyword: this.input,
        pageNo: this.pageNo,
        pageSize: 150
      })
      if (data.length !== 0) {
        data.map(item => {
          let obj = {}
          obj.value = `${item.xm}(${item.lsFlag ? item.lsJyid : item.jyid})`
          obj.name = item.lsFlag ? item.lsJyid : item.jyid
          this.restaurants.push(obj)
        })
      } else {
        let objs = {
          value: '暂无数据',
          name: '暂无数据'
        }
        this.restaurants.push(objs)
      }
      this.result(this.restaurants)
      this.state = true
    },
    onFocus () {
      var container = this.$refs.model.$children[1].popperElm.firstElementChild.childNodes[0]
      container.style.display = 'block'
    }
  },
  watch: {
    input () {
      this.pageNo = 1
    },
    restaurants () {
      if (this.restaurants && this.restaurants.length !== 0) {
        // 列表
        var wrapper = this.$refs.model.$children[1].referenceList
        // 容器
        var container = this.$refs.model.$children[1].popperElm.firstElementChild.childNodes[0]
        var t = this
        container.addEventListener('scroll', function () {
          if (!t.state) return
          // var scrollTop = wrapper.scrollTop
          var listbottom = wrapper.getBoundingClientRect().bottom
          var containerbottom = container.getBoundingClientRect().bottom
          if (listbottom === containerbottom - 22) {
            t.pageNo++
            t.getMore()
          }
        })
      }
    }
  },
  async created () {
    this.loading = true
    await this.schoolList()
    const data = this.tableData = await this.$store.dispatch('getStudentDeskList', {
      xxdm: '',
      njid: '',
      bjid: '',
      keyword: '',
      pageNo: this.currentPage,
      pageSize: this.pageSize
    })
    this.totalCount = data.totalCount
    this.tableData = data.list
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.school-basic-studentDesk {
  .el-input {
    width: auto;
  }
  .lin {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    display: inline-block;
    color: #fff;
    background: #73D586;
    border-radius: 100%;
    font-style: normal;
  }
  .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #fff !important;
  }
  header {
    &>ul {
      @extend .clearfix;
      li {
        float: left;
        height: 36px;
        line-height: 36px;
        margin-bottom: 15px;

        &:nth-childl(1) {
          .el-input__inner {
            width: 300px;
          }
        }
        &:last-child {
          margin-left: 20px;
        }
        .el-radio+.el-radio {
          margin-right: 40px;
        }
        .download {
          padding: 10px 25px !important;
          background: #6E94FF !important;
          border-color: #6E94FF !important;
          margin-right: 0px !important;
          &>span {
            height: 14px;
            line-height: 14px;
            display: inline-block;
            img {
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
            }
          }
        }
        .el-button {
          padding: 10px 25px;
          background: #73D586;
          color: #fff;
          border-color: #73D586;

          .el-icon-search {
            margin-right: 10px;
          }
        }
        &>span {
          color: #666;
        }
        .el-input {
          margin-right: 20px;
        }
        .el-select>.el-input {
          margin-right: 20px;
        }
        .el-input__inner {
          height: 33px;
          line-height: 33px;
        }
        &:nth-child(2), &:nth-child(3) {
          .el-input__inner {
            width: 100px;
          }
        }
      }
    }
  }
  .content {
    background: #fff;
    padding: 20px;
    margin-top: 13px;
    height: 766px;
    border-radius: 4px;
    box-sizing: border-box;
    position: relative;
    .el-pagination {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }

    .el-table {
      margin-top: 20px;
    }
    .el-table::before {
      display: none;
    }
    .el-table td {
      /* padding-top: 5px;
      padding-bottom: 5px; */
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
    .el-col-18 {
      text-align: right;
      padding-right: 0px !important;
      .el-button+.el-button {
        margin-left: 0px;
      }
      .el-button {
        margin: 0px 10px 0px 16px;
      }
      .el-input__inner {
        width: 330px;
        height: 36px;
        line-height: 36px;
      }
      .el-button {
          padding: 10px 25px;
          background: #73D586;
          border-color: #73D586;
          color: #fff;

          .el-icon-search {
            margin-right: 8px;
          }
      }
    }

    .el-col-6 {
      .el-button+.el-button {
        margin-left: 18px;
      }
      .el-button {
        background: #6E94FF;
        color: #fff;
        border-color: #6E94FF;

        &:nth-child(1) {
          padding: 10px 25px;
          &>span {
            display: inline-block;
            height: 14px;
            line-height: 14px;
          }
          img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
        &:nth-child(2) {
          padding: 10px 13px;
           &>span {
            display: inline-block;
            height: 14px;
            line-height: 14px;
          }
          img {
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
          }
        }
      }
    }
  }
  .addDia {
    .el-dialog {
      width: 750px;
      height: 500px;
      position: relative;
    }
    .el-dialog .el-dialog__header span {
    }
    .el-dialog__body {
      @extend .clearfix;
    }
    .el-form-item__content {
      margin-left: 80px !important;
    }
    .el-form-item {
      height: 40px;
      margin-bottom: 20px;
      .el-input__inner {
        height: 33px;
      }
      &:nth-child(1) {
        .el-button {
          padding: 8px 13px;
          background: #73D586;
          border-color: #73D586;
          color: #fff;
          margin-left: 20px;
        }
      }
      &:nth-child(2), &:nth-child(5), &:nth-child(7) {
        width: 60%;
        float: left;
      }
      &:nth-child(3), &:nth-child(6), &:nth-child(8) {
        width: 40%;
        float: left;
        .el-input--suffix .el-input__inner {
          width: 200px;
          height: 33px;
        }
      }
      &:nth-child(4) {
        clear: both;
        .el-input--prefix .el-input__inner {
          width: 300px;
          height: 33px;
        }
      }
      &:nth-child(5) {
        .el-select>.el-input {
          width: 300px;
          height: 33px;
        }
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
        position: absolute;
        bottom: 20px;
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
}
</style>
