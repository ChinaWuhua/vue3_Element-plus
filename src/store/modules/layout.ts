import { createStore } from 'vuex'

export default createStore({
  state: {
    MENU_DATA: [],
    ACTIVE_ROUTE: {},
  },
  mutations: {
    SET_MENU(state, menu) {
      state.MENU_DATA = menu
    },
    SET_ACTIVE_ROUTE(state, route) {
      state.ACTIVE_ROUTE = route
    }
  },
  actions: {
    createMenu(context, value) {
      context.commit('SET_MENU', value)
    },
    createActiveRoute(context, value) {
      context.commit('SET_ACTIVE_ROUTE', value)
    },
  },
})
