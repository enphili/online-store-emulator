<template>
  <div class="personal__wrap">
    <router-link v-slot="{navigate}" custom :to="{name: 'login'}">
      <a href="#" class="link-p flex-center" @click="navigate">
        <div class="link-p__wrap flex-center">
          <div class="link-p__icon">
            <svg width="26" height="26" viewBox="-4 -3 26 26"><g stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2"></path><circle cx="8" cy="4" r="4"></circle></g></svg>
          </div>
          <div class="link-p__text">{{ userName ? userName : 'Войти' }}</div>
        </div>
      </a>
    </router-link>

  </div>
</template>

<script>
import {useStore} from 'vuex'
import { computed } from 'vue'

export default {

  setup() {
    const store = useStore()

    return {
      userName: computed(() => store.getters['auth/displayName'])
    }
  }
}
</script>