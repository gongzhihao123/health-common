<template>
  <div class='health-check-changeCheck'>
    <header>
      <span @click="navChange(item, index)" :class="{active: activeNum === index}" v-for="(item, index) in navList" :key="index"> {{ item.name }} </span>
    </header>
    <main>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="createdUserName"
          show-overflow-tooltip
          label="申请人">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="申请时间">
          <template slot-scope="scope">
            {{ scope.row.createdTime | dateFormat('yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="学生信息">
          <el-table-column
            prop="studentName"
            show-overflow-tooltip
            label-class-name="head"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="schoolName"
            show-overflow-tooltip
            label-class-name="head"
            label="学校">
          </el-table-column>
          <el-table-column
            prop="gradeName"
            show-overflow-tooltip
            label-class-name="head"
            label="年级">
          </el-table-column>
          <el-table-column
            prop="className"
            show-overflow-tooltip
            label-class-name="head"
            label="班级">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label-class-name="head"
            label="变更项目">
            <template slot-scope="scope">
              <span v-for="(item, index) in scope.row.projectList" :key="index">
                {{ item.projectName }}
                <i v-if="index !== scope.row.projectList.length - 1">、</i>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label-class-name="head"
            v-if="activeNum !== 0"
            label="审核状态">
            <template slot-scope="scope">
              {{ scope.row.checkState === 1 ? '已通过' : '已驳回' }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="check(scope.row)">
              {{!scope.row.checkState ? '审核' : '查看'}}
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
    </main>
  </div>
</template>

<script>
export default {
  name: 'health-check-changeCheck',
  data () {
    return {
      pageNo: 1,
      totalCount: 0,
      activeNum: 0,
      navList: [
        { name: '待审核' },
        { name: '已审核' }
      ],
      checkState: 0,
      tableData: []
    }
  },
  methods: {
    // 审核按钮
    check (val) {
      sessionStorage.HEALTH_DETAIL = JSON.stringify(val)
      sessionStorage.HEALTH_ISMY = false
      this.$router.push('/detail/myChangeDetail')
    },
    navChange (item, index) {
      this.activeNum = index
      if (index === 0) this.checkState = 0
      else this.checkState = ''
      this.getExamChangePage()
    },
    // 获取变更列表
    async getExamChangePage () {
      let data = await this.$store.dispatch('getExamChangePage', {
        xn: '',
        checkState: this.checkState,
        pageNo: this.pageNo,
        pageSize: 10
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getExamChangePage()
    }
  },
  watch: {
  },
  async created () {
    await this.getExamChangePage()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.health-check-changeCheck {
  background: #fff;
  border-radius: 5px;
  header {
    padding: 20px;
    padding-bottom: 0;
    padding-top: 14px;
    border-bottom: 1px solid #E6E6E6;
    &>span {
      display: inline-block;
      height: 30px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      margin-right: 40px;
      font-size: 16px;
      &.active {
        color: #799CFF;
        border-bottom: 2px solid #799CFF;
      }
    }
  }

  main {
    padding: 20px;
    min-height: calc(100vh - 210px);
    .el-table {
      border: 0;
      border-left: 1px solid #E6E6E6;
      border-bottom: 1px solid #E6E6E6;
      .head {
        background: #C4D3FE;
      }
      th {
        padding-left: 20px;
        border-right: 0.5px solid #fff;
        border-bottom: 0.5px solid #fff;
      }
      td {
        border-right: 0.5px solid #E6E6E6;
        border-bottom: 0.5px solid #E6E6E6;
        padding-left: 0px;
        text-align: center;
      }
      th {
        &:first-child {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        padding: 5px 10px;
        background: #ABC1FE;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
