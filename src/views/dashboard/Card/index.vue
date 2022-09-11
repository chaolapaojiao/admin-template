<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <Detail title="总销售额" content="￥126560">
          <template slot="chart">
            <span>周同比</span>
            <span>56.67%&</span>
            <span class="el-icon-caret-top"></span>
            <span>日同比</span>
            <span>19.17</span>
            <span class="el-icon-caret-bottom"></span>
          </template>
          <template slot="footer"> 日销售额￥ <span>12334</span> </template>
        </Detail> </el-col
      ><el-col :span="6">
        <Detail title="访问量" content="88460">
          <template slot="chart"> <lineCharts></lineCharts> </template
          ><template slot="footer"> 日访问量 <span>1234</span> </template>
        </Detail></el-col
      ><el-col :span="6">
        <Detail title="支付笔数" content="7788">
          <!-- 柱状图 -->
          <template slot="chart"> <barCharts></barCharts> </template>
          <template slot="footer"> 转化率 <span>65%</span> </template></Detail
        > </el-col
      ><el-col :span="6">
        <Detail title="运营活动效果" content="78%">
          <!-- 进度条 -->
          <template slot="chart">
            <progressCharts></progressCharts>
          </template>
          <template slot="footer">
            <span>周同比</span>
            <span>12%&</span>
            <span class="el-icon-caret-top"></span>
            <span>日同比</span>
            <span>11%</span>
            <span class="el-icon-caret-bottom"></span>
          </template> </Detail
      ></el-col>
    </el-row>
  </div>
</template>

<script>
import progressCharts from "./propgressChart";
import barCharts from "./barChart";
import lineCharts from "./lineChart/index.vue";
import Detail from "./Detail/index.vue";
export default {
  components: { Detail, lineCharts, barCharts, progressCharts },
};
</script>

<style>
span {
  margin-right: 7px;
}
</style>