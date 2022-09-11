<template>
  <div>
    <Catergory @getCategoryId="getCategoryId" :show="!isShowTable" />
    <!-- 下部卡片区域 -->
    <el-card>
      <!-- 显示数据 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttr"
          style="margin-bottom: 10px"
          :disabled="!category3Id"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attr, index) in row.attrValueList"
                :key="attr.id"
                style="margin: 0 5px"
                >{{ attr.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="delteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性 -->
      <div v-show="!isShowTable">
        <el-form
          :inline="true"
          class="demo-form-inline"
          label-width="80px"
          :model="attrInfo"
        >
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <!-- 添加属性的表格 -->
        <el-table
          style="width: 100%; margin: 20px 0"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            prop="prop"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder=""
                size="mini"
                v-if="row.flag"
                @blur="outLook(row)"
                @keyup.native.enter="outLook(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="inEdit(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}?`"
                @onConfirm="deleteAttrValue(row, $index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          type="primary"
          @click="saveAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 属性数据
      attrList: [],
      isShowTable: true,
      // 添加|修改属性数据
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    // 获取三级选择的ID
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
        this.getAttrInfo();
      }
    },
    // 获取属性数据
    async getAttrInfo() {
      let { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrInfo(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code == 200) {
        this.attrList = result.data;
      }
    },
    // 删除属性
    async delteAttr(row) {
      let result = await this.$API.attr.reqDeleteAttr(row.id);
      if (result.code == 200) {
        this.$message({
          type: "success",
          message: `删除${row.attrName}成功`,
        });
        this.getAttrInfo();
      }
    },
    // 添加属性名
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    // 添加属性值
    addAttrValue(row) {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 编辑属性
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
    },
    // 隐藏input
    outLook(row) {
      if (row.valueName.trim() == "") {
        this.$message("请输入有效名称");
        return;
      }
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        this.$message("属性值重复");
        return;
      }
      row.flag = false;
    },
    // 显示input
    inEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除属性值
    deleteAttrValue(row, index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存修改和添加的属性值
    async saveAttr() {
      // 1.删除无用数据 2.删掉flag属性
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName != "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
        let result = await this.$API.attr.reqAddOrEditAttr(this.attrInfo);
        this.isShowTable = true;
        this.getAttrInfo();
        this.$message({ type: "success", message: "保存成功" });
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style>
</style>