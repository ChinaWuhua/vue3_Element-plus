<template>
  <div class="header-wrap">
    <div></div>
    <el-dropdown>
      <span class="user-box">
        <i class="el-icon-user" style="margin-right: 8px;"></i>
        {{userInfo?.user?.Name}}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
          <el-dropdown-item v-if="!isAdmin" @click="edit"><i class="el-icon-edit"></i>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!--修改密码弹窗-->
    <el-dialog
      title="修改密码"
      v-model="dialogVisible"
      width="500px">
      <el-input :disabled="loading" placeholder="请输入新密码" v-model="newpsw"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button :disabled="loading" @click="dialogVisible = false; newpsw = ''">取 消</el-button>
          <el-button :disabled="loading" type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import api from "@/api/user"
export default defineComponent({
  computed: {
    ...mapGetters(['userInfo']),
    isAdmin() {
      return this.userInfo?.user?.Username && this.userInfo.user.Username.indexOf('admin') >= 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      newpsw: '',
      loading: false,
    }
  },
  methods: {
    submit() {
      let params = {
        Password: this.newpsw
      }
      this.loading = true
      api
        .updateUser(params)
        .then(res => {
          this.loading = false
          this.tableData = res?.data?.users || []
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.dialogVisible = false
          this.newpsw = ''
        })
        .catch(err => {
          this.loading = false
          this.$message({
            message: err.msg,
            type: "warning"
          })
        })
    },
    edit() {
      this.dialogVisible = true
    },
    logout() {
      api
        .Logout({ username: this.userInfo?.user?.Username })
        .then(() => {
          sessionStorage.setItem('userInfo', null)
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