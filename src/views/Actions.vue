<template>
  <the-meta-title title="Акции и спецпредложения | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="container">
    <h2 class="h2-title">Акции и спецпредложения</h2>

    <app-loader v-if="isLoader"/>

    <div v-else class="shop-grid">

      <offer-wrap
        v-for="offer in offers"
        :key="offer"
        :offer="offer"
      ></offer-wrap>

    </div>

  </div>
</template>

<script>
import TheMetaTitle from '../components/TheMetaTitle'
import AppLoader from '../components/ui/AppLoader'
import OfferWrap from '../components/offers/OfferWrap'
import {useStore} from 'vuex'
import {computed, inject, onMounted, ref} from 'vue'
import {sortCorrectly} from '../utils/sortCorrectly'

export default {
  name: "Actions",

  setup() {
    const store = useStore()
    const isLoader = ref(false)
    const notification = inject('notification')

    onMounted( async () => {
      try {
        isLoader.value = true
        await store.dispatch('offers/loadOffers')
      }
      catch (e) {
        notification.error(e.message)
        throw new Error()
      }
      finally {
        isLoader.value = false
      }
    })

    const offers = computed(() => sortCorrectly(store.getters['offers/allOffers']))

    return {isLoader, offers}
  },
  components: {TheMetaTitle, AppLoader, OfferWrap}
}
</script>
