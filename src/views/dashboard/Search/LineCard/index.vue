<template>
  <div>
    <div class="card-header">
      <span>搜索用户数</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div class="card-content">
      <span class="count">12345</span>
      <span class="up-or-down">17.1</span>
      <i class="el-icon-caret-top" v-if="dataUp"></i>
      <i class="el-icon-caret-bottom" v-else></i>
    </div>
    <div class="card-card" ref="cardCard"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      dataUp: true,
      data: [{}],
    };
  },
  mounted() {
    let myCharts = echarts.init(this.$refs.cardCard);
    myCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
        type: "value",
      },
      series: [
        {
          data: [66, 93, 34, 94, 129, 33, 77, 77, 88.44, 88],
          type: "line",
          smooth: true,
          itemStyle: {
            opacity: 0,
          },
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
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        rigth: 0,
      },
    });
  },
};
</script>

<style scoped>
.card-header {
  font-size: 14px;
  color: rgb(157, 146, 146);
}
.card-content {
  width: 100%;

  margin-top: 15px;
  font-size: 20px;
}
.el-icon-caret-top {
  color: red;
}
.card-content i {
  font-size: 14px;
}
.el-icon-caret-bottom {
  color: green;
}
.card-content .count {
  margin-right: 20px;
}
.card-content .up-or-down {
  margin-right: 4px;
  font-size: 16px;
  color: rgb(169, 162, 162);
}
.card-card {
  width: 100%;
  height: 100px;
  padding: 0;
}
</style>