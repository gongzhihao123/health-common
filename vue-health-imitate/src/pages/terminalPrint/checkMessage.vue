<template>
  <div class='check-message'>
    <div class="top">
      <table>
        <thead>
          <tr>
            <th width="100%" colspan="8">
              基本信息
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              姓名
            </td>
            <td>
              {{ detail.studentName }}
            </td>
            <td>
              教育ID
            </td>
            <td>
              {{ detail.tempFlag ? detail.tempEduid : detail.jyid }}
            </td>
            <td>
              性别
            </td>
            <td>
              {{ detail.sex === 1 ? '男' : '女' }}
            </td>
            <td>
              生日
            </td>
            <td>
              {{ detail.birthday | dateFormat('yyyy-MM-dd') }}
            </td>
          </tr>

          <tr>
            <td>
              学校
            </td>
            <td colspan="3">
              {{ detail.schoolName }}
            </td>
            <td>
              年级
            </td>
            <td>
              {{ detail.gradeName }}
            </td>
            <td>
              班级
            </td>
            <td>
              {{ detail.className }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="middle">
      <p>
        <span>
          共 <i>{{ checkedList.length }}</i> 项
        </span>
        <span>
          已体检项目
        </span>
      </p>

      <div>
        <span v-for="(item, index) in checkedList" :key="index">
          {{ item.projectName }}
        </span>
      </div>
    </div>

    <div class="bottom">
      <p>
        <span>
          共 <i>{{ noCheckedList.length }}</i> 项
        </span>
        <span>
          未体检项目
        </span>
      </p>

      <div>
        <span v-for="(item, index) in noCheckedList" :key="index">
          {{ item.projectName }}
        </span>
      </div>
    </div>

    <footer>
      <el-button type="primary" @click="nextStep" v-if="checkedList.length !== 0">
        下一步
      </el-button>
      <el-button type="success" @click="back">
        返回
      </el-button>
    </footer>
    <audio :src="audioUrl" id="audio"></audio>
    <audio :src="audioUrl1" id="audio1"></audio>
  </div>
</template>

<script>
import audioUrl from '../../../static/audio/2.mp3'
import audioUrl1 from '../../../static/audio/8.mp3'
export default {
  name: 'check-message',
  data () {
    return {
      detail: {},
      audioUrl,
      audioUrl1,
      checkedList: [],
      noCheckedList: [],
      time: false
    }
  },
  methods: {
    // 下一步
    nextStep () {
      if (this.time) {
        sessionStorage.TIME = 45
      }
      sessionStorage.HEALTH_STUDENTID = this.detail.studentId
      this.$router.push('/terminalPrint/vote')
    },
    back () {
      this.$router.push('/terminalPrint/sweep')
    },
    // 获取学生体检信息详情
    async getStudentExamDetail () {
      let data = await this.$store.dispatch('examPrintCheckStudentExamExisit', {
        jyid: sessionStorage.HEALTH_EDUID
      })
      this.detail = data
      // 目前体成分和屈光度不出现在已体检或未体检项目中
      let list = data.projectList.filter(item => item.projectName !== '体成分' && item.projectName !== '屈光度')
      this.noCheckedList = list.filter(item => !item.flag)
      this.checkedList = list.filter(item => item.flag)
    }
  },
  mounted () {
    let audio
    if (this.noCheckedList.length === 0) audio = document.getElementById('audio')
    else audio = document.getElementById('audio1')
    audio.play()
  },
  created () {
    if (sessionStorage.TIME === 'time') {
      this.time = true
    }
    this.getStudentExamDetail()
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.check-message {
  // width: 100%;
  // margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  font-size: 23px;

  .top {
    table {
      width: 100%;
      border-top-left-radius: 5px;
      border-left: 1px solid #F3F3F3;
      border-bottom: 1px solid #F3F3F3;
      td {
        border-top: 1px solid #F3F3F3;
        border-right: 1px solid #F3F3F3;
      }
      thead {
        border-top-left-radius: 5px;
        tr {
          background: #E7E7E7;
          th {
            padding: 15px 20px;
            border-top-left-radius: 5px;
          }
        }
      }
      tbody {
        td {
          padding: 10px;
          &:nth-of-type(odd) {
            color: #868686;
            text-align: center;
          }
          &:nth-of-type(even) {
            color: #CACACA;
          }
        }
      }
    }
  }

  .middle {
    margin-top: 20px;
    border: 1px solid #F3F3F3;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &>p {
      padding: 10px 20px;
      background: #E7E7E7;
      &>span:nth-child(1) {
        float: right;
        i {
          font-style: normal;
          color: #7DD68E;
        }
      }
    }

    &>div {
      padding: 20px;
      span {
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 10px;
        width: 100px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #76D689;
        color: #76D689;
        border-radius: 14px;
      }
    }
  }

  .bottom {
    margin-top: 20px;
    border: 1px solid #F3F3F3;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    &>p {
      padding: 10px 20px;
      background: #E7E7E7;
      &>span:nth-child(1) {
        float: right;
        i {
          font-style: normal;
          color: #F17B7B;
        }
      }
    }

    &>div {
      padding: 20px;
      span {
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 9px;
        width: 100px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #F17B7B;
        color: #F17B7B;
        border-radius: 14px;
      }
    }
  }

  footer {
    text-align: center;
    margin: 20px;
    .el-button {
      font-size: 35px;
      padding: 10px 30px;
    }
  }
}
</style>
