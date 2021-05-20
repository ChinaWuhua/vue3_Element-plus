<template>
  <div class="detail">
    login
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import api from "@/api/user";
export default {
  setup() {
    const count = ref(false);

    const login = () => {
      api
        .Login({ username: "admin", password: "654321" })
        .then((res) => {
          console.log("done---", res);
        })
        .catch((err) => {
          ElMessageBox(err.msg);
        });
    };

    return { count, login };
  },
};
</script>

<style scoped>
</style>