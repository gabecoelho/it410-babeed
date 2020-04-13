import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    name: '',
    username: '',
    loggedIn: false,
    feedingList: [],
    diaperList: []
  },

  getters: {
    // Get only the last 15 elements in each list view (feedings and diapers)
    latestFeedingList(state) {
      return state.feedingList.slice(Math.max(state.feedingList.length - 12, 0))
    },
    latestDiaperList(state) {
      return state.diaperList.slice(Math.max(state.diaperList.length - 12, 0))
    }

  },
  // Define synchronous state change event handlers that mutate internal state
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    setName(state, name) {
      state.name = name
    },
    setUsername(state, username) {
      state.username = username
    },
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn
    },
    setFeedingList(state, feedingList) {
      state.feedingList = feedingList
    },
    setDiaperList(state, diaperList) {
      state.diaperList = diaperList
    }
  },
  // Define action event handlers that perform 1 or + mutations but don't mutate internal state
  actions: {
    setLoginData({ commit }, user) {
      commit('setLoading', true)
      commit('setName', user.name)
      commit('setUsername', user.username)
      commit('setLoggedIn', true)
      commit('setLoading', false)
    },
    setLogoutData({ commit }) {
      commit('setLoading', true)
      commit('setName', '')
      commit('setUsername', '')
      commit('setLoggedIn', false)
      commit('setLoading', true)
    },
    // Feedings
    async fetchFeedings({ commit, state }) {
      commit('setLoading', true)
      const feedingList = await Axios.get('http://localhost:8081/feedings/' + state.username, { withCredentials: true })
      commit('setFeedingList', feedingList.data)
      commit('setLoading', false)
    },
    async saveFeeding({ commit, state }, feeding) {
      commit('setLoading', true)
      await Axios.post('http://localhost:8081/feedings', { username: feeding.username, time: feeding.time, timestamp: feeding.timestamp }, { withCredentials: true })
      commit('setLoading', false)
    },
    async removeFeeding({ commit, state }, id) {
      commit('setLoading', true)
      const response = await Axios.delete('http://localhost:8081/feedings/' + id, { withCredentials: true })
      if (response.status === 200) {
        const index = state.feedingList.findIndex((feeding) => feeding._id === id)
        state.feedingList.splice(index, 1)
        commit('setFeedingList', state.feedingList)
      }
      commit('setLoading', false)
    },
    async updateFeeding({ commit }, id) {

    },

    // Diapers
    async fetchDiapers({ commit, state }) {
      commit('setLoading', true)
      const diaperList = await Axios.get('http://localhost:8081/diapers/' + state.username, { withCredentials: true })
      commit('setDiaperList', diaperList.data)
      commit('setLoading', false)
    },
    async saveDiaper({ commit }, diaper) {
      commit('setLoading', true)
      await Axios.post('http://localhost:8081/diapers', { username: diaper.username, type: diaper.type, timestamp: diaper.timestamp }, { withCredentials: true })
      commit('setLoading', false)
    },
    async removeDiaper({ commit, state }, id) {
      commit('setLoading', true)
      const response = await Axios.delete('http://localhost:8081/diapers/' + id, { withCredentials: true })
      if (response.status === 200) {
        const index = state.diaperList.findIndex((diaper) => diaper._id === id)
        state.diaperList.splice(index, 1)
        commit('setDiaperList', state.diaperList)
      }
      commit('setLoading', false)
    },
    async updateDiaper({ commit }, id) {

    },
  }
})
