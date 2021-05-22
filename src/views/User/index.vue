<template>
  <div class="user">
    <!--搜索-->
    <search-form 
      :search-items="searchItems" 
      :label-width="66"
      :disabled="loading"
      @search="onSearch" />
    <!--表格-->
    <div style="margin-top: 30px;" v-loading="loading">
      <div>
        <el-button icon="el-icon-plus" type="primary" @click="() => {$router.push('/user/add')}">新增用户</el-button>
      </div>
      <el-table
        empty-text="暂无数据"
        :data="tableData"
        border
        style="width: 100%; margin-top: 10px;">
        <el-table-column
          type="index"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="Username"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="Password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="Name"
          label="真实姓名">
        </el-table-column>
        <el-table-column
          prop="Email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="Phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="Role"
          label="角色">
        </el-table-column>
        <el-table-column
          fixed="right"
          width="220"
          label="操作">
          <template #default="scope">
            <el-button type="text" icon="el-icon-view" @click="toDetail('view', scope.row)">查看</el-button>
            <el-button type="text" icon="el-icon-edit" @click="toDetail('edit', scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" @click="dropUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--翻页-->
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    
  </div>
</template>

<script>
import api from "@/api/user";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      // 查询表单
      searchItems: [
        {name: 'Username', label: '用户名'}, 
        {name: 'Name', label: '真实姓名'}, 
        {name: 'Email', label: '邮箱'}, 
        {name: 'Phone', label: '电话'}, 
        {name: 'Role', label: '角色', type: 'select', dicData: [
          {label: '管理员', value: '1'}
        ]}
      ],
      searchFrom: {},
      total: 10,
      pageSize: 10,
      currentPage: 1
    };
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    dropUser(row) {
      let that = this
      that
        .$confirm('删除后不可恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          that.loading = true
          api
            .userDelete(
              row.Username
            )
            .then(res => {
              that.loading = false
              that.$message({
                message: res.msg,
                type: "success"
              })
              that.onSearch()
            })
            .catch(err => {
              that.loading = false
              that.$message({
                message: err.msg,
                type: "warning"
              })
            })
        })
    },
    toDetail(mode, row) {
      this.$router.push({
        name: 'user-add',
        params: { mode, row }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.onSearch()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.onSearch()
    },
    onSearch(form) {
      this.searchFrom = form
      if (form) {this.currentPage = 1}
      this.loading = true
      api
        .getUsetlist({
          ...this.searchFrom,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        })
        .then(res => {
          this.loading = false
          this.tableData = res?.data?.users || []
          this.total = res?.data?.users.length || 0
        })
        .catch(err => {
          this.loading = false
          this.$message({
            message: err.msg,
            type: "warning"
          })
        })
    }
  }
};
</script>

<style scoped>
  .pagination{
    margin-top: 12px;
    text-align: right;
  }
</style>