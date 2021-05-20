<template>
  <div class="sidebar-content">
    <div class="logo">
      DEMO
      <span>测试工程</span>
    </div>
    <div class="sidebar-wrap">
      <el-menu
        :default-active="activeRoute"
        class="el-menu-vertical-demo"
        text-color="#fff"
        active-text-color="#ff9900"
        background-color="#545c64"
        :router="true">
        <el-menu-item v-for="item in arr" :key="item.path" :index="item.path">
          <i :class="item.icon"></i>
          {{item.label}}
        </el-menu-item>
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
    // routeData() {
    //   return this.$router.options?.routes[0]?.children || []
    // }
  },
  watch: {
    $route(to) {
      this.getActive(to.path)
    },
    menu(value) {
      console.log(value)
    }
  },
  data() {
    return {
      activeRoute: '',
      arr: [
        {label: '厂房区域介绍', icon: 'el-icon-house', path: '/home'},
        {label: '温度监控', icon: 'el-icon-data-analysis', path: '/charts'},
        {label: '手机端', icon: 'el-icon-phone', path: '/home-touch'},
      ]
    }
  },
  mounted() {
    this.setMenu()
    !this.activeRoute ? this.getActive(this.$route.path) : ''
  },
  methods: {
    setMenu() {
      // let data =  [
      //   {label: '厂房区域介绍', icon: 'el-icon-house', path: '/home'},
      //   {label: '温度监控', icon: 'el-icon-data-analysis', path: '/charts'},
      //   {label: '手机端', icon: 'el-icon-phone', path: '/home-touch'},
      // ]
      // console.log(this)
      // this.$store.dispatch('createMenu', data)
    },
    getActive(path) {
      let paths = [];
      paths = path.split('/')
      paths.splice(0,1)
      paths.splice(paths.length - 1,1)
      this.activeRoute = `${paths[0] ? '/'+paths[0] : path}`
    }
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
    color: #fff;
    font-size: 20px;
    padding: 0 24px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background: #545c64;
    border-bottom: 1px solid #4b4b4b;
  }
  .logo span {
    font-size: 12px;
    margin: 5px 0 0 5px;
    color: #fff;
  }
  .sidebar-wrap {
    position: absolute;
    top: 50px;;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 1;
    background: #545c64;
  }
</style>
<style>
  .el-menu {
    border-right: 0;
  }
</style>