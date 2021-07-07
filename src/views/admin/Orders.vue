<template>
  <the-meta-title title="Админка - заказы | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="admin-header">
    <h2 class="admin-grid-title">Список заказов</h2>
  </div>

  <div class="admin-product-grid">
    <admin-order-card
      v-for="order in ordersChunk"
      :key="order.timestamp"
      :order="order"
    />
  </div>

  <app-pagination
    v-if="isChunks"
    :allCount="orders.length"
    :size="PAGE_SIZE"
    v-model="page"
  />

</template>

<script>
import AdminOrderCard from '@/components/admin/AdminOrderCard'
import AppPagination from '@/components/ui/AppPagination'
import TheMetaTitle from '@/components/TheMetaTitle'
import {computed, onMounted, ref, watch} from 'vue'
import { useStore } from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {useLoadAllOrders} from '@/use/loadAllOrders'
import {chunk} from '@/utils/chunk'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    onMounted( async () =>  await useLoadAllOrders())
    const orders = computed(() => store.getters['admin/allOrders'])
    const PAGE_SIZE = 7
    const page = ref(route.query.page ? +route.query.page : 1)
    const ordersChunks = computed(() => chunk(orders.value, PAGE_SIZE))
    const ordersChunk = computed(() => ordersChunks.value[page.value - 1])
    const isChunks = computed(() => ordersChunks.value.length > 1)

    const setPage = () => router.replace({query:{page: page.value}})
    onMounted(setPage)
    watch(page, setPage)


    return {
      orders,
      PAGE_SIZE,
      page,
      ordersChunk,
      isChunks
    }
  },

  components: {AdminOrderCard, AppPagination, TheMetaTitle}
}
</script>