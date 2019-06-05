<template>
  <div class='body-composition'>
    <!-- 体成分 -->
    <table class="table-1" border="1" cellspacing="0" width="100%" v-if="tcfShow">
      <thead>
        <tr>
          <th colspan="5">
            体成分
          </th>
        </tr>
        <tr>
          <th>体检项目</th>
          <th>详细信息</th>
          <th colspan="2">
            体检项目
          </th>
          <th>详细信息</th>
        </tr>
      </thead>

      <tbody>
        <!-- 第一行 -->
        <tr>
          <td>WEIGHT (体重)</td>
          <td>
            <el-input ref="tz" v-model.trim="tzVal" @blur="tzBlur"></el-input> kg
          </td>
          <td rowspan="5"></td>
          <td>FAT% (体脂率)</td>
          <td>
            <el-input ref="tzl" v-model.trim="tzlVal" @blur="tzlBlur"></el-input> %
          </td>
        </tr>
        <!-- 第二行 -->
        <tr>
          <td>FAT MASS (体内脂肪量)</td>
          <td>
            <el-input ref="tnzfl" v-model.trim="tnzflVal" @blur="tnzflBlur"></el-input> kg
          </td>
          <td>FFM (非脂肪质量)</td>
          <td>
            <el-input ref="fzfzl" v-model.trim="fzfzlVal" @blur="fzfzlBlur"></el-input> kg
          </td>
        </tr>
        <!-- 第三行 -->
        <tr>
          <td>MUSCLE MASS (肌肉量)</td>
          <td>
            <el-input ref="jrl" v-model.trim="jrlVal" @blur="jrlBlur"></el-input> kg
          </td>
          <td>TBW (体水分量)</td>
          <td>
            <el-input ref="tsfl" v-model.trim="tsflVal" @blur="tsflBlur"></el-input> kg
          </td>
        </tr>
        <!-- 第四行 -->
        <tr>
          <td>BONE MASS (骨量)</td>
          <td>
            <el-input ref="gl" v-model.trim="glVal" @blur="glBlur"></el-input> kg
          </td>
          <td>BMR (基础代谢率)</td>
          <td>
            <el-input ref="jcdxl1" v-model.trim="jcdxlVal1" @blur="jcdxlBlur1"></el-input> kg
            <el-input ref="jcdxl2" v-model.trim="jcdxlVal2" @blur="jcdxlBlur2"></el-input> kcal
          </td>
        </tr>
        <!-- 第五行 -->
        <tr>
          <td>BMI (体重指数)</td>
          <td>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-input ref="tzzs" v-model.trim="tzzsVal" @blur="tzzsBlur"></el-input> kg/m2
          </td>
          <td></td>
          <td>
          </td>
        </tr>
        <tr>
          <td colspan="5">
             暂未检测原因：<!--<el-checkbox @change="xx('tcfChange')" v-model="tcfFlag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="tcfChange" szie="small" class="dropdownMini">
              <span >{{this.rea.tcfrea == '1' ? '被检人不配合' : this.rea.tcfrea == '2' ? '身体原因' : this.rea.tcfrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 屈光度 -->
    <table class="table-2" border="1" cellspacing="0" width="100%" v-if="qgdShow">
      <thead>
        <th></th>
        <th></th>
        <th>裸眼视力</th>
        <th>球镜(S)</th>
        <th>柱镜(C)</th>
        <th>等效球(SE)</th>
        <!-- <tr>
          <td></td>
          <td></td>
          <td>裸眼视力</td>
          <td>球镜(S)</td>
          <td>柱镜(C)</td>
          <td>等效球(SE)</td>
        </tr> -->
      </thead>

      <tbody>
        <tr>
          <td rowspan="3">
            屈光度
          </td>
          <td>
            右眼
          </td>
          <td>
            <el-input v-model.trim="ylyslVal" @blur="ylyslBlur"></el-input>
          </td>
          <td >
            <el-input v-model.trim="yqjVal" @blur="yqjBlur"></el-input>
          </td>
          <td>
            <el-input v-model.trim="yzjVal" @blur="yzjBlur"></el-input>
          </td>
          <td>
            <el-input v-model.trim="ydxqVal" @blur="ydxqBlur"></el-input>
          </td>
        </tr>
        <tr>
          <td>
            左眼
          </td>
          <td>
            <el-input v-model.trim="zlyslVal" @blur="zlyslBlur"></el-input>
          </td>
          <td  class="zz-class">
            <el-input v-model.trim="zqjVal" @blur="zqjBlur"></el-input>
          </td>
          <td  class="yd-class">
            <el-input v-model.trim="zzjVal" @blur="zzjBlur"></el-input>
          </td>
          <td>
            <el-input v-model.trim="zdxqVal" @blur="zdxqBlur"></el-input>
          </td>
        </tr>
        <tr>
          <td colspan="6">
             暂未检测原因：<!--<el-checkbox @change="xx('qgdChange')" v-model="qgdFlag"></el-checkbox> -->
            <el-dropdown split-button type="primary" @command="qgdChange" szie="small" class="dropdownMini">
              <span >{{this.rea.qgdrea == '1' ? '被检人不配合' : this.rea.qgdrea == '2' ? '身体原因' : this.rea.qgdrea == '4' ? '已体检' : '其他'}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="1">被检人不配合</el-dropdown-item>
                <el-dropdown-item command="2">身体原因</el-dropdown-item>
                <el-dropdown-item command="3">其他</el-dropdown-item>
                <el-dropdown-item command="4" disabled>已体检</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { notice } from '../utils/index'
export default {
  name: 'body-composition',
  data () {
    return {
      tzCopyVal: '',
      list: [],
      tcfList: [],
      tcfShow: false,
      qgdShow: false,
      tzVal: '',
      tzlVal: '',
      tnzflVal: '',
      fzfzlVal: '',
      jrlVal: '',
      tsflVal: '',
      glVal: '',
      jcdxlVal1: '',
      jcdxlVal2: '',
      tzzsVal: '',
      tcfFlag: false,
      qgdList: [],
      ylyslVal: '',
      ylyslCopyVal: '',
      yqjVal: '',
      yzjVal: '',
      ydxqVal: '',
      zlyslCopyVal: '',
      zlyslVal: '',
      zqjVal: '',
      zzjVal: '',
      zdxqVal: '',
      rea: {
        qgdrea: '',
        tcfrea: ''
      },
      qgdFlag: false
    }
  },
  props: [
    'studentExam',
    'tcfCheckout',
    'qgdCheckout'
  ],
  methods: {
    // 屈光度
    ylyslBlur () {
      if (this.ylyslCopyVal === this.ylyslVal) {
        this.$set(this.qgdList, 0, this.ylyslVal)
      } else {
        this.ylyslVal = this.ylyslVal / 10
        this.ylyslCopyVal = this.ylyslVal
        this.$set(this.qgdList, 0, this.ylyslVal)
      }
      if (this.ylyslVal) {
        this.rea.qgdrea = '4'
      }
    },
    yqjBlur () {
      this.$set(this.qgdList, 1, this.yqjVal)
      if (this.yqjVal) {
        this.rea.qgdrea = '4'
      }
    },
    yzjBlur () {
      this.$set(this.qgdList, 2, this.yzjVal)
      if (this.yzjVal) {
        this.rea.qgdrea = '4'
      }
    },
    ydxqBlur () {
      this.$set(this.qgdList, 3, this.ydxqVal)
      if (this.ydxqVal) {
        this.rea.qgdrea = '4'
      }
    },
    zlyslBlur () {
      if (this.zlyslCopyVal === this.zlyslVal) {
        this.$set(this.qgdList, 4, this.zlyslVal)
      } else {
        this.zlyslVal = this.zlyslVal / 10
        this.zlyslCopyVal = this.zlyslVal
        this.$set(this.qgdList, 4, this.zlyslVal)
      }
      if (this.zlyslVal) {
        this.rea.qgdrea = '4'
      }
    },
    zqjBlur () {
      this.$set(this.qgdList, 5, this.zqjVal)
      if (this.zqjVal) {
        this.rea.qgdrea = '4'
      }
    },
    zzjBlur () {
      this.$set(this.qgdList, 6, this.zzjVal)
      if (this.zzjVal) {
        this.rea.qgdrea = '4'
      }
    },
    zdxqBlur () {
      this.$set(this.qgdList, 7, this.zdxqVal)
      if (this.zdxqVal) {
        this.rea.qgdrea = '4'
      }
    },
    qgdChange (val) {
      this.rea.qgdrea = val
      if (this.ylyslVal || this.yqjVal || this.yzjVal || this.ydxqVal || this.zlyslVal || this.zqjVal || this.zzjVal || this.zdxqVal) {
        this.ylyslVal = ''
        this.yqjVal = ''
        this.yzjVal = ''
        this.ydxqVal = ''
        this.zlyslVal = ''
        this.zqjVal = ''
        this.zzjVal = ''
        this.zdxqVal = ''
        this.$emit('qgdChange', { projectId: 'qgd', id: this.list.filter(item => item.projectName === '屈光度')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.qgdrea })
      } else {
        this.$emit('qgdChange', { projectId: 'qgd', id: this.list.filter(item => item.projectName === '屈光度')[0].id, name: '屈光度', flag: true, value1: '', value2: '', unexamReason: this.rea.qgdrea })
      }
    },
    // 体成分
    tzBlur () {
      if (this.tzCopyVal === this.tzVal) {
        this.$set(this.tcfList, 0, this.tzVal)
      } else {
        this.tzVal = this.tzVal / 10
        this.tzCopyVal = this.tzVal
        this.$set(this.tcfList, 0, this.tzVal)
      }
      if (this.tzVal) {
        this.rea.tcfrea = '4'
      }
    },
    tzlBlur () {
      this.$set(this.tcfList, 1, this.tzlVal)
      if (this.tzlVal) {
        this.rea.tcfrea = '4'
      }
    },
    tnzflBlur () {
      this.$set(this.tcfList, 2, this.tnzflVal)
      if (this.tnzflVal) {
        this.rea.tcfrea = '4'
      }
    },
    fzfzlBlur () {
      this.$set(this.tcfList, 3, this.fzfzlVal)
      if (this.fzfzlVal) {
        this.rea.tcfrea = '4'
      }
    },
    jrlBlur () {
      this.$set(this.tcfList, 4, this.jrlVal)
      if (this.jrlVal) {
        this.rea.tcfrea = '4'
      }
    },
    tsflBlur () {
      this.$set(this.tcfList, 5, this.tsflVal)
      if (this.tsflVal) {
        this.rea.tcfrea = '4'
      }
    },
    glBlur () {
      this.$set(this.tcfList, 6, this.glVal)
      if (this.glVal) {
        this.rea.tcfrea = '4'
      }
    },
    jcdxlBlur1 () {
      this.$set(this.tcfList, 7, this.jcdxlVal1)
      if (this.jcdxlVal1) {
        this.rea.tcfrea = '4'
      }
    },
    jcdxlBlur2 () {
      this.$set(this.tcfList, 8, this.jcdxlVal2)
      if (this.jcdxlVal2) {
        this.rea.tcfrea = '4'
      }
    },
    tzzsBlur () {
      this.$set(this.tcfList, 9, this.tzzsVal)
      if (this.tzzsVal) {
        this.rea.tcfrea = '4'
      }
    },
    tcfChange (val) {
      this.rea.tcfrea = val
      if (this.tzVal || this.tzlVal || this.tnzflVal || this.fzfzlVal || this.jrlVal || this.tsflVal || this.glVal || this.jcdxlVal1 || this.jcdxlVal2 || this.tzzsVal) {
        this.tzVal = ''
        this.tzlVal = ''
        this.tnzflVal = ''
        this.fzfzlVal = ''
        this.jrlVal = ''
        this.tsflVal = ''
        this.glVal = ''
        this.jcdxlVal1 = ''
        this.jcdxlVal2 = ''
        this.tzzsVal = ''
        this.$emit('tcfChange', { projectId: 'tcf', id: this.list.filter(item => item.projectName === '体成分')[0].id, name: '', flag: false, value1: '', value2: '', unexamReason: this.rea.tcfrea })
      } else {
        this.$emit('tcfChange', { projectId: 'tcf', id: this.list.filter(item => item.projectName === '体成分')[0].id, name: '体成分', flag: true, value1: '', value2: '', unexamReason: this.rea.tcfrea })
      }
    }
  },
  watch: {
    tcfList () {
      if (this.tcfShow) {
        this.$emit('tcfChange', { projectId: 'tcf', id: this.list.filter(item => item.projectName === '体成分')[0].id, name: '体成分', flag: false, value1: '', value2: '', unexamReason: this.rea.tcfrea })
        this.tcfFlag = true
        this.tcfList.forEach(item => {
          if (item) {
            this.tcfFlag = false
          }
        })
        if (this.tcfList.length === 0) {
          return
        } else {
          for (let i = 0; i < this.tcfList.length; i++) {
            if (this.tcfList[i] === '') {
              return
            }
          }
        }
        this.$emit('tcfChange', { projectId: 'tcf', id: this.list.filter(item => item.projectName === '体成分')[0].id, name: '体成分', flag: true, value1: this.tcfList.join('_'), value2: '', unexamReason: this.rea.tcfrea })
      }
    },
    tcfCheckout () {
      notice('请完成体成分情况')
    },
    qgdCheckout () {
      notice('请完成屈光度情况')
    },
    qgdList () {
      if (this.qgdShow) {
        this.$emit('qgdChange', { projectId: 'qgd', id: this.list.filter(item => item.projectName === '屈光度')[0].id, name: '屈光度', flag: false, value1: '', value2: '', unexamReason: this.rea.qgdrea })
        this.qgdFlag = true
        this.qgdList.forEach(item => {
          if (item) {
            this.qgdFlag = false
          }
        })
        if (this.qgdList.length === 0) {
          return
        } else {
          for (let i = 0; i < this.qgdList.length; i++) {
            if (this.qgdList[i] === '') {
              return
            }
          }
        }
        this.$emit('qgdChange', { projectId: 'qgd', id: this.list.filter(item => item.projectName === '屈光度')[0].id, name: '屈光度', flag: true, value1: this.qgdList.join('_'), value2: '', unexamReason: this.rea.qgdrea })
      }
    },
    studentExam () {
      let data = this.studentExam.projectList
      this.list = data
      if (data.filter(item => item.projectName === '体成分').length === 0) {
        this.tcfList = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        this.tcfShow = false
      } else {
        this.tcfShow = true
        this.tcfFlag = !data.filter(item => item.projectName === '体成分')[0].flag
        if (!this.tcfFlag) {
          let arr = data.filter(item => item.projectName === '体成分')[0].value1.split('_')
          this.tcfList = arr
          this.tzVal = arr[0]
          this.tzCopyVal = this.tzVal
          this.tzlVal = arr[1]
          this.tnzflVal = arr[2]
          this.fzfzlVal = arr[3]
          this.jrlVal = arr[4]
          this.tsflVal = arr[5]
          this.glVal = arr[6]
          this.jcdxlVal1 = arr[7]
          this.jcdxlVal2 = arr[8]
          this.tzzsVal = arr[9]
        }
      }
      if (data.filter(item => item.projectName === '体成分').length !== 0) {
        this.rea.tcfrea = data.filter(item => item.projectName === '体成分')[0].unexamReason
        if (this.tzVal || this.tzlVal || this.tnzflVal || this.fzfzlVal || this.jrlVal || this.tsflVal || this.glVal || this.jcdxlVal1 || this.jcdxlVal2 || this.tzzsVal) {
          this.rea.tcfrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '屈光度').length !== 0) {
        this.rea.qgdrea = data.filter(item => item.projectName === '屈光度')[0].unexamReason
        if (this.ylyslVal || this.yqjVal || this.yzjVal || this.ydxqVal || this.zlyslVal || this.zqjVal || this.zzjVal || this.zdxqVal) {
          this.rea.qgdrea = '4'
        }
      }
      if (data.filter(item => item.projectName === '屈光度').length === 0) {
        this.qgdList = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
        this.qgdShow = false
      } else {
        this.qgdShow = true
        this.qgdFlag = !data.filter(item => item.projectName === '屈光度')[0].flag
        if (!this.qgdFlag) {
          let arr = data.filter(item => item.projectName === '屈光度')[0].value1.split('_')
          this.qgdList = arr
          this.ylyslVal = arr[0]
          this.ylyslCopyVal = this.ylyslVal
          this.yqjVal = arr[1]
          this.yzjVal = arr[2]
          this.ydxqVal = arr[3]
          this.zlyslVal = arr[4]
          this.zlyslCopyVal = this.zlyslVal
          this.zqjVal = arr[5]
          this.zzjVal = arr[6]
          this.zdxqVal = arr[7]
        }
      }
    }
  },
  created () {
  }
}
</script>
<style lang="scss">
@import '../assets/scss/variable.scss';
@import '../assets/scss/mixin.scss';
.body-composition {
  // .yz-class {
  //   position: relative;
  //   bottom: 47px;
  //   left: 479px;
  // }
  // .yq-class {
  //   position: relative;
  //   right: 239px;
  // }
  // .zq-class {
  //   position: relative;
  //   top: 47px;
  //   right: 479px;
  // }
  // .zz-class {
  //   position: relative;
  //   left: 239px;
  // }
  // .yd-class {
  //   position: relative;
  //   bottom: 47px;
  //   left: 239px;
  // }
  .table-1 {
    border-color: transparent;
    border-right: 0;
    border-bottom: 0;
    margin-top: 20px;
    td,th {
      width: 40px;
      height: 40px;
      padding: 0 5px;
      box-sizing: border-box;
      text-align: center;
      border-color: #EEEEEE;
      color: #4D4D4D;
    }
    thead {
      background: #ABC1FE;
      th {
        color: #fff;
        border: 0;
      }
      tr:nth-child(2) {
        background: #C4D3FE;
      }
    }

    tbody {
      td {
        padding: 5px;
        .el-input {
          width: 150px;
          .el-input__inner {
            height: 36px;
          }
        }
      }
      tr {
        td:nth-child(1) {
          background: #E6E6E6;
          width: 18%;
        }
        td:nth-child(3) {
          background: #E6E6E6;
          width: 2%;
        }
      }
      tr:nth-child(1) {
        td:nth-child(4) {
          background: #E6E6E6;
          width: 18%;
        }
        td:nth-child(3) {
          background: #fff;
        }
      }
      tr:nth-child(4) {
        td:nth-child(4) {
          .el-input {
            width: 60px;
          }
        }
      }
      tr:nth-child(5) {
        td:nth-child(4) {
          background: #fff;
        }
      }
      tr:nth-child(6) {
        td:nth-child(1) {
          border-left: 1px solid #EEEEEE;
          background: #fff;
          .dropdownMini {
            .el-button--primary:first-child {
              padding: 8px 10px;
           }
           .el-button--primary:last-child {
             padding: 8px 5px;
           }
         }
        }
      }
    }
  }

  .table-2 {
    margin-top: 20px;
    border-color: transparent;
    border-right: 0;
    border-bottom: 0;
    td,th {
      width: 40px;
      height: 40px;
      padding: 0 5px;
      box-sizing: border-box;
      text-align: center;
      border-color: #EEEEEE;
      color: #4D4D4D;
    }
    thead {
      background: #ABC1FE;
      th {
        color: #fff;
        border: 0;
      }
      tr:nth-child(2) {
        background: #C4D3FE;
      }
    }
    tbody {
      td {
        padding: 5px;
        .el-input {
          width: 100px;
          .el-input__inner {
            height: 36px;
          }
        }
        .dropdownMini {
            .el-button--primary:first-child {
              padding: 8px 10px;
           }
           .el-button--primary:last-child {
             padding: 8px 5px;
           }
         }
      }
      tr:nth-child(1) {
        td:nth-child(1) {
          background: #E6E6E6;
          width: 8%;
        }
        td:nth-child(3),td:nth-child(5),td:nth-child(7),td:nth-child(9) {
          width: 15%;
        }
      }
    }
  }
}
</style>
