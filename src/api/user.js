import ajax from '@/utils/ajax'
export default {
  // 登录
  Login({username = '', password = ''}) {
    return ajax({
      method: 'post',
      url: '/api/login',
      data: {
        username,
        password,
      }
    })
  },
  // 登出
  Logout({username = ''}) {
    return ajax({
      method: 'post',
      url: '/api/logout',
      data: {
        username
      }
    })
  },
  // 新增用户
  userAdd(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/user/add',
      data: {
        ...params,
      }
    })
  },
  // 删除用户
  userDelete(Username = '') {
    return ajax({
      method: 'post',
      url: '/api/user/delete',
      data: {
        Username
      }
    })
  },
  // 查询用户列表
  getUsetlist(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/user/all',
      data: {
        ...params
      }
    })
  },
  // 更新用户信息
  updateUser(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/user/update',
      data: {
        ...params
      }
    })
  },
  // 用户修改密码
  updatePassword(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/user/update/password',
      data: {
        ...params
      }
    })
  },
}