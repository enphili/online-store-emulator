<template>
  <the-meta-title title="Админка - пользователи | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="admin-header">
    <h2 class="admin-grid-title">Список пользователей</h2>
  </div>

  <div class="admin-product-grid">
    <admin-user-card
      v-for="user in usersChunk"
      :key="user.uiID"
      :user="user"
    />
  </div>

  <AppPagination
    v-if="isChunks"
    :allCount="Object.values(users).length"
    :size="PAGE_SIZE"
    v-model="page"
  />

</template>

<script>
import AdminUserCard from '@/components/admin/AdminUserCard'
import AppPagination from '@/components/ui/AppPagination'
import TheMetaTitle from '@/components/TheMetaTitle'
import {computed, onMounted, ref, watch} from 'vue'
import { useStore } from 'vuex'
import {useLoadUsers} from '@/use/loadUsers'
import {chunk} from '@/utils/chunk'
import {useRoute, useRouter} from 'vue-router'
export default {
  setup() {
    const state = useStore()
    const router = useRouter()
    const route = useRoute()

    onMounted( async () =>  await useLoadUsers())
    const users = computed(() => state.getters['admin/allUsers'])

    const PAGE_SIZE = 7
    const page = ref(route.query.page ? +route.query.page : 1)
    const usersChunks = computed(() => chunk(Object.values(users.value), PAGE_SIZE))
    const usersChunk = computed(() => usersChunks.value[page.value - 1])
    const isChunks = computed(() => usersChunks.value.length > 1)
    const setPage = () => router.replace({query:{page: page.value}})
    onMounted(setPage)
    watch(page, setPage)

    return {
      users,
      usersChunk,
      PAGE_SIZE,
      page,
      isChunks
    }
  },

  components: {AdminUserCard, AppPagination, TheMetaTitle}
}
</script>