<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索文本框 -->
      <el-row :gutter="1">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 商品列表表格 -->
      <el-table row-key='id' :data="goodsList" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" :width="700"></el-table-column>
        <el-table-column prop="goods_price" label="价格"></el-table-column>
        <el-table-column prop="goods_weight" label="重量"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160">
          <template slot-scope="scope">{{scope.row.add_time | dateFormat}}</template>
        </el-table-column>

        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeGoodsById(scope.row.goods_id)"></el-button>

          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      //商品列表查询条件
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    //获取商品列表
    async getGoodsList() {
      const { data: res } = await this.$http.get(`goods`, {
        params: this.queryInfo
      });

      if (res.meta.status !== 200)
        return this.$message.error("获取商品列表失败");

      this.goodsList = res.data.goods;
      this.total = res.data.total;

      console.log(this.goodsList);
    },

    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },

    //删除商品
    removeGoodsById(id){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const {data:res} = await this.$http.delete(`goods/`+id);
          if(res.meta.status !== 200) return this.$message.error("删除失败");
          this.getGoodsList();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    //跳转至添加商品页面
    goAddPage(){
      this.$router.push('/goods/add')
      
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-pagination {
  float: left;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>