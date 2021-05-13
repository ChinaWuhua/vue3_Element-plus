import { createStore } from 'vuex'

export default createStore({
  state: {
    MENU_DATA: [],
  },
  mutations: {
    SET_MENU(state, menu) {
      state.MENU_DATA = menu
    }
  },
  actions: {
    createMenu(context, value) {
      context.commit('SET_MENU', value)
    }
  },
})
