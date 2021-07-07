<template>
  <div class="menu">
    <div class="container">
      <div class="menu-wrapper flex-center">

        <nav class="navbar">
          <ul class="flex-center">
            <menu-link :to="'/admin/products'">Продукты</menu-link>
            <menu-link :to="'/admin/category'">Категории</menu-link>
            <menu-link :to="'/admin/users'">Пользователи</menu-link>
            <menu-link :to="'/admin/orders'">Заказы</menu-link>
            <menu-link :to="'/admin/offers'">Акции</menu-link>
          </ul>
        </nav>

        <div class="flex-center">

          <app-button
            v-if="isAdmin"
            btnClass="mr-20"
            @click="$router.replace('/')"
          >В магазин</app-button>

          <div class="personal flex-center">
            <menu-exit-icon v-if="isAuthorized"/>
            <menu-login-icon v-else/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSearch from '@/components/ui/AppSearch'
import MenuLoginIcon from '@/components/ui/menu/MenuLoginIcon'
import MenuCartIcon from '@/components/ui/menu/MenuCartIcon'
import MenuExitIcon from '@/components/ui/menu/MenuExitIcon'
import MenuLink from '@/components/ui/menu/MenuLink'
import AppButton from '@/components/ui/AppButton'
import {useStore} from 'vuex'
import {computed} from 'vue'

export default {
  setup() {
    const store = useStore()
    const isAdmin = computed(() => store.getters['auth/isSuperAdmin'] || store.getters['auth/isAdmin'])
    const isAuthorized = computed(() => store.getters['auth/isAuthorized'])

    return { isAdmin, isAuthorized }
  },

  components: { AppSearch, MenuLoginIcon, MenuCartIcon, MenuExitIcon, MenuLink, AppButton }
}
</script>