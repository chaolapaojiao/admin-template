<template>
  <el-card>
    <div class="category-header clearfix" slot="header">
      <div>销售额类别占比</div>
      <div class="header-right">
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="myCard" ref="myCard"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      radio1: "全部渠道",
    };
  },
  mounted() {
    let myCard = echarts.init(this.$refs.myCard);
    myCard.setOption({
      title: {
        text: "视频",
        subtext: "1048",
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    myCard.on("mouseover", (params) => {
      const { name, value } = params.data;
      myCard.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scoped>
.category-header {
  position: relative;
}
.myCard {
  width: 100%;
  height: 260px;
}
.header-right {
  position: absolute;
  top: -7px;
  right: 0;
}
</style>