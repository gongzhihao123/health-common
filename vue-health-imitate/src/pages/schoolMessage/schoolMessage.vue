<template>
  <div class='school-message'>
    <header>
      <div>
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
      </div>

      <!-- <div>
        <span>
          学校：
        </span>
        <el-select v-model="schoolValue" clearable filterable placeholder="请选择" @change="schoolChange">
          <el-option
            v-for="item in schoolList"
            :key="item.xxdm"
            :label="item.xxmc"
            :value="item.xxdm">
          </el-option>
        </el-select>
      </div> -->

      <div>
        <span>
          年级：
        </span>
        <el-select v-model="gradeValue" class="select-width-s" @change="gradeChange" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in gradeList"
            :key="item.njid"
            :label="item.njmc"
            :value="item.njid">
          </el-option>
        </el-select>
      </div>

      <div>
        <span>
          班级：
        </span>
        <el-select v-model="classValue" class="select-width-s" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in classList"
            :key="item.bjid"
            :label="item.bjmc"
            :value="item.bjid">
          </el-option>
        </el-select>
      </div>

      <div>
        <span>
          临时添加：
        </span>
        <el-select class="select-width-s" v-model="temporaryValue" clearable filterable placeholder="选择">
          <el-option
            v-for="item in temporaryList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>

      <div>
        <el-button size="small" type="success" icon="el-icon-search" @click="search">查询</el-button>
        <el-button size="small" type="primary" @click="batchDownload">批量下载体检反馈</el-button>
      </div>
    </header>

    <main>
      <div>
        <el-autocomplete
          v-model="keyword"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入教育ID或学生姓名搜索"
          @select="handleSelect"
          :trigger-on-focus="false"
        ></el-autocomplete>
        <!-- <el-input placeholder="请输入教育ID或学生姓名搜索"></el-input> -->
        <el-button size="small" @click="sousuo" type="success" icon="el-icon-search">搜索</el-button>
      </div>

      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label-class-name="head"
            width="150"
            label="教育ID">
            <template slot-scope="scope">
              {{ scope.row.tempFlag ? scope.row.tempEduid : scope.row.jyid }}
              <i class="lin" v-if="scope.row.tempFlag">临</i>
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="studentName"
            width="160"
            label="姓名">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="schoolName"
            show-overflow-tooltip
            label="学校">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="gradeName"
            width="100"
            label="年级">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            prop="className"
            width="100"
            label="班级">
          </el-table-column>
          <el-table-column
            label-class-name="head"
            width="100"
            label="性别">
            <template slot-scope="scope">
              {{ scope.row.sex === 1 ? '男' : '女' }}
            </template>
          </el-table-column>
          <el-table-column
            label-class-name="head"
            width="180"
            label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.examinationId" type="primary" size="small" @click="look(scope.row)">查看详情</el-button>
              <span v-else>未体检</span>
              <el-button type="primary" size="small" v-if="scope.row.examinationId" @click="down(scope.row)">打印</el-button>
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
    <el-dialog
      title=""
      :show-close="false"
      :fullscreen="true"
      :visible.sync="dialogVisible"
      width="717px">
      <div class="top" v-if="!printButton" style="margin-bottom: 80px;"></div>
      <el-button style="padding: 8px 30px;margin-bottom: 10px;" v-if="printButton" @click="downConfirm">打 印</el-button>
      <h2 style="text-align: center;margin-top: 30px;margin: 0;">北京市学生健康体检结果反馈表</h2>
      <p style="text-align: center;margin: 0;">
        {{ studentDetail.xn }}-{{ Number(studentDetail.xn) + 1 }}学年度 {{ studentDetail.schoolName }} {{ studentDetail.gradeName }} {{ studentDetail.className }}
      </p>
      <p  style="text-align: center;margin: 0;">
        姓名:{{ studentDetail.studentName }} 性别:{{ studentDetail.sex === 1 ? '男' : '女' }} 出生日期：{{ studentDetail.birthday | dateFormat('yyyy-MM-dd') }} 体检日期:{{ studentDetail.examinationDate | dateFormat('yyyy-MM-dd') }}
      </p>
      <table border="1" cellspacing="0" width="95%"  style="margin-left: 25px;">
        <thead>
          <tr>
            <th width="150">体检项目</th>
            <th width="150">体检结果</th>
            <th width="150">评价</th>
            <th>反馈意见</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align: center;">身高(cm)</td>
            <td> {{ feedback.sg && feedback.sg.result }} </td>
            <td> {{ feedback.sg && feedback.sg.appraise }} </td>
            <td> {{ feedback.sg && feedback.sg.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">体重(kg)</td>
            <td> {{ feedback.tz && feedback.tz.result }} </td>
            <td> {{ feedback.tz && feedback.tz.appraise }} </td>
            <td> {{ feedback.tz && feedback.tz.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">发育及营养状况</td>
            <td> {{ feedback.yy && feedback.yy.result }} </td>
            <td> {{ feedback.yy && feedback.yy.appraise }} </td>
            <td> {{ feedback.yy && feedback.yy.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">肺活量(ml)</td>
            <td> {{ feedback.fhl && feedback.fhl.result }} </td>
            <td> {{ feedback.fhl && feedback.fhl.appraise }} </td>
            <td> {{ feedback.fhl && feedback.fhl.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">血压(mmHg)</td>
            <td> {{ feedback.xy && feedback.xy.result }} </td>
            <td> {{ feedback.xy && feedback.xy.appraise }} </td>
            <td> {{ feedback.xy && feedback.xy.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">心率(次/分)</td>
            <td> {{ feedback.xl && feedback.xl.result }} </td>
            <td> {{ feedback.xl && feedback.xl.appraise }} </td>
            <td> {{ feedback.xl && feedback.xl.suggest }} </td>
          </tr>
          <tr>
            <td rowspan="2" width="50">
              <table width="100%" style="text-align: center;">
                <tr>
                  <td rowspan="2" width="50%" style="border-right: 1px solid #808080;">视力</td>
                  <td style="border-bottom: 1px solid #808080;">左</td>
                </tr>
                <tr>
                  <td>右</td>
                </tr>
              </table>
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
            </td>
            <td style="height: 20px">
              {{ feedback.sl && feedback.sl.result.slice(feedback.sl.result.indexOf('_') + 1, feedback.sl.result.length) }}
            </td>
            <td rowspan="2">{{ feedback.sl && feedback.sl.appraise }}</td>
            <td rowspan="2">{{ feedback.sl && feedback.sl.suggest }}</td>
          </tr>
          <tr style="height: 20px">
            <td>{{ feedback.sl && feedback.sl.result.slice(0, feedback.sl.result.indexOf('_')) }}</td>
          </tr>
          <tr>
            <td style="text-align: center;">色觉</td>
            <td> {{ feedback.sj && feedback.sj.result }} </td>
            <td> {{ feedback.sj && feedback.sj.appraise }} </td>
            <td> {{ feedback.sj && feedback.sj.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">沙眼</td>
            <td> {{ feedback.sy && feedback.sy.result }} </td>
            <td> {{ feedback.sy && feedback.sy.appraise }} </td>
            <td> {{ feedback.sy && feedback.sy.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">结膜炎</td>
            <td> {{ feedback.jmy && feedback.jmy.result }} </td>
            <td> {{ feedback.jmy && feedback.jmy.appraise }} </td>
            <td> {{ feedback.jmy && feedback.jmy.suggest }} </td>
          </tr>
          <tr>
            <td rowspan="2" style="text-align: center;">口腔</td>
            <td colspan="2">{{ feedback.qc && (feedback.qc.result === '未检查' ? feedback.qc.result : feedback.qc.result.slice(0, feedback.qc.result.indexOf('_'))) }}</td>
            <td rowspan="2">{{ feedback.qc && feedback.qc.suggest }}</td>
          </tr>
          <tr>
            <td colspan="2">{{ feedback.qc && feedback.qc.result.slice(feedback.qc.result.indexOf('_') + 1, feedback.qc.result.length) }}</td>
          </tr>
          <tr>
            <td style="text-align: center;">心脏</td>
            <td> {{ feedback.xz && feedback.xz.result }} </td>
            <td> {{ feedback.xz && feedback.xz.appraise }} </td>
            <td> {{ feedback.xz && feedback.xz.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">肺</td>
            <td> {{ feedback.f && feedback.f.result }} </td>
            <td> {{ feedback.f && feedback.f.appraise }} </td>
            <td> {{ feedback.f && feedback.f.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">肝脾</td>
            <td> {{ feedback.gp && feedback.gp.result }} </td>
            <td> {{ feedback.gp && feedback.gp.appraise }} </td>
            <td> {{ feedback.gp && feedback.gp.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">头颈</td>
            <td> {{ feedback.tj && feedback.tj.result }} </td>
            <td> {{ feedback.tj && feedback.tj.appraise }} </td>
            <td> {{ feedback.tj && feedback.tj.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">胸部</td>
            <td> {{ feedback.xb && feedback.xb.result }} </td>
            <td> {{ feedback.xb && feedback.xb.appraise }} </td>
            <td> {{ feedback.xb && feedback.xb.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">脊柱</td>
            <td> {{ feedback.jz && feedback.jz.result }} </td>
            <td> {{ feedback.jz && feedback.jz.appraise }} </td>
            <td> {{ feedback.jz && feedback.jz.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">四肢关节</td>
            <td> {{ feedback.szgj && feedback.szgj.result }} </td>
            <td> {{ feedback.szgj && feedback.szgj.appraise }} </td>
            <td> {{ feedback.szgj && feedback.szgj.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">皮肤淋巴</td>
            <td> {{ feedback.pf && feedback.pf.result }} </td>
            <td> {{ feedback.pf && feedback.pf.appraise }} </td>
            <td> {{ feedback.pf && feedback.pf.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">血色素</td>
            <td> {{ feedback.xss && feedback.xss.result }} </td>
            <td> {{ feedback.xss && feedback.xss.appraise }} </td>
            <td> {{ feedback.xss && feedback.xss.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">便检</td>
            <td> {{ feedback.bj && feedback.bj.result }} </td>
            <td> {{ feedback.bj && feedback.bj.appraise }} </td>
            <td> {{ feedback.bj && feedback.bj.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">肝功能</td>
            <td> {{ feedback.ggn && feedback.ggn.result }} </td>
            <td> {{ feedback.ggn && feedback.ggn.appraise }} </td>
            <td> {{ feedback.ggn && feedback.ggn.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">PPD试验</td>
            <td> {{ feedback.ppd && feedback.ppd.result }} </td>
            <td> {{ feedback.ppd && feedback.ppd.appraise }} </td>
            <td> {{ feedback.ppd && feedback.ppd.suggest }} </td>
          </tr>
          <tr>
            <td style="text-align: center;">体检单位</td>
            <td colspan="3">怀柔区中小学卫生保健所</td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: left;padding-left: 10px;">
              <span class="test_tag">
                营养状况评价结果根据2005年中国肥胖工作组制定《中国学龄儿童超重肥胖筛查BMI分类标准》简称WGOC-BMI标准
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: left;padding-left: 10px;">
              <span class="test_tag">
                根据教委的要求，请家长登录 http://xsjk.bjedu.cn 找到孩子的体检信息表，点击“签收回执”以确认收到该体检反馈表。
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: left;padding-left: 10px;">
              <span class="test_tag">
                教育ID号：{{ studentDetail.tempFlag ? studentDetail.tempEduid : studentDetail.jyid }}  如果您对体检反馈单上的数据有疑问，请您咨询学校校医。
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <p style="text-align: right;margin: 0;">
          <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 年级 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 班的 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 同学的健康体检结果反馈表我已收到，特此证明。 <br>
          家长签字 <span style="display: inline-block;min-width: 50px;border-bottom: 1px solid #808080;"></span> <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 年 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 月 <span style="display: inline-block;min-width: 30px;border-bottom: 1px solid #808080;"></span> 日 &nbsp;&nbsp;&nbsp;
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { notice } from '../../utils'
export default {
  name: 'school-message',
  data () {
    return {
      dialogVisible: false,
      printButton: true,
      studentDetail: {},
      feedback: {},
      keyword: '',
      pageNo: 1,
      totalCount: 0,
      tableData: [],
      temporaryValue: '',
      temporaryList: [
        { id: 1, name: '是' },
        { id: 0, name: '否' }
      ],
      xnValue: '',
      xnList: [],
      schoolYearValue: '',
      schoolYearOptions: [],
      schoolValue: '',
      schoolList: [],
      gradeValue: '',
      gradeList: [],
      classValue: '',
      classList: [],
      studentId: '',
      result: '',
      restaurants: []
    }
  },
  methods: {
    search () {
      this.pageNo = 1
      this.getTableData()
    },
    // 搜索
    async sousuo () {
      if (!this.studentId) {
        notice('请选择学生')
      }
      let data = await this.$store.dispatch('schoolExamInfolist', {
        xn: this.xnValue,
        xxdm: '',
        njid: '',
        bjid: '',
        lsFlag: '',
        studentId: this.studentId,
        pageNo: this.pageNo,
        pageSize: 10
      })
      this.studentId = ''
      this.keyword = ''
      if (data) {
        this.tableData = data.list
        this.totalCount = data.totalCount
      }
    },
    // 打印
    async down (val) {
      let data = await this.$store.dispatch('schoolExamInfoGetfeedbackOne', {
        studentId: val.studentId
      })
      this.studentDetail = data
      this.feedback = data.feedback
      this.printButton = true
      this.dialogVisible = true
    },
    // 下载确认按钮
    downConfirm () {
      this.printButton = false
      setTimeout(() => {
        // (一)
        // document.body.innerHTML = document.querySelectorAll('.el-dialog__body')[0].innerHTML
        // window.print()

        // (二)
        let newWindow = window.open('打印窗口', '_blank')
        let docStr = document.querySelectorAll('.el-dialog__body')[0].innerHTML
        newWindow.document.write(docStr)
        newWindow.document.close()
        newWindow.print()
        newWindow.close()
        this.dialogVisible = false
      }, 200)
    },
    batchDownload () {
      let path = document.getElementById('contextPath').value
      window.location.href = `${path}/schoolExamInfo/exportFeedback?xn=${this.xnValue}&njid=${this.gradeValue}&bjid=${this.classValue}&lsFlag=${this.temporaryValue}`
    },
    // 查看详情按钮
    look (val) {
      sessionStorage.HEALTH_BEFORE_PATH = '/schoolMessage/schoolMessage'
      this.$router.push({path: '/totalEntry', query: {para: val.studentId}})
    },
    async querySearchAsync (queryString, cb) {
      let state = true
      this.$store.state.user.resources.forEach(elem => {
        elem.childs.forEach(item => {
          if (item.url === '/statisticsIndividualization*') {
            //  全局
            state = false
          }
        })
      })
      this.result = cb
      this.restaurants = []
      let data
      if (state) {
        data = await this.$store.dispatch('searchStudent', {
          keyword: this.keyword,
          pageNo: this.pageNo,
          pageSize: 10
        })
      } else {
        data = await this.$store.dispatch('searchStudentBySchool', {
          keyword: this.keyword,
          pageNo: this.pageNo,
          pageSize: 10
        })
      }
      if (data.length !== 0) {
        data.map(item => {
          let obj = {}
          obj.value = `${item.xm}(${item.lsFlag ? item.lsJyid : item.jyid})`
          obj.name = item.lsFlag ? item.lsJyid : item.jyid
          this.restaurants.push(obj)
        })
      } else {
        let objs = {
          value: '暂无数据',
          name: '暂无数据'
        }
        this.restaurants.push(objs)
      }
      var results = queryString ? this.restaurants.filter(this.createFilter(queryString)) : this.restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant !== '')
      }
    },
    async handleSelect (item) {
      this.studentId = item.name
      // let data = await this.$store.dispatch('schoolExamInfolist', {
      //   xn: this.xnValue,
      //   xxdm: '',
      //   njid: '',
      //   bjid: '',
      //   lsFlag: '',
      //   studentId: this.studentId,
      //   pageNo: this.pageNo,
      //   pageSize: 10
      // })
      // this.tableData = data.list
      // this.totalCount = data.totalCount
    },
    handleCurrentChange (val) {
      this.pageNo = val
      this.getTableData()
    },
    async schoolChange () {
      this.gradeValue = ''
      this.classValue = ''
      if (this.schoolValue) {
        await this.getGradeList()
        await this.getClassList()
      } else {
        this.gradeList = []
        this.classList = []
      }
    },
    gradeChange () {
      this.classValue = ''
      this.getClassList()
    },
    // 获取学年列表
    async getXnList () {
      this.xnList = await this.$store.dispatch('xnList')
      this.xnValue = this.xnList.length !== 0 ? this.xnList.filter(item => item.current)[0].xn : ''
    },
    // 获取学校列表
    async getSchoolList () {
      this.schoolList = await this.$store.dispatch('schoolList')
      // this.schoolValue = this.schoolList.length !== 0 ? this.schoolList[0].xxdm : ''
    },
    // 获取年级列表
    async getGradeList () {
      this.gradeList = await this.$store.dispatch('gradeList', {
        xxdm: this.$store.state.user.xxdm
      })
      // this.gradeValue = (this.gradeList[0] || { njid: '' }).njid
    },
    // 获取班级列表
    async getClassList () {
      this.classList = await this.$store.dispatch('classList', {
        njid: this.gradeValue,
        xxdm: this.$store.state.user.xxdm
      })
      // this.classValue = (this.classList[0] || { bjid: '' }).bjid
    },
    async getTableData () {
      let data = await this.$store.dispatch('schoolExamInfolist', {
        xn: this.xnValue,
        njid: this.gradeValue,
        bjid: this.classValue,
        lsFlag: this.temporaryValue,
        studentId: this.studentId,
        pageNo: this.pageNo,
        pageSize: 10
      })
      if (data) {
        this.tableData = data.list
        this.totalCount = data.totalCount
      }
    }
  },
  watch: {
  },
  async created () {
    if (!this.$store.state.user.xxdm) {
      notice('当前用户没有对应的单位')
    } else {
      await this.getXnList()
      // await this.getSchoolList()
      await this.getGradeList()
      // await this.getClassList()
      await this.getTableData()
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.school-message {
  header {
    &>div {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  &>main {
    background: #fff;
    margin-top: 20px;
    padding: 20px;
    border-radius: 5px;

    &>div:nth-child(1) {
      text-align: right;
      .el-input {
        width: 300px;
        .el-input__inner {
          height: 36px;
        }
      }
    }

    .el-table {
      margin-top: 20px;
      .lin {
        font-style: normal;
        color: #fff;
        background: #73D586;
        border-radius: 50%;
        padding: 2px;
      }
      th {
        &:nth-child(7){
          // border-top-right-radius: 8px;
          // border-bottom-right-radius: 8px;
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
        margin-top: 5px;
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
