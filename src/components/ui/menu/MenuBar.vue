<template>
  <div class="menu">
    <div class="container">
      <div class="menu-wrapper flex-center">

        <nav class="navbar">
          <ul class="flex-center">
            <menu-link :to="'/'">Каталог</menu-link>
            <menu-link :to="'/actions'">Акции</menu-link>
          </ul>
        </nav>

        <div class="flex-center">

          <app-button v-if="isAdmin && isAuthorized" btn-class="mr-20" @click="$router.push('/admin')">
            В админку
          </app-button>

          <div class="personal flex-center">
            <menu-exit-icon v-if="isLogin"/>
	          <menu-login-icon v-else/>
	          <menu-cart-icon />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuLoginIcon from '@/components/ui/menu/MenuLoginIcon'
import MenuCartIcon from '@/components/ui/menu/MenuCartIcon'
import MenuExitIcon from '@/components/ui/menu/MenuExitIcon'
import MenuLink from '@/components/ui/menu/MenuLink'
import AppButton from '@/components/ui/AppButton'
import { useStore } from 'vuex'
import { computed } from 'vue'


export default {
  setup() {
    const store = useStore()
    const isAuthorized = computed(() => store.getters['auth/isAuthorized'])
    const isLogin = computed(() => store.getters['auth/isLogin'])
    const isAdmin = computed(() => store.getters['auth/isSuperAdmin'] || store.getters['auth/isAdmin'])

    return { isAuthorized, isAdmin, isLogin }
  },

	components: {MenuLoginIcon, MenuCartIcon, MenuExitIcon, MenuLink, AppButton}
}
</script>