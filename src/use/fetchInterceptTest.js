import fetchIntercept from 'fetch-intercept'
import store from '@/store'
import router from '@/router'

export const unregister = fetchIntercept.register({

  request: async function (url, config) {
    const hasAuth = url.split('auth')[1]
    if (hasAuth && hasAuth.length === 1) {
      if (store.getters['auth/isAuthorized'] && store.getters['auth/isExpired']) {
        await store.dispatch('auth/refresh')
      }
      url += store.getters['auth/token']
    }
    return [url, config];
  },

  requestError: function (error) {
    return Promise.reject(error);
  },

  response: function (response) {
    return response;
  },

  responseError: function (error) {
    console.log(error)
    if (error.status === 401) {
      console.log('notautorized')
      store.commit('auth/logout')
      router.push('/login?message=notautorized')
    }

    return Promise.reject(error);
  }

})