<template>
  <div class='detail-index'>
    <header>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/images/small-logo.png" @click="$router.push('/navPage')">
          中小学网络化体检系统
        </el-col>
        <el-col :span="12">
          <span style="font-size: 15px;">{{ userName }}</span>
          <!-- <el-dropdown> -->
            <span class="el-dropdown-link">
              <img :src="userPath" v-if="userPath" alt="">
              <img v-else src="../../../assets/images/default-avatar.png" alt="">
              <!-- <span v-else>
                {{ userName.substring(userName.length-2, userName.length) }}
              </span> -->
            </span>
          <!-- </el-dropdown> -->
        </el-col>
      </el-row>
    </header>

    <div>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-index',
  data () {
    return {
      userPath: '',
      userName: ''
    }
  },
  methods: {
    // 退出
    logout () {
      // this.$store.dispatch('logout')
      const path = document.getElementById('contextPath').value
      window.location.href = `${path}/logout`
    }
  },
  watch: {
  },
  async created () {
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
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/variable.scss';
@import '../../../assets/scss/mixin.scss';
.detail-index {
  min-width: 1200px;
  background: #EAEFF8;
  &>header {
    height: 80px;
    line-height: 80px;
    background: #6B92FE;
    color: #fff;

    &>.el-row {
      width: 1200px;
      margin: 0 auto;
      .el-col:nth-child(1) {
        font-size: 24px;
        img {
          vertical-align: middle;
          width: 50px;
          margin-right: 10px;
        }
      }

      .el-col:nth-child(2) {
        padding-right: 20px;
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

  &>div {
    height: calc(100vh - 80px);
    overflow-x: hidden;
    &>main {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      &>span {
        display: inline-block;
        margin: 10px;
        color: #C8C8C8;
        cursor: pointer;
      }
    }
  }
}
</style>
