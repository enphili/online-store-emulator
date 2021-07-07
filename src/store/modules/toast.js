export default {
  namespaced: true,

  state() {
    const toastsArray = []
    return {toastsArray}
  },

  getters: {
    allToast(state) {
      return state.toastsArray
    }
  },

  mutations: {
    addNewToast(state, toast) {
      state.toastsArray.push(toast)
    },

    removeToast(state, toast) {
      state.toastsArray.splice(state.toastsArray.indexOf(toast), 1)
    }
  },

  actions: {
    addNewToast({commit}, toast) {
      commit('addNewToast', toast)
    },

    removeToast({commit}, toast) {
      commit('removeToast', toast)
    }
  }
}