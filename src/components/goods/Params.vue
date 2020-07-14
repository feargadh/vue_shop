<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 头部警告区域 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon></el-alert>

      <!-- 选择商品分类区域 -->
      <el-row>
        <el-col :span="8">
          <span>选择商品分类：</span>
          <!-- 级联选择框 -->
          <el-cascader
            v-model="selectCateKeys"
            :options="cateList"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>

      <!-- 标签页区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数按钮 -->
          <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="showAddDialog">添加参数</el-button>
          <!-- 动态参数列表 -->
          <el-table row-key='id' :data="manyTableData" border>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染已有标签 -->
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="handleClosed(i,scope.row)">{{item}}</el-tag>
                <!-- 添加新标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <!-- 添加按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>

            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 静态属性 -->
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加属性按钮 -->
          <el-button type="primary" size="mini" :disabled="isBtnDisable" @click="showAddDialog">添加属性</el-button>

          <!-- 静态参数列表 -->
          <el-table :data="onlyTableData" border>
            <!-- 展开列 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable @close="handleClosed(i,scope.row)">{{item}}</el-tag>

                <!-- 添加新标签 -->
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                ></el-input>
                <!-- 添加按钮 -->
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                >+ New Tag</el-button>
              </template>
            </el-table-column>

            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                >编辑</el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row.attr_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加动态参数/静态属性对话框 -->
    <el-dialog
      :title="addTitleText"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 表单区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="addFormNameLabel" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改动态参数/静态属性对话框 -->
    <el-dialog
      :title="addTitleText"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 表单区域 -->
      <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="addFormNameLabel" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //分类列表
      cateList: [],
      //级联选择框配置
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      selectCateKeys: [],
      //标签页选择区域
      activeName: "many",

      //动态参数数据
      manyTableData: [],
      //静态属性数据
      onlyTableData: [],

      //添加对话框显示标记
      addDialogVisible: false,
      addForm: {
        attr_name: ""
      },
      addFormRules: {
        attr_name: [
          {
            required: true,
            message: `参数名称不能为空`,
            trigger: "blur"
          }
        ]
      },

      //修改对话框
      editDialogVisible: false,
      editForm: [],

      inputVisible: false,
      inputValue: ""
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    //获取分类列表
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 3 }
      });
      if (res.meta.status !== 200)
        return this.$message.error("获取分类列表失败");
      this.cateList = res.data;
      console.log(this.cateList);
    },

    //监听级联选择框改变事件
    handleChange() {
      if (this.selectCateKeys.length !== 3) {
        this.selectCateKeys = [];
        return;
      }

      this.getParamsList();
    },

    //Tabs区域点击事件
    handleTabClick() {
      this.getParamsList();
    },

    //获取参数列表数据
    async getParamsList() {
      //根据cateId和activeName获取动态参数或静态属性
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes`,
        {
          params: { sel: this.activeName }
        }
      );

      if (res.meta.status !== 200)
        return this.$message.error("获取动态参数/静态属性失败");

      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];

        //控制文本框的显示与隐藏
        item.inputVisible = false;
        item.inputValue = "";
      });

      console.log(res.data);

      if (this.activeName === "many") {
        this.manyTableData = res.data;
        this.onlyTableData = [];
      } else {
        this.manyTableData = [];
        this.onlyTableData = res.data;
      }
    },

    //显示添加对话框
    showAddDialog() {
      this.addDialogVisible = true;
    },
    //添加对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    //添加参数属性事件
    addParams() {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return;

        const { data: res } = await this.$http.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName
          }
        );

        if (res.meta.status !== 201)
          return this.$message.error(this.addTitleText + "失败");

        this.$message.success(this.addTitleText + "成功");
        this.getParamsList();
        this.addDialogVisible = false;
      });
    },

    //显示编辑对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes/${id}`,
        {
          params: { sel: this.activeName }
        }
      );

      if (res.meta.status !== 200) return this.$message.error("获取参数失败");

      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    //关闭编辑对话框
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
      this.editForm = {};
    },
    //编辑参数事件
    editParams() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;

        const { data: res } = await this.$http.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName
          }
        );

        if (res.meta.status !== 200) return this.$message.error("编辑参数失败");

        this.$message.success("编辑参数成功");
        this.getParamsList();
        this.editDialogVisible = false;
      });
    },

    //删除参数对话框
    removeParams(id) {
      this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `categories/${this.cateId}/attributes/${id}`
          );
          if (res.meta.status !== 200)
            return this.$message.error("删除参数失败");

          this.$message({
            type: "success",
            message: "删除成功!"
          });

          this.getParamsList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //新标签添加文本框监测：当失去焦点或松开Enter时触发
    handleInputConfirm(row) {
      //判断用户是否输入了有效值
      if (row.inputValue.trim().length === 0) {
        row.inputValue = "";
        row.inputVisible = false;
        return;
      }

      row.attr_vals.push(row.inputValue.trim());
      row.inputValue = "";
      row.inputVisible = false;

      this.saveAttrVals(row);
    },
    //保存参数修改
    async saveAttrVals(row){
      const {data:res} = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,{
        attr_name:row.attr_name,
        attr_sel:row.attr_sel,
        attr_vals:row.attr_vals.join(' ')
      });

      if(res.meta.status !== 200) return this.$message.error("添加参数失败");

      this.$message.success("修改参数成功")
    },
    //展示输入框
    showInput(tag) {
      tag.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //删除参数
    handleClosed(i,row){
      row.attr_vals.splice(i,1);
      this.saveAttrVals(row);
    }
  },
  computed: {
    //计算添加按钮是否处于禁止状态
    isBtnDisable() {
      if (this.selectCateKeys.length !== 3) return true;
      return false;
    },

    //返回选中分类id
    cateId() {
      if (this.selectCateKeys.length === 3) {
        return this.selectCateKeys[2];
      }
      return null;
    },

    //动态计算添加对话框标题
    addTitleText() {
      if (this.activeName === "many") {
        return "添加动态参数";
      } else {
        return "添加静态属性";
      }
    },
    addFormNameLabel() {
      if (this.activeName === "many") {
        return "参数名称";
      } else {
        return "属性名称";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 15px;
  text-align: left;
}
.el-tabs {
  margin-top: 15px;
}
.el-tab-pane {
  text-align: left;
}
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>