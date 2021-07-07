import {errors} from '@/utils/errors'
import {unregister} from '@/use/fetchInterceptTest'

//?auth=${rootGetters['auth/token']}

export default {
  namespaced: true,
  state() {
    const allProducts = []
    const allCategories = []
    const SingleProduct = {}
    const presentProduct = {}
    return { allProducts, allCategories, SingleProduct, presentProduct}
  },

  getters: {
    allProducts(state) {
      return state.allProducts
    },
    sortAllProduct(state) {
      return state.allProducts.sort((a, b) => b.count - a.count)
    },
    allCategories(state) {
      return state.allCategories
    },
    SingleProduct(state) {
      return state.SingleProduct
    },
    presentProduct(state) {
      return state.presentProduct
    }
  },

  mutations: {
    setAllProducts(state, array) {
      state.allProducts = array
    },
    setAllCategories(state, array) {
      state.allCategories = array
    },
    setSingleProduct(state, product) {
      state.SingleProduct = product
    },
    setPresentProduct(state, product) {
      state.presentProduct = product
    }
  },

  actions: {
    async loadProducts({commit}) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj.json`
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) throw new Error(response.statusText)
        if (!data) throw new Error(data.error)
        commit('setAllProducts', Object.values(data))
      } catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async loadCategories({commit}) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/categories.json`
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error.message)
        } else if (!data) {
          throw new Error('null')
        } else {
          commit('setAllCategories', data)
        }
      } catch (e) {
        console.log(errors(e.message))
        throw new Error()
      }
    },

    async removeSimpleProduct({dispatch, rootGetters }, fbKey) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj/${fbKey}.json`
        const response = await fetch(url, {method: 'DELETE'})
        if (!response.ok) throw new Error(response.statusText)
        await dispatch('loadProducts')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async loadSingleProduct({commit}, fbKey) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj/${fbKey}.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        commit('setSingleProduct', data)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async loadPresentProduct({commit}, fbKey) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj/${fbKey}.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        commit('setPresentProduct', data)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async updateProduct({dispatch, rootGetters}, payload) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj/${payload.firebaseKey}.json`
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        await dispatch('loadProducts')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async removeSimpleCategory ({dispatch, rootGetters }, fbKey) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/categories/${fbKey}.json?auth=`
        const response = await fetch(url, {method: 'DELETE'})
        if (!response.ok) throw new Error(response.statusText)
        await dispatch('loadCategories')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async updateCategory({dispatch, rootGetters}, payload) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/categories/${payload.firebaseKey}.json?auth=`
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        await dispatch('loadCategories')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async addNewProduct({dispatch, rootGetters }, formData) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj.json`
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        const url2 = `${process.env.VUE_APP_BASE_BD_URL}/products_obj/${data.name}.json`
        const response2 = await fetch(url2, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({firebaseKey: data.name})
        })
        if (!response2.ok) throw new Error(response.statusText)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async addNewCategory({dispatch, rootGetters }, formData) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/categories.json?auth=`
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        const url2 = `${process.env.VUE_APP_BASE_BD_URL}/categories/${data.name}.json?auth=`
        const response2 = await fetch(url2, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({firebaseKey: data.name})
        })
        if (!response2.ok) throw new Error(response.statusText)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    }
  }
}