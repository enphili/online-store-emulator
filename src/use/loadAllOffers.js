import { useStore } from 'vuex'

export const useLoadAllOffers = async () => {
  const store = useStore()

  if (!store.getters['offers/allOffers'].length) {
    await store.dispatch('offers/loadOffers')
  }
}