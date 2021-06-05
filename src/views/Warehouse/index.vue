<template>
  <div class="units">
    <div style="margin-bottom: 12px;">
      <el-button type="primary" icon="el-icon-plus">新增仓库</el-button>
    </div>
    <el-table
      border
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="text"
        label="仓库名称">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="handler"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等级">
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
        {text: '广州一号仓库', type: '普通', level: '普通', handler: '张三', addr: '广州市天河区珠江新城华利路15号', id: 'measure-001', value: 'measurement-001'},
        {text: '华南仓库', type: '普通', level: '普通', handler: '张三', addr: '广州市天河区珠江新城华利路15号', id: 'measure-002', value: 'measurement-002'},
        {text: '上海仓库', type: '普通', level: '普通', handler: '张三', addr: '广州市天河区珠江新城华利路15号', id: 'measure-003', value: 'measurement-003'},
        {text: '北京一号仓', type: '普通', level: '普通', handler: '张三', addr: '广州市天河区珠江新城华利路15号', id: 'measure-004', value: 'measurement-004'},
        {text: '自营仓库', type: '普通', level: '普通', handler: '张三', addr: '广州市天河区珠江新城华利路15号', id: 'measure-005', value: 'measurement-005'},
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