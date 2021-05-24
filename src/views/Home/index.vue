<template>
  <div class="home">
    welcome, it's home page
    <!-- <el-button @click="addRoute">添加路由</el-button> -->
  </div>
</template>

<script>
// import api from "@/api/user";
export default {
  data() {
    return {
      loading: false,
      
    };
  },
  methods: {
    addRoute() {
      let main = this.$router.getRoutes().find(item => item.name === 'Layout');
      main.children = [
        ...main.children,
        {
          path: '/menu',
          name: 'menu',
          component: () => import('@/views/Menu/index.vue'),
          meta: { label: '菜单', auth: false, }
        }
      ]
      this.$router.addRoute(main)
    }
  }
};
</script>

<style scoped>

</style>