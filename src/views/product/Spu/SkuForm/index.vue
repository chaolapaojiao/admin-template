<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="spu名称"> {{ spu.spuName }}</el-form-item>
      <el-form-item label="sku名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          type="number"
          placeholder="价格(元)"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          placeholder="规格描述"
          v-model="skuInfo.skuDesc"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrInfoList"
            :key="attr.id"
          >
            <el-select v-model="attr.attrIdAndvalue" placeholder="请选择">
              <el-option
                v-for="(value, index) in attr.attrValueList"
                :key="value.id"
                :label="value.valueName"
                :value="`${attr.id}:${value.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" label-width="100px">
          <el-form-item
            :label="attr.saleAttrName"
            v-for="(attr, index) in saleAttrList"
            :key="attr.id"
          >
            <el-select v-model="attr.idAndName" placeholder="请选择">
              <el-option
                v-for="(attrValue, index) in attr.spuSaleAttrValueList"
                :key="attrValue.id"
                :label="attrValue.saleAttrValueName"
                :value="`${attr.id}:${attrValue.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          style="width: 100%"
          border
          :data="imageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            label="label"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" alt="" style="width: 50px; height: 50px" />
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column
          ><el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                size="mini"
                v-if="row.isDefault == 1"
                @click="changeDefaultImg(row)"
                >设为默认</el-button
              >
              <el-button size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancer">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Row } from "element-ui";
export default {
  name: "SkuForm",
  data() {
    return {
      // 提交的数据
      skuInfo: {
        category3Id: "",
        spuId: "",
        tmId: "",
        price: "",
        weight: 0,
        skuName: "",
        skuDesc: "",
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        skuDefaultImg: "",
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   isDefault: "",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
      },
      attrInfoList: [],
      saleAttrList: [],
      imageList: [],
      checkedImgList: [],
      spu: {},
    };
  },
  methods: {
    // 取消
    cancer() {
      this.$emit("showTable", 0);
      Object.assign(this._data, this.$options.data());
    },
    //获取数据
    async getData(category1Id, category2Id, spu) {
      this.spu = spu;
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      let result1 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result1.code == 200) {
        this.attrInfoList = result1.data;
      }
      let result2 = await this.$API.spu.reqSaleAttrList(spu.id);
      if (result2.code == 200) {
        this.saleAttrList = result2.data;
      }
      let result3 = await this.$API.spu.reqImageList(spu.id);
      if (result3.code == 200) {
        let list = result3.data;
        list.forEach((item) => {
          item.isDefault = 1;
        });
        this.imageList = list;
      }
    },
    // 改变默认图片
    changeDefaultImg(row) {
      this.imageList.forEach((item) => {
        item.isDefault = 1;
      });
      row.isDefault = 0;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 选择图片
    handleSelectionChange(params) {
      this.checkedImgList = params;
    },
    // 保存
    async save() {
      //  整理数据
      let { attrInfoList, saleAttrList, checkedImgList, skuInfo } = this;
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, current) => {
        if (current.attrIdAndvalue) {
          let [attrId, valueId] = current.attrIdAndvalue.split(":");
          prev.push({ attrId, valueId });
        }
        return prev;
      }, []);

      skuInfo.skuSaleAttrValueList = saleAttrList.reduce((prev, current) => {
        if (current.idAndName) {
          let [saleAttrId, saleAttrValueId] = current.idAndName.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      skuInfo.skuImageList = checkedImgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
        };
      });
      parseInt(skuInfo.weight);
      let result = await this.$API.spu.reqSaveSkuInfo(skuInfo);
      if (result.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        this.$emit("showTable", 0);
      }
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>