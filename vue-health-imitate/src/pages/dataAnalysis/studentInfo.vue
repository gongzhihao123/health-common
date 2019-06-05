<template>
  <div class='studentInfo'>
    <header>
      <div class="nav">
        <div class="nav-left">
          <img src="../../assets/images/small-logo.png" @click="$router.push('/navPage')">
          中小学网络化体检系统
        </div>
        <div class="nav-right">
          <span style="font-size: 15px;">{{ userName }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="userPath" v-if="userPath" alt="">
              <img v-else src="../../assets/images/default-avatar.png" alt="">
              <!-- <span v-else>
                {{ userName.substring(userName.length-2, userName.length) }}
              </span> -->
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
              <!-- <el-dropdown-item @click.native="changePerson">个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item> -->
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="Info">
        <h2>学生信息</h2>
        <table>
          <tr>
            <th>姓名</th>
            <th>教育ID</th>
            <th>性别</th>
            <th>生日</th>
            <th>学校</th>
            <th>年级</th>
            <th>班级</th>
          </tr>
          <tr>
            <td>{{row.xm}}<i class="lin" v-if="row.lsFlag">临</i></td>
            <td>{{row.jyid}}</td>
            <td><span v-if="row.xb === 1">男</span><span v-if="row.xb === 2">女</span></td>
            <td>{{row.csrq | dateFormat('yyyy-MM-dd')}}</td>
            <td>{{row.xxmc}}</td>
            <td>{{row.njmc}}</td>
            <td>{{row.bjmc}}</td>
          </tr>
        </table>
        <div class="foot">
          <h2>分析时间段：</h2>
          <el-radio-group v-model="freeselect">
            <el-radio :label="1">学段</el-radio>
            <el-checkbox-group v-model="section" v-if="freeselect === 1" @change="choose">
              <el-checkbox v-for="sec in sections" :label="sec" :key="sec">{{sec}}</el-checkbox>
            </el-checkbox-group>
            <el-radio :label="2">自定义</el-radio>
          </el-radio-group>
          <ul v-if="freeselect === 2">
            <li>
              <el-select v-model="starttime" filterable placeholder="请选择">
                <el-option
                  v-for="item in schoolYearOptions"
                  :key="item.xn"
                  :label="item.name"
                  :value="item.xn">
                </el-option>
              </el-select>
            </li>
            <li>一</li>
            <li>
              <el-select v-model="endtime" filterable placeholder="请选择">
                <el-option
                  v-for="item in schoolYearOptions"
                  :key="item.xn"
                  :label="item.name"
                  :value="item.xn">
                </el-option>
              </el-select>
            </li>
          </ul>
          <el-button icon="el-icon-search" class="sear" @click="Search">查询</el-button>
        </div>
      </div>
      <div class="chartInfo" v-loading="loading">
        <div class="chart-box">
          <div class="sg-box">
            <h2>身高曲线</h2>
            <chart :options="sgChart" class="bread-echart"></chart>
          </div>
          <div class="tz-box">
            <h2>体重曲线</h2>
            <chart :options="tzChart" class="bread-echart"></chart>
          </div>
        </div>
        <div class="chart-box">
            <div class="sg-box">
              <h2>视力曲线</h2>
              <chart :options="slChart" class="bread-echart"></chart>
            </div>
            <div class="tz-box">
              <h2>肺活量曲线</h2>
              <chart :options="fhlChart" class="bread-echart"></chart>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueCropper from 'vue-cropper'
export default {
  name: 'studentInfo',
  data () {
    return {
      freeselect: 1,
      arr: [],
      loading: false,
      row: {},
      schoolYearValue: '',
      schoolYearOptions: [],
      section: [],
      sections: ['小学', '初中', '高中'],
      starttime: '',
      endtime: '',
      rules: {
        old: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        new: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        newAgain: [
          { required: true, message: '确认新密码', trigger: 'blur' }
        ]
      },
      ruleForm: {
        old: '',
        new: '',
        newAgain: ''
      },
      // example2: {
      //   img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg'
      // },
      personVisible: false,
      passwordVisible: false,
      userPath: '',
      userName: '',
      slChart: {
        legend: {
          x: 'right'
        },
        grid: {
          left: '50',
          right: '0',
          bottom: '15',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: -50
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '',
          nameLocation: 'start'
        },
        series: [{
          name: '视力-右',
          type: 'line',
          data: [],
          lineStyle: {
            color: '#6E94FF'
          },
          itemStyle: {
            color: '#6E94FF'
          },
          label: {
            show: true,
            color: '#6E94FF',
            fontSize: '16'
          }
        },
        {
          name: '视力-左',
          type: 'line',
          data: [],
          lineStyle: {
            color: '#F7B35B'
          },
          symobolOffset: ['50%', '50%'],
          itemStyle: {
            color: '#F7B35B'
          },
          label: {
            show: true,
            color: '#666',
            fontSize: '16'
          }
        }]
      },
      sgChart: {
        legend: {},
        grid: {
          left: '50',
          right: '0',
          bottom: '15',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: -50
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '单位: cm',
          nameLocation: 'start'
        },
        series: [{
          // name: '邮件营销',
          type: 'line',
          data: [],
          lineStyle: {
            color: '#6E94FF'
          },
          itemStyle: {
            color: '#6E94FF'
          },
          label: {
            show: true,
            color: '#666',
            fontSize: '16'
          }
        }]
      },
      tzChart: {
        legend: {},
        grid: {
          left: '50',
          right: '0',
          bottom: '15',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: -50
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '单位: kg',
          nameLocation: 'start'
        },
        series: [{
          // name: '邮件营销',
          type: 'line',
          data: [],
          lineStyle: {
            color: '#6E94FF'
          },
          itemStyle: {
            color: '#6E94FF'
          },
          label: {
            show: true,
            color: '#666',
            fontSize: '16'
          }
        }]
      },
      fhlChart: {
        legend: {},
        grid: {
          left: '50',
          right: '0',
          bottom: '15',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: -50
          },
          data: []
        },
        yAxis: {
          type: 'value',
          name: '',
          nameLocation: 'start'
        },
        series: [{
          type: 'line',
          data: [],
          lineStyle: {
            color: '#6E94FF'
          },
          itemStyle: {
            color: '#6E94FF'
          },
          label: {
            show: true,
            color: '#666',
            fontSize: '16'
          }
        }]
      }
    }
  },
  methods: {
    choose () {
      let arrs = this.section.join(',')
      this.arr[0] = (arrs.indexOf('小学') > -1) ? '小学' : ''
      this.arr[1] = (arrs.indexOf('初中') > -1) ? '初中' : ''
      this.arr[2] = (arrs.indexOf('高中') > -1) ? '高中' : ''
    },
    async Search () {
      this.loading = true
      let str = this.arr.filter(item => item !== '').join(',')
      const data = await this.$store.dispatch('evaluateDetail', {
        studentId: this.row.xsid,
        njmc: this.row.njmc,
        xdmc: this.row.xdmc,
        xnStart: this.freeselect === 1 ? '' : this.starttime,
        xd: this.freeselect === 1 ? str : '',
        xnEnd: this.freeselect === 1 ? '' : this.endtime
      })
      // 搜索初始化
      if (!data) {
        this.loading = false
        return
      }
      if (data.sg && data.sg.length !== 0) {
        this.sgChart.xAxis.data = []
        this.sgChart.series[0].data = []
        data.sg.map(item => {
          if (item.xn) {
            let max = item.xn + 1
            this.sgChart.xAxis.data.push(item.xn + '-' + max)
          }
          if (item.value1) {
            this.sgChart.series[0].data.push(item.value1)
          }
        })
      }
      if (data.tz && data.tz.length !== 0) {
        this.tzChart.xAxis.data = []
        this.tzChart.series[0].data = []
        data.tz.map(item => {
          if (item.xn) {
            let max = item.xn + 1
            this.tzChart.xAxis.data.push(item.xn + '-' + max)
          }
          if (item.value1) {
            this.tzChart.series[0].data.push(item.value1)
          }
        })
      }
      if (data.sl && data.sl.length !== 0) {
        this.slChart.xAxis.data = []
        this.slChart.series[0].data = []
        this.slChart.series[1].data = []
        data.sl.map(item => {
          if (item.xn) {
            let max = item.xn + 1
            this.slChart.xAxis.data.push(item.xn + '-' + max)
          }
          if (item.value1) {
            this.slChart.series[0].data.push(item.value1)
          }
          if (item.value2) {
            this.slChart.series[1].data.push(item.value2)
          }
        })
      }
      if (data.fhl && data.fhl.length !== 0) {
        this.fhlChart.xAxis.data = []
        // this.fhlChart.series[0].data = []
        data.fhl.map(item => {
          if (item.xn) {
            let max = item.xn + 1
            this.fhlChart.xAxis.data.push(item.xn + '-' + max)
          }
          if (item.value1) {
            this.fhlChart.series[0].data.push(item.value1)
          }
        })
      }
      this.loading = false
    },
    finish (type) {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
      })
    },
    // 退出
    logout () {
      // const path = document.getElementById('contextPath').value
      // window.location.href = `${path}/logout`
      this.$store.dispatch('logout')
    }
  },
  components: {
    vueCropper
  },
  watch: {
    freeselect () {
      if (this.freeselect === 1) {
        this.starttime = ''
        this.endtime = ''
      } else {
        this.section = []
      }
    }
  },
  async created () {
    this.loading = true
    this.row = JSON.parse(sessionStorage.row)
    if (this.row.xdmc === '小学') {
      this.section = ['小学']
    } else if (this.row.xdmc === '初中') {
      this.section = ['小学', '初中']
    } else if (this.row.xdmc === '高中') {
      this.section = ['小学', '初中', '高中']
    }
    this.schoolYearOptions = await this.$store.dispatch('xnList')
    setTimeout(async () => {
      if (this.$store.state.user.name) {
        this.userName = this.$store.state.user.name
      }
      if (this.$store.state.user.face) {
        this.userPath = await this.$store.dispatch('getUserFace', {
          userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
        })
      }
    }, 400)
    const data = await this.$store.dispatch('evaluateDetail', {
      studentId: this.row.xsid,
      njmc: this.row.njmc,
      xdmc: this.row.xdmc,
      xd: this.section.join(','),
      xnStart: '',
      xnEnd: ''
    })
    if (data.sg && data.sg.length !== 0) {
      data.sg.map(item => {
        if (item.xn) {
          let max = item.xn + 1
          this.sgChart.xAxis.data.push(item.xn + '-' + max)
        }
        if (item.value1) {
          this.sgChart.series[0].data.push(item.value1)
        }
      })
    }
    if (data.tz && data.tz.length !== 0) {
      data.tz.map(item => {
        if (item.xn) {
          let max = item.xn + 1
          this.tzChart.xAxis.data.push(item.xn + '-' + max)
        }
        if (item.value1) {
          this.tzChart.series[0].data.push(item.value1)
        }
      })
    }
    if (data.sl && data.sl.length !== 0) {
      data.sl.map(item => {
        if (item.xn) {
          let max = item.xn + 1
          this.slChart.xAxis.data.push(item.xn + '-' + max)
        }
        if (item.value1) {
          this.slChart.series[0].data.push(item.value1)
        }
        if (item.value2) {
          this.slChart.series[1].data.push(item.value2)
        }
      })
    }
    if (data.fhl && data.fhl.length !== 0) {
      data.fhl.map(item => {
        if (item.xn) {
          let max = item.xn + 1
          this.fhlChart.xAxis.data.push(item.xn + '-' + max)
        }
        if (item.value1) {
          this.fhlChart.series[0].data.push(item.value1)
        }
      })
    }
    this.loading = false
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
  .studentInfo {
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
      margin-left: 10px;
    }
    background: #EAEFF8;
    min-width: 1200px;
    position: relative;
    bottom: 0px;
    &>header {
      height: 80px;
      line-height: 80px;
      background: #6B92FE;
      color: #fff;
      .nav {
        width: 1200px;
        margin: 0px auto;
        @extend .clearfix;
        .nav-left {
          float: left;
          padding-left: 40px;
          font-size: 24px;
          img {
            width: 50px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
        .nav-right {
          float: right;
          padding-right: 40px;
          text-align: right;
          .el-dropdown-link{
            cursor: pointer;
            display: inline-block;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #96BBF8;
            color: #fff;
            text-align: center;
            line-height: 36px;
            vertical-align: middle;
            img{
              width: 36px;
              height: 36px;
              border-radius: 50%;
              vertical-align: middle;
              cursor: pointer;
            }
          }
        }
      }
    }

    .content {
      margin: 20px auto 0px auto;
      width: 1200px;
      background: #EAEFF8;
      /* height: calc(100vh - 80px); */
      .Info {
        @extend .clearfix;
        width: inherit;
        background: #fff;
        border-radius: 4px;
        padding: 20px 0px;
        box-sizing: border-box;
      }
      h2 {
        font-weight: normal;
        color: #6B92FE;
        text-indent: 20px;
        border-bottom: 1px solid #E5E5E5;
        font-size: 16px;
        padding-bottom: 16px;
      }
      img {
        width: 60px;
        height: 60px;
        display: inline-block;
        border-radius: 100%;
        margin: 20px 0px 0px 20px;
        float: left;
      }
      table {
        float: left;
        height: 60px;
        margin: 20px 0px 20px 20px;
        width: 1100px;
        tr {
          th {
            color: #B3B3B3;
          }
          td {
            color: #666;
          }
        }
      }
      .foot {
        clear: both;
        /* @extend .clearfix; */
        h2 {
          font-weight: normal;
          font-size: 15px;
          margin-bottom: 20px;
        }
        .el-checkbox-group {
          width: auto;
          float: left;
          margin: 0px 20px 0px 20px;
        }
        .el-input--suffix .el-input__inner {
          width: 220px;
          height: 32px;
        }
        &>.el-radio-group {
          float: left;
          height: 32px;
          line-height: 32px;
          width: auto;
          margin-left: 20px;
          &>.el-radio {
            height: 32px;
            line-height: 32px;
            float: left;
          }
        }
        &>ul {
          float: left;
          margin-left: 20px;
          &>li {
            .el-date-editor.el-input, .el-date-editor.el-input__inner {
              height: 32px;
              line-height: 32px;
            }
            .el-input--prefix .el-input__inner {
              height: 32px;
              line-height: 32px;
            }
            line-height: 32px;
            height: 32px;
            float: left;
            margin-left: 15px;
            .el-input__icon {
              line-height: 32px;
            }
          }
        }
        &>.sear {
          background: #73D586;
          border-color: #73D586;
          padding: 8px 25px;
          color: #fff;
          float: none;
          margin-left: 20px;
        }
      }
      .chartInfo {
        /* height: calc(100vh - 280px);
        overflow-y: scroll; */
        margin-top: 20px;
        padding-bottom: 20px;
      }
      ::-webkit-scrollbar {
        width: 2px;
      }
      .chart-box {
        margin: 0px 0px 20px 0px;
        &:nth-child(2) {
          margin-bottom: 0px !important;
        }
        width: inherit;
        @extend .clearfix;
        .sg-box, .tz-box {
          width: 594px;
          height: 410px;
          float: left;
          background: #fff;
          border-radius: 4px;
          display: inline-block;

          h2 {
            margin: 0px;
            padding: 0px;
            height: 50px;
            line-height: 50px;
          }
          .echarts {
            width: 520px !important;
            height: 300px !important;
            padding-right: 50px;
            overflow-y: scroll;
            div {
              &:nth-child(1) {
                width: inherit !important;
                height: inherit !important;
              }
              canvas {
                width: inherit !important;
                height: inherit !important;
              }
            }
          }
        }
        .sg-box {
          margin-right: 10px;
        }
      }
    }
    .password-visible {
      .el-form-item__label {
        width: 150px !important;
      }
      .el-form-item__content {
        margin-left: 150px !important;
      }
      .el-input {
        width: 370px;
      }
    }
  }
</style>
