<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单列表表格 -->
      <el-table row-key='id' :data="orderList" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price" width="100"></el-table-column>

        <el-table-column label="订单付款" prop="pay_status" width="100">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="是否发货" prop="is_send" width="100"></el-table-column>

        <el-table-column label="下单时间" prop="create_time" width="160">
          <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
        </el-table-column>

        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="修改订单地址" placement="top">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="查看物流信息" placement="top">
              <el-button
                type="success"
                size="mini"
                icon="el-icon-location-outline"
                @click="showProgressDialog"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 编辑地址对话框 -->
    <el-dialog title="编辑地址" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRefs" label-width="100">
        <!-- 级联选择器 -->
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="citydata"
            v-model="editForm.address1"
            @change="changeProvince"
            :props="{ expandTrigger: 'hover' }"
            change-on-select
          ></el-cascader>
        </el-form-item>

        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="editForm.address2" class="addr2Input"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流信息对话框 -->
    <el-dialog title="物流信息" :visible.sync="progressDialogVisible" width="50%">
      <el-timeline>
        <el-timeline-item
          v-for="(progress, index) in progressInfo"
          :type="index-1 === progressInfo.length ? 'primary':''"
          :key="index"
          :timestamp="progress.time"
          placement="top"
        >{{progress.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import citydata from "@/components/order/citydata";

export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],

      //编辑地址对话框显示标记
      editDialogVisible: false,
      editForm: {
        address1: [],
        address2: ""
      },
      editFormRules: {
        address1: [
          { required: true, message: "请选择省市区/县", trigger: "blur" }
        ],
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      //城市数据
      citydata: citydata,

      //物流信息对话框标记
      progressDialogVisible: false,
      progressInfo: []
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get(`orders`, {
        params: this.queryInfo
      });
      if (res.meta.status !== 200)
        return this.$message.error(`获取订单列表失败`);
      this.total = res.data.total;
      this.orderList = res.data.goods;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },

    //展示编辑地址对话框
    showEditDialog(row) {
      this.editDialogVisible = true;
    },
    //级联选择改变事件
    changeProvince() {},
    //编辑对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRefs.resetFields();
    },

    //展示物流信息对话框
    async showProgressDialog() {
      const { data: res } = await this.$http.get("kuaidi/1106975712662");
      if (res.meta.status !== 200)
        return this.$message.error("获取物流信息失败");

      this.progressInfo = res.data;
      console.log(this.progressInfo);
      this.progressDialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.addr2Input {
  width: 90%;
}
</style>