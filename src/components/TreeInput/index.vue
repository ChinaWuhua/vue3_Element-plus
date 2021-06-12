<template>
  <div class="tree-input">
    <el-button type="primary" style="margin-left: 6px;" @click="dialogVisible = true">{{ text || '选择品类'}}</el-button>
    <el-dialog
      title="品类选择"
      v-model="dialogVisible"
      :width="panelWidth"
      @opened="getTreeData">
      <el-tree
        v-loading="loading"
        ref="tree"
        node-key="Uuid"
        :data="treeData"
        :expand-on-click-node="false"
        :props="defaultProps"
        @node-click="handleNodeClick">
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api/GoodsType";
export default {
  props: ['text'],
  computed: {
    panelWidth() {
      let clientWidth = document.body.clientWidth;
      return clientWidth > 800 ? '500px' : '80%'
    }
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'Name'
      },
      dialogVisible: false,
      loading: false,
    }
  },
  methods: {
    handleNodeClick(data) {
      this.dialogVisible = false
      this.$emit('treeChose', data)
    },
    async cutList(arr) {
      let tree = arr.concat([])
      tree.forEach((item) => {
        item.children = [],
        item.deep = 0
      })
      tree.forEach((item) => {
        tree.forEach((item2) => {
          if (item2.ParentId == item.Uuid) {
            item.children.push(item2)
          }
        })
      })
      tree = tree[0]
      tree = await this.judgeDept(tree, 0)
      this.treeData = tree.children
    },
    judgeDept(arr, deep){
      arr[0] ? arr.forEach((item) => {
        item.deep = deep + 1
        if (item.children[0]) {
          this.judgeDept(item.children, item.deep)
        }
      }) : ''
      return arr
    },
    getTreeData() {
      this.loading = true
      api
        .getList()
        .then(res => {
          this.loading = false
          let arr = res?.data?.product_types
          if (arr && arr.length > 0) {
            arr.forEach(item => {
              if (!item.ParentId) item.ParentId = 'root'
            })
            this.cutList([{Name: '根节点', Uuid: 'root'}, ...arr])
          }
        })
        .catch(err => {
          this.loading = false
          console.log('-----fail----', err)
        })
    },
  }
}
</script>

<style scoped>

</style>