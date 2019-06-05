<template>
  <div class='entry'>
  </div>
</template>

<script>
import tooth from '../../../components/tooth.vue'
export default {
  name: 'entry',
  data () {
    return {
      projectList: [
        { name: '肺', state: 1 },
        { name: '肾', state: 2 },
        { name: '腰子', state: 3 },
        { name: '肺', state: 1 },
        { name: '肾', state: 2 },
        { name: '腰子', state: 3 },
        { name: '肺', state: 1 },
        { name: '肾', state: 2 },
        { name: '腰子', state: 3 },
        { name: '肺', state: 1 },
        { name: '肾', state: 2 },
        { name: '腰子', state: 3 },
        { name: '肺', state: 1 },
        { name: '肾', state: 2 },
        { name: '腰子', state: 3 }
      ],
      eduId: ''
    }
  },
  directives: {
    focus: {
      inserted: function (el, option) {
        var defClass = 'el-input'
        var defTag = 'input'
        var value = option.value || true
        if (typeof value === 'boolean') {
          value = { cls: defClass, tag: defTag, foc: value }
        } else {
          value = { cls: value.cls || defClass, tag: value.tag || defTag, foc: value.foc || false }
        }
        if (el.classList.contains(value.cls) && value.foc) {
          el.getElementsByTagName(value.tag)[0].focus()
        }
      }
    }
  },
  components: {
    tooth
  },
  methods: {
    back () {
      this.$router.push('/navPage')
    }
  },
  watch: {
  },
  mounted () {
    let dateInput = document.body.querySelectorAll("input[placeholder='选择日期']")
    dateInput.forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
    let bothInput = document.body.querySelectorAll('tamplate')
    bothInput.forEach(item => {
      item.setAttribute('tabindex', '-1')
    })
  },
  created () {
    // let code = ''
    // let lastTime, nextTime
    // let lastCode, nextCode
    // document.onkeydown = (e) => {
    //   nextCode = e.which
    //   nextTime = new Date().getTime()

    //   if (lastCode != null && lastTime != null && nextTime - lastTime <= 30) {
    //     code += String.fromCharCode(lastCode)
    //   } else if (lastCode != null && lastTime != null && nextTime - lastTime > 100) {
    //     code = ''
    //   }

    //   lastCode = nextCode
    //   lastTime = nextTime
    //   if (e.which === 9) {
    //     setTimeout(() => {
    //       this.$refs.eduId.focus()
    //       this.eduId = code
    //     }, 50)
    //   }
    // }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/variable.scss';
@import '../../../assets/scss/mixin.scss';
.entry {
  margin-top: 20px;
  background: #fff;
  border-radius: 5px;

  &>p {
    padding: 15px 20px;
    color: #666666;
    font-size: 16px;
    border-bottom: 1px solid #E5E5E5;
    i {
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #6E94FF;
      border-radius: 50%;
      vertical-align: middle;
    }
    &>span {
      color: #6E94FF;
      font-size: 20px;
    }
    .el-button {
      float: right;
      margin-top: -3px;
    }
  }

  main {
    padding: 20px 40px;

    .top {
      padding-bottom: 20px;
      border-bottom: 1px solid #E5E5E5;
      &>.el-row>.el-col {
        padding-right: 20px;
        &>span {
          display: inline-block;
          margin-bottom: 10px;
          color: #ABBAC1;
        }
        .el-input {
          width: 350px;
        }
      }
      .el-col-18 {
        margin-top: 10px;
        &>div {
          background: #ECEEF4;
          padding: 10px 20px;
          border-radius: 5px;
          p:nth-child(1) {
            margin-bottom: 5px;
            span {
              display: inline-block;
              width: 90px;
              color: #B3B3B3;
              &:nth-child(5) {
                width: 180px;
              }
            }
          }
          p:nth-child(2) {
            span {
              display: inline-block;
              width: 90px;
              color: #717172;
              &:nth-child(5) {
                width: 180px;
              }
            }
          }
        }
      }
    }

    .middle {
      padding: 20px 0;
      border-bottom: 1px solid #E5E5E5;
      &>p {
        color: #B3BFC6;
      }
      &>div {
        margin-top: 10px;
        span {
          display: inline-block;
          text-align: center;
          border-radius: 5px;
          width: 100px;
          line-height: 30px;
          border: 1px solid transparent;
          margin: 10px 10px 0 0;
          &.red {
            border-color: #F17B7B;
            color: #F17B7B;
          }
          &.blue {
            border-color: #6E94FF;
            color: #6E94FF;
          }
          &.green {
            border-color: #73D586;
            color: #73D586;
          }
        }
      }
    }

    .middle-history {
      padding: 20px 0;
      border-bottom: 1px solid #E5E5E5;
      span {
        color: #95A7B1;
      }
    }

    .footer {
      padding: 20px 0;
      &>p {
        color: #95A7B1;
      }
      &>.table-1 {
        margin-top: 10px;
        border-color: transparent;
        border-right: 0;
        border-bottom: 0;
        td,th {
          width: 40px;
          height: 40px;
          padding: 5px;
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
          tr {
            td {
              width: 120px;
              .el-input {
                .el-input__inner {
                  height: 36px;
                }
              }
            }
            td:nth-child(1) {
              background: #E6E6E6;
            }
            td:nth-child(5) {
              background: #E6E6E6;
            }
          }
        }
      }
    }
  }
}
</style>
