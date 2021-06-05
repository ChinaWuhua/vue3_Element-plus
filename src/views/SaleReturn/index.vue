<template>
  <div class="units">
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
        prop="returnDate"
        label="退货日期">
      </el-table-column>
      <el-table-column
        prop="saleStatu"
        label="单据状态">
      </el-table-column>
      <el-table-column
        prop="returnMsg"
        label="退货备注">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额">
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
        width="100">
        <template #default="scope">
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
        {id: 'test-001', returnMsg: '七天无理由退货', saleNumber: 'test-001', saleDate: '2021-06-06', returnDate: '2021-06-12', saleStatu: '已退货', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-002', returnMsg: '商品瑕疵', saleNumber: 'test-001', saleDate: '2021-06-06', returnDate: '2021-06-12', saleStatu: '已退货', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-003', returnMsg: '七天无理由退货', saleNumber: 'test-001', saleDate: '2021-06-06', returnDate: '2021-06-12', saleStatu: '待仓库验收', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-004', returnMsg: '商品损坏', saleNumber: 'test-001', saleDate: '2021-06-06', returnDate: '2021-06-12', saleStatu: '待仓库验收', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-005', returnMsg: '七天无理由退货', saleNumber: 'test-001', saleDate: '2021-06-06', returnDate: '2021-06-12', saleStatu: '拒绝退货', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
        {id: 'test-006', returnMsg: '七天无理由退货', saleNumber: 'test-001', saleDate: '2021-06-06', returnDate: '2021-06-12', saleStatu: '已退货', price: 13548, goodsname: 'iPhone 12 128G', handler: '张三'},
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