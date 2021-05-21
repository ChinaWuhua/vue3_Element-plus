<template>
  <div class="user">
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
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
    </el-table>
  </div>
</template>

<script>
// import api from "@/api/user";
export default {
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  methods: {
    
  }
};
</script>

<style scoped>

</style>