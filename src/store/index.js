import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters,
  // actions,
  modules: {
    book
  }
})
