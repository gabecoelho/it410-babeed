import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    userName: '',

    loggedIn: false,
    diapers: [
      // {},
    ],
    feedings: [
      // {},
    ]
  },
  // Create computed values based on state values
  getters: {

  },
  // Define synchronous state change event handlers that mutate internal state
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    setUserName(state, userName) {
      state.userName = userName
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn
    }
  },
  // Define action event handlers that perform 1 or + mutations but don't mutate internal state
  actions: {
    setLoginData({ commit }, userName) {
      commit('setLoading', true)
      commit('setUserName', userName)
      commit('setLoggedIn', true)
      commit('setLoading', false)
    },
    setLogoutData({ commit }) {
      commit('setLoading', true)
      commit('setUserName', '')
      commit('setLoggedIn', false)
      commit('setLoading', true)
    }
  }
})
