export default {
  createUserInfo(context, value) {
    context.commit('SET_USER_INFO', value)
  },
  createMenu(context, value) {
    context.commit('SET_MENU', value)
  },
  createActiveRoute(context, value) {
    context.commit('SET_ACTIVE_ROUTE', value)
  },
}