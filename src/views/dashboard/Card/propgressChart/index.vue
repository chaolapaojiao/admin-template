<template>
  <div class="charts" ref="progressCharts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let progressCharts = echarts.init(this.$refs.progressCharts);
    progressCharts.setOption({
      xAxis: {
        show: false,
        // 最大值和最小值的设置
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          data: [44],
          type: "bar",
          color: "cyan",
          //  柱状图的宽度
          barWidth: 10,
          color: "yellowgreen",
          //   背景颜色
          showBackground: true,
          backgroundStyle: {
            color: "#eee",
          },
          label: {
            show: true,
            formatter: "|",

            position: "right",
          },
        },
      ],
      //   布局
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        rigth: 0,
      },
      //   提示
      tooltip: {},
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