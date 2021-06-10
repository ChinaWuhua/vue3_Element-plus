import ajax from '@/utils/ajax'
export default {
  getList() {
    return ajax({
      method: 'post',
      url: '/api/warehouse/type/all',
    })
  },
  add(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/warehouse/type/add',
      data: {
        ...params,
      }
    })
  },
  delete(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/warehouse/type/delete',
      data: {
        ...params,
      }
    })
  }
}