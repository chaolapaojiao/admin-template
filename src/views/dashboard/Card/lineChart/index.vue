<template>
  <div class="charts" ref="lineCharts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.lineCharts);
    // 配置数据;
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [30, 12, 58, 29, 88, 99, 55],
          smooth: true,
          //   拐点样式
          itemStyle: {
            opacity: 0,
          },
          //   区域样式
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      //   布局
      grid: {
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
      },
    });
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>