<template>
  <div class='health-check-people'>
    <div class="top">
      <header>
        <span @click="navChange(item, index)" :class="{active: activeNum === index}" v-for="(item, index) in navList" :key="index"> {{ item.name }} </span>
      </header>

      <main>
        <el-row>
          <el-col :span="6">
            <chart :options="breadChart" class="bread-echart"></chart>
          </el-col>
          <el-col :span="18">
            <p v-for="(item, index) in list" :key="index">
              <sup :style="{'background': item.color}"></sup>
              <span>
                {{ item.name }}：
              </span>
              <i :style="{'color': item.color}" @click="selectExam(item)">
                {{ item.num }}
              </i>
            </p>
          </el-col>
        </el-row>
      </main>
    </div>

    <div class="bottom" v-if="detailShow">
      <header>
        <span>
          学校：
        </span>
        <el-select class="select-width-b" v-model="schoolValue" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in schoolList"
            :key="item.xxdm"
            :label="item.xxmc"
            :value="item.xxdm">
          </el-option>
        </el-select>
        <el-button type="success" size="small" icon="el-icon-search" @click="chaxun"> 查询 </el-button>
      </header>
      <main>
        <template>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              label-class-name="head"
              prop="xxdm"
              width="150"
              label="学校代码">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="schoolName"
              label="学校">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="examNum"
              width="150"
              label="应受检人数">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="examedNum"
              width="150"
              label="已受检人数">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              width="150"
              label="未受检人数">
              <template slot-scope="scope">
                {{ scope.row.examNum - scope.row.examedNum }}
              </template>
            </el-table-column>
            <el-table-column
              label-class-name="head"
              width="100"
              label="未受检详情">
              <template slot-scope="scope">
                <el-button type="primary" :disabled="scope.row.examNum - scope.row.examedNum === 0" size="small" @click="look(scope.row)">查看</el-button>
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

    <div class="bottom-detail" v-else>
      <header>
        <span>
          年级：
        </span>
        <el-select class="select-width-s" v-model="gradeValue" filterable placeholder="请选择">
          <el-option
            v-for="item in gradeList"
            :key="item.njid"
            :label="item.njmc"
            :value="item.njid">
          </el-option>
        </el-select>
        <el-button type="success" size="small" icon="el-icon-search" @click="getStudentCrownPage"> 查询 </el-button>
        <el-button class="back" @click="back" type="primary" size="small"> 返回 </el-button>
        <template>
          <el-table
            :data="studentTableData"
            stripe
            style="width: 100%">
            <el-table-column
              label-class-name="head"
              prop="name"
              label="序号">
              <template slot-scope="scope">
                {{ (pageNo - 1) * 10 + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="name"
              label="教育ID">
              <template slot-scope="scope">
                {{ scope.row.tempFlag ? scope.row.tempEduId : scope.row.eduId }}
              </template>
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="studentName"
              label="姓名">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="gradeName"
              label="年级">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              prop="className"
              label="班级">
            </el-table-column>
            <el-table-column
              label-class-name="head"
              label="性别">
              <template slot-scope="scope">
                {{ scope.row.sex === 1 ? '男' : '女' }}
              </template>
            </el-table-column>
            <el-table-column
              label-class-name="head"
              label="生日">
              <template slot-scope="scope">
                {{ scope.row.birthday | dateFormat('yyyy-MM-dd') }}
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
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: 'health-check-people',
  data () {
    return {
      detailShow: true,
      list: [
        { name: '未受检学校', num: 0, color: '#F7B35B' },
        { name: '待完成体检学校', num: 0, color: '#7096FF' },
        { name: '已完成体检学校', num: 0, color: '#73D586' }
      ],
      activeNum: 0,
      navList: [
        { name: '本区体检完成情况' }
      ],
      schoolValue: '',
      schoolList: [],
      schoolYearOptions: [],
      breadChart: {
        tooltip: {
          formatter: '{b} : {c}'
        },
        // legend: {
        //   bottom: 10,
        //   left: 100,
        //   data: ['未受检学校', '待完成体检学校', '已完成体检学校']
        // },
        series: [
          {
            type: 'pie',
            radius: ['30%', '65%'],
            center: ['45%', '45%'],
            color: ['#F7B365', '#7096FF', '#73D586'],
            label: {
              normal: {
                formatter: '{d}%'
              }
            },
            data: [
              {value: 0, name: '未受检学校'},
              {value: 0, name: '待完成体检学校'},
              {value: 0, name: '已完成体检学校'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      gradeList: [],
      gradeValue: '',
      pageNo: 1,
      totalCount: 0,
      tableData: [],
      finishedState: '',
      studentTableData: [],
      xxdm: ''
    }
  },
  methods: {
    // 返回
    back () {
      this.detailShow = true
      this.pageNo = 1
      this.getCrowdPage()
    },
    // 查看按钮
    async look (val) {
      this.pageNo = 1
      this.detailShow = false
      this.xxdm = val.xxdm
      await this.getGradeList(val)
      await this.getStudentCrownPage(val)
    },
    navChange (item, index) {
      this.activeNum = index
    },
    selectExam (val) {
      this.detailShow = true
      this.schoolValue = ''
      this.finishedState = val.finishedState
      this.getCrowdPage()
    },
    handleCurrentChange (val) {
      this.pageNo = val
      if (this.detailShow) {
        this.getCrowdPage()
      } else {
        this.getStudentCrownPage()
      }
    },
    // 获取学校列表
    async getSchoolList () {
      this.schoolList = await this.$store.dispatch('schoolList')
    },
    // 获取年级列表
    async getGradeList (val) {
      this.gradeList = await this.$store.dispatch('gradeList', {
        xxdm: val.xxdm
      })
      this.gradeValue = (this.gradeList.length === 0 ? {njid: ''} : this.gradeList[0]).njid
    },
    // 获取学生列表
    async getStudentCrownPage () {
      let data = await this.$store.dispatch('examCrowdGetStudentCrownPage', {
        xxdm: this.xxdm,
        njid: this.gradeValue,
        pageNo: this.pageNo,
        pageSize: 10
      })
      this.studentTableData = data.list
      this.totalCount = data.totalCount
    },
    chaxun () {
      this.finishedState = ''
      this.getCrowdPage()
    },
    // 获取学校受检情况
    async getCrowdPage () {
      let data = await this.$store.dispatch('examCrowdGetCrowdPage', {
        xxdm: this.schoolValue,
        finishedState: this.finishedState,
        pageNo: this.pageNo,
        pageSize: 10
      })
      this.tableData = data.list
      this.totalCount = data.totalCount
    },
    // 获取受检人群统计
    async getStatics () {
      let data = await this.$store.dispatch('examCrowdGetStatics')
      this.breadChart.series[0].data = [
        {value: data.unExamNum, name: '未体检学校'},
        {value: data.examingNum, name: '待完成体检学校'},
        {value: data.examedNum, name: '已完成体检学校'}
      ]
      this.list = [
        { name: '未受检学校', num: data.unExamNum, color: '#F7B35B', finishedState: 1 },
        { name: '待完成体检学校', num: data.examingNum, color: '#7096FF', finishedState: 2 },
        { name: '已完成体检学校', num: data.examedNum, color: '#73D586', finishedState: 3 }
      ]
    }
  },
  watch: {
  },
  async created () {
    await this.getStatics()
    await this.getSchoolList()
    await this.getCrowdPage()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.health-check-people {
  &>.top {
    background: #fff;
    border-radius: 4px;
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

    &>main {
      .el-row {
        .el-col-6 {
          width: 500px;
          .bread-echart {
            height: 300px;
            width: 500px;
          }
        }
        .el-col-18 {
          width: 500px;
          padding-top: 80px;
          p {
            margin-top: 20px;
            sup {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 50%;
            }
            i {
              font-style: normal;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  &>.bottom {
    margin-top: 20px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    &>header {
      .el-input__inner {
        height: 36px;
      }
    }

    main {
       .el-table {
         margin-top: 20px;
        th {
          &:nth-child(6){
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }
      }
    }
  }

  &>.bottom-detail {
    margin-top: 20px;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    &>header {
      .el-input__inner {
        height: 36px;
      }
      .back {
        float: right;
      }
    }

    .el-table {
      margin-top: 30px;
      th {
        &:nth-child(7){
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }
  }
}
</style>
