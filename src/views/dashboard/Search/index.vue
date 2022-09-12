<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix search-header">
      <span>线上热门搜索</span>
      <el-dropdown class="header-right">
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row>
      <el-col :span="12"> <LineCard /> </el-col>
      <el-col :span="12"><LineCard /> </el-col>
    </el-row>
    <el-table :data="data" style="width: 100%" border class="table">
      <el-table-column type="index" label="排名" width="80"> </el-table-column>
      <el-table-column prop="prop" label="搜索关键字" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="用户数" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="周涨幅" width="width">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import LineCard from "./LineCard";
export default {
  data() {
    return {
      data: [{}],
    };
  },
  components: { LineCard },
};
</script>

<style scoped>
.search-header {
  position: relative;
}
.header-right {
  position: absolute;
  top: 0;
  right: 0;
}
.table {
  margin-top: 10px;
}
</style>