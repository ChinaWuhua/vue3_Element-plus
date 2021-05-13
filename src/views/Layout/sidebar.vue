<template>
  <div class="sidebar-content">
    <div class="logo">
      BYD
      <span>-- build your dreams</span>
    </div>
    <div class="sidebar-wrap">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        text-color="#666"
        active-text-color="#ff9900">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <template #title>导航二</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <template #title>导航三</template>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <template #title>导航四</template>
        </el-menu-item>
        <el-submenu index="5">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="5-1">选项1</el-menu-item>
            <el-menu-item index="5-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="5-3">选项3</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'side-item',
  computed: {
    ...mapGetters(['menu']),
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.menu)
  },
  methods: {
  }
})
</script>

<style scoped>
  .sidebar-content {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .logo {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #ff9900;
    font-size: 20px;
    padding: 0 24px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 0 6px #eee;
    z-index: 2;
  }
  .logo span {
    font-size: 12px;
    margin: 5px 0 0 5px;
    color: #ff9900;
  }
  .sidebar-wrap {
    position: absolute;
    top: 50px;;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 1;
  }
</style>
<style>
  .el-menu {
    border-right: 0;
  }
</style>