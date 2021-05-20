export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/demo/Home.vue'),
    meta: {
      label: '首页'
    }
  },
  {
    path: '/home/detail',
    name: 'home-detail',
    component: () => import('@/views/demo/detail.vue'),
    meta: {
      label: '厂房详情介绍'
    }
  },
  {
    path: '/home-touch',
    name: 'home-touch',
    component: () => import('@/views/demo/Home-touch.vue'),
    meta: {
      label: '手机端首页'
    }
  },
  {
    path: '/charts',
    name: 'charts',
    component: () => import('@/views/demo/charts.vue'),
    meta: {
      label: '图表'
    }
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/preview/index.vue'),
    meta: {
      label: '文件预览'
    }
  }
]