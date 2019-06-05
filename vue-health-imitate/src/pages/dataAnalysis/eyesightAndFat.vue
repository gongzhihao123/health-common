<template>
  <div class='data-analysis-eyesightAndFat'>
    <header>
      <ul>
        <!-- <li>
            <span>学年:</span>
            <el-select v-model="schoolyear" placeholder="请选择">
                <el-option
                  v-for="item in years"
                  :key="item.xn"
                  :label="item.name"
                  :value="item.xn">
                </el-option>
              </el-select>
          </li> -->
          <li>
            <span>统计对象:</span>
              <el-radio v-model="radio" label="1">全区</el-radio>
              <el-radio v-model="radio" label="2">学校</el-radio>
          </li>
          <li v-if="radio === '2'" class="schoolLi">
            <span>学校:</span>
            <el-select v-model="school" filterable placeholder="请选择" @change="gradeList">
              <el-option
                v-for="item in schools"
                :key="item.xxdm"
                :label="item.xxmc"
                :value="item.xxdm">
              </el-option>
            </el-select>
          </li>
          <!-- <li>
            <span>年级:</span>
            <el-select v-model="grade" placeholder="请选择" @change="classList">
                <el-option
                  v-for="item in grades"
                  :key="item.njid"
                  :label="item.njmc"
                  :value="item.njid">
                </el-option>
              </el-select>
          </li>
          <li>
            <span>班级:</span>
            <el-select v-model="classa" placeholder="请选择">
                <el-option
                  v-for="item in classas"
                  :key="item.bjid"
                  :label="item.bjmc"
                  :value="item.bjid">
                </el-option>
              </el-select>
          </li> -->
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
export default {
  name: 'data-analysis-eyesightAndFat',
  data () {
    return {
      schoolname: '',
      options: [],
      years: '',
      schoolyear: '',
      value: '',
      radio: '1',
      radio2: '肥胖BMI数据统计',
      list: ['肥胖BMI数据统计', '肥胖数据统计', '视力不良数据统计'],
      schools: [],
      school: '',
      grade: '',
      grades: [],
      classa: '',
      classas: []
    }
  },
  methods: {
    getDown () {
      let type = ''
      if (this.radio2 === '肥胖BMI数据统计') {
        type = 1
      } else if (this.radio2 === '肥胖数据统计') {
        type = 2
      } else if (this.radio2 === '视力不良数据统计') {
        type = 3
      }
      const path = document.querySelector('#contextPath').value
      window.location.href = `${path}/statisticsObesity/exportByFPBMI?xxdm=${this.school}&type=${type}`
    },
    async gradeList () {
      this.grade = ''
      this.classa = ''
      this.grades = await this.$store.dispatch('gradeList', {
        xxdm: this.school
      })
    },
    async classList () {
      this.classa = ''
      this.classas = await this.$store.dispatch('classList', {
        xxdm: this.school,
        njid: this.grade
      })
    }
  },
  watch: {
    radio () {
      if (this.radio === '1') {
        this.school = ''
      }
    }
  },
  async created () {
    this.years = await this.$store.dispatch('xnList')
    this.schools = await this.$store.dispatch('schoolList')
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
.data-analysis-eyesightAndFat {
  .el-input {
    width: auto;
  }
  header {
    &>ul {
      @extend .clearfix;
      .schoolLi {
        .el-select>.el-input {
          width: 300px;
          height: 33px;
          .el-input__inner {
            width: 300px;
          }
        }
      }
      li {
        float: left;
        height: 36px;
        line-height: 36px;
        margin-bottom: 15px;
        &:nth-child(6) {
          margin-right: 20px;
        }
        &:last-child {
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
        .el-input__inner {
          width: 220px;
        }
        .el-select>.el-input {
          margin-right: 20px;
        }
        .el-input__inner {
          width: 220px;
          height: 33px;
          line-height: 33px;
        }
        &:nth-child(3), &:nth-child(4), &:nth-child(5) {
          .el-input__inner {
            width: 180px;
          }
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
        margin-left: 190px;
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
