<template>
  <div class='data-analysis-anomaly'>
    <header>
      <ul>
      <li>
          <span>学年:</span>
          <el-select v-model="schoolyear" placeholder="请选择">
              <el-option
                v-for="item in years"
                :key="item.xn"
                :label="item.name"
                :value="item.xn">
              </el-option>
            </el-select>
        </li>
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
          <el-select v-model="project" placeholder="请选择体检项目" @change="yclist">
            <el-option
              v-for="item in projects"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="kind" placeholder="请选择异常类别">
            <el-option
              v-for="item in kinds"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-button size="small" icon="el-icon-search" @click="getSearch">查询</el-button>
        </li>
        <li>
          <el-button size="small" @click="getDown" :disabled="totalCount === 0"><img src="../../assets/img/btn_downloads.png">下载</el-button>
        </li>
      </ul>
    </header>
    <div class="content">
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="教育ID"
        width="90"
        show-overflow-tooltip
        label-class-name="head"
        prop="jyid">
      </el-table-column>
      <el-table-column
        prop="xm"
        label="姓名"
        width="80"
        show-overflow-tooltip
        label-class-name="head">
      </el-table-column>
      <el-table-column
        prop="xxmc"
        show-overflow-tooltip
        label-class-name="head"
        width="180"
        label="学校">
      </el-table-column>
      <el-table-column
        prop="xdmc"
        show-overflow-tooltip
        label-class-name="head"
        label="学段">
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
        prop="birthday"
        show-overflow-tooltip
        label-class-name="head"
        label=生日>
        <template slot-scope="scope">
          <span>{{scope.row.csrq | dateFormat('yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="school"
        show-overflow-tooltip
        label-class-name="head"
        label="异常明细"
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.abnormal}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="getStudentExamDetail(scope.row.xsid)">查看体检信息</el-button>
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
  </div>
</template>

<script>
import { notice } from '../../utils/index.js'
export default {
  name: 'data-analysis-anomaly',
  data () {
    return {
      loading: false,
      schoolyear: '',
      project: '',
      projects: [],
      kind: '',
      kinds: [],
      years: [],
      value: '',
      school: '',
      schools: [],
      grades: [],
      gradelist: [],
      classlist: [],
      grade: '',
      classa: '',
      classas: [],
      tableData: [],
      options: [],
      schoolname: '',
      radio: '1',
      input: '',
      totalCount: 0,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    getSearch () {
      if (!this.schoolyear || !this.project || !this.kind) {
        notice('请先选择学年、体检项目、体检类别再进行查询')
        return
      }
      this.currentPage = 1
      this.getAbnormalList()
    },
    async getStudentExamDetail (id) {
      await this.$store.dispatch('getStudentExamDetail', {
        xn: this.tableData[0].xn,
        xsid: id
      })
      sessionStorage.HEALTH_BEFORE_PATH = '/dataAnalysis/anomaly'
      this.$router.push({path: '/totalEntry', query: {para: id}})
    },
    getDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/examProjectAbnormal/exportList?xn=${this.schoolyear}&projectId=${this.project}&code=${this.kind}&njid=${this.grade}&bjid=${this.classa}&keyword=${this.input}`
    },
    async getAbnormalList () {
      this.loading = true
      const data = await this.$store.dispatch('getAbnormalList', {
        xn: this.schoolyear,
        projectId: this.project,
        code: this.kind === '-' ? '' : this.kind,
        njid: this.grade,
        bjid: this.classa,
        keyword: this.input,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        xxdm: this.school
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
      this.loading = false
    },
    async yclist () {
      this.kind = ''
      this.kinds = await this.$store.dispatch('yclist', {
        projectId: this.project
      })
    },
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getAbnormalList()
    },
    async gradeList () {
      this.grade = ''
      this.classa = ''
      this.project = ''
      this.kind = ''
      this.grades = await this.$store.dispatch('gradeList', {
        xxdm: this.school
      })
    },
    async classList () {
      this.classa = ''
      this.project = ''
      this.kind = ''
      this.classas = await this.$store.dispatch('classList', {
        xxdm: this.school,
        njid: this.grade
      })
    }
  },
  watch: {
  },
  async created () {
    // this.loading = true
    this.years = await this.$store.dispatch('xnList')
    this.schoolyear = this.years.filter(item => item.current)[0].xn
    this.schools = await this.$store.dispatch('schoolList')
    this.projects = await this.$store.dispatch('tjlist')
    // const data = await this.$store.dispatch('getAbnormalList', {
    //   xn: '',
    //   projectId: '',
    //   code: '',
    //   njid: '',
    //   bjid: '',
    //   keyword: '',
    //   pageNo: this.currentPage,
    //   pageSize: this.pageSize,
    //   xxdm: ''
    // })
    // this.totalCount = data.totalCount
    // this.tableData = data.list
    // this.loading = false
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-analysis-anomaly {
  .el-input {
    width: auto;
  }

  .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    color: #fff !important;
  }
  header {
    &>ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      @extend .clearfix;
      li {
        // float: left;
        height: 36px;
        margin-bottom: 15px;
        &:nth-child(1) {
          .el-input__inner {
            width: 150px;
          }
        }
        &:nth-child(2) {
          .el-input__inner {
            width: 240px;
          }
        }
        &:nth-child(6) {
          margin-right: 20px;
        }
        &:last-child {
          .el-button {
            &:hover {
            background: #6E94FF !important;
            border-color: #6E94FF !important;
            color: #fff !important;
          }
            background: #6E94FF;
            border-color: #6E94FF;
            &>span {
              display: inline-block;
              img {
                width: 13px;
                height: 13px;
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
              }
            }
          }
        }
        .el-radio+.el-radio {
          margin-right: 40px;
        }
        .el-button {
          padding: 8px 10px;
          background: #73D586;
          color: #fff;
          border-color: #73D586;
          &:hover {
            background: #73D586 !important;
            color: #fff !important;
            border-color: #73D586 !important;
          }
          .el-icon-search {
            font-size: 14px;
            // margin-right: 10px;
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
        &:nth-child(3), &:nth-child(4) {
          .el-input__inner {
            width: 100px;
          }
        }
        &:nth-child(5), &:nth-child(6) {
          .el-input__inner {
            width: 150px;
          }
        }
      }
    }
  }
  .content {
    background: #fff;
    padding: 20px;
    margin-top: 13px;
    height: 674px;
    border-radius: 4px;
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
            &:nth-child(10){
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
          &:nth-child(10){
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
        &:nth-child(3) {
          padding: 10px 23px;
          background: #6E94FF;
          border-color: #6E94FF;
          margin-right: 0px;
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
}
</style>
