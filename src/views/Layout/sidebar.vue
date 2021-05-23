<template>
  <div class="sidebar-content">
    <div class="logo">
      <i class="el-icon-goods" style="margin: 1px 6px 0 0;"></i>
      电商管理系统
      <span>ERP管理</span>
    </div>
    <div class="sidebar-wrap">
      <el-menu
        :default-active="activeRoute"
        class="el-menu-vertical-demo"
        text-color="#fff"
        active-text-color="#ff9900"
        background-color="#545c64"
        :router="true">
        <template v-for="item in menu">
          <el-menu-item
            :key="item.path" 
            :index="item.path"
            v-if="permission.includes(item.path)">
            <i :class="item.icon"></i>
            {{item.label}}
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'side-item',
  computed: {
    ...mapGetters(['menu', 'userInfo']),
    permission() {
      let role = this.userInfo?.user?.Role
      return role ? role.map(item => item.path) : []
    },
  },
  watch: {
    $route(to) {
      this.getActive(to.path)
    },
  },
  data() {
    return {
      activeRoute: '',
    }
  },
  mounted() {
    this.setMenu()
    !this.activeRoute ? this.getActive(this.$route.path) : ''
  },
  methods: {
    setMenu() {
      let data =  [
        {label: '首页', icon: 'el-icon-house', path: '/home', name: 'home'},
        {label: '用户管理', icon: 'el-icon-user', path: '/user', name: 'user'},
        // {label: '菜单管理', icon: 'el-icon-menu', path: '/menu', name: 'menu'},
      ]
      this.$store.dispatch('createMenu', data)
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
    font-size: 16px;
    padding: 0 24px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background: #545c64;
    border-bottom: 1px solid #4b4b4b;
    text-shadow: 1px 1px 2px #2d2d2d;
  }
  .logo span {
    font-size: 12px;
    margin: 3px 0 0 5px;
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