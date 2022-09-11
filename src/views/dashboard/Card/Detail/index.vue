<template>
  <div>
    <el-card>
      <div class="header">
        <span>{{ title }}</span>
        <i class="el-icon-warning-outline"></i>
      </div>
      <div class="content">{{ content }}</div>
      <div class="chart">
        <slot name="chart"></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["title", "content"],
};
</script>

<style scoped>
.header {
  color: #cccc;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  height: 20px;
}
.content {
  font-size: 22px;
  margin: 5px 0px;
  height: 20px;
}
.chart {
  border-bottom: 1px solid rgb(252, 243, 243);
  font-size: 13px;

  height: 50px;
  line-height: 50px;
}
.footer {
  font-size: 14px;
  padding-top: 15px;
  height: 20px;
}
</style>