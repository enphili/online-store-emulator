import {errors} from '../../utils/errors'

//?auth=${rootGetters['auth/token']}

export default {
  namespaced: true,
  state() {
    const offers = []
    return {offers}
  },

  getters: {
    allOffers(state) {
      return state.offers
    }
  },
  mutations: {
    allOffers(state, offers) {
      const temp = []
      Object.values(offers).forEach(el => temp.push((Object.values(el))))
      state.offers = temp.flat()
    }
  },
  actions: {
    async loadOffers({commit}) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/offers.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error)
        commit('allOffers', data)
      } catch (e) {
        throw new Error(errors(e.message))
      }
    },
    async updateOffer({dispatch, rootGetters}, payload) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/offers/${payload.type}/${payload.fbKey}.json?auth=`
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        await dispatch('loadOffers')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },
    async removeOffer({dispatch, rootGetters}, {type, fbKey}) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/offers/${type}/${fbKey}.json?auth=`
        const response = await fetch(url, {method: 'DELETE'})
        if (!response.ok) throw new Error(response.statusText)
        await dispatch('loadOffers')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },
    async addNewOffer({dispatch, rootGetters }, formData) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/offers/${formData.type}.json?auth=`
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        const url2 = `${process.env.VUE_APP_BASE_BD_URL}/offers/${formData.type}/${data.name}.json?auth=`
        const response2 = await fetch(url2, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({fbKey: data.name})
        })
        if (!response2.ok) throw new Error(response.statusText)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    }
  }
}