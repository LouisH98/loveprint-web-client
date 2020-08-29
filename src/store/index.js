import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lovePrintAddress: 'https://lp-api.louisholdsworth.co.uk:2053',
    hasPaper: true
  },
  mutations: {
    setHasPaper(state, bool){
      state.hasPaper = bool;
    }
  },
  actions: {
  },
  modules: {
  }
})
