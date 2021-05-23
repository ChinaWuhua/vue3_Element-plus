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
      // {
      //   path: '/',
      //   redirect: 'home'
      // },
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
  const permisson = store.state.userInfo?.user?.Role.map(item => item.path)
  let child = permisson ? permisson.find(item => to.path.indexOf(item) >= 0 ) : undefined
  if (to.path === '/login') {
    next()
  } else if ( permisson && !permisson.includes(to.path) && !child) {
    ElMessage.warning('您暂无权限访问该页面，请联系管理员')
    from.name ? next(from.path) : next(permisson[0])
  } else if (login) {
    next()
  } else {
    next('/login')
  }
})

export default router
