<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :disabled="show">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category1Id"
          @change="handle1"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in list1"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category2Id"
          @change="handle2"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in list2"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cForm.category3Id"
          @change="handle3"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in list3"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Catergory",
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  props: ["show"],
  mounted() {
    this.getCategory1();
  },
  methods: {
    // 获取一级分类
    async getCategory1() {
      let result = await this.$API.attr.reqCategoryList1();
      if (result.code == 200) {
        this.list1 = result.data;
      }
    },
    // 当一级分类选择发生改变时获取二级分类
    async handle1() {
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      let { category1Id } = this.cForm;
      let result = await this.$API.attr.reqCategoryList2(category1Id);
      if (result.code == 200) {
        this.list2 = result.data;
        this.$emit("getCategoryId", this.cForm.category1Id, 1);
      }
    },
    // 当二级分类选择发生改变时获取三级分类
    async handle2() {
      this.list3 = [];
      this.cForm.category3Id = "";
      let { category2Id } = this.cForm;
      let result = await this.$API.attr.reqCategoryList3(category2Id);
      if (result.code == 200) {
        this.list3 = result.data;
        this.$emit("getCategoryId", this.cForm.category2Id, 2);
      }
    },
    handle3() {
      this.$emit("getCategoryId", this.cForm.category3Id, 3);
    },
  },
};
</script>

<style>
</style>