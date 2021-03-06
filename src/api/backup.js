import ajax from '@/utils/ajax'
export default {
  // 获取备份信息接口
  getBackupInfo() {
    return ajax({
      method: 'post',
      url: '/api/backup/info',
    })
  },
  // 执行备份
  handelBackup() {
    return ajax({
      method: 'post',
      url: '/api/backup/backup',
    })
  },
  // 执行恢复
  handelRecover(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/backup/recover',
      data: {
        ...params
      }
    })
  },
  // 删除备份
  handelDelete(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/backup/delete',
      data: {
        ...params
      }
    })
  },
}