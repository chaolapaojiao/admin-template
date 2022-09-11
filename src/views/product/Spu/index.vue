<template>
  <div>
    <Catergory
      @getCategoryId="getCategoryId"
      :show="flag === 0 ? false : true"
    />
    <el-card>
      <!-- spu数据 -->
      <div v-show="flag === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <!-- spu表格 -->
        <el-table style="width: 100%" border :data="spuInfo.records">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-tooltip content="添加sku" placement="bottom" effect="light">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                  title="添加sku"
                  @click="addSku(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="修改spu" placement="bottom" effect="light">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  size="mini"
                  title="修改spu"
                  @click="UpdateSpu(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                content="查看当前spu全部sku列表u"
                placement="bottom"
                effect="light"
              >
                <el-button
                  type="info"
                  icon="el-icon-info"
                  size="mini"
                  title="查看当前spu全部sku列表"
                  @click="showDialog(row)"
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="light" content="删除spu" placement="bottom">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  @click="deleteSpu(row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
          style="text-align: center"
          :page-size="3"
          :current-page="current"
          :page-sizes="[3, 5, 10]"
          :total="total"
          layout="prev, pager,next, jumper,->,sizes,total"
          @size-change="changeSize"
          @current-change="changeCurrent"
        >
        </el-pagination>
      </div>
      <el-dialog :title="spu.spuName" :visible.sync="dialogVisible">
        <el-table
          style="width: 100%"
          border
          :data="skuInfoList"
          v-loading="loading"
        >
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column label="默认图片" width="width">
            <template slot-scope="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 80px; height: 80px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <SpuForm v-show="flag === 1" ref="spu" @showTable="showTable" />
      <SkuForm v-show="flag === 2" ref="sku" @showTable="showTable" />
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "Spu",
  components: { SpuForm, SkuForm },
  data() {
    return {
      spuInfo: {},
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 分页器数据
      current: 1,
      total: 1,
      limit: 5,
      // 判断底部显示哪个
      flag: 0,
      page: 1,
      dialogVisible: false,
      spu: {},
      skuInfoList: [],
      loading: true,
    };
  },
  methods: {
    // 获取数据
    async getSpuInfo(page = 1) {
      let { category3Id, limit } = this;
      let result = await this.$API.spu.reqGetSpuInfo(page, limit, category3Id);
      if (result.code == 200) {
        this.spuInfo = result.data;
        this.current = result.data.current;
        this.total = result.data.total;
      }
    },
    // 获取id数据
    getCategoryId(id, index) {
      if (index == 1) {
        this.category1Id = id;
        this.category2Id = "";
        this.category3Id = "";
      } else if (index == 2) {
        this.category2Id = id;
        this.category3Id = "";
      } else {
        this.category3Id = id;
        // 获取属性数据
        this.getSpuInfo();
      }
    },
    // 改变一页的数据数
    changeSize(limit) {
      console.log(limit);
      this.limit = limit;
      this.getSpuInfo();
    },
    // 改变当前页数
    changeCurrent(page) {
      this.page = page;
      this.getSpuInfo(page);
    },
    // 修改spu数据
    UpdateSpu(row) {
      this.flag = 1;
      this.$refs.spu.getSpu(row);
    },
    // 添加spu数据
    addSpu() {
      this.flag = 1;
      this.$refs.spu.addSpu(this.category3Id);
      this.getSpuInfo(this.page);
    },
    // 展示spu表格页
    showTable(flag) {
      this.flag = flag;
      this.getSpuInfo(this.page);
    },
    // 删除spu
    deleteSpu(row) {
      this.$confirm("此操作将永久删除该spu, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.spu.reqDeleteSpu(row.id);
          console.log(result);
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getSpuInfo(
              this.spuInfo.records < 1 ? this.page - 1 : this.page
            );
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加sku
    addSku(row) {
      this.flag = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // 显示sku信息
    async showDialog(row) {
      this.loading = true;
      this.skuInfoList = [];
      this.spu = row;
      this.dialogVisible = true;
      let result = await this.$API.spu.reqSkuList(row.id);
      if (result.code == 200) {
        this.skuInfoList = result.data;
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>