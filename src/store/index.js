import { createStore } from 'vuex'
import layout from './modules/layout'
import getters from './getters'

export default createStore({
  getters,
  modules: {
    layout
  }
})
