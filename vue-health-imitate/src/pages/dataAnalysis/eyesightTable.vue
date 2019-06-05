<template>
  <div class='data-analysis-eyesightTable'>
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
          <el-select v-model="school" filterable placeholder="请选择" @change="gradeList" class="selectSchool">
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
          <el-button icon="el-icon-search" @click="getSearch">查询</el-button>
        </li>
        <li>
          <el-button @click="getDown" :disabled="totalCount === 0"><img src="../../assets/img/btn_downloads.png">下载</el-button>
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
        show-overflow-tooltip
        label-class-name="head"
        prop="jyid">
      </el-table-column>
      <el-table-column
        prop="xm"
        label="姓名"
        show-overflow-tooltip
        label-class-name="head">
      </el-table-column>
      <el-table-column
        prop="xxmc"
        width="150"
        show-overflow-tooltip
        label-class-name="head"
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
        show-overflow-tooltip
        label-class-name="head"
        label=生日>
        <template slot-scope="scope">
          <span>{{ scope.row.csrq | dateFormat('yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="裸眼视力">
        <el-table-column
          prop="lyslRight"
          label="右">
        </el-table-column>
        <el-table-column
          prop="lyslLeft"
          label="左">
        </el-table-column>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label-class-name="head"
        label="矫正视力">
        <el-table-column
          prop="jzslRight"
          label="右">
        </el-table-column>
        <el-table-column
          prop="jzslLeft"
          label="左">
        </el-table-column>
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
export default {
  name: 'data-analysis-eyesightTable',
  data () {
    return {
      loading: false,
      value: '',
      tableData: [],
      years: [],
      schoolyear: '',
      schools: [],
      school: '',
      classa: '',
      classas: [],
      grade: '',
      grades: [],
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
      this.currentPage = 1
      this.getVisionList()
    },
    getDown () {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/statisticsVision/exportList?xn=${this.schoolyear}&xxdm=${this.school}&njid=${this.grade}&bjid=${this.classa}&keyword=${''}`
    },
    async getVisionList () {
      this.loading = true
      const data = await this.$store.dispatch('getVisionList', {
        xn: this.schoolyear,
        xxdm: this.school,
        njid: this.grade,
        bjid: this.classa,
        pageNo: this.currentPage,
        pageSize: this.pageSize
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
      this.loading = false
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
    async handleCurrentChange (val) {
      this.currentPage = val
      await this.getVisionList()
    }
  },
  watch: {
  },
  async created () {
    this.loading = true
    this.years = await this.$store.dispatch('xnList')
    this.schoolyear = this.years.filter(item => item.current)[0].xn
    this.schools = await this.$store.dispatch('schoolList')
    const data = await this.$store.dispatch('getVisionList', {
      xn: this.schoolyear,
      xxdm: '',
      njid: '',
      bjid: '',
      pageNo: this.currentPage,
      pageSize: this.pageSize
    })
    this.tableData = data.list
    this.totalCount = data.totalCount
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-analysis-eyesightTable {
  .el-input {
    width: auto;
  }
  .el-table--border::after, .el-table--group::after, .el-table::before {
    display: none;
  }
  .el-table thead.is-group th {
      background: #C4D3FE;
  }
  .el-table th:first-child {
    border-radius: 0px !important;
  }
  header {
    &>ul {
      @extend .clearfix;
      li {
        float: left;
        height: 36px;
        line-height: 36px;
        margin-bottom: 15px;
        .selectSchool {
          .el-input__inner {
            width: 300px;
          }
        }
        &:nth-child(1) {
          .el-input__inner {
            width: 150px;
          }
        }
        &:last-child {
          margin-left: 20px;
          .el-button {
            background: #6E94FF;
            border-color: #6E94FF;
            &>span {
              display: inline-block;
              height: 14px;
              line-height: 14px;
              img {
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
        &:nth-child(3), &:nth-child(4) {
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
    .el-table thead {
      tr {
        &:last-child {
          th {
            border-top: 1px solid #fff;
            /* border-left: 1px solid #fff; */
            color: #fff;
          }
        }
      }
    }
    .el-table {
      margin-top: 20px;
      border: none;
    }

    .el-table::before {
      display: none;
    }
    .el-table td {
      /* padding-top: 5px;
      padding-bottom: 5px; */
      color: #666;
      .cell {
        padding: 0px 0px 0px 20px;
        width: inherit !important;
      }
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
      /* border: none !important; */
      padding-top: 10px;
      padding-bottom: 10px;
      /* border-right: 1px solid #fff !important; */
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
          border-right: 1px solid #fff;
          .cell {
            padding: 0px 0px 0px 20px;
          }
          &:first-child {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
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
