<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 用户搜索栏 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表 -->
      <el-table row-key='id' :data="userList" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除用户"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showsettRoleDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1,5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!--添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <!-- 对话框主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <!-- 主体区域 -->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%">
      <div class="setRoleMain">
        <p>当前用户：{{userInfo.username}}</p>
        <p>当前角色：{{userInfo.role_name}}</p>
        <p>
          分配新角色：
          <el-select v-model="roleId" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotUserRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //邮箱效验规则
    var checkemail = (rule, value, callback) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) return callback();

      callback(new Error("请输入合法邮箱"));
    };
    //电话效验规则
    var checkmobile = (rule, value, callback) => {
      const regMobile = /^0{0,1}(13[4-9]|15[7-9]|15[0-2]|18[7-8])[0-9]{8}$/;

      if (regMobile.test(value)) return callback();

      callback(new Error("请输入合法手机号码"));
    };

    return {
      //请求参数
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      userList: [],
      total: 0,
      //添加用户对话框显示标记
      addDialogVisible: false,
      //编辑用户对话框显示标记
      editDialogVisible: false,
      deleteDialogVisible: false,
      //添加用户表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //添加用户表单验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" }
        ]
      },
      //修改用户表单数据
      editForm: {},

      //分配用户角色对话框显示标记
      setRoleDialogVisible: false,
      //选中分配角色用户
      userInfo: [],
      roleList:[],
      //新角色Id
      roleId:''
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      });
      if (res.meta.status !== 200)
        return this.$message.error("获取用户列表失败" + res.meta);
      this.userList = res.data.users;
      this.total = res.data.total;
      console.log(res);
    },
    //监听pagesize改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听pagenum改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //改变用户状态
    async userStateChanged(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200)
        return this.$message.error("修改用户状态失败");
      this.$message.success("修改用户状态成功");
    },
    //监听添加用户对话框关闭事件
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    //添加用户事件
    addUser() {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return;
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) return this.$message.error("添加用户失败");
        this.$message.success("用户添加成功");
        this.addDialogVisible = false;
        this.getUserList();
      });
    },
    //展示编辑用户对话框
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200)
        return this.$message.error("获取用户信息失败");
      this.editForm = res.data;
      this.editDialogVisible = !this.editDialogVisible;
    },
    //监听修改用户对话框关闭事件
    editDialogClose() {
      this.$refs.editFormRef.resetFields();
    },
    //修改用户事件
    editUserInfo() {
      this.$refs.editFormRef.validate(async vaild => {
        if (!vaild) return;
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          }
        );
        if (res.meta.status !== 200) return this.$message.error("修改失败！");
        this.$message.success("修改成功！");
        this.editDialogVisible = false;
        this.getUserList();
      });
    },
    //弹窗询问用户是否进行删除选中数据
    deleteUserById(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("users/" + id);
          if (res.meta.status !== 200)
            return this.$message.error("删除用户失败！");
          this.getUserList();
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

    //显示分配用户角色对话框
    async showsettRoleDialog(user) {
      this.userInfo = user;
      
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200)
        return this.$message.error("获取角色列表失败");
      this.roleList = res.data;
      console.log(this.roleList);

      this.setRoleDialogVisible = true
    },
    //分配用户角色事件
    async allotUserRole(){
      const { data:res } = await this.$http.put(`users/${this.userInfo.id}/role`,{rid:this.roleId});

      if(res.meta.status !== 200) return this.$message.error('分配角色失败');

      this.$message.success('分配角色成功');
      this.getUserList();
      this.setRoleDialogVisible = false;
    }
    
    

  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 16px;
}
.el-pagination {
  margin-top: 15px;
}
.setRoleMain {
  text-align: left;
}
</style>