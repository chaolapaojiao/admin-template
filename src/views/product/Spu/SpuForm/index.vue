<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="spu名称">
        <el-input v-model="spu.spuName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择">
          <el-option
            v-for="(mark, index) in markList"
            :key="mark.id"
            :value="mark.id"
            :label="mark.tmName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input
          type="textarea"
          v-model="spu.description"
          placeholder="请输入"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="imageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="successUpdateImage"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="attrNAndV"
          :placeholder="`还有${unSeletctAttr}个未选择`"
        >
          <el-option
            :value="`${attr.id}:${attr.name}`"
            v-for="(attr, index) in unSeletctList"
            :key="attr.id"
            :label="attr.name"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrNAndV"
          @click="addAttr"
          >添加销售属性</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column type="index" label="序号" width="80" align="cneter">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="attrValue.id"
                v-for="(attrValue, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ attrValue.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.native.enter="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="300">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "SpuForm",
  data() {
    return {
      // 照片预览
      dialogVisible: false,
      dialogImageUrl: "",
      value: "",
      value2: "",
      // spu表单数据
      spu: {
        category3Id: 0,
        description: "",
        spuName: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuSaleAttrList: [],
        tmId: "",
      },
      unSeletctList: [],
      markList: [],
      imageList: [],
      attrList: [],
      inputVisible: false,
      inputValue: "",
      attrNAndV: "",
    };
  },
  methods: {
    // 获取spu基本信息
    async getSpu(spu) {
      let spuRsult = await this.$API.spu.reqSpu(spu.id);
      if (spuRsult.code == 200) {
        this.spu = spuRsult.data;
      }
      let markResult = await this.$API.spu.reqTradeMarkList();
      if (markResult.code == 200) {
        this.markList = markResult.data;
      }
      let imageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (imageResult.code == 200) {
        let list = imageResult.data;
        list.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.imageList = list;
      }
      let attrResult = await this.$API.spu.reqGetAttr();
      if (attrResult.code == 200) {
        this.attrList = attrResult.data;
      }
    },
    // 移除照片
    handleRemove(file, fileList) {
      this.imageList = fileList;
    },
    // 预览照片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 成功上传照片
    successUpdateImage(response, file, fileList) {
      this.imageList = fileList;
    },
    // 显示input
    showInput(row) {
      this.$set(row, "inputVisible", "true");
      this.$set(row, "inputValue", "");
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 关闭input
    handleInputConfirm(row) {
      // 对输入进行校验
      if (row.inputValue.trim() === "") {
        this.$message("输入不能为空");
        return;
      }
      let result = row.spuSaleAttrValueList.some((item) => {
        return item.inputValue == row.inputValue;
      });
      if (result) {
        this.$message("样式已存在");
        return;
      }
      let { baseSaleAttrId, inputValue } = row;
      let newSpuSaleAttrValueList = {
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      };
      row.spuSaleAttrValueList.push(newSpuSaleAttrValueList);
      row.inputVisible = false;
    },
    // 添加属性
    addAttr() {
      let [baseSaleAttrId, saleAttrName] = this.attrNAndV.split(":");
      let spuSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(spuSaleAttr);
      this.attrNAndV = "";
    },
    // 保存
    async saveSpu() {
      this.imageList.forEach((item) => {
        item.imgName = item.name;
        item.imgUrl = (item.response && item.response.data) || item.url;
        return;
      });
      this.spu.spuImageList = this.imageList;
      let result = await this.$API.spu.reqEditOrAddSpu(this.spu);
      if (result.code == 200) {
        this.$emit("showTable", 0);
        this.$message({ type: "success", message: "保存成功" });
      }
      Object.assign(this._data, this.$options.data());
    },
    // 添加spu
    async addSpu(category3Id) {
      this.spu.category3Id = category3Id;
      let markResult = await this.$API.spu.reqTradeMarkList();
      if (markResult.code == 200) {
        this.markList = markResult.data;
      }
      let attrResult = await this.$API.spu.reqGetAttr();
      if (attrResult.code == 200) {
        this.attrList = attrResult.data;
      }
    },
    // 取消
    cancel() {
      this.$emit("showTable", 0);
      Object.assign(this._data, this.$options.data());
    },
  },
  computed: {
    // 未选择的属性的数量
    unSeletctAttr() {
      this.unSeletctList = this.attrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item2) => {
          return item.name != item2.saleAttrName;
        });
      });
      return this.unSeletctList.length;
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>