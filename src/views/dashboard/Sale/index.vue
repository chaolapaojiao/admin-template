<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix cardHeader">
      <!-- 左侧头部 -->
      <el-tabs class="headLeft" v-model="activeName">
        <el-tab-pane label="销售额" name="saleCount"></el-tab-pane>
        <el-tab-pane label="访问量" name="visitCount"></el-tab-pane>
      </el-tabs>
      <!-- 右侧头部 -->
      <div class="headRight">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="time"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="18" class="conLeft">
          <div ref="conLeft" class="conLeft"></div>
        </el-col>
        <el-col :span="6" class="conRight">
          <h3>门店销售额排名</h3>
          <ul>
            <li v-for="(store, index) in saleRank" :key="store.index">
              <span>{{ store.index }}</span>
              <span>{{ store.name }}</span>
              <span>{{ store.count }}</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
  data() {
    return {
      date: [],
      activeName: "销售额",
      saleRank: [
        { index: 1, name: "肯德基", count: 12345 },
        { index: 2, name: "肯德基", count: 12345 },
        { index: 3, name: "肯德基", count: 12345 },
        { index: 4, name: "肯德基", count: 12345 },
        { index: 5, name: "肯德基", count: 12345 },
        { index: 6, name: "肯德基", count: 12345 },
        { index: 7, name: "肯德基", count: 12345 },
      ],
    };
  },
  mounted() {
    let barCard = echarts.init(this.$refs.conLeft);
    barCard.setOption({
      title: {
        text: "销售额",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 333, 344, 66, 77],
          color: "yellowgreen",
        },
      ],
    });
  },
  methods: {
    setDay() {
      const day = dayjs().format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = dayjs().day(1).format("YYYY-MM-DD");
      const end = dayjs().day(7).format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = dayjs().startOf("month").format("YYYY-MM-DD");
      const end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = dayjs().startOf("year").format("YYYY-MM-DD");
      const end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.box-card {
  margin-top: 10px;
}
::v-deep .el-card__header {
  border-bottom: 0;
}
/* 头部样式 */
.cardHeader {
  position: relative;
  font-size: 14px;
}
.headLeft {
  width: 100%;
}
.headRight {
  position: absolute;
  right: 10px;
  top: 0px;
}
.headeRight span {
  margin-right: 15px;
}
.time {
  width: 300px;
}
/* 内容部分 */
.conRight,
.conLeft {
  height: 300px;
}
ul {
  width: 100%;
  padding-left: 10px;
}
li {
  list-style: none;
  width: 100%;
  margin-bottom: 15px;
  font-size: 14px;
}
li span:first-child {
  display: inline-block;
  height: 20px;
  width: 20px;
  text-align: center;
  line-height: 20px;
}
ul li:nth-child(-n + 3) span:first-child {
  border-radius: 50%;
  background-color: black;
  color: white;
}
li span {
  margin-left: 30px;
}
li span:last-child {
  float: right;
}
</style>