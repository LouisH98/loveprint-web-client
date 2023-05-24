import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lovePrintAddress: 'http://printer.local:8080',
    hasPaper: true,
    username: "",
    lastSetVersion: '0.0.0'
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
