<template>
  <div class="header-wrap">
    <div></div>
    <el-dropdown>
      <span class="user-box">
        <span>管</span>
        管理员
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item><i class="el-icon-user"></i>个人中心</el-dropdown-item>
          <el-dropdown-item><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

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
  .user-box span {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    border: 2px solid #ddd;
    color: #999;
  }
</style>