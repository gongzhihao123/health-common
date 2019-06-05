<template>
  <div class='health-check-myChange'>
    <header>
      <span>
        学年：
      </span>
      <el-select class="select-width-m" v-model="xnValue" filterable placeholder="请选择">
        <el-option
          v-for="item in xnList"
          :key="item.xn"
          :label="item.name"
          :value="item.xn">
        </el-option>
      </el-select>
      <el-button type="success" size="small" icon="el-icon-search" @click="getMyChangePage"> 查询 </el-button>
    </header>

    <main>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            label-class-name="head"
            width="160"
            show-overflow-tooltip
            label="教育ID">
            <template slot-scope="scope">
              {{ scope.row.tempEduid ? scope.row.tempEduid : scope.row.jyid }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            show-overflow-tooltip
            width="120"
            prop="studentName"
            label="姓名">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            show-overflow-tooltip
            prop="schoolName"
            label="学校">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            show-overflow-tooltip
            prop="gradeName"
            width="80"
            label="年级">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            show-overflow-tooltip
            prop="className"
            width="80"
            label="班级">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            show-overflow-tooltip
            label="变更项目">
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.projectList" :key="index">
                {{ item.projectName }}
                <i v-if="index !== scope.row.projectList.length - 1">、</i>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            show-overflow-tooltip
            prop="name"
            label="申请时间">
            <template slot-scope="scope">
              {{ scope.row.createdTime | dateFormat('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            label="审核状态">
            <template slot-scope="scope">
              {{ scope.row.checkState === 0 ? '未审核' : scope.row.checkState === 1 ? '已通过' : '已驳回' }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="toDetail(scope.row)">查看详情</el-button>
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
  name: 'health-check-myChange',
  data () {
    return {
      pageNo: 1,
      totalCount: 0,
      xnValue: '',
      xnList: [],
      tableData: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNo = val
      this.getMyChangePage()
    },
    // 查看详情
    toDetail (val) {
      sessionStorage.HEALTH_DETAIL = JSON.stringify(val)
      sessionStorage.HEALTH_ISMY = true
      const path = document.querySelector('#contextPath').value
      window.open(`${path}/#/detail/myChangeDetail`)
    },
    // 获取学年列表
    async getXnList () {
      this.xnList = await this.$store.dispatch('xnList')
      this.xnValue = this.xnList.length !== 0 ? this.xnList[0].xn : ''
    },
    // 获取变更列表
    async getMyChangePage () {
      let data = await this.$store.dispatch('getMyChangePage', {
        xn: this.xnValue,
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
    await this.getXnList()
    await this.getMyChangePage()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.health-check-myChange {
  header {
    .el-input__inner {
      height: 36px;
    }
  }

  &>main {
    background: #fff;
    min-height: calc(100vh - 225px);
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;

    .el-table {
      th {
        &:nth-child(9){
          // border-top-right-radius: 8px;
          // border-bottom-right-radius: 8px;
        }
      }
    }
  }
}
</style>
