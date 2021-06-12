import ajax from '@/utils/ajax'
export default {
  getList(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/together/all',
      data: {
        ...params,
      }
    })
  },
  add(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/together/add',
      data: {
        ...params,
      }
    })
  },
  update(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/together/update',
      data: {
        ...params,
      }
    })
  },
  delete(params = {}) {
    return ajax({
      method: 'post',
      url: '/api/product/together/delete',
      data: {
        ...params,
      }
    })
  }
}