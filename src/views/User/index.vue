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
          prop="Id"
          label="ID"
          min-width="200">
        </el-table-column>
        <!-- <el-table-column
          prop="Password"
          label="密码">
        </el-table-column> -->
        <el-table-column
          prop="Name"
          label="真实姓名">
        </el-table-column>
        <el-table-column
          prop="Status"
          label="账号状态">
          <template #default="scope">
            <el-tag 
              :type="statusListStyle[scope.row.Status]">
              {{ statusList[scope.row.Status] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="Email"
          label="邮箱"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="Phone"
          label="电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="Role"
          min-width="100"
          label="权限">
          <template #default="scope">
            <template v-if="scope.row.Name === 'admin'">
              <el-tag type="success">超级管理员</el-tag>
            </template>
            <template v-else>
              <el-tag 
                v-for="item in scope.row.Role" 
                :key="item.name">
                {{item.label}}
              </el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="90"
          label="操作">
          <template #default="scope">
            <template v-if="scope.row.Name === 'admin'">
              超级管理员
            </template>
            <template v-else>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-button type="text">操作选项<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <el-button type="text" icon="el-icon-view" @click="toDetail('view', scope.row)">查看</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="text" icon="el-icon-edit" @click="toDetail('edit', scope.row)">编辑</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button type="text" icon="el-icon-refresh">重置密码</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button v-if="Username != scope.row.Username" type="text" icon="el-icon-delete" @click="dropUser(scope.row)">删除</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!--翻页-->
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
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
  computed: {
    Username() {
      return this.$store.state.userInfo.user.Username
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      statusList: ['停用', '正常'],
      statusListStyle: ['info', 'success'],
      // 查询表单
      searchItems: [
        {name: 'Username', label: '用户名'}, 
        {name: 'Name', label: '真实姓名'}, 
        {name: 'Email', label: '邮箱'}, 
        {name: 'Phone', label: '电话'},
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
      let data = JSON.stringify(row)
      this.$router.push({
        name: 'user-add',
        params: { mode, data }
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