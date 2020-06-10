<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/logo.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域  -->
    <el-container>
      <!-- 侧边导航 -->
      <el-aside :width="isCollapse ? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse"> ||| </div>
        <!-- 菜单栏 -->
        <el-menu :unique-opened="true" background-color="rgb(82, 71, 160)" text-color="#fff" 
        active-text-color="rgb(12, 241, 50)" :collapse="isCollapse" :collapse-transition="false" 
        router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" 
            :key="subItem.id" @click="saveNavStats('/'+subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主题内容 -->
      <el-main>
        <!--路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return{
      //菜单数据
      menuList:[],
      iconsObj:{
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-danju',
        '102':'iconfont icon-shangpin',
        '145':'iconfont icon-baobiao',
      },
      //是否折叠
      isCollapse:false,
      //激活链接
      activePath:''
    }
  },
  created(){
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    //获取所有菜单
    async getMenuList(){
      const {data:res} = await this.$http.get('menus');
      if(res.meta.status !==200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
      console.log(res);
    },

    //切换菜单折叠展开
    toggleCollapse(){
      this.isCollapse=!this.isCollapse;
    },

    //保存链接激活状态
    saveNavStats(activePath){
      window.sessionStorage.setItem('activePath',activePath);
      this.activePath=activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: slateblue;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  color: snow;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    height: 60px;
    width: 60px;
  }
}

.el-aside {
  background-color: rgb(82, 71, 160);
  .el-menu{
    border-right: none;
    text-align: left;
  }
}

.el-main {
  background-color: rgb(219, 219, 219);
}

.iconfont{
  margin-right: 10px;
}

.toggle-button{
  background-color: rgb(48, 42, 95) ;
  font-size: 10px;
  line-height: 24px;
  color: snow;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>