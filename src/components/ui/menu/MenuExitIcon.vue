<template>
  <div class="personal__wrap">
    <a href="#" class="link-p flex-center" @click.prevent="logout">
      <div class="link-p__wrap flex-center">
        <div class="link-p__icon" title="Выйти">
          <svg width="25" height="25" x="0" y="0" viewBox="0 0 512 512">
  <g transform="matrix(0.7,0,0,0.7,56.32,56.32)"><g><g>
    <path d="M255.15,468.625H63.787c-11.737,0-21.262-9.526-21.262-21.262V64.638c0-11.737,9.526-21.262,21.262-21.262H255.15    c11.758,0,21.262-9.504,21.262-21.262S266.908,0.85,255.15,0.85H63.787C28.619,0.85,0,29.47,0,64.638v382.724    c0,35.168,28.619,63.787,63.787,63.787H255.15c11.758,0,21.262-9.504,21.262-21.262    C276.412,478.129,266.908,468.625,255.15,468.625z" fill="#ffffff"/>
    </g></g><g>	<g>
    <path d="M505.664,240.861L376.388,113.286c-8.335-8.25-21.815-8.143-30.065,0.213s-8.165,21.815,0.213,30.065l92.385,91.173    H191.362c-11.758,0-21.262,9.504-21.262,21.262c0,11.758,9.504,21.263,21.262,21.263h247.559l-92.385,91.173    c-8.377,8.25-8.441,21.709-0.213,30.065c4.167,4.21,9.653,6.336,15.139,6.336c5.401,0,10.801-2.041,14.926-6.124l129.276-127.575    c4.04-3.997,6.336-9.441,6.336-15.139C512,250.302,509.725,244.88,505.664,240.861z" fill="#ffffff"/>
    </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g></svg>
        </div>
        <div class="link-p__text">{{ userName ? userName : 'Выйти' }}</div>
      </div>
    </a>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const logout = () => {
      store.commit('auth/logout')
      store.commit('cart/clearCart')
      router.replace('/')
    }

    return {
      logout,
      userName: computed(() => store.getters['auth/displayName'])
    }
  }
}
</script>