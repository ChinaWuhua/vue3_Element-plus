<template>
  <div class="GoodsSuit-detail">
    <h3>{{ $route?.params?.data ? '修改套装' : '新增套装' }}</h3>
    <el-divider></el-divider>
    <div style="max-width: 400px;" v-loading="loading">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="套装名称" prop="ProductTogetherName">
          <el-input v-model="form.ProductTogetherName" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
    </div>
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
      tableData: [],
      form: {
        ProductTogetherName: '',
        Products: [],
      }
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