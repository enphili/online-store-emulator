<template>
  <the-meta-title title="Каталог товаров | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="container">

    <app-breadcrumbs />

    <h2 class="h2-title">Каталог Товаров</h2>
    <div class="shop-content">

      <shop-left-sidebar
        :categories="categories"
        @receiveFilter="query"
      />

      <div class="shop-grid-wrap">
        <app-loader v-if="isLoader"/>
        <div v-else>
          <shop-grid
            :products="productsChunk"
            v-if="isFilteredProducts"
          />

          <AppPagination
            v-if="isChunks"
            :allCount="Object.values(products).length"
            :size="PAGE_SIZE"
            v-model="page"
          />

          <h2 class="admin-grid-title" v-if="!isFilteredProducts && !isChunks">По вашему запросу ни чего не найдено! Попробуйте изменить поиск</h2>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadcrumbs from '@/components/ui/AppBreadcrumbs'
import ShopLeftSidebar from '@/components/shop/ShopLeftSidebar'
import ShopGrid from '@/components/shop/ShopGrid'
import AppPagination from '@/components/ui/AppPagination'
import TheMetaTitle from '@/components/TheMetaTitle'
import AppLoader from '@/components/ui/AppLoader'
import { useStore } from 'vuex'
import {onMounted, computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useLoadProductAndCategory} from '@/use/loadProductAndCateroies'
import {chunk} from '@/utils/chunk'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const searchText = ref(route.query.s)
    const selectedCategories = ref(route.query.cat)
    const isLoader = ref(false)

    onMounted( async () => {
      isLoader.value = true
      await useLoadProductAndCategory()
      isLoader.value = false
    })
    const categories = computed(() => store.getters['shop/allCategories'])
    const products = computed(() => store.getters['shop/sortAllProduct']
      .filter(product => searchText.value ? product.title.toLowerCase().includes(searchText.value) : true)
      .filter(product => selectedCategories.value ? selectedCategories.value.includes(product.category) : true))

    const isFilteredProducts = computed(() =>  products.value ? products.value.length !== 0 : false)

    const PAGE_SIZE = 12
    const page = ref(route.hash ? (route.hash).slice(1) : 1)
    const productsChunks = computed(() => chunk(Object.values(products.value), PAGE_SIZE))
    const productsChunk = computed(() => productsChunks.value[page.value - 1])
    const isChunks = computed(() => productsChunks.value.length > 1)
    const setPage = () => router.replace({query: {s: searchText.value, cat: selectedCategories.value}, hash: `#${page.value}`})
    onMounted(setPage)
    watch(page, setPage)


    const query = query => {
      searchText.value = query.s
      selectedCategories.value = query.cat
      page.value = 1
    }

    return {products, categories, isFilteredProducts, query, isChunks, PAGE_SIZE, page, productsChunk, isLoader}
  },

  components: {AppBreadcrumbs, ShopLeftSidebar, ShopGrid, AppPagination, TheMetaTitle, AppLoader}
}
</script>
