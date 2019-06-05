<template>
  <div class="chart">
    <div id="sgChart"></div>
    <div id="tzChart"></div>
    <div id="slChart"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
export default {
  name: 'chart',
  data () {
    return {
      sgranges: [],
      sgaverages: [],
      tzranges: [],
      tzaverages: [],
      slzranges: [],
      slyaverages: [],
      seeYear: [],
      chartInfo: '',
      studentName: ''
    }
  },
  methods: {
    sgChart () {
      Highcharts.chart('sgChart', {
        title: {
          text: this.studentName + '身高和标准范围的对比'
        },
        legend: {
          align: 'right',
          x: -60,
          verticalAlign: 'top',
          y: 10,
          floating: true,
          // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
          // borderWidth: 1,
          shadow: false
        },
        xAxis: {
          type: 'number',
          crosshairs: true
        },
        yAxis: {
          title: {
            text: 'cm'
          }
        },
        tooltip: {
          shared: true,
          valueSuffix: 'cm'
        },
        series: [
          {
            name: '学生身高',
            data: this.sgaverages,
            dataLabels: {
              enabled: true
            },
            zIndex: 1,
            // 控制显示层叠
            marker: {
              fillColor: 'white',
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[0]
            }
          },
          {
            name: '范围',
            data: this.sgranges,
            type: 'arearange',
            lineWidth: 0,
            // 与上一个数据列进行关联，或者直接赋值 0
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
              enabled: false
            }
          }
        ],
        // 版权信息
        credits: {
          enabled: false
        }
      })
    },
    tzChart () {
      Highcharts.chart('tzChart', {
        title: {
          text: this.studentName + '体重和标准范围的对比'
        },
        legend: {
          align: 'right',
          x: -60,
          verticalAlign: 'top',
          y: 10,
          floating: true,
          // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
          // borderWidth: 1,
          shadow: false,
          data: ['体重', '范围']
        },
        xAxis: {
          type: 'number',
          crosshairs: true
        },
        yAxis: {
          title: {
            text: 'kg'
          }
        },
        tooltip: {
          shared: true,
          valueSuffix: 'kg'
        },
        series: [
          {
            name: '学生体重',
            data: this.tzaverages,
            dataLabels: {
              enabled: true
            },
            zIndex: 1,
            // 控制显示层叠
            marker: {
              fillColor: 'white',
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[0]
            }
          },
          {
            name: '范围',
            data: this.tzranges,
            type: 'arearange',
            lineWidth: 0,
            // 与上一个数据列进行关联，或者直接赋值 0
            linkedTo: ':previous',
            color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
              enabled: false
            }
          }
        ],
        // 版权信息
        credits: {
          enabled: false
        }
      })
    },
    slChart () {
      Highcharts.chart('slChart', {
        chart: {
          type: 'line'
        },
        title: {
          text: this.studentName + '视力变化趋势'
        },
        legend: {
          align: 'right',
          x: -60,
          verticalAlign: 'top',
          y: 10,
          floating: true,
          // backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
          // borderWidth: 1,
          shadow: false
        },
        xAxis: {
          categories: this.seeYear
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              // 开启数据标签
              enabled: true
            },
            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            enableMouseTracking: false
          }
        },
        series: [
          {
            name: '左眼',
            data: this.slzranges
          },
          {
            name: '右眼',
            data: this.slyaverages
          }
        ],
        // 版权信息
        credits: {
          enabled: false
        }
      })
    }
  },
  props: [
    'chartList'
  ],
  watch: {
    chartList: function (data) {
      this.studentName = data.result.studentName
      this.sgranges = data.result.sgRange
      this.sgaverages = data.result.sgList.map((item) => {
        item.examinationAge = item.examinationAge * 1
        item.value1 = item.value1 * 1
        return [item.examinationAge, item.value1]
      })
      this.tzranges = data.result.tzRange
      this.tzaverages = data.result.tzList.map((item) => {
        item.examinationAge = item.examinationAge * 1
        item.value1 = item.value1 * 1
        return [item.examinationAge, item.value1]
      })
      this.seeYear = data.result.slList.map((item) => {
        return item.examinationAge
      })
      this.slzranges = data.result.slList.map((item) => {
        return item.value1 * 1
      })
      this.slyaverages = data.result.slList.map((item) => {
        return item.value2 * 1
      })
      if (this.sgranges || this.sgaverages) {
        this.sgChart()
      }
      if (this.tzranges || this.tzaverages) {
        this.tzChart()
      }
      if (this.slzranges || this.slyaverages || this.seeYear) {
        this.slChart()
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/variable.scss";
@import "../../../assets/scss/mixin.scss";
.chart {
  width: 100%;
  #sgChart {
  display: inline-block;
  width: 650px;
  height: 310px;
  margin: 0 auto;
  }
  #tzChart {
    display: inline-block;
    width: 650px;
    height: 310px;
  }
  #slChart {
    display: inline-block;
    width: 650px;
    height: 310px;
  }
}
</style>
