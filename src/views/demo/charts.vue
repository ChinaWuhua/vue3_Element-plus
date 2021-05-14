<template>
  <div class="charts">
    <div class="chart" ref="chart-1"></div>
    <div class="chart" ref="chart-2" style="margin-top: 20px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  name: 'charts',
  data() {
    return {
      
    }
  },
  mounted() {
    this.setCharts_1()
  },
  methods: {
    setCharts_1() {
      let dom = this.$refs['chart-1'];
      var myChart = echarts.init(dom as HTMLCanvasElement);
      myChart.setOption({
        title: {
            text: '温度监控(单位:℃)'
        },
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
              let res = params[0]
              return `
                <span>${res.marker}</span>
                <span>${res.name}</span>
                <span>${res.value}</span>
                ℃
              `
            }
        },
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [21, 19, 22, 23, 18, 20, 19],
            type: 'line'
        }],
      });
    },
    setCharts_2() {
      let dom = this.$refs['chart-1'];
      var myChart = echarts.init(dom as HTMLCanvasElement);
      myChart.setOption({
        title: {
            text: '温度记录(单位:℃)'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [15, 13, 20, 22, 16, 15, 14],
            type: 'line'
        }]
      });
    }
  }
});
</script>


<style scoped>
.chart {
  width: 600px;
  height: 400px;
}
</style>