<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 提示语句 -->
      <el-alert title="添加商品信息" type="info" :closable="false" center show-icon></el-alert>

      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品信息"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 表单 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRefs"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
      >
        <!-- Tabs栏 -->
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabsLeave"
          @tab-click="tabClicked"
        >
          <!-- 商品基本信息 -->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品分类" prop>
              <el-cascader
                :options="cateList"
                :props="cateProps"
                v-model="addForm.goods_cat"
                @change="handleChange"
                expand-trigger="hover"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>

          <!-- 商品动态参数 -->
          <el-tab-pane label="商品参数" name="1">
            <el-form-item v-for="item in manyTableDate" :label="item.attr_name" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>

          <!-- 商品静态属性 -->
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="item in onlyTableDate" :label="item.attr_name" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>

          <!-- 上传图片 -->
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="http://127.0.0.1:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headersObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>

          <!-- 商品内容 -->
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>

            <el-button type="primary" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览对话框 -->
    <el-dialog title="图片预览" :visible.sync="previewDialogVisible" width="50%">
      <img :src="previewPath" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  data() {
    return {
      activeIndex: "0",

      //添加表单对象
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: "",
        attrs: []
      },
      //表单验证规则
      addFormRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ]
      },

      //分类列表数据
      cateList: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      //动态参数列表
      manyTableDate: [],
      //静态属性列表
      onlyTableDate: [],
      //图片上传组件headers请求头部
      headersObj: {
        Authorization: window.sessionStorage.getItem("token")
      },
      //图片预览路径
      previewPath: "",
      previewDialogVisible: false
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get(`categories`);

      if (res.meta.status !== 200)
        return this.$message.error("获取分类列表数据失败");

      this.cateList = res.data;
      console.log(this.cateList);
    },

    //级联选择器改变事件
    handleChange() {
      console.log(this.addForm.goods_cat);
    },

    beforeTabsLeave(activeName, oldActiveName) {
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请选择商品分类");
        return false;
      }
      return true;
    },
    //tabs点击触发事件
    async tabClicked() {
      //访问动态参数面板
      if (this.activeIndex === "1") {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: "many" }
          }
        );

        if (res.meta.status !== 200)
          return this.$message.error("获取动态参数失败");

        res.data.forEach(item => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ");
        });

        console.log(res.data);

        this.manyTableDate = res.data;
      } else if (this.activeIndex === "2") {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: { sel: "only" }
          }
        );

        if (res.meta.status !== 200)
          return this.$message.error("获取动态参数失败");

        console.log(res.data);

        this.onlyTableDate = res.data;
      }
    },

    //图片预览
    handlePreview(file) {
      this.previewPath = file.response.data.url;
      this.previewDialogVisible = true;
    },
    //移除图片
    handleRemove(file) {
      const filePath = file.response.data.tmp_path;
      const index = this.addForm.pics.findIndex(x => x.pic === filePath);
      this.addForm.pics.splice(index, 1);
      console.log(this.addForm);
    },
    //监听图片上传成功事件
    handleSuccess(response) {
      const picInfo = { pic: response.data.tmp_path };
      this.addForm.pics.push(picInfo);
      console.log(this.addForm);
    },

    //添加商品事件
    addGoods() {
      this.$refs.addFormRefs.validate(async valid => {
        if (!valid) return this.$message.error("请填写必要的表单项");
        //深拷贝addForm
        const form = _.cloneDeep(this.addForm);
        form.goods_cat = form.goods_cat.join(",");

        //动态参数处理
        this.manyTableDate.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_vals: item.attr_vals };
          this.addForm.attrs.push(newInfo);
        });
        //静态属性处理
        this.onlyTableDate.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_vals: item.attr_vals };
          this.addForm.attrs.push(newInfo);
        });
        form.attrs = this.addForm.attrs;

        //发起请求
        const { data: res } = await this.$http.post(`goods`, form);

        if (res.meta.status !== 201) return this.$message.error("添加商品失败");

        this.$message.success("添加商品成功");
        this.$router.push("/goods");
      });
    }
  },
  computed: {
    cateId() {
      if (this.addForm.goods_cat.length === 3) return this.addForm.goods_cat[2];
      return null;
    }
  }
};
</script>

<style lang="less" scoped>
.previeImg {
  width: 100%;
}
.el-button {
  margin-top: 15px;
}
</style>