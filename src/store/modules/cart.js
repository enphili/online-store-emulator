export default {
  namespaced: true,

  state() {
    const currentUser = {}
    if (localStorage.getItem('currentUser')) {
      const objFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'))
      objFromLocalStorage.cart ? currentUser.cart = objFromLocalStorage.cart : currentUser.cart = []
      objFromLocalStorage.totalCost ? currentUser.totalCost = objFromLocalStorage.totalCost : currentUser.totalCost = 0
      objFromLocalStorage.promocodeSale ? currentUser.promocodeSale = objFromLocalStorage.promocodeSale : null
      } else {
        currentUser.cart = []
        currentUser.totalCost = 0
      }
    const isPromocodeApplied = false
    const presentPrice = 0
    return {currentUser, isPromocodeApplied, presentPrice}
  },

  getters: {
    currentUser(state) {
      return state.currentUser
    },
    cart(state) {
      return state.currentUser.cart ? state.currentUser.cart : []
    },
    cartLength(state) {
      return state.currentUser.cart.length
    },
    isCartEmpty(state) {
      return !state.currentUser.cart || state.currentUser.cart.length === 0
    },
    totalCost(state) {
      return state.currentUser.totalCost ? state.currentUser.totalCost : 0
    },
    isPromocodeApplied(state) {
      return state.isPromocodeApplied
    },
    promocodeSale(state) {
      return state.currentUser.promocodeSale
    },
    presentPrice(state) {
      return state.presentPrice
    }
  },

  mutations: {
    addProductToCart(state, {product, price, isSale, present, eachN}) {
      state.currentUser.cart.push({...product, quantity: 1, cost: price, price, isSale, present, eachN})
    },
    incrementQuantity(state, {id, price, eachN}) {
      const product = state.currentUser.cart.find(obj => obj.id === id)
      product.price = price
      product.quantity++
      if (eachN > 0) {
        product.cost = (product.quantity - Math.trunc(product.quantity / eachN)) * price
      } else {
        product.cost = product.quantity * price
      }
    },
    decrementQuantity(state, {id, price, eachN}) {
      const product = state.currentUser.cart.find(obj => obj.id === id)
      product.price = price
      if (product.quantity < 2) {
        const index = state.currentUser.cart.indexOf(product)
        index > -1 ? state.currentUser.cart.splice(index, 1) : null
        if (state.currentUser.cart.length === 0) {
          delete state.currentUser.promocodeSale
        }
      } else {
        product.quantity--
        if (eachN > 0) {
          product.cost = (product.quantity - Math.trunc(product.quantity / eachN)) * price
        } else {
          product.cost = product.quantity * price
        }
      }
    },
    removeProduct(state, productId) {
      const product = state.currentUser.cart.find(obj => obj.id === productId)
      const index = state.currentUser.cart.indexOf(product)
      index > -1 ? state.currentUser.cart.splice(index, 1) : null
      if (state.currentUser.cart.length === 0) {
        delete state.currentUser.promocodeSale
      }
    },
    totalCost(state) {
      if (state.isPromocodeApplied) {
        state.currentUser.totalCost = state.currentUser.cart.reduce((acc, obj) => {
          if (!obj.isSale) {
            return acc + obj.cost * (state.currentUser.promocodeSale ? state.currentUser.promocodeSale : 1)
          } else {
            return acc + obj.cost
          }
        }, 0)
      } else {
        state.currentUser.totalCost = state.currentUser.cart.reduce((acc, obj) => acc + obj.cost, 0)
      }
    },
    promocodeSale(state, sale) {
      state.currentUser.promocodeSale = 1 - sale/100
    },
    updateLocalStorage(state) {
      if (localStorage.getItem('currentUser')) {
        const updatedCart = JSON.parse(localStorage.getItem('currentUser'))
        updatedCart.cart = state.currentUser.cart
        updatedCart.totalCost = state.currentUser.totalCost
        updatedCart.promocodeSale = state.currentUser.promocodeSale
        localStorage.setItem('currentUser', JSON.stringify(updatedCart))
      }
    },
    clearCart(state) {
      state.currentUser = {}
      state.currentUser.cart = []
      state.currentUser.totalCost = 0
      delete state.currentUser.promocodeSale
    },
    clearCartList(state) {
      state.currentUser.cart = []
      state.currentUser.totalCost = 0
      delete state.currentUser.promocodeSale
    },
    promocodeApplied(state) {
      state.isPromocodeApplied = true
    },
    promocodeLoosen(state) {
      if (state.currentUser.cart.length === 0) state.isPromocodeApplied = false
    },
    setPresentPrice(state, price) {
      state.presentPrice = price
    }
  },

  actions: {
    addProductToCart({commit}, {product, price, isSale, present, eachN}) {
      commit('addProductToCart', {product, price, isSale, present, eachN})
      commit('totalCost')
      commit('updateLocalStorage')
    },
    incrementQuantity({commit}, {id, price, eachN}) {
      commit('incrementQuantity', {id, price, eachN})
      commit('totalCost')
      commit('updateLocalStorage')
    },
    decrementQuantity({commit}, {id, price, eachN}) {
      commit('decrementQuantity', {id, price, eachN})
      commit('promocodeLoosen')
      commit('totalCost')
      commit('updateLocalStorage')
    },
    removeProduct({commit}, productId) {
      commit('removeProduct', productId)
      commit('promocodeLoosen')
      commit('totalCost')
      commit('updateLocalStorage')
    },
    totalCost({commit}) {
      commit('totalCost')
      commit('updateLocalStorage')
    },
    promocodeSale({commit}, sale) {
      commit('promocodeSale', sale)
      commit('updateLocalStorage')
    },
    clearCartList({commit}) {
      commit('clearCartList')
      commit('updateLocalStorage')
      commit('promocodeLoosen')
      commit('updateLocalStorage')
    },
    async getPresentPrice({commit}, fbKey) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj/${fbKey}.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        commit('setPresentPrice', data.price)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    }
  }
}