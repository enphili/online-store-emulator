<template>
  <the-meta-title title="Админка - продукты | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="admin-header">
    <h2 class="admin-grid-title">Список товаров</h2>
    <app-button btn-class="admin-btn" @click="showNewProductForm = true">Добавить новый</app-button>
  </div>

  <div class="admin-product-grid">
    <AdminProductCard
      v-for="product in productsChunk"
      :key="product.id"
      :product="product"
      :categories="categories"
      @updated-true="anyOneWasRemovedOrUpdated = true"
      @remove-product-success="anyOneWasRemovedOrUpdated = true"
    />
  </div>

  <AppPagination
    v-if="isChunks"
    :allCount="Object.values(products).length"
    :size="PAGE_SIZE"
    v-model="page"
  />

  <teleport to="#app">
    <AdminProductAddForm
      v-if="showNewProductForm"
      @close-modal="showNewProductForm = false"
      :categories="categories"
    />
  </teleport>

  <teleport to="#tonot">
    <app-confirm
      v-if="showConfirm"
      :confirmTitle="modalTitle"
      :confirmText="modalText"
      :btnTextNO="confirmBtnTextNO"
      :btnTextOK="confirmBtnTextOK"
      @close-modal="showConfirm = false"
      @btn-reject="confirmNO"
      @btn-confirm="confirmOk"
    >
    </app-confirm>
  </teleport>

</template>

<script>
import AdminProductCard from '@/components/admin/AdminProductCard'
import AdminProductAddForm from '@/components/admin/AdminProductAddForm'
import AppButton from '@/components/ui/AppButton'
import AppModalWrap from '@/components/ui/AppModalWrap'
import AppConfirm from '@/components/ui/AppConfirm'
import AppPagination from '@/components/ui/AppPagination'
import TheMetaTitle from '@/components/TheMetaTitle'
import {computed, onMounted, ref, watch} from 'vue'
import { useStore } from 'vuex'
import {onBeforeRouteLeave, useRouter, useRoute} from 'vue-router'
import {useLoadProductAndCategory} from '@/use/loadProductAndCateroies'
import {chunk} from '@/utils/chunk'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const showNewProductForm = ref(false)
    const modalTitle = ref('')
    const modalText = ref('')
    const areYouSure = ref(false)
    const showConfirm = ref(false)
    const currentProduct = ref('')
    const confirmBtnTextOK = ref('да')
    const confirmBtnTextNO = ref('нет')
    let goTo = ''
    const deleteBtnWasPress = ref(false)
    const anyOneWasRemovedOrUpdated = ref(false)

    onMounted( async () =>  await useLoadProductAndCategory())

    const products = computed(() => store.getters['shop/allProducts']
      .sort((a, b) => new Date(b.dataCreated) - new Date(a.dataCreated)))

    const categories = computed(() => store.getters['shop/allCategories'])


    const PAGE_SIZE = 7
    const page = ref(route.query.page ? +route.query.page : 1)
    const productsChunks = computed(() => chunk(Object.values(products.value), PAGE_SIZE))
    const productsChunk = computed(() => productsChunks.value[page.value - 1])
    const isChunks = computed(() => productsChunks.value.length > 1)
    const setPage = () => router.replace({query:{page: page.value}})
    onMounted(setPage)
    watch(page, setPage)


    const confirmOk = async () => {
      anyOneWasRemovedOrUpdated.value = true
      router.push(goTo)
    }

    const confirmNO = () => {
      areYouSure.value = false
      showConfirm.value = false
    }

    onBeforeRouteLeave(to => {
      goTo = to.path
      if (!anyOneWasRemovedOrUpdated.value) {
        showConfirm.value = true
        confirmBtnTextOK.value = 'Уйти без изменений'
        confirmBtnTextNO.value = 'Остаться'
        modalTitle.value = 'Изменения на странице'
        modalText.value = 'Не было ни каких изменений на странице! Все равно уйти без изменений?))'
        return false
      }
    })

    return {products,
      showNewProductForm,
      categories,
      modalText,
      modalTitle,
      areYouSure,
      showConfirm,
      confirmOk,
      confirmNO,
      confirmBtnTextOK,
      confirmBtnTextNO,
      currentProduct,
      anyOneWasRemovedOrUpdated,
      deleteBtnWasPress,
      PAGE_SIZE,
      page,
      productsChunk,
      isChunks
    }
  },

  components: {
    AdminProductCard, AppButton,
    AdminProductAddForm,
    AppModalWrap, AppConfirm,
    AppPagination,
    TheMetaTitle
  }
}
</script>