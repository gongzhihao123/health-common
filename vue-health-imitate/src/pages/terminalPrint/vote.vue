<template>
  <div class='vote'>
    <main>
      <p>
        满意度评价 <span v-if="!voteFlag">( 请在 {{ endTime }} 秒内完成 )</span>
      </p>
      <el-row>
        <el-col :span="24">
          <p>1、您对体检流程是否满意？</p>
          <el-radio-group v-model="processValue" :disabled="voteFlag">
            <el-radio :label="1">
              <img src="../../assets/images/satisfaction.png" alt="">
              满意
            </el-radio>
            <el-radio :label="0">
              <img src="../../assets/images/not_satisfaction.png" alt="">
              不满意
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>2、您对体检环境是否满意？</p>
          <el-radio-group v-model="environmentValue" :disabled="voteFlag">
            <el-radio :label="1">
              <img src="../../assets/images/satisfaction.png" alt="">
              满意
            </el-radio>
            <el-radio :label="0">
              <img src="../../assets/images/not_satisfaction.png" alt="">
              不满意
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
         3、请为您满意的体检老师投票
         <span>
           (请点击头像投票，最多选两位)
         </span>
        </el-col>
      </el-row>
      <div class="teacher-list">
        <div v-for="(item, index) in teacherList"  :key="index" @click="choose(item)">
          <img class="smile" v-if="item.voteUserFlag" src="../../assets/images/satisfaction.png">
          <img :src="item.face" class="user-face">
          <div>
            <p v-for="(item, index) in item.projectNames.split(',')" v-if="index <= 3" :key="index">
              {{ item }}
            </p>
            <p v-if="item.projectNames.split(',').length > 4">...</p>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <el-button v-if="!voteFlag" type="primary" @click="vote">
        投票
      </el-button>
      <el-button v-if="!voteFlag" type="success" @click="jump">
        跳过
      </el-button>
      <el-button v-if="voteFlag" type="primary" @click="$router.push('/terminalPrint/print')">
        已经投票，点击下一步
      </el-button>
      <el-button type="success" @click="back">
        返回
      </el-button>
    </footer>
    <audio :src="audioUrl" autoplay="autoplay"></audio>
  </div>
</template>

<script>
import audioUrl from '../../../static/audio/3.mp3'
import { notice } from '../../utils/index'
export default {
  name: 'vote',
  data () {
    return {
      time: '',
      voteFlag: true,
      audioUrl,
      processValue: '',
      environmentValue: '',
      endTime: 45,
      selectedList: [],
      teacherList: []
    }
  },
  methods: {
    // 投票按钮
    async vote () {
      if (!this.processValue && !this.environmentValue && this.selectedList.length === 0) {
        notice('请选择')
        return
      }
      clearInterval(this.time)
      await this.$store.dispatch('examPrintvote', {
        studentId: sessionStorage.HEALTH_STUDENTID,
        procedureFlag: this.processValue,
        environmentFlag: this.environmentValue,
        doctorId1: this.selectedList.length !== 0 ? this.selectedList[0].userId : '',
        doctorId2: this.selectedList.length === 2 ? this.selectedList[1].userId : ''
      })
      await this.$router.push('/terminalPrint/print')
    },
    jump () {
      clearInterval(this.time)
      this.$router.push('/terminalPrint/print')
    },
    // 选择老师
    choose (item) {
      if (!this.voteFlag) {
        if (item.voteUserFlag) {
          item.voteUserFlag = false
          this.selectedList.forEach((child, index) => {
            if (item.userId === child.userId) {
              this.selectedList.splice(index, 1)
            }
          })
        } else {
          if (this.selectedList.length < 2) {
            item.voteUserFlag = true
            this.selectedList.push(item)
          } else {
            notice('您已经选择了两位老师')
          }
        }
      }
    },
    back () {
      clearInterval(this.time)
      this.$router.push('/terminalPrint/checkMessage')
    },
    // 获取学生投票
    async examPrintGetVote () {
      let data = await this.$store.dispatch('examPrintGetVote', {
        studentId: sessionStorage.HEALTH_STUDENTID
      })
      data.voteUserDtoList.forEach(async item => {
        if (item.userFace) {
          // let path = await this.$store.dispatch('getUserFace', {
          //   userFace: item.userFace
          // })
          item.face = `/health/common/getUserFace?userFace=${item.userFace}`
        }
      })
      setTimeout(() => {
        this.teacherList = data.voteUserDtoList
      }, 400)
      this.processValue = data.healthVote && data.healthVote.procedureFlag ? data.healthVote.procedureFlag : ''
      this.environmentValue = data.healthVote && data.healthVote.environmentFlag ? data.healthVote.environmentFlag : ''
      this.voteFlag = data.voteFlag
    }
  },
  async created () {
    if (sessionStorage.TIME) this.endTime = sessionStorage.TIME
    else this.endTime = 45
    await this.examPrintGetVote()
    if (!this.voteFlag) {
      this.time = setInterval(() => {
        this.endTime--
        sessionStorage.TIME = this.endTime
        if (this.endTime <= 0) {
          clearInterval(this.time)
          this.$router.push('/terminalPrint/print')
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.vote {
  margin-top: 10px;
  padding: 20px;
  background: #fff;
  font-size: 23px;
  main {
    border-left: 1px solid  #E5E5E5;
    border-top: 1px solid  #E5E5E5;
    border-radius: 5px;
    &>p {
      background: #ABC1FE;
      padding: 15px 20px;
      color: #fff;
      font-size: 23px;
    }
    .el-row {
      .el-col {
        text-align: center;
        border-right: 1px solid  #E5E5E5;
        border-bottom: 1px solid  #E5E5E5;
        line-height: 50px;
        color: #737373;
        font-size: 23px;
        span {
          color: #999999;
          font-size: 23px;
        }
        img {
          vertical-align: middle;
        }
      }
      &:nth-child(4) {
        .el-col {
          line-height: 60px;
        }
      }
    }
    .teacher-list {
      overflow: hidden;
      border-right: 1px solid #E5E5E5;
      border-bottom: 1px solid #E5E5E5;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      > div {
        width: 25%;
        display: flex;
        position: relative;
        cursor: pointer;
        margin: 0;
        box-sizing: border-box;
        border-right: 1px solid #E5E5E5;
        border-left: 1px solid #E5E5E5;
        border-bottom: 1px solid #E5E5E5;
        padding: 10px;
        user-select: none;
        .smile {
          position: absolute;
          right: 20px;
        }
        p {
          text-align: left;
          margin-left: 10px;
        }
        .user-face {
          width: 150px;
          height: 150px;
        }
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
