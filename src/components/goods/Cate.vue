<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加分类按钮 -->
      <el-row>
        <el-col :span="1">
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        :border="true"
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-error" v-if="scope.row.cat_deleted" style="color:red"></i>
          <i class="el-icon-success" v-else style="color:lightgreen"></i>
        </template>

        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini" v-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" size="mini" v-if="scope.row.cat_level === 2">三级</el-tag>
        </template>

        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row.cat_id)"
          >编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateVisible" width="50%" @close="addCateDialogClosed">
      <!-- 表单区域 -->
      <el-form
        :model="addCateForm"
        ref="addCateFormRef"
        label-width="100px"
        class="demo-ruleForm"
        :rules="addCateFormRules"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>

        <el-form-item label="父级分类">
          <el-cascader
            props.expandTrigger="hover"
            v-model="selectKeys"
            :options="parentsCateList"
            :props="cascaderProps"
            @change="parentsCateChanged"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editCateDialogVisible" width="50%" @close="editCateDialogClosed">
      <el-form
        :model="editCateForm"
        :rules="addCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //分类列表
      cateList: [],
      total: 0,

      columns: [
        { label: "分类名称", prop: "cat_name" },
        { label: "是否有效", type: "template", template: "isOk" },
        { label: "排序", type: "template", template: "order" },
        { label: "操作", type: "template", template: "opt" }
      ],

      //添加分类对话框显示标记
      addCateVisible: false,
      //添加分类表单
      addCateForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0
      },
      //添加分类表单验证规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      },

      //父级分类列表
      parentsCateList: [],
      //联级选择器配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover",
        checkStrictly: true
      },
      //选中父级分类id数组
      selectKeys: [],

      //编辑分类对话框显示标记
      editCateDialogVisible: false,
      editCateForm: {}
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200)
        return this.$message.error("获取分类列表失败");
      this.cateList = res.data.result;
      this.total = res.data.total;
      console.log(this.cateList);
    },

    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCateList();
    },

    //显示添加分类对话框标记
    showAddCateDialog() {
      this.getParentsCateList();
      this.addCateVisible = true;
    },

    //获取父级分类列表
    async getParentsCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 }
      });

      if (res.meta.status !== 200)
        return this.$message.error("获取父级分类失败");

      this.parentsCateList = res.data;
    },
    //监听父级分类选择改变
    parentsCateChanged() {
      if (this.selectKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectKeys[this.selectKeys.length - 1];
        this.addCateForm.cat_level = this.selectKeys.length;
        return;
      } else {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      }
    },
    //添加分类事件
    addCate() {
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "categories",
          this.addCateForm
        );
        if (res.meta.status !== 201) return this.$message.error("添加分类失败");
        this.$message.success("添加分类成功");
        this.addCateVisible = false;
        this.getCateList();
      });
    },

    //关闭添加分类对话框
    addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields();
      this.selectKeys = [];
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_pid = 0;
    },

    //显示编辑分类对话框
    async showEditDialog(cateId) {
      const { data: res } = await this.$http.get("categories/" + cateId);
      if (res.meta.status !== 200)
        return this.$message.error("获取分类信息失败");
      this.editCateForm = res.data;
      this.editCateDialogVisible = true;
    },
    editCateDialogClosed(){
      this.$refs.editCateFormRef.resetFields();
      this.editCateForm = {};
      
    },
    //编辑分类事件
    editCate(){
      this.$refs.editCateFormRef.validate(async valid =>{
        if(!valid) return;
        
        const {data : res } = await this.$http.put('categories/'+this.editCateForm.cat_id,{cat_name:this.editCateForm.cat_name});

        if(res.meta.status !== 200) return this.$message.error("修改分类失败");
        this.$message.success("修改分类成功");
        this.getCateList();
        this.editCateDialogVisible = false;
      })
    },

    //删除分类对话框
    removeCate(cat_id){
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data : res} = await this.$http.delete('categories/'+cat_id);
          if(res.meta.status !== 200 ) return this.$message.error("删除失败");
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getCateList();
          this.editCateDialogVisible = false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
};
</script>

<style lang="less" scoped>
.zk-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>