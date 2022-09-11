<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 20px"
      @click="showDialog"
      >添加</el-button
    >

    <!-- 表格组件：
      data:表格组件将要展示的数据
      border:给表格添加边框
      column属性
      label:显示标题
      width:对应列的宽度
      algin:标题的对齐方式
     -->
    <el-table :data="list" style="width: 100%" border>
      <el-table-column
        type="index"
        sprop=""
        label="序号"
        width="80px"
        align="cneter"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column label="品牌Logo" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 60px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="mini"
            @click="editTrade(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      分页器：当前第几页，数据总条数，每一页展示的数据数，连续页码数
      @size-change="handleSizeChange" 当分页器某一页需要展示的数据条数发生变化
      @current-change="handleCurrentChange" 改变当前页数返回当前页数

      current-page:代表当前在第几页
      total:数据条数
      page-size:每一页多少条数据
      page-sizes:设置每一页展示多少条数据
      layout:实现分页器布局
      pager-count:按钮数量
     -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next,jumper,->,sizes,total"
      @size-change="handleSizeChange"
      @current-change="getData"
    >
    </el-pagination>

    <!-- 对话框
      :visible.sync:控制对话框是否显示
    -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- form表单 -->
      <el-form :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            auto-complete="off"
            style="width: 500px"
            v-model="tmForm.tmName"
          ></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearFrom">取 消</el-button>
        <el-button type="primary" @click="addOrEditTrade">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    // 自定义校验规则
    var validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称2到10个字符"));
      }
      callback();
    };
    return {
      page: 1,
      limit: 3,
      list: [],
      total: 0,
      dialogFormVisible: false,
      imageUrl: "",
      // 添加品牌的数据
      tmForm: {
        logoUrl: "",
        tmName: "",
      },
      // 表单验证
      rules: {
        // 品牌名称的验证规则 required:是否必须 message:提示信息 trigger:用户行为设置
        // min:名称最小长度 max:最大长度
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          // { min: 2, max: 10, message: "2 到 10 个字符 ", trigger: "change" },
          // 自定义校验规则
          { validator: validateTmName, trigger: "change" },
        ],
        // 品牌logo的验证规则
        logoUrl: [
          { required: true, message: "请选择品牌LOGO", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    // 获取品牌数据
    async getData(pager = 1) {
      this.page = pager;
      let { page, limit } = this;
      let result = await this.$API.trademark.reqTradeInfo(page, limit);
      // console.log(result);
      if (result.code === 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    // 当分页器某一页需要展示的数据条数发生变化
    handleSizeChange(limit) {
      this.limit = limit;
      this.getData();
    },
    // 显示添加对话框
    showDialog() {
      this.dialogFormVisible = true;
      this.tmForm = { logoUrl: "", tmName: "" };
    },
    // 关闭对话框
    clearFrom() {
      this.dialogFormVisible = false;
    },
    // 照片上传成功
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = res.data;
    },
    // 照片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加或修改品牌的API
    async addOrEditTrade() {
      // 判断表单验证是否成功
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrEditTrade(this.tmForm);
          console.log(result);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: this.tmForm.id
                ? `修改品牌${this.tmForm.tmName}成功`
                : `添加品牌${this.tmForm.tmName}成功`,
            });
            this.getData(this.tmForm.id ? this.page : 1);
          }
        }
      });
    },
    //修改品牌
    editTrade(row) {
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
      // 调用API
    },
    // 删除品牌
    deleTradeMark(row) {
      this.$confirm(`此操作将永久${row.tmName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getData(this.list.length < 1 ? this.page - 1 : this.page);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
