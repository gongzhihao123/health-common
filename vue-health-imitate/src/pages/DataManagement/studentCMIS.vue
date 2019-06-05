<template>
  <div class='data-management-studentCMIS'>
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
          <span>临时添加:</span>
          <el-select v-model="temporary" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
        </li>
        <li>
          <el-button icon="el-icon-search" @click="getList">查询</el-button>
        </li>
        <li>
          <el-button class="download" :disabled="totalCount === 0" @click="getAllDown(-1)"><img src="../../assets/img/btn_downloads.png">批量下载指引单</el-button>
          <el-button class="download" :disabled="totalCount === 0 || (!school || !grade || !classa)" @click="getNewAllDown(-1)"><img src="../../assets/img/btn_downloads.png">批量下载体检表</el-button>
        </li>
      </ul>
    </header>
    <div class="content">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button @click="add"><img src="../../assets/img/btn_add.png">添加</el-button>
        <el-button @click="importIn"><img src="../../assets/img/btn_imports.png">批量导入</el-button>
      </el-col>
      <el-col :span="18">
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
      style="width: 100%">
      <el-table-column
        label="教育ID"
        show-overflow-tooltip
        width="150"
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
        label="性别"
        wdith="40">
        <template slot-scope="scope">
          <span v-if="scope.row.xb === 1">男</span>
          <span v-if="scope.row.xb === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label=生日>
        <template slot-scope="scope">
          <span>{{scope.row.csrq | dateFormat('yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label-class-name="head"
        label="操作"
        width="340">
        <template slot-scope="scope">
          <el-button @click="getAllDown(scope.row)">下载指引单</el-button>
          <el-button @click="getNewAllDown(scope.row)">下载体检表</el-button>
          <el-button v-if="scope.row.lsFlag" @click="deleteTempStudent(scope.row.xsid)" class="del">删除</el-button>
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
    </div>
    <el-dialog
    title="批量导入"
    :visible.sync="importDia"
    class="importA"
    :before-close="handleClose">
    <ul>
      <li>提示：</li>
      <li>1.点击<a @click="getDown">下载模板</a></li>
      <li>2.为保证导入数据有效性，导入Excel前，敬请您先下载模板，根据模板要求按需填写，请勿修改格式；</li>
      <li>3.批量导入只允许xls、xlsx格式文档，其他格式均无法导入</li>
    </ul>
    <el-upload
      :action="action"
      :auto-upload="false"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="beforeUpload"
      :before-remove="beforeRemove"
      :limit="1"
      ref="upload"
      name="file"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">选择文件</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    <el-button class="importIn" @click="getDao" :disabled="canSave">导入</el-button>
    </el-dialog>
    <el-dialog
      title="临时添加学生信息"
      :visible.sync="dialog"
      class="addDia"
      :before-close="handleClose">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="dialog">
        <el-form-item label="教育ID:" prop="id">
          <el-input v-model.trim="ruleForm.id"></el-input>
          <el-button @click.native="number">随机产生</el-button>
        </el-form-item>
        <el-form-item label="学生姓名:" prop="name">
          <el-input v-model.trim="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别:" prop="sex">
            <el-select v-model="ruleForm.sex">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出生日期:" prop="birthday">
            <el-date-picker
              v-model="ruleForm.birthday"
              type="date"
              placeholder="选择出生日期"
              @change="changeDate">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="学校:" prop="school">
            <el-select filterable v-model="ruleForm.school" @change="getgrade">
              <el-option
              v-for="item in schools"
              :key="item.xxdm"
              :label="item.xxmc"
              :value="item.xxdm">
            </el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="年级:" prop="grade">
              <el-select v-model="ruleForm.grade" @change="getclass">
                <el-option
                v-for="item in gradelist"
                :key="item.njid"
                :label="item.njmc"
                :value="item.njid">
              </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="班级:" prop="classes">
              <el-select v-model="ruleForm.classes">
                <el-option
                v-for="item in classlist"
                :key="item.bjid"
                :label="item.bjmc"
                :value="item.bjid">
              </el-option>
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
import { notice, success } from '../../utils/index.js'
export default {
  name: 'data-management-studentCMIS',
  data () {
    var Eid = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入教育id'))
      } else {
        if (this.ruleForm.id !== '') {
          var re = new RegExp(/^([0-9]{12})$/)
          var result = re.exec(value)
          if (!result) {
            callback(new Error('教育id格式为12位数字'))
          } else {
            callback()
          }
        }
      }
    }
    var birthday = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择出生日期'))
      } else {
        var date = new Date()
        var d = date.getTime()
        if (value > d) {
          callback(new Error('出生日期不能在当前日期之后'))
        } else {
          callback()
        }
      }
    }
    return {
      temporary: '',
      state2: '',
      restaurants: [],
      pageNo: 1,
      school: '',
      schools: [],
      canSave: true,
      grades: [],
      gradelist: [],
      classlist: [],
      action: '',
      grade: '',
      classa: '',
      classas: [],
      fileList: [],
      loading: false,
      result: '',
      listHeight: '',
      Height: '',
      dialog: false,
      tableData: [],
      options: [],
      date: '',
      schoolname: '',
      item: '',
      keyName: '',
      keyword: '',
      radio: '1',
      input: '',
      totalCount: 0,
      state: true,
      pageSize: 10,
      currentPage: 1,
      importDia: false,
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
          { validator: Eid, trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthday: [
          {validator: birthday, trigger: 'change'}
        ],
        school: [
          { required: true, message: '请选择学校', trigger: 'change' }
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
    handlePreview () {},
    handleRemove () {},
    beforeRemove () {},
    getkey () {
      this.currentPage = 1
      if (this.input === '') {
        this.restaurants = []
      }
      if (this.item === '') {
        this.keyword = this.input
        this.keyName = this.keyword
      }
      this.getkeyWordList()
    },
    handleSuccess (res) {
      if (res.code === 1 && !res.message) {
        success('导入成功')
        this.school = ''
        this.grade = ''
        this.classa = ''
        this.temporary = ''
        this.currentPage = 1
        this.input = ''
        this.getStudentList()
      } else {
        notice(res.message)
      }
    },
    getList () {
      if (!this.school) {
        notice('请先选择学校在进行查询')
        return
      }
      this.currentPage = 1
      this.input = ''
      this.getStudentList()
    },
    getDao () {
      this.$refs.upload.submit()
      this.importDia = false
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    importIn () {
      this.importDia = true
      this.fileList = []
      this.canSave = true
    },
    beforeUpload (file) {
      return new Promise((resolve, reject) => {
        let arr = file.name.split('.')
        if (arr[arr.length - 1] === 'xls' || arr[arr.length - 1] === 'xlsx') {
          this.canSave = false
          resolve()
        } else {
          // this.canSave
          notice('请上传excel文件')
          this.fileList = []
          reject(arr)
        }
      })
    },
    changeDate () {
      var d = new Date(this.ruleForm.birthday)
      var year = d.getFullYear()
      var month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)
      var date = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
      this.date = year + '-' + month + '-' + date
    },
    async getkeyWordList () {
      this.loading = true
      this.school = ''
      this.grade = ''
      this.classa = ''
      this.temporary = ''
      if (!this.keyword) {
        notice('请选择学生')
      }
      const data = await this.$store.dispatch('getStudentList', {
        xxdm: this.school,
        njid: this.grade,
        bjid: this.classa,
        keyword: this.restaurants && this.restaurants.length !== 0 ? this.keyName : '',
        lstj: this.temporary,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.keyword = ''
      this.totalCount = data.totalCount
      this.tableData = data.list
      this.loading = false
    },
    async getStudentList () {
      this.loading = true
      const data = await this.$store.dispatch('getStudentList', {
        xxdm: this.school,
        njid: this.grade,
        bjid: this.classa,
        keyword: '',
        lstj: this.temporary,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.totalCount = data.totalCount
      this.tableData = data.list
      this.loading = false
    },
    async gradeList () {
      this.grade = ''
      this.classa = ''
      this.temporary = ''
      this.grades = await this.$store.dispatch('gradeList', {
        xxdm: this.school
      })
    },
    async deleteTempStudent (id) {
      await this.$store.dispatch('deleteTempStudent', {
        id: id
      })
      this.getStudentList()
    },
    async classList () {
      this.classa = ''
      this.temporary = ''
      this.classas = await this.$store.dispatch('classList', {
        xxdm: this.school,
        njid: this.grade
      })
    },
    async getgrade () {
      this.ruleForm.grade = ''
      this.gradelist = await this.$store.dispatch('gradeList', {
        xxdm: this.ruleForm.school
      })
    },
    async getclass () {
      this.ruleForm.classes = ''
      this.classlist = await this.$store.dispatch('classList', {
        xxdm: this.ruleForm.school,
        njid: this.ruleForm.grade
      })
    },
    number () {
      var num = ''
      for (var i = 0; i < 4; i++) {
        num += Math.floor(Math.random() * 10)
      }
      var nowDate = new Date()
      var year = nowDate.getFullYear()
      var month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
      var day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
      var dateStr = year + month + day
      this.ruleForm.id = dateStr + num
    },
    getDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/cmis/importTemplet`
    },
    getAllDown (num) {
      if (num === -1 && !this.school) {
        notice('正在批量下载中，请耐心等待')
      }
      if (num === -1) {
        this.input = ''
        const path = document.querySelector('#contextPath').value
        window.location.href = `${path}/cmis/downloadExcels?xxdm=${this.school}&njid=${this.grade}&bjid=${this.classa}&lstj=${this.temporary}`
      } else {
        this.input = num.jyid
        this.temporary = this.tableData.filter(item => item.jyid === num.jyid)[0].lsFlag ? 1 : 0
        const path = document.querySelector('#contextPath').value
        window.location.href = `${path}/cmis/downloadExcels?keyword=${this.input}`
        this.temporary = ''
      }
      this.input = ''
    },
    getNewAllDown (num) {
      if (num === -1 && !this.school) {
        notice('正在批量下载中，请耐心等待')
      }
      if (num === -1) {
        this.input = ''
        const path = document.querySelector('#contextPath').value
        window.location.href = `${path}/cmis/downloadGuider?xxdm=${this.school}&njid=${this.grade}&bjid=${this.classa}&lstj=${this.temporary}&keyword=${this.input}`
      } else {
        this.input = num.jyid
        this.temporary = this.tableData.filter(item => item.jyid === num.jyid)[0].lsFlag ? 1 : 0
        const path = document.querySelector('#contextPath').value
        window.location.href = `${path}/cmis/downloadGuider?studentId=${num.xsid}`
        this.temporary = ''
      }
      this.input = ''
    },
    add () {
      this.dialog = true
      this.ruleForm = {
        id: '',
        name: '',
        sex: '',
        birthday: '',
        school: '',
        section: '',
        grade: '',
        classes: ''
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch('addTempStudent', {
            xxdm: this.ruleForm.school,
            njid: this.ruleForm.grade,
            bjid: this.ruleForm.classes,
            jyid: this.ruleForm.id,
            xsxm: this.ruleForm.name,
            csrq: this.date,
            xb: this.ruleForm.sex
          })
          this.dialog = false
          this.temporary = ''
          this.currentPage = 1
          this.input = ''
          await this.getStudentList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async querySearch (queryString, cb) {
      let state = true
      this.$store.state.user.resources.forEach(elem => {
        elem.childs.forEach(item => {
          if (item.url === '/statisticsIndividualization*') {
            //  全局
            state = false
          }
        })
      })
      this.result = cb
      this.restaurants = []
      let data
      if (state) {
        data = await this.$store.dispatch('searchStudent', {
          keyword: this.input,
          pageNo: this.pageNo,
          pageSize: 10
        })
      } else {
        data = await this.$store.dispatch('searchStudentBySchool', {
          keyword: this.input,
          pageNo: this.pageNo,
          pageSize: 10
        })
      }
      if (data.length !== 0) {
        data.map(item => {
          let obj = {}
          // var arr = ''
          // if (item.indexOf(queryString) < item.indexOf('(')) {
          //   arr = item.substring(0, item.indexOf('('))
          // } else if ((item.indexOf(queryString) > item.indexOf('(')) && (item.indexOf(queryString) < item.indexOf(')'))) {
          //   arr = item.substring(item.indexOf('('), item.indexOf(')') + 1)
          // } else if (item.indexOf(queryString) > item.indexOf(')')) {
          //   arr = item.substring(item.indexOf(')') + 1, item.length + 1)
          // }
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
    handleClose () {
      this.dialog = false
      this.importDia = false
    },
    handleCurrentChange (val) {
      this.currentPage = val
      if (this.input !== '') {
        this.getkeyWordList()
      } else {
        this.getStudentList()
      }
    },
    async schoolList () {
      this.schools = await this.$store.dispatch('schoolList')
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
          // var arr = ''
          // if (item.indexOf(this.input) < item.indexOf('(')) {
          //   arr = item.substring(0, item.indexOf('('))
          // } else if ((item.indexOf(this.input) > item.indexOf('(')) && (item.indexOf(this.input) < item.indexOf(')'))) {
          //   arr = item.substring(item.indexOf('('), item.indexOf(')') + 1)
          // } else if (item.indexOf(this.input) > item.indexOf(')')) {
          //   arr = item.substring(item.indexOf(')') + 1, item.length + 1)
          // }
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
  mounted () {
    var path = document.getElementById('contextPath').value
    this.action = `${path}/cmis/importStudent`
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
        container.addEventListener('scroll', async function () {
          // var scrollTop = wrapper.scrollTop
          var listbottom = wrapper.getBoundingClientRect().bottom
          var containerbottom = container.getBoundingClientRect().bottom
          if (listbottom === containerbottom - 22) {
            if (!t.state) return
            t.pageNo++
            await t.getMore()
          }
        })
      }
    }
  },
  async created () {
    await this.schoolList()
    this.loading = true
    const Info = await this.$store.dispatch('getStudentList', {
      xxdm: '',
      njid: '',
      bjid: '',
      keyword: '',
      lstj: '',
      pageNo: this.currentPage,
      pageSize: this.pageSize
    })
    this.totalCount = Info.totalCount
    this.tableData = Info.list
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-management-studentCMIS {
  .el-input {
    width: auto;
  }
  .importA {
    .el-button.is-disabled:focus, .el-button.is-disabled:hover {
      color: #ccc !important;
    }
    .el-dialog {
      width: 500px;
      height: 400px;
      position: relative;
      .importIn {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    ul {
      background: #EDEDED;
      padding: 20px;
      li {
        a {
          color: #20A0FF;
          cursor: pointer;
        }
      }
    }
    .el-upload {
      margin-top: 20px;
    }
    .el-upload-list {
        background: #fff !important;
        padding: 0px !important;
      }
  }
  .del {
    background: #F17B7B !important;
    border-color: #F17B7B !important;
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
        &:last-child {
          margin-left: 20px;
        }
        .el-radio+.el-radio {
          margin-right: 40px;
        }
        .download {
          padding: 10px 23px !important;
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
              margin-right: 8px;
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
        &:nth-child(1) {
          .el-input__inner {
            width: 300px;
          }
        }
        .el-input__inner {
          height: 33px;
          line-height: 33px;
        }
        &:nth-child(2), &:nth-child(3), &:nth-child(4) {
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
    /* height: calc(100vh - 180px); */
    border-radius: 4px;
    box-sizing: border-box;
    /* position: relative; */
    .el-pagination {
      /* position: absolute; */
      /* bottom: 20px; */
      margin-left: 50%;
      /* left: 50%; */
      margin-top: 30px;
      transform: translateX(-50%);
    }

    .el-table {
      margin-top: 20px;
      height: 608px;
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
      .el-button+.el-button {
        margin-left: 0px;
      }
      .el-button {
        margin: 0px 20px 0px 16px;
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
