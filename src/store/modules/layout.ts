import { createStore } from 'vuex'

export default createStore({
  state: {
    MENU_DATA: Array,
    ACTIVE_ROUTE: {},
  },
  mutations: {
    SET_MENU(state: any, menu: any) {
      state.MENU_DATA = menu
    },
    SET_ACTIVE_ROUTE(state: any, route: any) {
      state.ACTIVE_ROUTE = route
    }
  },
  actions: {
    createMenu(context: any, value: any) {
      context.commit('SET_MENU', value)
    },
    createActiveRoute(context: any, value: any) {
      context.commit('SET_ACTIVE_ROUTE', value)
    },
  },
})
