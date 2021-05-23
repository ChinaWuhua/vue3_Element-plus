export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
    meta: {
      label: '首页'
    }
  }, {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
    meta: {
      label: '用户管理'
    }
  }, {
    path: '/user/add',
    name: 'user-add',
    component: () => import('@/views/User/add.vue'),
    meta: {
      label: '用户详情'
    }
  }, {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/Menu/index.vue'),
    meta: {
      label: '菜单管理'
    }
  }
]