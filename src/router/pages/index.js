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
  meta: { label: '用户详情', notAuth: true }
}, {
  path: '/backup',
  name: 'backup',
  component: () => import('@/views/Backup/index.vue'),
  meta: { label: '备份管理' }
}]