<template>
  <div class="shop-grid">

    <shop-preview-cart
      v-for="product in products"
      :key="product.id"
      :product="product"
    />

  </div>
</template>

<script>
import ShopPreviewCart from '@/components/shop/ShopPreviewCart'

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },

  components: {ShopPreviewCart}
}
</script>