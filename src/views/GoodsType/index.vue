<template>
  <div class="goodstype" v-loading="loading">
    <el-input
      placeholder="输入关键字进行过滤"
      clearable
      v-model="filterText">
    </el-input>

    <div style="margin-top: 20px;">
      <div style="margin-bottom: 10px;">
        <el-button type="primary" icon="el-icon-plus" @click="append()">创建品类</el-button>
        <!-- <el-button icon="el-icon-check">保存变更</el-button> -->
      </div>
      <el-tree
        :data="treeData"
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
          <el-button :disabled="dialogLoading" @click="dialogVisible = false">取 消</el-button>
          <el-button :disabled="dialogLoading" type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/GoodsType";

export default {
  data() {
    return {
      filterText: '',
      // data: JSON.parse(JSON.stringify(data)),
      treeData: [],
      dialogVisible: false,
      handleText: '',
      activeNode: null,
      loading: false,
      dialogLoading: false,
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.getTreeData()
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
      const newChild = { ParentId: data?.Uuid, Name: this.handleText };
      this.dialogLoading = true
      api
        .add(newChild)
        .then(res => {
          if (res.status === 200) {
            this.dialogLoading = false
            this.$message.success(res.msg)
            this.dialogVisible = false
            this.getTreeData()
          }
        })
        .catch(err => {
          this.dialogLoading = false
          this.$alert(err.msg)
        })
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
    },
    getTreeData() {
      this.loading = true
      api
        .getList()
        .then(res => {
          this.loading = false
          console.log(res)
        })
        .catch(err => {
          this.loading = false
          console.log('-----fail----', err)
        })
    }
  }
};
</script>


<style scoped>
.goodstype {
  max-width: 600px;
}
.custom-tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>