import ajax from '@/utils/ajax'
export default {
  getList(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/all',
      data: {
        ...params,
      }
    })
  },
  add(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/add',
      data: {
        ...params,
      }
    })
  },
  update(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/update',
      data: {
        ...params,
      }
    })
  },
  delete(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/delete',
      data: {
        ...params,
      }
    })
  }
}