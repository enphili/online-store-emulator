import {errors} from '@/utils/errors'
import {useGetLSData} from '@/use/getDataFromLocalStorage'
import {unregister} from '@/use/fetchInterceptTest'


export default {
  namespaced: true,
  state() {
    const currentUser = {
      token: useGetLSData('token'),
      refreshToken: useGetLSData('refreshToken'),
      userName: useGetLSData('userName'),
      role: useGetLSData('role'),
      expiresDate: useGetLSData('expiresDate'),
      userID: useGetLSData('userID'),
      userEmail: useGetLSData('userEmail')
    }
    return {currentUser}
  },

  getters: {
    token(state) {
      return state.currentUser.token
    },
    currentUser(state) {
      return state.currentUser
    },
    uid(state) {
      return state.currentUser.userID
    },
    role(state) {
      return state.currentUser.role
    },
    isAuthorized(_, getters) {
      return !!getters.token
    },
    isExpired(state) {
      return new Date().getTime() >= state.currentUser.expiresDate
    },
    isLogin(state, getters) {
      return !!state.currentUser.userName
    },
    isSuperAdmin(_, getters) {
      return getters.role === 'superadmin'
    },
    isAdmin(_, getters) {
      return getters.role === 'admin'
    },
    isNotAdmin(_, getters) {
      return getters.role === 'buyer'
    },
    displayName(state) {
      return state.currentUser.userName
    },
    userEmail(state) {
      return state.currentUser.userEmail
    }
  },

  mutations: {
    setCurrentUserData(state, {token, refreshToken, uid, name, email, role, expiresIn = '3600'}) {
      state.currentUser.token = token
      state.currentUser.refreshToken = refreshToken
      state.currentUser.userID = uid
      state.currentUser.userName = name
      state.currentUser.userEmail = email
      state.currentUser.role = role
      state.currentUser.expiresDate =`${new Date().getTime() + Number(expiresIn) * 1000}`
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
    },
    setRefreshToken(state, {token, refreshToken, expiresIn = '3600'}) {
      state.currentUser.token = token
      state.currentUser.refreshToken = refreshToken
      state.currentUser.expiresDate =`${new Date().getTime() + Number(expiresIn) * 1000}`
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
    },
    logout(state) {
      state.currentUser = {}
      localStorage.removeItem('currentUser')
    }
  },

  actions: {
    async login({ commit }, formData) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_API_KEY}`
        const res = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...formData, returnSecureToken: true})
        })
        const data = await res.json()
        if (!res.ok)  throw new Error(data.error.message)
        const url2 = `${process.env.VUE_APP_BASE_BD_URL}/users/${data.localId}.json?auth=${data.idToken}`
        const response2 = await fetch(url2)
        const data2 = await response2.json()
        if (!response2) throw new Error(errors(data2.error))
        commit('setCurrentUserData', {
          token: data.idToken,
          refreshToken: data.refreshToken,
          uid: data.localId,
          name: data2.login,
          email: data2.email,
          role: data2.role
        })
      } catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async registry({ dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_API_KEY}`
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({...payload, returnSecureToken: true})
        })
        if (!response.ok) throw new Error(errors(response.statusText))
        const data = await response.json()
        if (!data) throw new Error(errors(data.error.message))
        const newPayload = {
          ...payload,
          role: 'buyer',
          uiID: data.localId,
          idToken: data.idToken
        }
        const url2 = `${process.env.VUE_APP_BASE_BD_URL}/users/${data.localId}.json?auth=${data.idToken}`
        const response2 = await fetch(url2, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newPayload)
        })
        if (!response2.ok) throw new Error(errors(response2.statusText))
        const data2 = await response2.json()
        if (!data2) throw new Error(errors(data2.error))
        await dispatch('login', {email: payload.email, password: payload.password})
      } catch (e) {
        throw new Error(errors(e.message))
      }
    },

    async refresh({state, commit}) {
      try {
        const url = `https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_API_KEY}`
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({grant_type: 'refresh_token', refresh_token: state.currentUser.refreshToken})
        })
        if (!response.ok) throw new Error(errors(response.statusText))
        const data = await response.json()
        if (!data) throw new Error(errors(data.error.message))
        commit('setRefreshToken', {
          token: data.id_token,
          refreshToken: data.refresh_token,
          expiresIn: data.expires_in
        })
      }
      catch (e) {
        console.log(e.message)
      }
    },

    async passwordRecovery(_, {email}) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.VUE_APP_API_KEY}`
        const res = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'X-Firebase-Locale': 'RU-ru'},
          body: JSON.stringify({requestType: 'PASSWORD_RESET', email})
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error.message)
      }
      catch (e) {
        throw new Error(errors(e.message))
      }
    }
  }
}