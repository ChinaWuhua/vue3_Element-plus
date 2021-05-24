<template>
  <div class="user-add">
    <h3>{{title}}</h3>
    <el-divider></el-divider>
    <div style="max-width: 400px;">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="Username">
          <el-input :disabled="mode !== 'add'" v-model="form.Username" maxlength="20" ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="Name">
          <el-input :disabled="mode === 'view'" v-model="form.Name" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input :disabled="mode === 'view'" v-model="form.Email" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="Phone">
          <el-input :disabled="mode === 'view'" v-model="form.Phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item v-if="mode === 'add'" label="密码" prop="Password">
          <el-input :disabled="mode === 'view'" v-model="form.Password" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="权限分配" prop="Role">
          <div class="treeContain">
            <el-input v-model="form.Role"></el-input>
            <el-button type="primary" style="margin-left: 10px;">选择</el-button>
          </div>
          
          <!-- <el-select :disabled="mode === 'view'" v-model="form.Role" multiple style="width: 100%;">
            <el-option 
              v-for="item in menu" 
              :key="item.key"
              :label="item.label"
              :value="item.name"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit"
            :disabled="loading"
          >保存</el-button>
          <el-button
            v-if="mode !== 'add'"
            type="primary"
            :disabled="loading"
          >重置密码</el-button>
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
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['menu']),
    title() {
      let obj = {
        add: '新增用户',
        edit: '修改用户信息',
        view: '查看用户信息'
      }
      return obj[this.mode]
    }
  },
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
        callback(new Error('电话格式不正确'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      rules: {
        Username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        Name: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
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
        ],
        Role: [
          { required: true, message: "请分配权限, 否则无法正常访问系统", trigger: "blur" },
        ]
      },
      form: {
        Username: '',
        Name: "",
        Email: "",
        Phone: "",
        Password: "",
        Role: '',
      },
      mode: 'add',
      pageData: {},
    };
  },
  mounted() {
    this.pageInit()
  },
  methods: {
    pageInit() {
      this.mode = this.$route.params?.mode || 'add'
      this.pageData = this.$route.params?.data ? JSON.parse(this.$route.params?.data) : {}
      if (this.mode !== 'add') {
        for (let item in this.form) {
          if (item === 'Role') {
            this.form[item] = this.pageData[item].map(menu => menu.name)
          } else {
            this.form[item] = this.pageData[item] || ''
          }
        }
      }
    },
    toUpdate() {
      let params = {
        ...this.form,
        Role: this.menu.filter( item => 
          this.form.Role.includes(item.name)
        )
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
          this.$router.go(-1)
        })
        .catch(err => {
          this.loading = false
          this.$message({
            message: err.msg,
            type: "warning"
          })
        })
    },
    onSubmit() {
      this.$refs.form.validate((pass) => {
        if (pass) {
          if (this.mode === 'edit') {
            this.toUpdate();
            return ;
          }
          let params = {
            ...this.form,
            Role: this.menu.filter( item => 
              this.form.Role.includes(item.name)
            )
          }
          this.loading = true
          api
            .userAdd(params)
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
.treeContain {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>