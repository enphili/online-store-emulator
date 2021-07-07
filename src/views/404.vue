<template>
  <the-meta-title title="Страница не найдена | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="container">
    <h2 class="h2-title">Страница не найдена. Ошибка 404</h2>
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