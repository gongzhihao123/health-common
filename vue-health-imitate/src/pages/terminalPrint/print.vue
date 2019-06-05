<template>
  <div class='print'>
    <header>
      <el-row>
        <el-col :span="12">
          <img src="../../assets/images/small-logo.png" @click="$router.push('/navPage')">
          中小学网络化体检系统
        </el-col>
        <el-col :span="12">
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
              <!-- <el-dropdown-item @click.native="changePerson">个人信息</elw-dropdown-item>
              <el-dropdown-item @click.native="changePassword">修改密码</el-dropdown-item> -->
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- <el-button size="small" @click="languageChange">
        切换语言
      </el-button> -->
    </header>
    <div>
      <p class="login-logo">
        <img src="../../assets/images/logo.png" @click="$router.push('/terminalPrint/sweep')">
        <span>中小学网络化体检系统</span>
        <!-- <sup></sup> -->
      </p>

      <div>
        <span v-if="resultCode" @click="getfeedbackOne">
          <img src="../../assets/images/print.png" alt="">
          打印体检反馈单
        </span>
        <span v-else>
          正在加载，请稍后...
        </span>
        <br>
        <span v-if="printing" @click="$router.push('/terminalPrint/sweep')">
          <img src="../../assets/images/back.png" alt="">
          返 回 到 扫 码 页
        </span>
        <!-- <div v-else>
          <img v-if="printEnd" src="../../assets/images/printing.png" alt="" @click="printEnd = false">
          <img v-else src="../../assets/images/print-end.png" alt="" @click="printing = true">
          <p v-if="printEnd">
            正在打印体检反馈单，请稍候......
          </p>
          <p v-else>
            打印已完成，请取走体检反馈单
          </p>
        </div> -->
      </div>
    </div>
    <el-dialog
      title=""
      :show-close="false"
      :fullscreen="true"
      :modal='false'
      :visible.sync="dialogVisible"
      width="717px">
      <div class="top" v-if="!printButton" style="margin-bottom: 120px;"></div>
      <el-button style="padding: 8px 30px;margin-bottom: 10px;" v-if="printButton" @click="downConfirm">打 印</el-button>
      <h2 style="text-align: center;margin-top: 30px;margin: 0;font-weight: normal;">北京市学生健康体检结果反馈表</h2>
      <p style="text-align: center;margin: 0;">
        {{ studentDetail.xn }}-{{ Number(studentDetail.xn) + 1 }}学年度 {{ studentDetail.schoolName }} {{ studentDetail.gradeName }} {{ studentDetail.className }}
      </p>
      <p  style="text-align: center;margin: 0;">
        姓名:{{ studentDetail.studentName }} 性别:{{ studentDetail.sex === 1 ? '男' : '女' }} 出生日期：{{ studentDetail.birthday | dateFormat('yyyy-MM-dd') }} 体检日期:{{ studentDetail.examinationDate | dateFormat('yyyy-MM-dd') }}
      </p>
      <table border="1" cellspacing="0" width="95%"  style="margin-left: 25px;">
        <thead>
          <tr>
            <th colspan="2" width="150">体检项目</th>
            <th width="140">体检结果</th>
            <th width="100">评价</th>
            <th>反馈意见</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2" style="text-align: center;">身高(cm)</td>
            <td style="text-align: center;"> {{ feedback.sg && Number(feedback.sg.result).toFixed(1) }} </td>
            <td style="text-align: center;"> {{ feedback.sg && feedback.sg.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.sg && feedback.sg.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">体重(kg)</td>
            <td style="text-align: center;"> {{ feedback.tz && Number(feedback.tz.result).toFixed(1) }} </td>
            <td style="text-align: center;"> {{ feedback.tz && feedback.tz.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.tz && feedback.tz.suggest }} </td>
          </tr>
          <tr v-if="studentDetail.standardSetting == '2'">
            <td colspan="2" style="text-align: center;">发育及营养状况</td>
            <td style="text-align: center;"> {{ feedback.yybmi && Number(feedback.yybmi.result).toFixed(1) }} </td>
            <td style="text-align: center;"> {{ feedback.yybmi && feedback.yybmi.appraise}} </td>
            <td style="text-align: center;"> {{ feedback.yybmi && feedback.yybmi.suggest }} </td>
          </tr>
          <tr v-else>
            <td colspan="2" style="text-align: center;">发育及营养状况</td>
            <td style="text-align: center;"> {{ feedback.yybmi && Number(feedback.yybmi.result).toFixed(1) }} </td>
            <td style="text-align: center;"> {{ feedback.yybmi && feedback.yybmi.appraiseCode}} </td>
            <td style="text-align: center;"> {{ feedback.yybmi && feedback.yybmi.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">肺活量(ml)</td>
            <td style="text-align: center;"> {{ feedback.fhl && feedback.fhl.result }} </td>
            <td style="text-align: center;"> {{ feedback.fhl && feedback.fhl.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.fhl && feedback.fhl.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">血压(mmHg)</td>
            <td style="text-align: center;"> {{ feedback.xy && feedback.xy.result }} </td>
            <td style="text-align: center;"> {{ feedback.xy && feedback.xy.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.xy && feedback.xy.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">心率(次/分)</td>
            <td style="text-align: center;"> {{ feedback.xl && feedback.xl.result }} </td>
            <td style="text-align: center;"> {{ feedback.xl && feedback.xl.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.xl && feedback.xl.suggest }} </td>
          </tr>
          <tr>
            <td rowspan="2" style="text-align: center;">视力</td>
            <td style="text-align: center;">左</td>
              <!-- <el-row style="display: flex;"> -->
                <!-- <div style="display: inline-block;width: 70px; vertical-align: middle;margin-top: -30px;">
                  视力
                </div>
                <div :span="12"  style="display: inline-block;border-left: 1px solid #808080;width: 70px;">
                  <p style="border-bottom: 1px solid #808080;height: 20px">
                    左眼
                  </p>
                  <p style="height: 20px">
                    右眼
                  </p>
                </div> -->
              <!-- </el-row> -->
            <td style="height: 20px;text-align: center;">
              {{ feedback.sl && feedback.sl.result.slice(feedback.sl.result.indexOf('_') + 1, feedback.sl.result.length) }}
            </td>
            <td rowspan="2" style="text-align: center;">{{ feedback.sl && feedback.sl.appraise }}</td>
            <td rowspan="2" style="text-align: center;">{{ feedback.sl && feedback.sl.suggest }}</td>
          </tr>
          <tr style="height: 20px">
            <td style="text-align: center;">右</td>
            <td style="text-align: center;">
              {{ feedback.sl && feedback.sl.result.slice(0, feedback.sl.result.indexOf('_') === -1 ? feedback.sl.result.length : feedback.sl.result.indexOf('_')) }}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">色觉</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.sj && feedback.sj.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.sj && feedback.sj.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.sj && feedback.sj.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">沙眼</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.sy && feedback.sy.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.sy && feedback.sy.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.sy && feedback.sy.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">结膜炎</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.jmy && feedback.jmy.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.jmy && feedback.jmy.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.jmy && feedback.jmy.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2" style="text-align: center;">口腔</td>
            <td colspan="2" style="text-align: center;">
              {{ feedback.qc && (feedback.qc.result === '未检查' ? feedback.qc.result : feedback.qc.result.slice(0, feedback.qc.result.indexOf('_'))) }}
            </td>
            <td rowspan="2" style="text-align: center;">{{ feedback.qc && feedback.qc.suggest }}</td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">
              {{ feedback.qc && feedback.qc.result.slice(feedback.qc.result.indexOf('_') + 1, feedback.qc.result.length) }}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">心脏</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.xz && feedback.xz.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.xz && feedback.xz.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.xz && feedback.xz.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">肺</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.f && feedback.f.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.f && feedback.f.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.f && feedback.f.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">肝脾</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.gp && feedback.gp.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.gp && feedback.gp.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.gp && feedback.gp.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">头颈</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.tj && feedback.tj.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.tj && feedback.tj.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.tj && feedback.tj.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">胸部</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.xb && feedback.xb.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.xb && feedback.xb.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.xb && feedback.xb.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">脊柱</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.jz && feedback.jz.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.jz && feedback.jz.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.jz && feedback.jz.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">四肢关节</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.szgj && feedback.szgj.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.szgj && feedback.szgj.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.szgj && feedback.szgj.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">皮肤淋巴</td>
            <td colspan="2" style="text-align: center;"> {{ feedback.pf && feedback.pf.result }} </td>
            <!-- <td style="text-align: center;"> {{ feedback.pf && feedback.pf.appraise }} </td> -->
            <td style="text-align: center;"> {{ feedback.pf && feedback.pf.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">血色素</td>
            <td style="text-align: center;"> {{ feedback.xss && feedback.xss.result }} </td>
            <td style="text-align: center;"> {{ feedback.xss && feedback.xss.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.xss && feedback.xss.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">便检</td>
            <td style="text-align: center;"> {{ feedback.bj && feedback.bj.result }} </td>
            <td style="text-align: center;"> {{ feedback.bj && feedback.bj.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.bj && feedback.bj.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">肝功能</td>
            <td style="text-align: center;"> {{ feedback.ggn && feedback.ggn.result }} </td>
            <td style="text-align: center;"> {{ feedback.ggn && feedback.ggn.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.ggn && feedback.ggn.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">PPD试验</td>
            <td style="text-align: center;"> {{ feedback.ppd && feedback.ppd.result }} </td>
            <td style="text-align: center;"> {{ feedback.ppd && feedback.ppd.appraise }} </td>
            <td style="text-align: center;"> {{ feedback.ppd && feedback.ppd.suggest }} </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">体检单位</td>
            <td colspan="3">怀柔区中小学卫生保健所</td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left;padding-left: 10px;">
              <span class="test_tag">
                营养状况评价结果根据2005年中国肥胖工作组制定《中国学龄儿童超重肥胖筛查BMI分类标准》简称WGOC-BMI标准。
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left;padding-left: 10px;">
              <span class="test_tag">
                根据教委的要求，请家长登录 http://xsjk.bjedu.cn 找到孩子的体检信息表，点击“签收回执”以确认收到该体检反馈表。
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left;padding-left: 10px;">
              <span class="test_tag">
                教育ID号：{{ studentDetail.tempFlag ? studentDetail.tempEduid : studentDetail.jyid }}  如果您对体检反馈单上的数据有疑问，请您咨询学校校医。
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <i style="display:block; width:100%; border: 1px dashed #222; margin: 10px 0"></i>
        <p style="text-align: right;margin: 0;">
          <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 年级 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 班的 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 同学的健康体检结果反馈表我已收到，特此证明。 <br>
          家长签字 <span style="display: inline-block;min-width: 50px;border-bottom: 1px solid #808080;"></span> <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 年 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 月 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 日 &nbsp;&nbsp;&nbsp;
        </p>
      </div>
      <Chart :chart-list="chartList"></Chart>
    </el-dialog>
    <audio :src="audioUrl" autoplay="autoplay"></audio>
    <audio :src="audioUrlPrint" ref="audioUrlPrint"></audio>
  </div>
</template>

<script>
import audioUrl from '../../../static/audio/7.mp3'
import audioUrlPrint from '../../../static/audio/9.mp3'
import Chart from './components/chart.vue'
export default {
  name: 'print',
  data () {
    return {
      userPath: '',
      userName: '',
      dialogVisible: true,
      printButton: true,
      studentDetail: {},
      feedback: {},
      resultCode: false,
      audioUrl,
      audioUrlPrint,
      printing: true,
      chartList: '',
      printEnd: true
    }
  },
  components: {
    Chart
  },
  methods: {
    // 下载确认按钮
    downConfirm () {
      this.printButton = false
    },
    // 获取学生体检反馈表数据
    getfeedbackOne () {
      this.$refs.audioUrlPrint.play()
      let newWindow = window.open('打印窗口', '_blank')
      let docStr = document.querySelectorAll('.el-dialog__body')[0].innerHTML
      newWindow.document.write(docStr)
      newWindow.document.close()
      newWindow.print()
      newWindow.close()
      this.dialogVisible = false
      this.$router.push('/terminalPrint/sweep')
    }
  },
  watch: {
  },
  async mounted () {
    let data = await this.$store.dispatch('examPrintGetfeedbackOne', {
      studentId: sessionStorage.HEALTH_STUDENTID
    })
    if (data) {
      this.chartList = data
      setTimeout(() => {
        this.resultCode = true
      }, 3000)
      this.printButton = false
      this.studentDetail = data.result
      this.feedback = data.result.feedback
    }
  },
  async created () {
    if (this.$store.state.user.name) {
      this.userName = this.$store.state.user.name
    }
    if (this.$store.state.user.face) {
      this.userPath = await this.$store.dispatch('getUserFace', {
        userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
      })
    }
    sessionStorage.TIME = 0
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.print {
  background: url(../../assets/images/bg.png);
  background-size: cover;
  min-width: 1200px;
  min-height: 570px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .el-dialog__wrapper {
    z-index: -1 !important;
  }
  .v-modal {
    z-index: -1 !important;
  }
  &>header {
    height: 80px;
    line-height: 80px;
    background: #6B84FE;
    color: #fff;

    &>.el-row {
      .el-col:nth-child(1) {
        padding-left: 40px;
        font-size: 24px;
        img {
          width: 50px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      .el-col:nth-child(2) {
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
  &>div:nth-child(2) {
    margin: 0 auto;
    margin-top: 10%;
    width: 580px;
    text-align: center;

    .login-logo{
      position: relative;
      img {
        vertical-align: middle;
        width: 70px;
      }
      span {
        vertical-align: middle;
        color: #fff;
        font-size: 36px;
        margin-left: $width;
      }
      sup {
        position: absolute;
        bottom: -60px;
        left: calc(50% - 25px);
        width: 50px;
        border: 2px solid #fff;
        border-bottom: 0;
      }
    }

    &>div {
      margin-top: 150px;
      &>span {
        cursor: pointer;
        display: inline-block;
        width: 240px;
        height: 60px;
        line-height: 60px;
        border-radius: 5px;
        color: #fff;
        background: rgba(147,140,245,.5);
        font-size: 16px;
        margin-bottom: 30px;
        img {
          vertical-align: middle;
          margin-right: 20px;
        }
        &:hover {
          background: rgba(178,174,253,.5);
        }
      }
      &>div {
        p {
          font-size: 16px;
          color: #fff;
          margin-top: 20px;
        }
      }
    }
  }

  .el-dialog {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      overflow-x: hidden;
      text-align: center;
      padding-right: 15px;
      padding-left: 15px;
      padding-bottom: 0;
      font-family: '宋体';
      .top {
        border-top: 0;
        height: 100px;
      }
      table {
        .test_tag{
          display: inline-block;
          width: 110%;
          font-size:12px;
          -webkit-transform-origin-x: 0;
          -webkit-transform: scale(0.95);
        }
        th {
          text-align: center;
          background: #EEEEEE;
          font-weight: bold;
        }
        td {
          // text-align: left;
          // padding-left: 10px;
          &:nth-child(1) {
            text-align: center;
            padding-left: 0px;
          }
          .el-row {
            .el-col:nth-child(1) {
              line-height: 48px;
            }
            .el-col:nth-child(2) {
              border-left: 1px solid #808080;
              p:nth-child(1) {
                border-bottom: 1px solid #808080;
              }
            }
          }
        }
      }
      &>div {
        margin-top: 5px;
        border-top: 2px dashed #808080;
        p {
          text-align: right;
          span {
            display: inline-block;
            min-width: 30px;
            border-bottom: 1px solid #808080;
          }
        }
      }
    }
  }
}
</style>
