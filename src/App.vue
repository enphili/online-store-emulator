<template>
  <component :is="layout + '-layout'" v-if="layout"></component>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'
import AdminLayout from '@/layout/AdminLayout'

export default {
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  },

  components: { MainLayout, AuthLayout, AdminLayout }
}
</script>
