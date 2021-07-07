<template>
  <the-meta-title title="Админка - акции | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="admin-header">
    <h2 class="admin-grid-title">Список акций и спецпредложений</h2>
    <app-button btn-class="admin-btn" @click="showNewOfferForm = true">Добавить новую</app-button>
  </div>

  <app-loader v-if="isLoader"/>

  <div v-else class="admin-product-grid">
    <AdminOffersCard
      v-for="offer in offers"
      :offer="offer"
      :products="products"
    />
  </div>

  <teleport to="#app">
    <admin-offer-add-form
      v-if="showNewOfferForm"
      :products="products"
      @close-modal="showNewOfferForm = false"
    />
  </teleport>

</template>

<script>
import TheMetaTitle from '../../components/TheMetaTitle'
import AdminOffersCard from '../../components/admin/AdminOffersCard'
import AppLoader from '../../components/ui/AppLoader'
import AdminOfferAddForm from '../../components/admin/AdminOfferAddForm'
import AppButton from '../../components/ui/AppButton'
import {useLoadAllOffers} from '../../use/loadAllOffers'
import {useStore} from 'vuex'
import {computed, inject, onMounted, ref} from 'vue'

export default {
  name: "Offers",

  setup() {
    const store = useStore()
    const isLoader = ref(false)
    const notification = inject('notification')
    const showNewOfferForm = ref(false)

    onMounted( async () => {
      try {
        isLoader.value = true
        await useLoadAllOffers()
        if (!store.getters['shop/allProducts'].length) {
          await store.dispatch('shop/loadProducts')
        }
        isLoader.value = false
      } catch (e) {
        isLoader.value = false
        notification.error(e.message)
        throw new Error()
      }
    })

    const offers = computed(() => store.getters['offers/allOffers'])
    const products = computed(() => store.getters['shop/allProducts'])

    return {offers, isLoader, products, showNewOfferForm}
  },

  components: {TheMetaTitle, AdminOffersCard, AppLoader, AppButton, AdminOfferAddForm}
}
</script>