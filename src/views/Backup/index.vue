<template>
  <div class="backup" v-loading="loading">
    <div class="backupBox">
      <el-button type="primary" icon="el-icon-office-building" @click="handelBackup">立即备份</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="handelRecover">立即恢复</el-button>
      <el-button icon="el-icon-refresh" @click="getBackupInfo" title="刷新"></el-button>
    </div>
    <div>
      <div class="tip">
        当前状态: 
        <i :class="Status.icon"></i>
        {{Status.label}}
      </div>
      <div class="tip">
        最后一次备份时间: <i class="el-icon-date"></i> {{backupData.LastBackupTime || '获取备份时间异常'}}
      </div>
      <div class="tip">
        最后一次恢复时间: <i class="el-icon-date"></i> {{backupData?.LastRecoverTime || '获取恢复时间异常'}}
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/backup";
export default {
  data() {
    return {
      loading: false,
      backupData: {}
    };
  },
  computed: {
    Status() {
      let status = this.backupData?.Status
      switch (status) {
        case 1: return {label: '正常', icon: 'el-icon-check'}
        case 2: return {label: '正在备份数据', icon: 'el-icon-loading'}
        case 3: return {label: '正在恢复数据', statusicon: 'el-icon-loading'}
        default: return {label: '未知状态', statusicon: 'el-icon-warning'}
      }
    }
  },
  mounted() {
    this.getBackupInfo()
  },
  methods: {
    UTC_TIME(value) {
      if (!value) {
        return ''
      } else {
        let date = new Date(value)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minutes = date.getMinutes()
        let second = date.getSeconds()
        month < 10 ? month = `0${month}` : month
        day < 10 ? day = `0${day}` : day
        hour < 10 ? hour = `0${hour}` : hour
        minutes < 10 ? minutes = `0${minutes}` : minutes
        second < 10 ? second = `0${second}` : second
        return `${year}-${month}-${day} ${hour}:${minutes}:${second}`
      }
    },
    handelRecover() {
      this.loading = true
      api
        .handelRecover()
        .then(() => {
          this.loading = false
          this.getBackupInfo()
          this.$message.success('恢复成功, 正在刷新状态')
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err.msg)
        })
    },
    handelBackup() {
      this.loading = true
      api
        .handelBackup()
        .then(() => {
          this.loading = false
          this.getBackupInfo()
          this.$message.success('备份成功, 正在刷新状态')
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err.msg)
        })
    },
    getBackupInfo() {
      this.loading = true
      api
        .getBackupInfo()
        .then(res => {
          this.loading = false
          this.backupData = {
            ...res.data,
            LastBackupTime: this.UTC_TIME(res.data.LastBackupTime),
            LastRecoverTime: this.UTC_TIME(res.data.LastRecoverTime)
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err.msg)
        })
    }
  }
};
</script>

<style scoped>
  .tip {
    font-size: 13px;
    color: #666;
    margin-top: 8px;
  }
  .tip:first-child {
    margin-top: 20px;
  }
</style>