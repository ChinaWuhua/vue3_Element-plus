<template>
  <div class="GoodsSuit">
    <div style="margin-bottom: 12px;">
      <el-button type="primary" icon="el-icon-plus">新增套装</el-button>
    </div>
    <el-table
      border
      v-loading="loading"
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="ProductTogetherName"
        label="套装名称">
      </el-table-column>
      <el-table-column
        prop="Products"
        label="套装内商品">
      </el-table-column>
      <el-table-column
        prop="ProductName"
        label="套装商品名称">
      </el-table-column>
      <el-table-column
        prop="Quantity"
        label="商品数量">
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope)">修改</el-button>
          <el-button type="danger" @click="remove(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/GoodsSuit";

export default {
  data() {
    return {
      loading: false,
      CurrentPage: 1,
      PageSize: 10,
      tableData: []
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    edit(scope) {
      console.log(scope)
    },
    remove(scope) {
      console.log(scope)
    },
    getList() {
      let { CurrentPage, PageSize } = this
      this.loading = true
      api
        .getList({
          CurrentPage, PageSize
        })
        .then(res => {
          this.loading = false
          this.tableData = res?.data?.product_togethers || []
        })
        .catch(err => {
          this.loading = false
          console.log('-----fail----', err)
        })
    },
  }
};
</script>


<style scoped>

</style>