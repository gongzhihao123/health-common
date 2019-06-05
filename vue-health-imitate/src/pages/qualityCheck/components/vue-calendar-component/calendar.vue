<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #fff;
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 6rem;
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
  margin: 0.2rem 0;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #000;
  font-size: 0.36rem;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 0.47rem;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 0.08rem;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  margin: 0.2rem 0;
  width: 100%;
}

.wh_content_gg {
  height: 3.4rem;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 0.36rem;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 0.36rem;
  width: 13.4%;
  text-align: center;
  color: #000;
  position: relative;
}
.wh_content_item {
  height: 0.4rem;
}

.wh_top_tag {
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 0.12rem;
  height: 0.12rem;
  border-top: 0.02rem solid #000;
  border-left: 0.02rem solid #000;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 0.12rem;
  height: 0.12rem;
  border-top: 0.02rem solid #000;
  border-right: 0.02rem solid #000;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 1rem;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color:#bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: #6B84FE;
  border-radius: 1rem;
}
.wh_content_item .wh_chose_day {
  /* background: #ccc; */
  border-radius: 1rem;
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="tag in textTop" :key="tag">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content wh_content_gg">
        <div class="wh_content_item" v-for="(item,index) in list" @click="clickDay(item,index)" :key="index">
          <div
            class="wh_item_date"
            v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]"
          >{{item.id}}</div>
        </div>
      </div>
      <!-- <button>取消</button><button>确定</button> -->
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar'
export default {
  data () {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ['一', '二', '三', '四', '五', '六', '日']
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    }
  },
  created () {
    this.intStart()
    this.myDate = new Date()
  },
  methods: {
    intStart () {
      timeUtil.sundayStart = this.sundayStart
    },
    setClass (data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth' ? this.PreMonth(item.date) : this.NextMonth(item.date)
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k)
      })
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`
      let arr = timeUtil.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        let k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
    }
  },
  mounted () {
    this.getList(this.myDate)
  },
  watch: {
    markDate: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    markDateMore: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    agoDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    futureDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    sundayStart: {
      handler (val, oldVal) {
        this.intStart()
        this.getList(this.myDate)
      },
      deep: true
    }
  }
}
</script>
