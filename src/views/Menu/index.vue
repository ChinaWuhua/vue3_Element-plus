<template>
  <div class="menu">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6" style="margin-bottom: 20px;">
        <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :xs="24" :sm="12" :md="16" :lg="18" :xl="18">
        <div class="menu-detail">
          菜单详情
          <span class="tip">
            菜单参数会影响系统操作，请谨慎修改，建议开发者参与修改
          </span>
          <el-divider></el-divider>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
          >
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" maxlength="8" placeholder="例如: 菜单" ></el-input>
            </el-form-item>
            <el-form-item label="路由名称" prop="menuName">
              <el-input v-model="form.routeName" maxlength="20" placeholder="例如: userpage, 请注意唯一性"></el-input>
            </el-form-item>
            <el-form-item label="页面路径" prop="path">
              <el-input v-model="form.path" maxlength="30" placeholder="例如: /src/page/home/index"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import api from "@/api/user";
export default {
  data() {
    return {
      loading: false,
      // 树形控件
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [
        { label: '首页' },
        {
          label: '系统管理',
          children: [
            {label: '账号管理'},
            {label: '菜单管理'},
          ]
        }
      ],
      // 表单
      form: {},
      rules: []
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>
  .menu-detail {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 12px 12px;
  }
  .tip {
    display: inline-block;
    font-size: 13px;
    color: #d2d2d2;
    margin-left: 12px;
  }
</style>