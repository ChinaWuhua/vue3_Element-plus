<template>
  <div class="sidebar">
    <el-submenu :index="menuData.name">
      <template #title>
        <i :class="menuData.icon"></i>
        {{menuData.label}}
      </template>
      <template v-for="item in menuData.children" >
        <template v-if="!item.children">
          <el-menu-item
            v-if="isAdmin || permission.includes(item.path)"
            :key="item.path"
            :index="item.path"
            style="margin-left: 12px;"
            >
            <i :class="item.icon"></i>
            {{item.label}}
          </el-menu-item>
        </template>
        <sidebar-item v-else :key="item.path" :menu-data="item" />
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'sidebar-item',
  props: ['menuData'],
  computed: {
    ...mapGetters(['menu', 'userInfo']),
    permission() {
      let role = this.userInfo?.user?.Role
      return role ? role.map(item => item.path) : []
    },
    isAdmin() {
      return this.userInfo?.user?.Username && this.userInfo.user.Username.indexOf('admin') >= 0
    }
  }
})
</script>
