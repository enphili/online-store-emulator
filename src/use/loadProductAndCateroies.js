import { useStore } from 'vuex'

export const useLoadProductAndCategory = async () => {
  const store = useStore()

  if (!store.getters['shop/allProducts'].length) {
    await store.dispatch('shop/loadProducts')
  }
  if (!store.getters['shop/allCategories'].length) {
    await store.dispatch('shop/loadCategories')
  }
}