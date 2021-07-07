<template>
  <the-meta-title title="Админка - категории | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="admin-header">
    <h2 class="admin-grid-title">Список категорий</h2>
    <app-button btn-class="admin-btn" @click="showNewCategoryForm = true">Добавить новую</app-button>
  </div>

  <div class="admin-product-grid">
    <AdminCategoryCard
      v-for="category in categoriesChunk"
      :key="category.id"
      :products="products"
      :category="category"
    />
  </div>

  <app-pagination
    v-if="isChunks"
    :allCount="Object.values(categories).length"
    :size="PAGE_SIZE"
    v-model="page"
  />

  <teleport to="#app">
    <AdminCategoryAddForm
      v-if="showNewCategoryForm"
      @close-modal="showNewCategoryForm = false"
    />
  </teleport>

</template>


<script>
import AppButton from '@/components/ui/AppButton'
import AdminCategoryCard from '@/components/admin/AdminCategoryCard'
import AppConfirm from '@/components/ui/AppConfirm'
import AdminCategoryAddForm from '@/components/admin/AdminCategoryAddForm'
import AppPagination from '@/components/ui/AppPagination'
import TheMetaTitle from '@/components/TheMetaTitle'
import {computed, onMounted, ref, watch} from 'vue'
import { useStore } from 'vuex'
import {useLoadProductAndCategory} from '@/use/loadProductAndCateroies'
import {useRoute, useRouter} from 'vue-router'
import {chunk} from '@/utils/chunk'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const showNewCategoryForm = ref(false)
    const showConfirm = ref(false)
    const modalTitle = ref('')
    const modalText = ref('')

    onMounted( async () =>  await useLoadProductAndCategory())
    const products = computed(() => store.getters['shop/allProducts'])
    const categories = computed(() => store.getters['shop/allCategories'])

    const PAGE_SIZE = 7
    const page = ref(route.query.page ? +route.query.page : 1)
    const categoriesChunks = computed(() => chunk(Object.values(categories.value), PAGE_SIZE))
    const categoriesChunk = computed(() => categoriesChunks.value[page.value - 1])
    const isChunks = computed(() => categoriesChunks.value.length > 1)
    const setPage = () => router.replace({query:{page: page.value}})
    onMounted(setPage)
    watch(page, setPage)

    return {
      products,
      categories,
      modalTitle,
      modalText,
      showNewCategoryForm,
      showConfirm,
      PAGE_SIZE,
      page,
      categoriesChunk,
      isChunks
    }
  },

  components: {AppButton,
    AdminCategoryCard,
    AppConfirm,
    AdminCategoryAddForm,
    AppPagination,
    TheMetaTitle}
}
</script>