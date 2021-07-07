<template>
  <div class="carttable-1"><img :src="product.img" class="showcartimg" :alt="product.title"></div>
  <div class="carttable-3">{{ product.title }}</div>
  <div class="carttable-3">{{ currency(product.price) }}</div>
  <div class="carttable-5">
    <button class="minustovar" @click="decrement">-</button></div>
  <div class="carttable-6">{{ product.quantity }}</div>
  <div class="carttable-5">
    <button class="plustovat" @click="increment" :disabled="product.quantity >= product.count">+</button>
  </div>
  <div class="carttable-7">{{ currency(product.cost) }}</div>
  <div class="carttable-8">
    <button class="deltovarfromcart" @click="removeProduct">удалить</button>
  </div>
</template>

<script>
import {currency} from '@/utils/currency'
import { useStore } from 'vuex'
import {computed, inject, onMounted, ref} from 'vue'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const notification = inject('notification')
    const store = useStore()
    const price = ref(0)

    onMounted( async () => {
      if (props.product.present) {
        try {
          await store.dispatch('cart/getPresentPrice', props.product.firebaseKey)
        } catch (e) {
          notification.error(e.message)
          throw new Error()
        }
      }
    })

    const increment = () => {
      const presentPrice = computed(() => store.getters['cart/presentPrice'])
      props.product.present ?  price.value = presentPrice.value : price.value = props.product.price
      store.dispatch('cart/incrementQuantity', {id: props.product.id, price: price.value, eachN: props.product.eachN})
    }
    const decrement = () => store.dispatch('cart/decrementQuantity', {id: props.product.id, price: price.value, eachN: props.product.eachN})
    const removeProduct = () => store.dispatch('cart/removeProduct', props.product.id)

    return {currency, increment, decrement, removeProduct}
  }
}
</script>