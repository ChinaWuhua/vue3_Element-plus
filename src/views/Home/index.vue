<template>
  <div class="home">
    <el-empty description="暂无待办事项"></el-empty>
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