import { createRouter, createWebHashHistory } from 'vue-router'
import user from '@/utils/auth'
import pagesRoute from './pages/index'
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/',
        redirect: 'home'
      },
      ...pagesRoute,
      {
        path: '/404',
        name: '404',
        component: () => import('../views/Error/err_404.vue'),
      }, {
        path: '/:pathMatch(.*)',
        redirect: '/404'
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let login = user.isLogin();
  if (login || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router
