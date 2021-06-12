<template>
  <div class="goodlist">
    <div class="tools">
      <div class="treeChose">
        <el-input v-model="ProductTypeName" readonly></el-input>
        <tree-input @tree-chose="treeChose" text="按品类查找" />
        <el-button @click="clear" style="margin-left: 6px;">清空</el-button>
        <el-button :disabled="loading" icon="el-icon-refresh" @click="getList" style="margin-left: 6px;">刷新数据</el-button>
      </div>
    </div>
    <el-table
      v-loading="loading"
      border
      height="300"
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
        width="150">
      </el-table-column>
      <el-table-column
        prop="ProductTypeName"
        label="品类"
        width="120">
      </el-table-column>
      <el-table-column
        prop="Uuid"
        label="uuid"
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
        label="选择"
        width="80"
        fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="chosed(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "@/api/Goodslist";
import treeInput from '@/components/TreeInput/index'

export default {
  components: { treeInput },
  data() {
    return {
      tableData: [],
      loading: false,
      CurrentPage: 1,
      PageSize: 10,
      ProductTypeId: '',
      ProductTypeName: '',
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    chosed(row) {
      this.$emit('choseGoods', row)
    },
    clear() {
      this.ProductTypeName = ''
      this.ProductTypeId = ''
      this.getList()
    },
    treeChose(data) {
      this.ProductTypeName = data.Name
      this.ProductTypeId = data.Uuid
      this.getList()
    },
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
  }
};
</script>


<style scoped>
  .tools {
    display: flex;
    align-items: center;
    margin: 0 0 12px 0;
  }
  .treeChose {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 12px;
  }
</style>