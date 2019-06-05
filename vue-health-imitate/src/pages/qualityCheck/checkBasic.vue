<template>
  <div class='check-basic' >
    <header >
      <el-row>
        <el-col :span="12">
          <img src="../../assets/images/backOff.png" alt="" @click="backOff">
          中小学网络化体检系统
        </el-col>
        <el-col :span="12">
          <span>{{ userName }}</span>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="userPath" v-if="userPath" alt="">
              <img v-else src="../../assets/images/default-avatar.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
              <!-- <el-dropdown-item  @click.native="changePerson">个人信息</el-dropdown-item>
              <el-dropdown-item  @click.native="changePassword">修改密码</el-dropdown-item> -->
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- <el-button size="small" @click="languageChange">
        切换语言
      </el-button> -->
    </header>
    <div class="content">
      <div class="top" v-if="leaderFlag">
        <h1  @click="outsGroup">结束本组体检</h1>
      </div>
      <div class="middle">
        <p>请输入教育ID号或扫码获取信息</p>
        <input  v-model="idCode" @keyup.enter="keyEnd" type="text">
        <span @click="myPhoto"><img src="../../assets/images/saoyisao.png" alt=""></span>
      </div>
      <div class="foot">
        <ul>
          <h2>身高体重</h2>
          <li>已体检：<i>{{ this.qualitySgtz.signedNum }}</i>人</li>
          <li>需质检：<i>{{ this.qualitySgtz.needCheckNum }}</i>项</li>
          <li>已质检：<i>{{ this.qualitySgtz.checkedNum }}</i>项</li>
          <li>不合格率：<i>{{ Number(this.qualitySgtz.unqualifiedRate * 100).toFixed(2) + '%' }}</i></li>
        </ul>
        <ul>
          <h2>血色素</h2>
          <li>已体检：<i>{{ this.qualityXss.signedNum }}</i>人</li>
          <li>需质检：<i>{{ this.qualityXss.needCheckNum }}</i>人</li>
          <li>已质检：<i>{{ this.qualityXss.checkedNum }}</i>人</li>
          <li>不合格率：<i>{{ Number(this.qualityXss.unqualifiedRate * 100).toFixed(2) + '%' }}</i></li>
        </ul>
        <ul>
          <h2>视力</h2>
          <li>已体检：<i>{{ this.qualitySl.signedNum }}</i>人</li>
          <li>需质检：<i>{{ this.qualitySl.needCheckNum }}</i>人</li>
          <li>已质检：<i>{{ this.qualitySl.checkedNum }}</i>人</li>
          <li>不合格率：<i>{{ Number(this.qualitySl.unqualifiedRate * 100).toFixed(2) + '%' }}</i></li>
        </ul>
      </div>
    </div>
    <el-dialog
      title="请选择质检项"
      :visible.sync="centerDialogVisible"
      width="70%"
      center>
      <span>
        <h1>请选择质检项</h1>
        <li @click.stop="qualityTerm('sg')">身高体重</li>
        <li @click.stop="qualityTerm('sl')">视力</li>
        <li @click.stop="qualityTerm('xss')">血色素</li>
      </span>
    </el-dialog>
    <el-dialog title="" :visible.sync="outerVisible" class="checkTab" width='100%' style="margin: 0;">
      <div class="titleBasic">
        <div >
          <dl style="width: 95%">
            <dt>学校:</dt>
            <dd>{{studentInfoList.schoolName}}</dd>
          </dl>
          <dl>
            <dt>姓名:</dt>
            <dd>{{studentInfoList.studentName}}</dd>
          </dl>
          <dl>
            <dt>教育ID:</dt>
            <dd>{{studentInfoList.jyid}}</dd>
          </dl>
          <dl>
            <dt>性别:</dt>
            <dd>{{studentInfoList.sex == '1' ? '男' : '女'}}</dd>
          </dl>
          <dl>
            <dt>出生日期:</dt>
            <dd>{{studentInfoList.birthday | dateFormat('yyyy-MM-dd')}}</dd>
          </dl>
        </div>
        <table border="1" class="xmtable" align="center">
          <thead>
            <tr>
              <td>项目</td>
              <td v-if="checkFlag">体检值</td>
              <td>质检值</td>
              <td v-if="checkFlag">是否合格</td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="this.checkType === 'sg'">
              <td>身高</td>
              <td  v-if="checkFlag"><span v-text="sgVal">{{ this.checkResultList[0].originalValue1 }}</span>cm</td>
              <td :class="checkFlag == false ? 'marginLeft' : 'marginPadd'"><p v-if="checkResultFlag" v-text="sgnumMes" @click="pOnClick('sg')" ref="sg" :class="{'pOnFocus':ind === 'sg', 'empty':this.ind === 'kong' }"></p><dt v-else v-text="sgnumMes"></dt><i>cm</i> </td>
              <td v-if="checkFlag" :class="this.checkResultList[0].qualityFlag ? '' : 'active' ">{{ this.checkResultList[0].qualityFlag ? '合格' : '不合格' }}</td>
            </tr>
            <tr v-if="this.checkType === 'sg'">
              <td>体重</td>
              <td v-if="checkFlag"><span v-text="tzVal">{{ this.checkResultList[1].originalValue1 }}</span> kg</td>
              <td :class="checkFlag == false ? 'marginLeft' : 'marginPadd'"><p v-if="checkResultFlag" v-text="tznumMes" @click="pOnClick('tz', $event)" ref="tz" :class="{'pOnFocus':ind === 'tz', 'empty':this.ind === 'kong'}"></p><dt v-else v-text="tznumMes"></dt><i>kg</i> </td>
              <td v-if="checkFlag" :class="this.checkResultList[1].qualityFlag ? '' : 'active' ">{{ this.checkResultList[1].qualityFlag ? '合格' : '不合格' }} </td>
            </tr>
            <tr v-if="this.checkType === 'sl'">
              <td>视力</td>
              <td v-if="checkFlag" style="width:2.4rem"><div style="background: #fff; margin-top:0.1rem;"><i>右</i><span v-text="slVal1">{{ this.checkResultList[0].originalValue1 }}</span></div><div style="background: #fff; margin: 0.1rem 0"><i>左</i><span v-text="slVal2">{{ this.checkResultList[0].originalValue2 }}</span></div></td>
              <td style="display: flex; flex-direction:column;align-items: center;"><div style="background: #fff; margin-top:0.1rem;"><i>右</i><p v-if="checkResultFlag" v-text="slnumMes1" @click="pOnClick('sl1')" ref="sl1" :class="{'pOnFocus':ind === 'sl1', 'empty':this.ind === 'kong'}"></p><dt v-else v-text="slnumMes1" style="margin-left: 0.2rem;"></dt></div><div style="background: #fff;margin: 0.1rem 0"><i>左</i><p v-if="checkResultFlag" v-text="slnumMes2" @click="pOnClick('sl2')" ref="sl2" :class="{'pOnFocus':ind === 'sl2', 'empty':this.ind === 'kong'}"></p><dt v-else v-text="slnumMes2" style="margin-left: 0.2rem;"></dt></div></td>
              <td v-if="checkFlag" :class="this.checkResultList[0].qualityFlag ? '' : 'active' ">{{ this.checkResultList[0].qualityFlag ? '合格' : '不合格' }}</td>
            </tr>
            <tr v-if="this.checkType === 'xss'">
              <td>血色素</td>
              <td v-if="checkFlag"><span v-text="xssVal">{{ this.checkResultList[0].originalValue1 }}</span></td>
              <td :class="checkFlag == false ? 'marginLeft' : 'marginPadd'"><p v-if="checkResultFlag" v-text="xssnumMes" @click="pOnClick('xss')" ref="xss" :class="{'pOnFocus':ind === 'xss', 'empty':this.ind === 'kong'}"></p><dt v-else v-text="xssnumMes"></dt></td>
              <td v-if="checkFlag" :class="this.checkResultList[0].qualityFlag ? '' : 'active' ">{{ this.checkResultList[0].qualityFlag ? '合格' : '不合格' }}</td>
            </tr>
          </tbody>
        </table>
        <div class="keyboard">
          <table>
            <tr>
              <td style=" width: 4.46rem; margin-right: 0; " @click="backSpace('×')"><img src="../../assets/images/tuiOff.png" alt="" style="vertical-align: middle;"></td>
            </tr>
            <tr><td @click="numClic('7')">7</td><td @click="numClic('8')">8</td><td @click="numClic('9')">9</td></tr>
            <tr><td @click="numClic('4')">4</td><td @click="numClic('5')">5</td><td @click="numClic('6')">6</td></tr>
            <tr><td @click="numClic('1')">1</td><td @click="numClic('2')">2</td><td @click="numClic('3')">3</td></tr>
            <tr><td colspan="2" @click="numClic('0')">0</td><td @click="numClic('.')">.</td></tr>
          </table>
      </div>
      <audio preload="auto" id="audio" ref="audios" :src="audioUrl === 'audioUrl0' ? audioUrl0 : audioUrl === 'audioUrl1' ? audioUrl1 : audioUrl === 'audioUrl2' ? audioUrl2 : audioUrl === 'audioUrl3' ? audioUrl3 : audioUrl === 'audioUrl4' ? audioUrl4 : audioUrl === 'audioUrl5' ? audioUrl5 : audioUrl === 'audioUrl6' ? audioUrl6 : audioUrl === 'audioUrl7' ? audioUrl7 : audioUrl === 'audioUrl8' ?  audioUrl8 : audioUrl === 'audioUrl9' ? audioUrl9 : audioUrl === 'audioUrl11' ? audioUrl11 : audioUrl0"></audio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="quite">关 闭</el-button>
        <el-button type="primary" v-if="resultButton" @click="checkResult">检测</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { notice } from '@/utils/index'
import audioUrl0 from '../../../static/audio/dtmf-0.wav'
import audioUrl1 from '../../../static/audio/dtmf-1.wav'
import audioUrl2 from '../../../static/audio/dtmf-2.wav'
import audioUrl3 from '../../../static/audio/dtmf-3.wav'
import audioUrl4 from '../../../static/audio/dtmf-4.wav'
import audioUrl5 from '../../../static/audio/dtmf-5.wav'
import audioUrl6 from '../../../static/audio/dtmf-6.wav'
import audioUrl7 from '../../../static/audio/dtmf-7.wav'
import audioUrl8 from '../../../static/audio/dtmf-8.wav'
import audioUrl9 from '../../../static/audio/dtmf-9.wav'
import audioUrl10 from '../../../static/audio/dtmf-10.wav'
import audioUrl11 from '../../../static/audio/dtmf-11.wav'
export default {
  name: 'check-basic',
  data () {
    return {
      loading: false,
      centerDialogVisible: false,
      tabDialogVisible: false,
      outerVisible: false,
      audioUrl: '',
      audioUrl0,
      audioUrl1,
      audioUrl2,
      audioUrl3,
      audioUrl4,
      audioUrl5,
      audioUrl6,
      audioUrl7,
      audioUrl9,
      audioUrl8,
      audioUrl10,
      audioUrl11,
      userName: '',
      userPath: '',
      sgnumMes: '',
      tznumMes: '',
      slnumMes1: '',
      slnumMes2: '',
      xssnumMes: '',
      sgCopVal: '',
      tzCopVal: '',
      sl1CopVal: '',
      sl2CopVal: '',
      xssCopVal: '',
      sgVal: '',
      tzVal: '',
      slVal1: '',
      slVal2: '',
      xssVal: '',
      checkFlag: false,
      leaderFlag: false,
      checkResultFlag: true,
      sgBlurFlag: true,
      tzBlurFlag: true,
      sl1BlurFlag: true,
      sl2BlurFlag: true,
      xssBlurFlag: true,
      resultButton: true,
      studentInfoList: [],
      sgList: [],
      tzList: [],
      slList: [],
      xssList: [],
      arrList: [],
      checkResultList: [],
      qualityStatusList: '',
      qualitySgtz: '',
      qualitySl: '',
      qualityXss: '',
      idCode: '',
      checkType: '',
      input: '',
      ind: ''
    }
  },
  methods: {
    qualityTerm (val) {
      this.sgnumMes = ''
      this.tznumMes = ''
      this.slnumMes1 = ''
      this.slnumMes2 = ''
      this.xssnumMes = ''
      this.checkType = val
      this.centerDialogVisible = false
      this.outerVisible = true
    },
    quite () {
      this.outerVisible = false
      this.checkFlag = false
      this.resultButton = true
      this.checkResultFlag = true
    },
    // 调取摄像头
    myPhoto () {
      window.android.getCode()
      setTimeout(() => {
        window.android.getMsg()
      }, 200)
    },
    getMsg (test) {
      this.idCode = test
      this.studentInfo()
      return 1
    },
    // 退出
    logout () {
      // this.$store.dispatch('logout')
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/logout`
    },
    // 分辨率处理
    getRem (pwidth, prem) {
      var html = document.getElementsByTagName('html')[0]
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth
      html.style.fontSize = oWidth / pwidth * prem + 'px'
    },
    numClic (val) {
      val === '1' ? this.audioUrl = 'audioUrl0' : val === '2' ? this.audioUrl = 'audioUrl1' : val === '3' ? this.audioUrl = 'audioUrl2' : val === '4' ? this.audioUrl = 'audioUrl3' : val === '5' ? this.audioUrl = 'audioUrl4' : val === '6' ? this.audioUrl = 'audioUrl5' : val === '7' ? this.audioUrl = 'audioUrl6' : val === '8' ? this.audioUrl = 'audioUrl7' : val === '9' ? this.audioUrl = 'audioUrl8' : val === '10' ? this.audioUrl = 'audioUrl9' : val === '.' ? this.audioUrl = 'audioUrl10' : this.audioUrl = 'audioUrl11'
      this.$refs.audios.play()
      let dom = this.$refs[this.ind]
      dom.innerText = dom.innerText + val
    },
    backSpace () {
      this.audioUrl = 'audioUrl11'
      this.$refs.audios.play()
      let backText = this.$refs[this.ind]
      let s1 = backText.innerText
      s1 = s1.substring('', s1.length - 1)
      s1 = (s1 === '' ? '' : s1)
      backText.innerText = s1
    },
    // 结束本组
    outsGroup () {
      this.$msgbox('确认结束本组质检任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const groupId = this.$route.params.groupId.id
        await this.$store.dispatch('outGroup', {groupId: groupId})
          .then(() => {
            this.$message({
              type: 'success',
              message: '本组质检任务已结束'
            })
          })
        this.$router.push('/qualityCheck/checkPhysique')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 获取质量监测列表
    async qualityStatus () {
      this.qualityStatusList = await this.$store.dispatch('qualityStatus')
      this.qualitySgtz = this.qualityStatusList.sgtz
      this.qualitySl = this.qualityStatusList.sl
      this.qualityXss = this.qualityStatusList.xss
    },
    pOnClick (ind) {
      this.ind = ind
      ind === 'sg' ? this.tzBlur() : ind === 'tz' ? this.sgBlur() : ind === 'sl1' ? this.sl2Blur() : ind === 'sl2' ? this.sl1Blur() : this.ind = ind
    },
    open3 () {
      this.$alert('该数值非法,请重新输入', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      })
    },
    sgBlur () {
      this.sgCopVal = this.$refs.sg.innerHTML * 1
      if (this.sgCopVal) {
        if (this.sgCopVal > 9999 || this.sgCopVal < 100) {
          this.open3()
          this.$refs.sg.innerHTML = ''
          this.ind = 'sg'
          this.sgBlurFlag = false
        } else {
          if (this.sgCopVal > 3000 || this.sgCopVal < 1000) {
            this.sgBlurFlag = false
            this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.sgnumMes = this.sgCopVal / 10
              this.$refs.sg.innerHTML = this.sgnumMes
              this.sgBlurFlag = true
            }).catch(() => {
              this.$refs.sg.innerHTML = ''
              this.ind = 'sg'
            })
          } else {
            this.$refs.sg.innerHTML = this.sgnumMes
            if (this.sgnumMes !== this.sgCopVal) {
              this.sgnumMes = this.sgCopVal / 10
              this.$refs.sg.innerHTML = this.sgnumMes
            } else {
              this.sgnumMes = this.sgCopVal
            }
            this.sgBlurFlag = true
          }
        }
      }
    },
    tzBlur () {
      this.tzCopVal = this.$refs.tz.innerHTML * 1
      if (this.tzCopVal) {
        if (this.tzCopVal > 2000 || this.tzCopVal < 100) {
          this.open3()
          this.$refs.tz.innerHTML = ''
          this.ind = 'tz'
          this.tzBlurFlag = false
        } else {
          if (this.tzCopVal > 1000 || this.tzCopVal < 200) {
            this.tzBlurFlag = false
            this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.tznumMes = this.tzCopVal / 10
              this.tzBlurFlag = true
              this.$refs.tz.innerHTML = this.tznumMes
            }).catch(() => {
              this.$refs.tz.innerHTML = ''
              this.ind = 'tz'
            })
          } else {
            if (this.tznumMes !== this.tzCopVal) {
              this.tznumMes = this.tzCopVal / 10
              this.$refs.tz.innerHTML = this.tznumMes
            } else {
              this.tznumMes = this.tzCopVal
            }
            this.tzBlurFlag = true
          }
        }
      }
    },
    sl1Blur () {
      this.sl1CopVal = this.$refs.sl1.innerHTML * 1
      if (this.sl1CopVal) {
        if (this.sl1CopVal > 99 || this.sl1CopVal < 10) {
          this.open3()
          this.$refs.sl1.innerHTML = ''
          this.ind = 'sl1'
          this.sl1BlurFlag = false
        } else {
          if (this.sl1CopVal > 52 || this.sl1CopVal < 40) {
            this.sl1BlurFlag = false
            this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.sl1BlurFlag = true
              this.slnumMes1 = (this.sl1CopVal / 10).toFixed(1)
              this.$refs.sl1.innerHTML = this.slnumMes1
            }).catch(() => {
              this.$refs.sl1.innerHTML = ''
              this.ind = 'sl1'
            })
          } else {
            if (this.slnumMes1 !== this.sl1CopVal.toFixed(1)) {
              this.slnumMes1 = (this.sl1CopVal / 10).toFixed(1)
              this.$refs.sl1.innerHTML = this.slnumMes1
            } else {
              this.slnumMes1 = this.sl1CopVal.toFixed(1)
            }
            this.sl1BlurFlag = true
          }
        }
      }
    },
    sl2Blur () {
      this.sl2CopVal = this.$refs.sl2.innerHTML * 1
      if (this.sl2CopVal) {
        if (this.sl2CopVal > 99 || this.sl2CopVal < 10) {
          this.open3()
          this.$refs.sl2.innerHTML = ''
          this.ind = 'sl2'
          this.sl2BlurFlag = false
        } else {
          if (this.sl2CopVal > 52 || this.sl2CopVal < 40) {
            this.sl2BlurFlag = false
            this.$confirm('该数值不在正常范围内, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.slnumMes2 = (this.sl2CopVal / 10).toFixed(1)
              this.sl2BlurFlag = true
              this.$refs.sl2.innerHTML = this.slnumMes2
            }).catch(() => {
              this.$refs.sl2.innerHTML = ''
              this.ind = 'sl2'
            })
          } else {
            if (this.slnumMes2 !== this.sl2CopVal.toFixed(1)) {
              this.slnumMes2 = (this.sl2CopVal / 10).toFixed(1)
              // this.sl2CopVal = this.slnumMes2
              this.$refs.sl2.innerHTML = this.slnumMes2
            } else {
              this.slnumMes2 = this.sl2CopVal.toFixed(1)
            }
            this.sl2BlurFlag = true
          }
        }
      }
    },
    xssBlur () {
      this.xssCopVal = this.$refs.xss.innerHTML * 1
      if (this.xssCopVal < 50 || this.xssCopVal > 300) {
        notice('请输入50~300之间的数')
        this.$refs.xss.innerHTML = ''
        this.xssCopVal = ''
        this.ind = 'xss'
        this.xssBlurFlag = false
      } else {
        this.xssnumMes = this.xssCopVal
        this.xssBlurFlag = true
      }
    },
    async keyEnd () {
      if (this.idCode) {
        if ((/^[0-9]+$/).test(this.idCode)) {
          await this.studentInfo()
            .then(() => {
              this.centerDialogVisible = true
              document.activeElement.blur()
            })
        }
      }
    },
    // 获取学生信息
    async studentInfo () {
      await this.$store.dispatch('studentInfo', {jyid: this.idCode})
        .then((item) => {
          this.studentInfoList = item
          this.centerDialogVisible = true
        })
    },
    // 点击检测
    checkResult () {
      if (this.ind === 'sg' || this.ind === 'tz') {
        this.sgBlur()
        this.tzBlur()
        if (this.sgBlurFlag && this.tzBlurFlag) {
          this.checkResultButton()
        }
      }
      if (this.ind === 'sl1') {
        this.sl1Blur()
      }
      if (this.ind === 'sl2') {
        this.sl2Blur()
      }
      if (this.ind === 'sl1' || this.ind === 'sl2') {
        this.sl1Blur()
        this.sl2Blur()
        if (this.sl1BlurFlag && this.sl2BlurFlag) {
          this.checkResultButton()
        }
      }
      if (this.ind === 'xss') {
        this.xssBlur()
        if (this.xssBlurFlag) {
          this.checkResultButton()
        }
      }
      // setTimeout(() => {
      //   if (this.sgBlurFlag && this.tzBlurFlag && this.sl1BlurFlag && this.sl2BlurFlag && this.xssBlurFlag) {
      //     this.checkResultButton()
      //   }
      // }, 500)
    },
    // 检测按钮
    async checkResultButton () {
      this.checkFlag = false
      if (!this.sgCopVal) {
        this.sgCopVal = ''
      }
      if (!this.tzCopVal) {
        this.tzCopVal = ''
      }
      if (this.sl1CopVal === 0.0 || this.sl1CopVal === 0) {
        this.sl1CopVal = ''
      }
      if (this.sl2CopVal === 0.0 || this.sl1CopVal === 0) {
        this.sl2CopVal = ''
      }
      if (!this.xssCopVal) {
        this.xssCopVal = ''
      }
      if (this.checkType === 'sg') {
        this.slVal1 = ''
        this.slVal2 = ''
        this.xssVal = ''
        this.sgList = [{ projectId: 'sg', monitoringValue1: this.$refs.sg.innerHTML }]
        this.tzList = [{ projectId: 'tz', monitoringValue1: this.$refs.tz.innerHTML }]
        this.sgnumMes = this.$refs.sg.innerHTML
        this.tznumMes = this.$refs.tz.innerHTML
        this.slList = []
        this.xssList = []
      } else if (this.checkType === 'sl') {
        this.tzVal = ''
        this.sgVal = ''
        this.xssVal = ''
        this.slList = [{ projectId: 'sl', monitoringValue1: this.$refs.sl1.innerHTML, monitoringValue2: this.$refs.sl2.innerHTML }]
        this.sgList = []
        this.tzList = []
        this.xssList = []
      } else {
        this.tzVal = ''
        this.sgVal = ''
        this.slVal1 = ''
        this.slVal2 = ''
        this.xssList = [{ projectId: 'xss', monitoringValue1: this.$refs.xss.innerHTML }]
        this.xssnumMes = this.xssCopVal
        this.sgList = []
        this.tzList = []
        this.slList = []
      }
      this.arrList = this.sgList.concat(this.tzList).concat(this.slList).concat(this.xssList)
      await this.$store.dispatch('surveyResult', {
        studentId: this.studentInfoList.studentId,
        projectJson: JSON.stringify(this.arrList.filter(item => item.projectId))
      })
        .then((item) => {
          this.checkResultList = item
          this.resultButton = false
          if (this.checkType === 'sg') {
            this.sgVal = this.checkResultList[0].originalValue1
            this.tzVal = this.checkResultList[1].originalValue1
          } else if (this.checkType === 'sl') {
            this.slVal1 = this.checkResultList[0].originalValue1
            this.slVal2 = this.checkResultList[0].originalValue2
          } else {
            this.xssVal = this.checkResultList[0].originalValue1
          }
          this.checkResultFlag = false
          this.checkFlag = true
        })
        .catch(() => {
          this.resultButton = true
          if (this.checkType === 'sg') {
            this.$refs.sg.innerHTML = ''
            this.$refs.tz.innerHTML = ''
          } else if (this.checkType === 'sl') {
            this.$refs.sl1.innerHTML = ''
            this.$refs.sl2.innerHTML = ''
          } else {
            this.$refs.xss.innerHTML = ''
          }
        })
      this.tabDialogVisible = true
    },
    // 返回上一级
    backOff () {
      this.$router.push({name: 'checkPhysique', params: {testGroupFlag: false}})
    }
  },
  mounted () {
    this.leaderFlag = this.$route.params.groupId.leaderFlag
    var path = document.getElementById('contextPath').value
    this.action = `${path}/cmis/importStudent`
    window.getMsg = this.getMsg
  },
  watch: {
    input () {
      this.pageNo = 1
    }
  },
  async created () {
    this.getRem(1920, 100)
    await this.qualityStatus()
    if (this.$store.state.user.name) {
      this.userName = this.$store.state.user.name
    }
    if (this.$store.state.user.face) {
      this.userPath = await this.$store.dispatch('getUserFace', {
        userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
      })
    }
    this.loading = true
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.check-basic {
  background: #6B84FE;
  min-width: 19.2rem;
  height: 100%;
  header {
    height: 1.44rem;
    line-height: 1.44rem;
    background: #6B84FE;
    color: #fff;
    &>.el-row {
      .el-col:nth-child(1) {
        padding-left: 0.4rem;
        font-size: 0.54rem;
        img {
          width: 0.7rem;
          vertical-align: middle;
          margin-right: 0.1rem;
        }
      }
      .el-col:nth-child(2) {
        padding-right: 0.4rem;
        text-align: right;
        span {
          font-size: 0.42rem;
        }
        .el-dropdown-link{
          cursor: pointer;
          display: inline-block;
          width: 1.02rem;
          height: 1.2rem;
          border-radius: 50%;
          background: #6B84FE;
          color: #fff;
          text-align: center;
          line-height: 1.02rem;
          vertical-align: middle;
          img{
            width: 1.02rem;
            height: 1.02rem;
            line-height: 1.02rem;
            border-radius: 50%;
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }
  }
  .content {
    min-height: 9.5rem;
    position: relative;
    border-radius: 0.04rem;
    box-sizing: border-box;
    background: url("../../assets/images/bg.png") no-repeat 0 0;
    .top {
      margin-left: 40%;
      color: #fff;
      h1 {
        display: inline-block;
        float: right;
        text-align: right;
        padding: 0.22rem 0.42rem;
        margin: 0.6rem 0.45rem 0 0;
        font-size: 0.36rem;
        color: #fff;
        border: 0.02rem solid #fff;
      }
    }
    .middle {
      position: absolute;
      left: 22%;
      top: 26%;
      p {
        height: 0.5rem;
        font-size:0.36rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,0.75);
        line-height:0.5rem;
      }
      input {
        display: inline-block;
        width:7.35rem;
        margin-top: 0.2rem;
        height:1.14rem;
        font-size: 0.5rem;
        background:rgba(255,255,255,1);
        border-radius:0.08rem;
        border:2px solid rgba(151,151,151,1);
      }
      span {
        float: right;
        display: inline-block;
        margin: 0.23rem 0 0 0.2rem;
        width:1.14rem;
        height:1.2rem;
        line-height: 1.13rem;
        background:rgba(116,212,134,1);
        border-radius:0.08rem;
        img {
          display: inline-block;
          width: 0.64rem;
          vertical-align: middle;
          margin-left: 0.24rem;
        }
      }
    }
    .foot {
      position: absolute;
      left: 22%;
      top: 59%;
      ul {
        float: left;
        font-size: 0.36rem;
        line-height: 0.56rem;
        border-right: 0.01rem solid #fff;
        padding:0 0.6rem;
        color: #fff;
        h2 {
          font-size: 0.32rem;
        }
        li {
          i{
            font-style: normal;
          }
        }
        &:first-child {
          margin-left: -0.8rem;
        }
        &:last-child {
          border:0;
        }
      }
    }
  }
  .el-dialog {
    min-height: 7.9rem;
    margin-top: 4vh !important;
    font-size: 0.42rem !important;
    .el-dialog__header {
      display: none !important;
    }
    h1 {
      margin: 0.2rem 0 0 0.4rem;
      font-size: 0.42rem;
      color:rgba(74,74,74,1);
      line-height: 0.56rem;
    }
    span {
      li {
        width: 92%;
        height: 1.08rem;
        margin: 56px auto;
        font-size: 0.48rem;
        line-height: 1.08rem;
        text-align: center;
        color: #fff;
        background: #6B84FE;
        cursor: pointer;
        &:first-child {
          opacity: 0.7552;
        }
      }
    }
  }
  .checkTab {
    // padding: 0.1rem;
    > div {
      margin: 0 !important;
      height: 100%;
    }
    .el-dialog__header {
      display: none !important;
    }
    .titleBasic {
      >div {
        height: 2rem;
        background: rgba(236,238,244,1);
        dl {
          float: left;
          font-size: 0.47rem;
          line-height: 1rem;
          margin-left: 0.9rem;
          dt {
            color:rgba(153,153,153,1);
            display: inline-block;
          }
          dd {
            color:rgba(74,74,74,1);
            display: inline-block;
          }
        }
      }
      .xmtable {
        width: 12.98rem;
        margin-top: 0.8rem;
        display: inline-table;
        td {
          &:first-child {
            width: 3rem;
            // height: 1.64rem;
            text-align: center;
            line-height: 1.64rem;
          }
        }
        thead {
          height: 1.08rem;
          background:rgba(171,193,254,1);
          color: #fff;
          font-size: 0.42rem;
          tr {
            text-align: center;
          }
        }
        tbody {
          tr {
            height: 1.64rem;
            td {
              font-size: 0.42rem;
              text-align: center;
              color:rgba(74,74,74,1);
              div {
                span {
                  float: left;
                  margin: 0.3rem;
                }
              }
              &:first-child {
                background:rgba(230,230,230,1);
              }
              &.marginLeft {
                padding-left: 3.6rem;
              }
              &.marginPadd {
                padding-left: 1.5rem;
              }
              p {
                display: inline-block;
                width: 2.8rem;
                height: 1.06rem;
                float: left;
                line-height: 1.08rem;
                background:rgba(255,255,255,1);
                border-radius: 0.09rem;
                overflow: hidden;
                border:2px solid rgba(216,216,216,1);
                &.pOnFocus {
                  border:2px solid rgba(11,22,33,1);
                }
                &.empty {
                  border: none !important;
                }
              }
              dt {
                display: inline-block;
                height: 1.06rem;
                float: left;
                line-height: 1.2rem;
                background:rgba(255,255,255,1);
                border-radius: 0.09rem;
                overflow: hidden;
              }
              i {
                font-style: normal;
                float: left;
                margin:0.3rem 0 0 0.2rem;
              }
              &.active {
                color: #FF5073;
              }
            }
          }
        }
      }
    .keyboard {
      display: inline-block;
      float: right;
      width: 4.36rem;
      margin: 0.8rem 0.15rem 0 0;
      table {
        tr {
          display: inline-flex;
          height: 1.35rem;
          margin-bottom: 0.15rem;
          &:last-child {
            td:first-child {
              width: 2.9rem;
            }
            &:last-child {
              margin-right: 0;
            }
          }
          td {
            text-align: center;
            width: 1.35rem;
            height: 1.35rem;
            line-height: 1.35rem;
            font-size: 0.42rem;
            margin-right: 0.2rem;
            background-color: #CACACA;
            color: #4A4A4A;
            &:nth-child(3n) {
              margin-right: 0;
            }
          }
        }
      }
    }
    }
    .el-dialog__footer{
      text-align: left;
      margin-left: 20%;
      margin-top: 0.5rem;
      .dialog-footer {
        .el-button {
          font-size: 0.36rem;
          width: 3rem;
          height: 0.78rem;
          &:first-child {
            background:rgba(243,243,243,1);
            border-radius: 0.09rem;
            border:2px solid rgba(216,216,216,1);
          }
        }
      }
    }
  }
}
.checkResult {
  min-height: 6rem !important;
  .el-dialog__header {
    display: none !important;
  }
  h3 {
    font-size: 0.42rem !important;
    margin-bottom: 0.2rem;
    color:rgba(117,117,117,1);
    line-height: 0.56rem;
  }
  table {
    width: 100%;
    thead {
      tr {
        text-align: center;
        height: 1.08rem;
        background:rgba(171,193,254,1);
        font-size: 0.42rem;
        color:rgba(255,255,255,1);
        line-height: 0.42rem;
      }
    }
    tbody {
      tr {
        height: 1.08rem;
        td {
          font-size: 0.42rem;
          text-align: center;
          background:rgba(255,255,255,1);
          &:first-child {
            background:rgba(230,230,230,1);
          }
        }
      }
    }
  }
  i {
    margin: 1rem auto 0px;
    display: block;
    font-style: normal;
    width: 3rem;
    height: 0.9rem;
    font-size: 0.36rem;
    color: #000;
    line-height: 0.9rem;
    text-align: center;
    background:rgba(243,243,243,1);
    border-radius: 0.09rem;
    border: 0.02rem solid rgba(216,216,216,1);
  }
}
</style>
<style lang="scss">
  .el-message-box__wrapper {
    .el-message-box__content {
      font-size: 0.36rem !important;
    }
    .el-message-box__btns {
      button{
        font-size: 0.36rem;
      }
    }
  }
</style>
