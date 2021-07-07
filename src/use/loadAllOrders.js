import { useStore } from 'vuex'

export const useLoadAllOrders = async () => {
  const store = useStore()

  if (!store.getters['admin/allOrders'].length) {
    await store.dispatch('admin/loadAllOrders')
  }
}