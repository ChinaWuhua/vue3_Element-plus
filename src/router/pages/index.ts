export default [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/demo/Home.vue')
  },
  {
    path: 'home-touch',
    name: 'home-touch',
    component: () => import('@/views/demo/Home-touch.vue')
  },
  {
    path: 'detail',
    name: 'detail',
    component: () => import('@/views/demo/detail.vue')
  },
  {
    path: 'charts',
    name: 'charts',
    component: () => import('@/views/demo/charts.vue')
  }
]