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
          <el-dropdown-item @click="edit"><i class="el-icon-edit"></i>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!--修改密码弹窗-->
    <el-dialog
      append-to-body
      title="修改密码"
      v-model="dialogVisible"
      :width="panelWidth">
      <div class="dialogItem">
        <span class="dialogItemLabel">账号:</span>
        <span class="dialogItemInput">
          {{userInfo?.user?.Username}}
        </span>
      </div>
      <div class="dialogItem">
        <span class="dialogItemLabel">原密码:</span>
        <span class="dialogItemInput">
          <el-input :disabled="loading" v-model="OldPassword"></el-input>
        </span>
      </div>
      <div class="dialogItem">
        <span class="dialogItemLabel">新密码:</span>
        <span class="dialogItemInput">
          <el-input :disabled="loading" v-model="NewPassword"></el-input>
        </span>
      </div>
      <div class="dialogItem">
        <span class="dialogItemLabel">新密码确认:</span>
        <span class="dialogItemInput">
          <el-input :disabled="loading" v-model="NewPasswordAgain"></el-input>
        </span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button :disabled="loading" @click="dialogVisible = false; NewPassword = ''">取 消</el-button>
          <el-button :disabled="loading || NewPassword.length <= 0 || OldPassword.length <= 0 || NewPasswordAgain.length <= 0" type="primary" @click="submit">确 定</el-button>
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
    panelWidth() {
      let clientWidth = document.body.clientWidth;
      return clientWidth > 800 ? '400px' : '80%'
    }
  },
  data() {
    return {
      dialogVisible: false,
      NewPassword: '',
      OldPassword: '',
      NewPasswordAgain: '',
      loading: false,
    }
  },
  methods: {
    submit() {
      if (this.NewPassword !== this.NewPasswordAgain) {
        return this.$message.error('两次输入的新密码不一致')
      }
      let userInfo = this.userInfo?.user
      let params = {
        Username: userInfo?.Username,
        OldPassword: this.OldPassword,
        NewPassword: this.NewPassword
      }
      this.loading = true
      api
        .updatePassword(params)
        .then(res => {
          this.loading = false
          this.tableData = res?.data?.users || []
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.dialogVisible = false
          this.NewPassword = ''
          this.logout()
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
      sessionStorage.setItem('userInfo', null)
      this.$store.dispatch('createUserInfo', null)
      this.$router.push('/login')
      api
        .Logout({ username: this.userInfo?.user?.Username })
        .then(() => {
          
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
  .dialogItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }
  .dialogItemLabel{ 
    width: 80px;
    font-size: 13px;
  }
  .dialogItemInput {
    flex: 1;
    margin-left: 12px;
  }
</style>