<template>
  <the-meta-title title="Доступ в админку запрещен | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="container">
    <h2 class="h2-title">Вы не являетесь администратором! Доступ к редактированию запрещен!</h2>
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