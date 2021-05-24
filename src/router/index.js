import { createRouter, createWebHashHistory } from 'vue-router'
import user from '@/utils/auth'
import pagesRoute from './pages/index'
import store from '@/store/index'
import { ElMessage } from 'element-plus'
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/Layout/index.vue'),
    children: [
      ...pagesRoute,
      {
        path: '/:pathMatch(.*)',
        name: 'not-found',
        component: () => import('../views/Error/err_404.vue'),
        meta: {notAuth: true}
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta: {notAuth: true}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let login = user.isLogin();
  const permisson = store.state.userInfo?.user?.Role.map(item => item.path)
  let child = permisson ? permisson.find(item => to.path.indexOf(item) >= 0 ) : undefined

  if (to?.meta?.notAuth === true && to.name !== 'Layout') {
    next()
  } else if (!login) {
    next('/login')
  } else if ( permisson && !permisson.includes(to.path) && !child) {
    ElMessage.warning('您暂无权限访问该页面，请联系管理员')
    if (from.name) {
      next(from.path)
    } else {
      next(permisson[0])
    }
  } else {
    next()
  }
})

export default router
