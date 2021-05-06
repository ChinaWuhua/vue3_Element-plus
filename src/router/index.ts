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
  }, {
    path: '/404',
    name: '404',
    component: () => import('../views/Error/err_404.vue'),
  }, {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
