<template>
  <div class='data-analysis-evaluate'>
    <header>
      <span>学年:</span>
      <el-select v-model="schoolyear" placeholder="请选择">
          <el-option
            v-for="item in years"
            :key="item.xn"
            :label="item.name"
            :value="item.xn">
          </el-option>
        </el-select>
        <el-button @click="getTu"><img src="../../assets/img/btn_use.png">确定</el-button>
    </header>
    <main>
      <div class="partA">
        <div class="partA-left">
          <h2>体检流程满意程度调查</h2>
          <chart :options="breadChart" class="bread-echart"></chart>
          <ul>
            <li><i></i>满意&nbsp;<span>{{breadChart.series[0].data[0].name}}</span></li>
            <li><i></i>不满意&nbsp;<span>{{breadChart.series[0].data[1].name}}</span></li>
          </ul>
        </div>
        <div class="partA-right">
          <h2>体检环境满意度统计</h2>
          <chart :options="areadChart" class="bread-echart"></chart>
          <ul>
            <li><i></i>满意&nbsp;<span>{{areadChart.series[0].data[0].name}}</span></li>
            <li><i></i>不满意&nbsp;<span>{{areadChart.series[0].data[1].name}}</span></li>
          </ul>
        </div>
      </div>
      <div class="partB">
        <el-row>
          <el-col :span="12">

            <h2>体检老师满意程度统计
            </h2>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" size="small" @click="daochu">导出</el-button>
          </el-col>
        </el-row>
        <div class="table-box">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="userName"
              label="姓名">
            </el-table-column>
            <el-table-column
              label="头像">
              <template slot-scope="scope">
                <img :src="scope.row.userFace" v-if="scope.row.userFace">
                <span v-else class="namt">{{ scope.row.userName ? scope.row.userName.substring(scope.row.userName.length-2, scope.row.userName.length): '' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="投票结果"
              width="800">
              <template slot-scope="scope">
                <!-- <span>{{scope.row.count}}</span> -->
                <el-progress :text-inside="true" :stroke-width="27" :percentage="scope.row.pre" :show-text="false"></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'data-analysis-evaluate',
  data () {
    return {
      options: [],
      Max: '',
      years: [],
      schoolyear: '',
      tableData: [],
      nodes: [],
      year: '',
      breadChart: {
        label: {
          fontSize: 16
        },
        title: {},
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: [
              {value: 0, name: ''},
              {value: 0, name: ''}
            ],
            color: ['#73D586', '#F7B35B'],
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
      areadChart: {
        label: {
          fontSize: 16
        },
        title: {},
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: [
              {value: 0, name: ''},
              {value: 0, name: ''}
            ],
            color: ['#6E94FF', '#FF8282'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    // 导出
    daochu () {
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/statisticsEvaluate/exportUserVoteSituation?xn=${this.schoolyear}`
    },
    getTu () {
      this.getevaluateInfo()
      this.getlistUser()
    },
    async getevaluateInfo () {
      const data = await this.$store.dispatch('evaluateInfo', {
        xn: this.schoolyear
      })
      this.breadChart.series[0].data[0].value = data.procedure !== 0 ? (data.procedure / data.procedureStudent).toFixed(1) * 100 : 0
      this.breadChart.series[0].data[0].name = data.procedure !== 0 ? (data.procedure / data.procedureStudent).toFixed(1) * 100 + '%' : 0 + '%'
      this.breadChart.series[0].data[1].value = data.procedureStudent - data.procedure !== 0 ? ((data.procedureStudent - data.procedure) / data.procedureStudent).toFixed(1) * 100 : 0
      this.breadChart.series[0].data[1].name = data.procedureStudent - data.procedure !== 0 ? ((data.procedureStudent - data.procedure) / data.procedureStudent).toFixed(1) * 100 + '%' : 0 + '%'
      this.areadChart.series[0].data[0].value = data.environment !== 0 ? (data.environment / data.environmentStudent).toFixed(1) * 100 : 0
      this.areadChart.series[0].data[0].name = data.environment !== 0 ? (data.environment / data.environmentStudent).toFixed(1) * 100 + '%' : 0 + '%'
      this.areadChart.series[0].data[1].value = data.environmentStudent - data.environment !== 0 ? ((data.environmentStudent - data.environment) / data.environmentStudent).toFixed(1) * 100 : 0
      this.areadChart.series[0].data[1].name = data.environmentStudent - data.environment !== 0 ? ((data.environmentStudent - data.environment) / data.environmentStudent).toFixed(1) * 100 + '%' : 0 + '%'
    },
    async getlistUser () {
      this.tableData = await this.$store.dispatch('listUser', {
        xn: this.schoolyear
      })
      let arr = []
      this.tableData.map(item => {
        if (item.count) {
          arr.push(item.count)
        }
      })
      this.Max = Math.max.apply(null, arr)
      this.tableData.map(item => {
        item.pre = item.count / this.Max * 100
      })
      this.tableData.map(async item => {
        if (item.userFace) {
          item.userFace = await this.$store.dispatch('getUserFace', {
            userFace: item.userFace
          })
        }
      })
    }
  },
  watch: {
  },
  async created () {
    this.years = await this.$store.dispatch('xnList')
    this.schoolyear = this.years.filter(item => item.current)[0].xn
    await this.getevaluateInfo()
    await this.getlistUser()
    this.nodes = document.getElementsByClassName('el-progress-bar__inner')
    this.tableData.map((item, index) => {
      let node = document.createElement('span')
      node.innerHTML = item.count
      node.style.color = '#fff'
      node.style.marginRight = '20px'
      for (var i = 0; i < this.nodes.length; i++) {
        if (i === index) {
          this.nodes[i].appendChild(node)
        }
      }
    })
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-analysis-evaluate {
  .el-progress-bar__inner {
    background: #6E94FF;
  }
  .namt {
    cursor: pointer;
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: #96BBF8;
    color: #fff;
    text-align: center;
    line-height: 50px;
    vertical-align: middle;
  }
  .echarts {
    width: 60%;
    height: 260px;
    float: left;
    &>div {
      &>canvas {
        top: -23px;
      }
    }
  }
  .el-table {
    tr {
      td {
        .cell {
          img {
            width: 50px;
            height: 50px;
            display: inline-block;
            border-radius: 100%;
          }
        }
      }
    }
  }
  header {
    margin-bottom: 20px;
    .el-input {
      &>.el-input__inner {
        width: 150px;
        height: 33px;
        line-height: 33px;
      }
    }
    .el-button {
      background: #6E94FF;
      border-color: #6E94FF;
      color: #fff;
      padding: 10px 25px;
      margin-left: 20px;
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
  main {
    width: inherit;
    .partA {
      height: inherit;
      height: 320px;
      margin-bottom: 20px;
      @extend .clearfix;
      .partA-left, .partA-right {
        width: 49%;
        height: inherit;
        background: #fff;
        border-radius: 4px;
        float: left;
        h2 {
          color: #6E94FF;
          border-bottom: 1px solid #E5E5E5;
          font-weight: normal;
          padding: 20px;
          font-size: 16px;
        }
      }
      .partA-left {
        margin-right: 2%;
        @extend .clearfix;
        &>ul {
          margin-top: 100px;
          float: left;
          width: 40%;
          li {
            height: 40px;
            margin-bottom: 30px;
            letter-spacing: 1em;
            font-size: 16px;
            line-height: 40px;
            i {
              width: 8px;
              height: 8px;
              display: inline-block;
              background: #73D586;
              border-radius: 100%;
              margin-right: 10px;
            }
            span {
              color: #73D586;
              font-size: 18px;
              letter-spacing: 0px;
            }
            &:last-child {
              i {
                background: #F7B35B;
              }
              span {
                color: #F7B35B;
                font-size: 18px;
                letter-spacing: 0px;
              }
            }
          }
        }
      }
      .partA-right {
        position: relative;
        &>ul {
          margin-top: 100px;
          float: left;
          width: 40%;
          li {
            height: 40px;
            margin-bottom: 30px;
            letter-spacing: 1em;
            font-size: 16px;
            line-height: 40px;
            i {
              width: 8px;
              height: 8px;
              display: inline-block;
              background: #6E94FF;
              border-radius: 100%;
              margin-right: 10px;
            }
            span {
              color: #6E94FF;
              font-size: 18px;
              letter-spacing: 0px;
            }
            &:last-child {
              i {
                background: #FF8282;
              }
              span {
                color: #FF8282;
                font-size: 18px;
                letter-spacing: 0px;
              }
            }
          }
        }
      }
    }
    .partB {
      width: inherit;
      min-height: 433px;
      background: #fff;
      border-radius: 4px;
      .el-row {
        border-bottom: 1px solid #E5E5E5;
        padding: 20px;
        padding-bottom: 10px;
        .el-col:nth-child(2) {
          text-align: right;
        }
        h2 {
          color: #6E94FF;
          font-weight: normal;
          font-size: 16px;
        }
      }
      .table-box {
        padding: 20px;
      }
    }
  }
}
</style>
