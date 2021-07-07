import { useStore } from 'vuex'

export const useLoadUsers = async () => {
  const store = useStore()
  await store.dispatch('admin/loadAllUsers')
}