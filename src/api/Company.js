import ajax from '@/utils/ajax'
export default {
  getList() {
    return ajax({
      method: 'post',
      url: '/api/company/type/all',
    })
  },
  add(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/company/type/add',
      data: {
        ...params,
      }
    })
  },
  delete(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/company/type/delete',
      data: {
        ...params,
      }
    })
  }
}