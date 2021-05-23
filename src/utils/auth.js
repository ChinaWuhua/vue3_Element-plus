import store from '@/store/index'
export default {
  isLogin() {
    let userInfo = store.state.userInfo || JSON.parse(sessionStorage.getItem('userInfo'))
    if (!store.state.userInfo && userInfo) store.dispatch('createUserInfo', userInfo)
    return userInfo
  }
}