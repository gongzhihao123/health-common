<template>
  <div class='check-physique'>
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
              <!-- <el-dropdown-item v-if="deviceFlag" @click.native="changePerson">个人信息</el-dropdown-item>
              <el-dropdown-item v-if="deviceFlag" @click.native="changePassword">修改密码</el-dropdown-item> -->
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
      <div class="top">
        <h1>请选择质检组 <span @click="newGroupList">新增质检组</span></h1>
        <ul>
          <li v-for="(item, index) in testGroup" :class="item.joinedFlag ? 'actives' : ''" :key="index" @click.stop="groupInfo(item)">
            <span>{{ item.date | dateFormat('yyyy-MM-dd') }}</span>
            <span style="display:inline-block; width:7.4rem;">{{ item.xxmc }}</span>
            <span>{{ item.leaderUserName }}</span>
            <span @click.stop="groupDetele(item)" v-if="item.leaderFlag" class="detailButton"><i>删除</i></span>
          </li>
        </ul>
      </div>
      <!-- <p class="sub" @click="centerDialogVisible = true">新建质检组</p> -->
    </div>
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="70%"
      :before-close="handleClose"
      center>
      <span>
        <div class="btn" >
            <el-col>
               <span>质检学校</span>
               <el-select v-model="school" medium placeholder="请选择" style="font-size: 0.42rem;">
                <el-option
                    style="font-size: 0.36rem;"
                    v-for="item in schools"
                    :key="item.xxdm"
                    :label="item.xxmc"
                    :value="item.xxdm">
                  </el-option>
                </el-select>
            </el-col>
        </div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newgroups">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'check-physique',
  data () {
    return {
      screenWidth: document.body.clientWidth,
      loading: false,
      centerDialogVisible: false,
      userName: '',
      userPath: '',
      value: '',
      pickerFlag: false,
      testGroup: [],
      testGroupFlag: true,
      schools: [],
      school: ''
    }
  },

  methods: {
    // 分辨率处理
    getRem (pwidth, prem) {
      var html = document.getElementsByTagName('html')[0]
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth
      html.style.fontSize = oWidth / pwidth * prem + 'px'
    },
    handleClose () {
      this.centerDialogVisible = false
      this.pickerFlag = false
    },
    // 退出
    logout () {
      // this.$store.dispatch('logout')
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/logout`
    },
    // 返回上一级
    backOff () {
      this.$router.push('/navPage')
    },
    async groupList () {
      this.testGroup = await this.$store.dispatch('qualityTeam')
      this.$route.params.testGroupFlag === undefined ? this.testGroupFlag = true : this.testGroupFlag = false
      if (this.testGroupFlag) {
        this.testGroup.forEach((item, index) => {
          if (item.joinedFlag) {
            this.$router.push({name: 'checkBasic', params: {groupId: item}})
          }
        })
      }
    },
    async schoolList () {
      this.schools = await this.$store.dispatch('schoolList')
    },
    newGroupList () {
      this.school = ''
      this.centerDialogVisible = true
    },
    async newgroups () {
      if (this.school) {
        await this.$store.dispatch('newGroup', {xxdm: this.school})
        this.centerDialogVisible = false
      } else {
        this.$notify.error({
          title: '错误',
          message: '选择学校不能为空'
        })
      }
      this.groupList()
    },
    async groupInfo (data) {
      await this.$store.dispatch('leaveGroup', data.id)
        .then((item) => {
          if (item !== -1) {
            this.groupList()
            if (!data.joinedFlag) {
              this.$router.push({name: 'checkBasic', params: {groupId: data}})
            }
          }
        })
    },
    groupDetele (data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(async () => {
        await this.$store.dispatch('teamDetele', {groupId: data.id})
        await this.groupList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  mounted () {
    var path = document.getElementById('contextPath').value
    this.action = `${path}/cmis/importStudent`
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })()
    }
  },
  watch: {
    input () {
      this.pageNo = 1
    },
    hidd () {
      document.addEventListener('click', function (e) {
        if (e.target.className !== 'usermessage') {
          this.pickerFlag = false
        }
      })
    },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  async created () {
    this.getRem(1920, 100)
    if (this.$store.state.user.name) {
      this.userName = this.$store.state.user.name
    }
    if (this.$store.state.user.face) {
      this.userPath = await this.$store.dispatch('getUserFace', {
        userFace: localStorage.HEALTH_USERPATH ? localStorage.HEALTH_USERPATH : this.$store.state.user.face
      })
    }
    await this.schoolList()
    await this.groupList()
    this.loading = true
    this.loading = false
  }
}
</script>

<style lang="scss" >
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
@import '../../assets/scss/common.scss';
  .check-physique {
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
    ::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
    }
    min-height: 9.4rem;
    border-radius: 0.04rem;
    box-sizing: border-box;
    background: url("../../assets/images/bg.png") no-repeat 0 0;
    /* position: relative; */
    .el-pagination {
      /* position: absolute; */
      /* bottom: 20px; */
      margin-left: 50%;
      /* left: 50%; */
      margin-top: 0.3rem;
      transform: translateX(-50%);
    }
    .top {
      margin-left: 10%;
      padding-top: 0.75rem;
      // transform: translateX(-50%);
      color: #fff;
      h1 {
        width: 15.5rem;
        margin-left: 0.2rem;
        font-size: 0.48rem;
        line-height: 0.68rem;
        span {
          display: inline-block;
          width: 2.4rem;
          height: 0.8rem;
          float: right;
          font-size: 0.4rem;
          background: #fff;
          color:#6B84FE;
          border-radius: 0.09rem;
          line-height: 0.8rem;
          text-align: center;
        }
      }
      ul {
          overflow: auto;
          width: 17rem;
          height: 7.4rem;
          margin-top: 0.2rem;
        li {
          width: 15.8rem;
          height:1.2rem;
          line-height: 1.2rem;
          background:rgba(69, 117, 214, 0.7);
          border-color: rgba(62, 107, 199, 0.8);
          // opacity:0.8;
          color: #909399;
          margin-top: 0.65rem;
          font-size: 0.42rem;
          &.actives {
            background:rgba(103,194,58,.6);
            border-color: rgba(103,194,58,.6);
            color: #67c23a;
          }
          span {
            // display: inline-table;
            color: #FFFFFF !important;
            margin: 0 0.42rem;
          &.detailButton{
            width:1.44rem;
            height:0.72rem;
            padding: 0.1rem 0.2rem;
            background:#222222;
            opacity:0.4;
            border-radius:0.09rem;
            border:2px solid rgba(173,173,173,1);
            cursor: pointer;
            i {
              font-style: normal;
              width: 0.72rem;
              height: 0.36rem;
              font-size: 0.36rem;
              color:#fff;
              line-height:36px;
            }
          }
          }
        }
      }
    }
    .sub {
      width:5.18rem;
      height:1.35rem;
      text-align: center;
      margin: 1rem auto;
      background:rgba(255,255,255,1);
      border-radius: 0.09rem;
      font-size: 0.54rem;
      color:#6B84FE;
      line-height: 1.35rem;
      cursor: pointer;
    }
  }
  .el-dialog {
     .el-select-dropdown, .el-poper {
          font-size: 0.42rem !important;
        }
      .el-select-dropdown__item {
        font-size: 0.42rem !important;
      }
    .btn {
      padding-bottom: 3.5rem;
      .el-col {
      margin: 0.44rem 0 0 1rem;
      span {
        font-size: 0.48rem;
        line-height: 0.68rem;
        color: #4A4A4A;
      }
      input {
        height: 1.14rem;
        width: 7rem;
        margin-left: 0.1rem;
        font-size: 0.42rem;
        color: #757575;
        background:rgba(239,239,244,1);
        border:2px solid rgba(151,151,151,1);
      }
      .el-select {
        height: 1.14rem;
        width: 7rem;
        font-size: 0.42rem;
        input {
          background: #fff;
        }
        input::-webkit-input-placeholder {
          font-size: 0.42rem;
        }
      }
    }
  }
    .dialog-footer {
      .el-button {
        width: 3rem;
        height: 0.9rem;
        font-size: 0.36rem;
        margin-bottom: 0.2rem;
      }
    }
  }
}

</style>
