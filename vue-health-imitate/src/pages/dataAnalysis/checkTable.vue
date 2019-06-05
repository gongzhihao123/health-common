<template>
  <div class='data-analysis-checkTable'>
    <header>
      <ul>
        <li>
            <span>学年:</span>
            <el-select v-model="schoolyear" placeholder="请选择">
                <el-option
                  v-for="item in years"
                  :key="item.xn"
                  :label="item.name"
                  :value="item.xn">
                </el-option>
              </el-select>
          </li>
          <li>
            <span>统计对象:</span>
              <el-radio v-model="radio" label="1">城区</el-radio>
              <el-radio v-model="radio" label="3">平原</el-radio>
              <el-radio v-model="radio" label="2">山区</el-radio>
              <el-radio v-model="radio" label="4">学校</el-radio>
          </li>
          <li v-if="radio === '4'">
              <span>学校:</span>
            <el-select v-model="school" filterable placeholder="请选择">
            <el-option
              v-for="item in schools"
              :key="item.xxdm"
              :label="item.xxmc"
              :value="item.xxdm">
            </el-option>
          </el-select>
          </li>
      </ul>
    </header>
    <div class="content">
      <h2>统计类型</h2>
      <el-radio-group v-model="radio2">
        <el-radio :label="item" v-for="(item, index) in list" :key="index">{{item}}</el-radio>
      </el-radio-group>
      <el-button @click="getDown">下载</el-button>
    </div>
  </div>
</template>

<script>
import { notice } from '../../utils/index.js'
export default {
  name: 'data-analysis-checkTable',
  data () {
    return {
      schoolname: '',
      schoolyear: '',
      schoolName: '',
      schools: [],
      school: '',
      years: [],
      options: [],
      xnmc: '',
      radio: '1',
      radio2: '按年龄统计',
      list: ['按年龄统计', '按年级统计', '血压报表', '营养综合报表', '汇总报表']
    }
  },
  methods: {
    getDown () {
      let num = this.radio
      if (this.school !== '') {
        this.schoolName = this.schools.filter(item => item.xxdm === this.school)[0].xxmc
        num = ''
      } else {
        this.schoolName = ''
      }
      if (this.schoolyear !== '') {
        this.xnmc = this.years.filter(item => item.xn === this.schoolyear)[0].name
      } else {
        this.xnmc = ''
      }
      if (this.radio === '4' && this.school === '') {
        notice('请先选择学校再进行下载')
        return
      }
      const path = document.querySelector('#contextPath').value
      if (this.radio2 === '按年龄统计') {
        window.location.href = `${path}/statisticsExport/exportByAge?xn=${this.schoolyear}&xxdm=${this.school}&xxmc=${this.schoolName}&qyhf=${num}&xnmc=${this.xnmc}`
      } else if (this.radio2 === '按年级统计') {
        window.location.href = `${path}/statisticsExport/exportByGrade?xn=${this.schoolyear}&xxdm=${this.school}&xxmc=${this.schoolName}&qyhf=${num}&xnmc=${this.xnmc}`
      } else if (this.radio2 === '血压报表') {
        window.location.href = `${path}/statisticsExport/exportByXY?xn=${this.schoolyear}&xxdm=${this.school}&xxmc=${this.schoolName}&qyhf=${num}&xnmc=${this.xnmc}`
      } else if (this.radio2 === '营养综合报表') {
        window.location.href = `${path}/statisticsExport/exportByYY?xn=${this.schoolyear}&xxdm=${this.school}&xxmc=${this.schoolName}&qyhf=${num}&xnmc=${this.xnmc}`
      } else if (this.radio2 === '汇总报表') {
        window.location.href = `${path}/statisticsExport/exportByHZ?xn=${this.schoolyear}&xxdm=${this.school}&xxmc=${this.schoolName}&qyhf=${num}&xnmc=${this.xnmc}`
      }
    }
  },
  watch: {
    radio () {
      if (this.radio !== 4) {
        this.school = ''
      }
    }
  },
  async created () {
    this.years = await this.$store.dispatch('xnList')
    this.schoolyear = this.years.filter(item => item.current)[0].xn
    this.schools = await this.$store.dispatch('schoolList')
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-analysis-checkTable {
  .el-input {
    width: auto;
  }
  header {
    &>ul {
      @extend .clearfix;
      li {
        float: left;
        height: 36px;
        line-height: 36px;
        margin-bottom: 15px;
        &:nth-child(1) {
          .el-input__inner {
            width: 150px;
          }
        }
        /* &:nth-child(6) {
          margin-right: 20px;
        } */
        &:last-child {
          .el-input__inner {
            width: 300px;
          }
          .el-button {
            background: #6E94FF;
            border-color: #6E94FF;
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
        .el-radio {
          margin-left: 22px;
        }
        .el-radio+.el-radio {
          margin-right: 30px;
        }
        .el-button {
          padding: 10px 25px;
          background: #73D586;
          color: #fff;
          border-color: #73D586;

          .el-icon-search {
            margin-right: 10px;
          }
        }
        &>span {
          color: #666;
        }
        .el-input {
          margin-right: 20px;
          margin-left: 10px;
        }
        .el-select>.el-input {
          margin-right: 20px;
        }
        .el-input__inner {
          height: 33px;
          line-height: 33px;
        }
      }
    }
  }
  .content {
    height: 779px;
    background: #fff;
    border-radius: 4px;
    @extend .clearfix;
    h2 {
      font-size: 16px;
      font-weight: normal;
      color: #6E94FF;
      padding: 20px;
      border-bottom: 1px solid #E5E5E5;
    }

    .el-radio-group {
      margin-top: 88px;
      margin-left: 88px;
      margin-right: 80px;
      float: left;

      .el-radio+.el-radio {
        margin-left: 82px;
      }
    }
    &>.el-button {
      padding: 10px 18px;
      background: #6E94FF;
      border-color: #6E94FF;
      color: #fff;
      margin-top: 76px;
    }
  }
}
</style>
