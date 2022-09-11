<template>
  <div class="charts" ref="barCharts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let barCharts = echarts.init(this.$refs.barCharts);
    barCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        show: false,
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130, 200, 80, 90],
          type: "bar",
          color: "cyan",
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