<template>
  <div class="units">
    <div style="margin-bottom: 12px;">
      <el-button type="primary" icon="el-icon-plus">新增</el-button>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%; max-width: 500px;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="text"
        label="计量单位">
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
// import api from "@/api/backup";

export default {
  data() {
    return {
      tableData: [
        {text: '吨', id: 'measure-001', value: 'measurement-001'},
        {text: '件', id: 'measure-002', value: 'measurement-002'},
        {text: '台', id: 'measure-003', value: 'measurement-003'},
        {text: '个', id: 'measure-004', value: 'measurement-004'},
        {text: '包', id: 'measure-005', value: 'measurement-005'},
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