<template>
  <div>
    <Card />
    <Sale />
    <el-row :gutter="10" class="center">
      <el-col :span="12">
        <Search />
      </el-col>
      <el-col :span="12">
        <Category />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "./Card/index.vue";
import Sale from "./Sale/index.vue";
import Search from "./Search/index.vue";
import Category from "./Category/index.vue";
export default {
  name: "Dashboard",
  components: { Card, Sale, Search, Category },
  computed: {
    ...mapGetters(["name"]),
  },
};
</script>

<style  scoped>
.center {
  margin-top: 10px;
}
</style>
