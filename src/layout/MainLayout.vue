<template>
  <the-header />
  <menu-bar />
  <router-view />
</template>

<script>
import TheHeader from '@/components/TheHeader'
import MenuBar from '@/components/ui/menu/MenuBar'

export default {

  components: { TheHeader, MenuBar }
}
</script>