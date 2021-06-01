<template>
  <div class="goodstype">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>

    <div style="margin-top: 20px;">
      <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
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
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        data.children = []
      }
      data.children.push(newChild);
      this.data = [...this.data]
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