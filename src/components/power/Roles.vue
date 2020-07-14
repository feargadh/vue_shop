<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddDialog">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表 -->
      <el-table row-key='id' :data="roleList" stripe border>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom',i1===0 ? 'bdtop':'','vcenter']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <li class="el-icon-caret-right"></li>
              </el-col>

              <!-- 渲染二级三级权限 -->
              <el-col :span="19">
                <!-- 嵌套For循环渲染二级权限 -->
                <el-row
                  :class="[i2 === 0 ? '':'bdtop','vcenter']"
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <li class="el-icon-caret-right"></li>
                  </el-col>
                  <!-- 三级权限渲染 -->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3) in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" prop="id">
          <template slot-scope="scope">
            <el-button type="primary" @click="showEditDialog(scope.row.id)" min>编辑</el-button>
            <el-button type="danger" @click="deleteRoleById(scope.row.id)" min>删除</el-button>
            <el-button type="warning" @click="showSetRightsDialog(scope.row)" min>分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑角色信息对话框 -->
    <el-dialog
      title="编辑角色信息"
      :visible.sync="editDialogVisible"
      width="60%"
      @close="editDialogClose"
    >
      <!-- 编辑角色信息表单 -->
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色信息对话框 -->
    <el-dialog title="添加角色信息" :visible.sync="addDialogVisible" width="60%" @close="addDialogClose">
      <!-- 添加角色信息表单 -->
      <el-form
        :model="addForm"
        :rules="editFormRules"
        ref="addFormRef"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色权限对话框 -->
    <el-dialog title="分配角色权限" :visible.sync="setDialogVisible" width="60%" @close="setDialogClose">
      <!-- 树形控件 -->
      <el-tree
        :data="rightList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>

      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="setDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRoleRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],

      //编辑角色对话框显示标记
      editDialogVisible: false,
      //编辑角色表单数据
      editForm: {},
      //编辑角色表单验证规则
      editFormRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      },

      //添加角色对话框显示标记
      addDialogVisible: false,
      //添加角色表单数据
      addForm: {
        roleName: "",
        roleDesc: ""
      },

      //分配角色权限对话框显示标记
      setDialogVisible: false,
      //权限列表
      rightList: [],
      //树形控件属性绑定对象
      treeProps: {
        label: "authName",
        children: "children"
      },
      //默认选中权限Id
      defKeys: [],
      //当前分配权限的角色id
      allotRoleId:''
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200)
        return this.$message.error("获取角色列表失败");
      this.roleList = res.data;
    },

    //显示编辑角色对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("roles/" + id);
      if (res.meta.status !== 200)
        return this.$message.error("获取角色信息失败!");
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    //监听编辑角色对话框关闭事件
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    //提交编辑角色表单事件
    editRoleInfo() {
      this.$refs.editFormRef.validate(async vaild => {
        if (!vaild) return;
        const { data: res } = await this.$http.put(
          "roles/" + this.editForm.roleId,
          {
            roleName: this.editForm.roleName,
            roleDesc: this.editForm.roleDesc
          }
        );
        if (res.meta.status !== 200) return this.$message.error("修改失败！");
        this.$message.success("修改成功！");
        this.editDialogVisible = false;
        this.getRoleList();
      });
    },

    //显示添加角色对话框
    showAddDialog() {
      this.addDialogVisible = true;
    },
    //监听添加角色对话框关闭事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    //提交添加角色表单
    addRoleInfo() {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return;
        const { data: res } = await this.$http.post("roles", this.addForm);
        if (res.meta.status !== 201)
          return this.$message.error("添加角色失败！");
        this.$message.success("添加角色成功！");
        this.getRoleList();
        this.addDialogVisible = false;
      });
    },

    //删除角色确认框
    deleteRoleById(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("roles/" + id);
          if (res.meta.status !== 200)
            return this.$message.error("删除角色失败!");
          this.getRoleList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //删除权限确认框
    removeRightById(role, rightId) {
      this.$confirm("此操作将删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "roles/" + role.id + "/rights/" + rightId
          );
          if (res.meta.status !== 200)
            return this.$message.error("删除权限失败!");
          role.children = res.data;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //显示分配角色权限对话框
    async showSetRightsDialog(role) {
      const { data: res } = await this.$http.get("rights/tree");
      if (res.meta.status != 200)
        return this.$message.error("获取权限列表失败！");
      this.rightList = res.data;
      this.allotRoleId = role.id
      this.getLeafKeys(role,this.defKeys);
      this.setDialogVisible = true;
    },
    //递归获取角色下所有三级权限id
    getLeafKeys(node,arr){
      //如果当前node没有children节点，则为三级权限
      if(!node.children) return arr.push(node.id);

      node.children.forEach(item => this.getLeafKeys(item,arr));
    },
    //监听分配角色对话框关闭事件
    setDialogClose(){
      this.defKeys = [];
    },
    //分配角色权限
    async allotRoleRights(){
      const keys=[
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.join(',');

      const {data : res } = await this.$http.post('roles/'+this.allotRoleId+'/rights',{rids:idStr});

      if(res.meta.status !== 200) return this.$message.error("分配角色权限失败");
      this.$message.success("分配角色权限成功");
      this.getRoleList();
      this.setDialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.el-row {
  text-align: left;
}
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid rgb(233, 233, 233);
}
.bdbottom {
  border-bottom: 1px solid rgb(233, 233, 233);
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>