import ajax from '@/utils/ajax'
export default {
  // 获取品类列表
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
  }
}