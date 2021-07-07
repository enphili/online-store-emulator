<template>
  <the-meta-title title="Страница благодарности | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="container">
    <h2 class="h2-title">Спасибо за покупку! Приходите еще, пишите письма</h2>
    <router-link to="/">
      <app-button>На главную</app-button>
    </router-link>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import TheMetaTitle from '@/components/TheMetaTitle'
export default {
  components: {AppButton, TheMetaTitle}
}
</script>