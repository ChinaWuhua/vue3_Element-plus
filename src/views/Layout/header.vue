<template>
  <div class="header-wrap">
    <div></div>
    <el-dropdown>
      <span class="user-box">
        {{userInfo?.user?.Username}}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import api from "@/api/user"
export default defineComponent({
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    logout() {
      api
        .Logout({ username: this.userInfo?.user?.Username })
        .then(() => {
          localStorage.setItem('userInfo', null)
          this.$store.dispatch('createUserInfo', null)
          this.$router.push('/login')
        })
        .catch((err) => {
          this.$alert(err.msg, '提示', {
            confirmButtonText: '知道了',
          });
        });
    }
  }
})
</script>

<style scoped>
  .header-wrap {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
  }
  .user-box {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
</style>