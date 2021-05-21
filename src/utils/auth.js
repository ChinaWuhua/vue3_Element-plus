import store from '@/store/index'
export default {
  isLogin() {
    let userInfo = store.state.userInfo || JSON.parse(localStorage.getItem('userInfo'))
    if (!store.state.userInfo && userInfo) store.dispatch('createUserInfo', userInfo)
    return userInfo
  }
}