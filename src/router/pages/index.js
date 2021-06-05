/*
  1、路由数据与菜单数据分开
  2、若路由存在从属关系时请使用名字嵌套的方式去定义path，例如: 列表页/user的详情页/user/detail
*/
export default [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'home',
  component: () => import('@/views/Home/index.vue'),
  meta: { label: '首页' }
}, {
  path: '/user',
  name: 'user',
  component: () => import('@/views/User/index.vue'),
  meta: { label: '用户管理' }
}, {
  path: '/user/add',
  name: 'user-add',
  component: () => import('@/views/User/add.vue'),
  meta: { label: '用户详情', notAuth: true, parentPath: '/user', followParent: true }
}, {
  path: '/backup',
  name: 'backup',
  component: () => import('@/views/Backup/index.vue'),
  meta: { label: '备份管理' }
}, {
  path: '/goodstype',
  name: 'goodstype',
  component: () => import('@/views/GoodsType/index.vue'),
  meta: { label: '品类管理' }
}, {
  path: '/units',
  name: 'units',
  component: () => import('@/views/Units/index.vue'),
  meta: { label: '计量单位' }
}, {
  path: '/warehouse',
  name: 'warehouse',
  component: () => import('@/views/Warehouse/index.vue'),
  meta: { label: '仓库管理' }
}, {
  path: '/goodslist',
  name: 'goodslist',
  component: () => import('@/views/Goodslist/index.vue'),
  meta: { label: '商品列表' }
}, {
  path: '/goodsSuit',
  name: 'goodsSuit',
  component: () => import('@/views/GoodsSuit/index.vue'),
  meta: { label: '套装商品' }
}, {
  path: '/saleList',
  name: 'saleList',
  component: () => import('@/views/Sale/index.vue'),
  meta: { label: '销售单' }
}, {
  path: '/saleReturn',
  name: 'saleReturn',
  component: () => import('@/views/SaleReturn/index.vue'),
  meta: { label: '退货单' }
}]