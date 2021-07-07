<template>
  <h2 class="h2-title">
    <span>Ваша корзина</span>
    <span v-if="isCartEmpty">&nbsp;пока пуста</span>
  </h2>
</template>

<script>
export default {
  props: {
    isCartEmpty: {
      type: Boolean,
      required: true
    }
  }
}
</script>