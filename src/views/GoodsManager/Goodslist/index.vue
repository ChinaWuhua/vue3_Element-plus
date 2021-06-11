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
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="Uuid"
        label="Uuid">
      </el-table-column>
      <el-table-column
        prop="Price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="PriceOrigin"
        label="打折前价格">
      </el-table-column>
      <el-table-column
        prop="BrandName"
        label="品牌">
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