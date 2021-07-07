<template>
  <the-meta-title title="Админка - главная | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="container" v-if="isAdmin">

    <admin-title v-if="!isParent"/>

    <router-view></router-view>

  </div>


  <div class="container" v-else>
    <h2 class="h2-title">Доспуп к администрированию закрыт. У Вас недостаточно прав. </h2>
    <router-link to="/">
      <app-button>На главную</app-button>
    </router-link>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import {computed} from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '@/components/ui/AppButton'
import AdminTitle from '@/components/admin/AdminTitle'
import TheMetaTitle from '@/components/TheMetaTitle'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    const isParent = computed(() => ['/admin/products', '/admin/category', '/admin/users', '/admin/orders', '/admin/offers'].includes(route.path))

    const isAdmin = computed(() => store.getters['auth/isSuperAdmin'] || store.getters['auth/isAdmin'])

    return {isAdmin, isParent}
  },

  components: {AppButton, AdminTitle, TheMetaTitle}
}
</script>