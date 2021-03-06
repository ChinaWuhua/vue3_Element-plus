import ajax from '@/utils/ajax'
export default {
  getList() {
    return ajax({
      method: 'post',
      url: '/api/product/type/all',
    })
  },
  add(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/type/add',
      data: {
        ...params,
      }
    })
  },
  delete(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/type/delete',
      data: {
        ...params,
      }
    })
  }
}