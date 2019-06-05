<template>
  <div class='check-index'>
    <header>
      <el-row>
        <el-col :span="12">
          <img style="cursor: pointer;" src="../../assets/images/small-logo.png" @click="$router.push('/navPage')">
          中小学网络化体检系统
        </el-col>
        <el-col :span="12">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="userPath" v-if="userPath" alt="">
              <span v-else>
                {{ userName.substring(userName.length-2, userName.length) }}
              </span>
            </span>
            <el-dropdown-menu slot="dropdown" style="margin-top:0px;">
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
  name: 'check-index',
  data () {
    return {
      userPath: '',
      userName: ''
    }
  },
  methods: {
    // 退出
    logout () {}
  },
  watch: {
  },
  created () {
    this.userName = this.$store.state.user.name
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variable.scss';
@import '../../assets/scss/mixin.scss';
.check-index {
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
      width: 1200px;
      margin: 20px auto;
      padding-bottom: 20px;
    }
  }
}
</style>
