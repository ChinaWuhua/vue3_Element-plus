import ajax from '@/utils/ajax'
export default {
  getList() {
    return ajax({
      method: 'post',
      url: '/api/account/type/all',
    })
  },
  add(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/account/type/add',
      data: {
        ...params,
      }
    })
  },
  delete(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/account/type/delete',
      data: {
        ...params,
      }
    })
  }
}