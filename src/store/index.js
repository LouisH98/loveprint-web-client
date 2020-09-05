import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lovePrintAddress: 'https://lp-api.louisholdsworth.co.uk:2053',
    hasPaper: true,
    username: ""
  },
  mutations: {
    setHasPaper(state, bool){
      state.hasPaper = bool;
    },
    setUsername(state, username){
      state.username = username;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin]
})
