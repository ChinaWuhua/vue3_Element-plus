<template>
  <div class="goodstype">
    <el-input
      placeholder="输入关键字进行过滤"
      clearable
      v-model="filterText">
    </el-input>

    <div style="margin-top: 20px;">
      <div style="margin-bottom: 10px;">
        <el-button type="primary" icon="el-icon-plus" @click="append()">增加根类型</el-button>
        <el-button icon="el-icon-check">保存变更</el-button>
      </div>
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree">
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                @click="append(data)">
                <i class="el-icon-plus"></i> 添加子品类
              </el-button>
              <el-button
                type="text"
                @click="remove(node, data)">
                <i class="el-icon-delete"></i> 删除该品类
              </el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </div>

    <el-dialog
      title="请输入品类名称"
      v-model="dialogVisible"
      width="300px"
      @closed="clearText">
      <el-input maxlength="10" v-model="handleText" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
// import api from "@/api/backup";

let id = 1000;

export default {
  data() {
    let data = [{
        id: 1,
        label: '手机',
        children: [{
          id: 4,
          label: 'iPhone',
          children: [{
            id: 9,
            label: 'iPhone 12'
          }, {
            id: 10,
            label: 'iPhone 12 Pro'
          }]
        }]
      }, {
        id: 2,
        label: '电脑',
        children: [{
          id: 5,
          label: '台式机'
        }, {
          id: 6,
          label: '笔记本电脑'
        }]
      }, {
        id: 3,
        label: '电脑配件',
        children: [{
          id: 7,
          label: '内存条'
        }, {
          id: 8,
          label: '主板'
        }]
      }]
    return {
      filterText: '',
      data: JSON.parse(JSON.stringify(data)),
      dialogVisible: false,
      handleText: '',
      activeNode: null,
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    clearText() {
      this.dialogVisible = false
      this.handleText = ''
      this.activeNode = null
    },
    append(data = null) {
      this.dialogVisible = true
      this.activeNode = data
    },
    confirm() {
      if (!this.handleText) {
        this.$message.warning('请输入品类名称')
        return
      }
      let data = this.activeNode
      const newChild = { id: id++, label: this.handleText, children: [] };
      if (data) {
        if (!data.children) {
          data.children = []
        }
        data.children.push(newChild);
      } else {
        this.data.push(newChild)
      }
      this.data = [...this.data]
      this.dialogVisible = false
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      this.data = [...this.data]
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>


<style scoped>
.goodstype {
  max-width: 800px;
}
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>