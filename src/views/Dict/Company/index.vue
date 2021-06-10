<template>
  <div class="goodstype" v-loading="loading">
    <el-input
      placeholder="输入关键字进行过滤"
      clearable
      v-model="filterText">
    </el-input>

    <div style="margin-top: 20px;">
      <div style="margin-bottom: 10px;">
        <el-button type="primary" icon="el-icon-plus" @click="append()">创建单位类型</el-button>
      </div>
      <el-tree
        :data="treeData"
        node-key="Uuid"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree">
        <template #default="{ data }">
          <div class="custom-tree-node">
            <span>{{ data.Name }}</span>
            <span>
              <el-button
                type="text"
                @click="append(data)">
                <i class="el-icon-plus"></i> 添加
              </el-button>
              <el-button
                :disabled="data.ParentId === 'root'"
                type="text"
                @click="remove(data)">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </span>
          </div>
        </template>
      </el-tree>
    </div>

    <el-dialog
      title="请输入公司名称"
      v-model="dialogVisible"
      width="300px"
      @closed="clearText">
      <el-input maxlength="20" v-model="handleText" />
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
import api from "@/api/Company";

export default {
  data() {
    return {
      filterText: '',
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
    remove(data) {
      this
        .$confirm(`将删除分类【${data.Name}】及其所属全部子分类并且不可恢复, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.loading = true
          api
            .delete({ Uuid: data.Uuid })
            .then(res => {
              this.loading = false
              if (res.status === 200) {
                this.$message.success(res.msg)
                this.getTreeData()
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error(err.msg)
            })
        })
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
          let arr = res?.data?.companies
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