<template>
  <div class="card">
    <router-link :to="{name: 'product', params: {firebaseKey: product.firebaseKey}}">
      <div class="card__img">
        <img :src="product.img" :alt="product.title">
      </div>
    </router-link>
    <div class="card__block">
    <div class="card__title">{{ product.title }}</div>
    <div class="card__vendor-code">Артикул: {{ product.id }}</div>
    <div class="card__vendor-code">На складе: {{ product.count }}</div>
    <div class="card__price">Цена: {{ currency(product.price) }}</div>

    <app-button btnClass="card__btn" @click.once="addToCart" :isDisabled="isProductInCart">
      {{ isProductInCart ? product.count === 0 ? 'Нет на складе' : `Уже в корзине ${howManyInCart}` : 'В корзину' }}
    </app-button>

    </div>
  </div>
</template>

<script>
import {currency} from '@/utils/currency'
import { useStore } from 'vuex'
import {computed} from 'vue'
import AppButton from '@/components/ui/AppButton'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const store = useStore()

    const isProductInCart = computed(() => store.getters['cart/cart']
      .map(obj => obj.id).includes(props.product.id)
      || props.product.count === 0)

    const howManyInCart = computed(() => store.getters['cart/cart'].find(obj => obj.id === props.product.id)
      ? store.getters['cart/cart'].find(obj => obj.id === props.product.id).quantity : 0)


    const addToCart = () => store.dispatch('cart/addProductToCart', {product: props.product, price: props.product.price, isSale: false, eachN: 0})

    return {currency, addToCart, isProductInCart, howManyInCart}
  },

  components: {AppButton}
}
</script>