<template>
  <div class="units">
    <div style="margin-bottom: 12px;">
      <el-button type="primary" icon="el-icon-plus">销售开单</el-button>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="saleNumber"
        label="销售单号">
      </el-table-column>
      <el-table-column
        prop="saleDate"
        label="销售日期">
      </el-table-column>
      <el-table-column
        prop="saleStatu"
        label="单据状态">
      </el-table-column>
      <el-table-column
        prop="金额"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="handler"
        label="销售人">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template #default="scope">
          <el-button type="danger" @click="edit(scope)">退货</el-button>
          <el-button type="primary" @click="edit(scope)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import api from "@/api/backup";

export default {
  data() {
    return {
      tableData: [
        {id: 'test-001', saleNumber: 'test-001', saleDate: '2021-06-06', saleStatu: '正常', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-002', saleNumber: 'test-001', saleDate: '2021-06-06', saleStatu: '已退货', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-003', saleNumber: 'test-001', saleDate: '2021-06-06', saleStatu: '正常', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-004', saleNumber: 'test-001', saleDate: '2021-06-06', saleStatu: '待发货', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-005', saleNumber: 'test-001', saleDate: '2021-06-06', saleStatu: '正常', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-006', saleNumber: 'test-001', saleDate: '2021-06-06', saleStatu: '正常', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
      ]
    };
  },
  methods: {
    edit(scope) {
      console.log(scope)
    },
    remove(scope) {
      console.log(scope)
    }
  }
};
</script>


<style scoped>

</style>