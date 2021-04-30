import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import pagesRoute from './pages/index'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      ...pagesRoute
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
