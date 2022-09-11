<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="280">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="280">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="width">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 70px; height: 70px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="width">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="300">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-bottom"
            v-if="isSale"
            @click="CancerSale(row)"
          ></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-top"
            v-else
            @click="onSale(row)"
          ></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button
            type="info"
            size="mini"
            icon="el-icon-info"
            @click="showDrawer(row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteSku(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    >
    </el-pagination>
    <el-drawer :visible.sync="drawer" size="50%" :with-header="false">
      <el-row :gutter="10">
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            type="info"
            v-for="(tag, index) in skuInfo.skuAttrValueList"
            :key="tag.id"
            >{{ tag }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      // 分页器数据
      page: 1,
      limit: 3,
      total: 20,
      // sku数据
      records: [],
      isSale: true,
      drawer: false,
      skuInfo: {},
    };
  },
  methods: {
    //页面大小变化
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 当前页面切换
    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList(page);
    },
    // 获取sku数据
    async getSkuList(page = 1) {
      let result = await this.$API.sku.reqSkuList(page, this.limit);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 下架
    async CancerSale(row) {
      let result = await this.$API.sku.reqSkuCancerSale(row.id);
      if (result.code == 200) {
        this.isSale = false;
      }
    },
    // 上架
    async onSale(row) {
      let result = await this.$API.sku.reqSkuOnSale(row.id);
      if (result.code == 200) {
        this.isSale = true;
      }
    },
    // 显示详情信息
    showDrawer(row) {
      this.drawer = true;
      this.skuInfo = row;
    },
    // 删除sku
    async deleteSku(row) {
      let result = await this.$API.sku.reqDeleteSku(row.id);
      if (result.code == 200) {
        this.getSkuList(this.page);
      }
    },
  },
  mounted() {
    this.getSkuList();
  },
};
</script>

<style>
.el-row .el-col-5 {
  text-align: right;
  font-size: 22px;
  font-weight: 700;
}
.el-row .el-col-16 {
  font-size: 20px;
}
.el-row {
  margin: 16px;
}
</style>