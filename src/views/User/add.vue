<template>
  <div class="user-add">
    <h3>新增用户</h3>
    <el-divider></el-divider>
    <div style="max-width: 400px;">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="Username">
          <el-input v-model="form.Username" maxlength="20" ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="Name">
          <el-input v-model="form.Name" maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="form.Email" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="Phone">
          <el-input v-model="form.Phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="form.Password" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="Role">
           <el-select v-model="form.Role" style="width: 100%;">
             <el-option label="管理员" :value="1"></el-option>
             <el-option label="用户" :value="2"></el-option>
           </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="loading"
          >保存</el-button>
          <el-button 
            :disabled="loading"
            @click="() => {$router.go(-1)}"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api/user";

export default {
  data() {
    const validateEmail = (rule, value, callback) => {
      let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error('邮箱格式不正确'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      rules: {
        Username: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        ],
        Name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        Email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: validateEmail, trigger: 'blur' },
        ],
        Phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: validatePhone, trigger: 'blur' },
        ],
        Password: [
          { required: true, message: "请设置密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        ],
      },
      form: {
        Username: '',
        Name: "",
        Email: "",
        Phone: "",
        Password: "",
        Role: '',
      },
    };
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.form.validate((pass) => {
        if (pass) {
          this.loading = true
          api
            .userAdd(this.form)
            .then(res => {
              this.loading = false
              this.tableData = res?.data?.users || []
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.go(-1)
            })
            .catch(err => {
              this.loading = false
              this.$message({
                message: err.msg,
                type: "warning"
              })
            })
        }
      })
    },
  },
};
</script>

<style scoped>
</style>