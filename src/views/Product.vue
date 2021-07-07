<template>
  <the-meta-title :title="product.title + ' | V-Shop - эмулятор интернет магазина'"></the-meta-title>

  <div class="container">
    <app-loader v-if="isLoader"/>

    <product-wrap v-else
      :product="product"
      :productInCart="productInCart"
      :offers="offers"
      :isProductExist="isProductExist"
      :firebaseKey="firebaseKey"
    />

  </div>
</template>

<script>
import {computed, onMounted, ref, inject} from 'vue'
import { useStore } from  'vuex'
import {useRoute} from 'vue-router'
import TheMetaTitle from '@/components/TheMetaTitle'
import AppLoader from '@/components/ui/AppLoader'
import ProductWrap from '../components/product/ProductWrap'

export default {
  props: ['firebaseKey'],

  setup(props) {
    const store = useStore()
    const route = useRoute()
    const isProductExist = ref(false)
    const notification = inject('notification')
    const isLoader = ref(false)

    onMounted( async () => {
      try {
        isLoader.value = true
        await store.dispatch('offers/loadOffers')
        await store.dispatch('shop/loadSingleProduct', props.firebaseKey)
        route.meta.breadcrumb[1].name = computed(() => store.getters['shop/SingleProduct']).value.title
        isLoader.value = false
      }
      catch (e) {
        isLoader.value = false
        isProductExist.value = false
        notification.error(e.message)
        throw new Error()
      }
    })

    const offers = computed(() => store.getters['offers/allOffers'])

    const product = computed(() => store.getters['shop/SingleProduct'])
    isProductExist.value = !!product.value

    const productInCart = computed(() => store.getters['cart/cart'].find(obj => obj.id === product.value.id))

    return {product, isProductExist, productInCart, isLoader, offers}
  },


  components: {TheMetaTitle, AppLoader, ProductWrap}
}
</script>