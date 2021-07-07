import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import shop from '@/store/modules/shop'
import cart from '@/store/modules/cart'
import admin from '@/store/modules/admin'
import toast from '@/store/modules/toast'
import offers from '@/store/modules/offers'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {auth, shop, cart, admin, toast, offers}
})
