<template>
  <div v-if="isProductExist">
    <app-breadcrumbs/>
    <div class="product-wrap">
    <div>
      <div class="product-img">
        <img :src="product.img" :alt="product.title">
      </div>
      <div class="product-price">
        Цена: <span class="product-span" :class="{productspansale: isSale}">{{ currency(product.price) }}</span>
      </div>
      <div class="product-price" v-if="isSale">
        Цена со скидкой: <span class="product-span">{{ currency(price)}}</span>
      </div>
    </div>

    <div class="product-content">
      <h2 class="h2-title">{{ product.title }}</h2>
      <div class="product-description">
        {{ product.description }}
      </div>

      <div class="card__title mt-30">
        Сейчас в вашей корзине {{ productInCart ? productInCart.quantity : 0 }} ед. данного товара
      </div>

      <app-button @click="addToCart" :isDisabled="!!productInCart">
        {{ productInCart ? product.count === 0 ? 'Нет на складе' : `Уже в корзине`  : 'В корзину' }}
      </app-button>

      <div class="mt-10">
        <app-button
          btn-class="card__btn"
          @click="increment"
          :isDisabled="!productInCart || productInCart.quantity >= productInCart.count"
        >+</app-button>

        <div class="product-count">{{ productInCart ? productInCart.quantity : 0 }}</div>

        <app-button
          btn-class="danger card__btn"
          :isDisabled="!productInCart"
          @click="decrement"
        >-</app-button>
        <div class="card__title nobold">Изменить количество</div>
      </div>

      <div class="card__price mt-30">На складе осталось: <strong>{{ product.count }} ед.</strong></div>
      <div class="h2-title">
        Сумма: {{ currency(productInCart ? productInCart.cost : 0) }}
      </div>
    </div>
  </div>
  </div>

  <h2 class="h2-title" v-else>Похоже что такого товара нет в нашем магазине. Посмотрите в
    <router-link to="/">каталоге</router-link>
  </h2>
</template>

<script>
import {currency} from '../../utils/currency'
import AppButton from '../ui/AppButton'
import AppBreadcrumbs from '../ui/AppBreadcrumbs'
import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

export default {
  name: "ProductWrap",
  props: ['product', 'productInCart', 'offers', 'isProductExist', 'firebaseKey'],

  setup(props) {
    const store = useStore()
    const route = useRoute()
    const sale = ref(null)
    const isSale = ref(false)
    const isPresent = ref(false)
    const presentID = ref('')
    const eachN = ref(0)

    const offer = props.offers.find(obj => obj.productID === props.firebaseKey)

    if (route.query.offer) {
      if (offer && offer.type === 'sale') {
        isSale.value = true
        sale.value = offer.sale
      }
      if (offer && offer.type === 'present') {
        isPresent.value = true
        presentID.value = offer.presentID
      }
      if (offer && offer.type === 'plusone') {
        eachN.value = offer.eachN
      }
    }

    const price = computed( () => isSale.value ? props.product.price * (1 - sale.value/100) : props.product.price)

    const addToCart = async () => {
      if (eachN.value > 0) {
        await store.dispatch('cart/addProductToCart', {product: props.product, price: price.value, isSale: false, eachN: eachN.value})
      } else {
        await store.dispatch('cart/addProductToCart', {product: props.product, price: price.value, isSale: isSale.value, eachN: 0})
      }
      if (isPresent.value) {
        await store.dispatch('shop/loadPresentProduct', presentID.value)
        const presentProduct = computed(() => store.getters['shop/presentProduct'])
        await store.dispatch('cart/addProductToCart', {product: presentProduct.value, price: 0, isSale: false, present: true})
      }
    }
    const increment = () => store.dispatch('cart/incrementQuantity', {id: props.product.id, price: price.value, eachN: eachN.value})
    const decrement = () => store.dispatch('cart/decrementQuantity', {id: props.product.id, price: price.value, eachN: eachN.value })

    return {currency, isSale, price, addToCart, increment, decrement }
  },

  components: {AppButton, AppBreadcrumbs}
}
</script>
