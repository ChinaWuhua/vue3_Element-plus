<template>
  <div class="goodlist">
    <div style="margin-bottom: 12px;">
      <el-button type="primary" icon="el-icon-plus" @click="add">新增商品</el-button>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="ProductName"
        label="商品名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="Uuid"
        label="Uuid"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Price1"
        label="价格1"
        width="120">
      </el-table-column>
      <el-table-column
        prop="Price2"
        label="价格2"
        width="120">
      </el-table-column>
      <el-table-column
        prop="Price3"
        label="价格3"
        width="120">
      </el-table-column>
      <el-table-column
        prop="BrandName"
        label="品牌"
        width="120">
      </el-table-column>
      <el-table-column
        prop="OperationManual"
        label="操作手册链接"
        width="120">
        <template #default="scope">
          <a v-if="scope.row.OperationManual" :href="scope.row.OperationManual" target="_blank">点击打开</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="ProductFeature"
        label="产品特色链接"
        width="120">
        <template #default="scope">
          <a v-if="scope.row.ProductFeature" :href="scope.row.ProductFeature" target="_blank">点击打开</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="Specification"
        label="规格书链接"
        width="120">
        <template #default="scope">
          <a v-if="scope.row.Specification" :href="scope.row.Specification" target="_blank">点击打开</a>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
        fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope)">修改</el-button>
          <el-button type="danger" @click="remove(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/Goodslist";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      CurrentPage: 1,
      PageSize: 10,
      ProductTypeId: '',
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      let { CurrentPage, PageSize, ProductTypeId } = this
      this.loading = true
      api
        .getList({
          CurrentPage, PageSize, ProductTypeId
        })
        .then(res => {
          this.loading = false
          this.tableData = res?.data?.products || []
        })
        .catch(err => {
          this.loading = false
          console.log('-----fail----', err)
        })
    },
    add() {
      this.$router.push('/goodslist/add')
    },
    edit(scope) {
      this.$router.push({
        name: 'goodslist-add',
        params: {
          mode: 'edit',
          data: JSON.stringify(scope.row)
        }
      })
    },
    remove(scope) {
      this
        .$confirm(`将删除【${scope.row.ProductName}】并且不可恢复, 是否继续?`, '提示', {
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
    }
  }
};
</script>


<style scoped>

</style>