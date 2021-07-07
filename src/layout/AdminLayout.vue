<template>
  <the-header />
  <admin-menu />
  <router-view />
</template>

<script>
import TheHeader from '@/components/TheHeader'
import AdminMenu from '@/components/admin/AdminMenu'
export default {


  components: { TheHeader, AdminMenu }
}
</script>