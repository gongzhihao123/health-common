<template>
  <div class='health-check-downloadMessage'>
    <header>

      <span>
        学校：
      </span>
      <el-select class="select-width-b" v-model="schoolValue" clearable filterable placeholder="请选择">
        <el-option
          v-for="item in schoolList"
          :key="item.xxdm"
          :label="item.xxmc"
          :value="item.xxdm">
        </el-option>
      </el-select>

      <el-button size="small" type="success" icon="el-icon-search" @click="search">查询</el-button>
    </header>

    <main>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label-class-name="head"
            prop="name"
            width="120"
            label="序号">
            <template slot-scope="scope">
              {{ (pageNo - 1) * 10 + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="xxmc"
            label="单位名称">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="name"
            width="250"
            label="状态">
            <template slot-scope="scope">
              {{ scope.row.xztjbFlag ? '已下载' : '--' }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            width="120"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="down(scope.row)">下载</el-button>
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
  </div>
</template>

<script>
export default {
  name: 'health-check-downloadMessage',
  data () {
    return {
      schoolValue: '',
      schoolList: [],
      tableData: [],
      pageNo: 1,
      totalCount: 0
    }
  },
  methods: {
    // 下载
    down (val) {
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/examDownload/download?xxdm=${val.xxdm}`
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getExamChangePage()
    },
    // 获取学校数据
    async getSchoolList () {
      this.schoolList = await this.$store.dispatch('schoolList')
      // this.schoolValue = this.schoolList.length !== 0 ? this.schoolList[0].xxdm : ''
    },
    // 查询
    search () {
      this.getExamChangePage()
    },
    // 获取列表
    async getExamChangePage () {
      let data = await this.$store.dispatch('examDownloadGetSchoolPage', {
        xxdm: this.schoolValue,
        pageNo: this.pageNo,
        pageSize: 10
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
    }
  },
  watch: {
  },
  async created () {
    await this.getSchoolList()
    await this.getExamChangePage()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.health-check-downloadMessage {
  margin-bottom: 20px;
  header {
    &>.el-select {
      margin-right: 10px;
      .el-input__inner {
        height: 36px;
      }
    }
  }
  &>main {
    background: #fff;
    min-height: calc(100vh - 240px);
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;
    th:first-child,td:first-child {
      text-align: center;
    }
  }
}
</style>
