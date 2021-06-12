<template>
  <div class="GoodsSuit">
    <div style="margin-bottom: 12px;">
      <el-button type="primary" icon="el-icon-plus" @click="add">新增套装</el-button>
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
        label="套装名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Products"
        label="套装内商品"
        width="300">
        <template #default="scope">
          <div style="margin: -6px 0 0 -6px;">
            <el-tag 
              style="margin: 6px 0 0 6px;"
              type="primary" 
              v-for="(item, index) in scope.row.Products"
              :key="'goods-' + index">
              {{item.ProductName}} * {{item.Quantity}}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="Price1"
        label="价格1">
      </el-table-column>
      <el-table-column
        prop="Price2"
        label="价格2">
      </el-table-column>
      <el-table-column
        prop="Price3"
        label="价格3">
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
    add() {
      this.$router.push('/goodsSuit/add')
    },
    edit(scope) {
      this.$router.push({
        name: 'goodsSuit-add',
        params: {
          mode: 'edit',
          data: JSON.stringify(scope.row)
        }
      })
    },
    remove(scope) {
      this
        .$confirm(`将删除【${scope.row.ProductTogetherName}】并且不可恢复, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.loading = true
          api
            .delete({Uuid: scope.row.Uuid})
            .then(res => {
              this.loading = false
              if (res.status === 200) {
                this.$message.success(res.msg)
                this.getList()
              } else {
                this.$message.error(res.msg)
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error(err.msg)
            })
        })
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