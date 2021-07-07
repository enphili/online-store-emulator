import {errors} from '@/utils/errors'
import {unregister} from '@/use/fetchInterceptTest'

  // ?auth=${rootGetters['auth/token']}




export default {
  namespaced: true,
  state() {
    const allUsers = []
    const allOrders = []

    return {allUsers, allOrders}
  },

  getters: {
    allUsers(state) {
      return state.allUsers
    },
    allOrders(state) {
      return state.allOrders
    }
  },

  mutations: {
    setAllUsers(state, array) {
      state.allUsers = array
    },
    setAllOrders(state, orders) {
      state.allOrders = orders
    }
  },

  actions: {
    async loadAllUsers({commit, rootGetters }) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/users.json?auth=`
        const response = await fetch(url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        commit('setAllUsers', Object.values(data))
      } catch (e) {
        console.log(errors(e.message))
        throw new Error()
      }
    },

    async loadAllOrders({commit, rootGetters }) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/orders.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        commit('setAllOrders', Object.values(data))
      } catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async updateUser({dispatch, rootGetters }, {key, role}) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/users/${key}.json?auth=`
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({role})
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        await dispatch('loadAllUsers')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async saveOrder({commit, rootGetters}, order) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/products_obj.json`
        const response = await fetch(url)
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)

        let countErrorMessage = ''
        const notEnough = order.list.filter(list => Object.values(data).find(obj => obj.id === list.productID && obj.count < list.quantity))
        if (notEnough.length > 0) {
          notEnough.forEach(el => {
            countErrorMessage += `${el.productName} - ${el.quantity} ед.`
          })
          throw new Error(`Извините, количество товара в заказе ${countErrorMessage} превышает количество на складе. Пожалуйста измените количество.`)
        }

        const url2 = `${process.env.VUE_APP_BASE_BD_URL}/orders/${order.timestamp}.json`
        const response2 = await fetch(url2, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...order})
        })
        if (!response2.ok) throw new Error(response2.statusText)
        const data2 = await response2.json()
        if (!data2) throw new Error(data2.error.message)


        const updateProductList = {}
        order.list.forEach(el => {
          updateProductList[el.firebaseKey] = {
            count: data[el.firebaseKey].count - el.quantity,
            category: data[el.firebaseKey].category,
            dataCreated: data[el.firebaseKey].dataCreated,
            firebaseKey: data[el.firebaseKey].firebaseKey,
            id: data[el.firebaseKey].id,
            img: data[el.firebaseKey].img,
            price: data[el.firebaseKey].price,
            title: data[el.firebaseKey].title
          }
        })
        const url3 = `${process.env.VUE_APP_BASE_BD_URL}/products_obj.json`
        const response3 = await fetch(url3, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...updateProductList})
        })
        if (!response3.ok) throw new Error(response3.statusText)
        const data3 = await response3.json()
        if (!data3) throw new Error(data3.error.message)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async updateOrderStatus({dispatch}, timestamp) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/orders/${timestamp}.json`
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({status: 'paid'})
        })
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json()
        if (!data) throw new Error(data.error.message)
        await dispatch('loadAllOrders')
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async removeUser({dispatch, rootGetters }, {userID, idToken}) {
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/users/${userID}.json?auth=`
        const response = await fetch(url, {method: 'DELETE'})
        if (!response.ok) throw new Error(response.statusText)
        const url2 = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.VUE_APP_API_KEY}`
        const response2 = await fetch(url2, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({idToken})
        })
        const data2 = await response2.json()
        if (!response2.ok) throw new Error(data2.error.message)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    }
  }
}




