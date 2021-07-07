<template>
  <div class="admin-product-card">
    <div class="admin-product-img">
      <img :src="category.img" :alt="category.title">
    </div>
    <p class="admin-product-title">ID : <strong>{{ category.id }}</strong></p>
    <p class="admin-product-title bold">{{ category.title }}</p>
    <p class="admin-product-title">{{ category.type }}</p>
    <p class="admin-product-title residue">Использование: <span>{{ used }}</span></p>

    <div class="btn-block">
      <app-button btn-class="admin-btn" @click="openEditModal = true">Редактировать</app-button>
      <app-button btn-class="admin-btn danger" @click="openConfirm">Удалить</app-button>
    </div>

  </div>

  <teleport to="#app">
    <admin-category-edit-form
      v-if="openEditModal"
      @close-modal="openEditModal = false"
      :category="category"
    />
  </teleport>


  <teleport to="#tonot">
    <app-confirm
      v-if="showConfirm"
      :confirmTitle="modalTitle"
      :confirmText="modalText"
      @close-modal="showConfirm = false"
      @btn-reject="confirmNO"
      @btn-confirm="removeCategory"
    >
    </app-confirm>
  </teleport>


</template>

<script>
import AppButton from '@/components/ui/AppButton'
import AppConfirm from '@/components/ui/AppConfirm'
import AdminCategoryEditForm from '@/components/admin/AdminCategoryEditForm'
import {computed, ref, inject} from 'vue'
import { useStore } from 'vuex'
import {declOfNum} from '@/utils/declination'

export default {
  props: ['category', 'products'],

  setup(props) {
    const store = useStore()
    const showConfirm = ref(false)
    const openEditModal = ref(false)
    const modalTitle = ref('')
    const modalText = ref('')
    const notification = inject('notification')

    const used = computed(() => {
      return props.products.reduce((acc, product) => product.category === props.category.type ? acc + 1 : acc, 0)
    })

    const openConfirm = () => {
      if (used.value > 0) {
        notification.warning(`Удаление категории не возвожно,
      т.к. есть ${declOfNum(used.value, ['продукт', 'продукта', 'продуктов'])}
      зависящие от этой категории`)
      } else {
        showConfirm.value = true
        modalTitle.value = 'Удаление категории'
        modalText.value = 'Вы точно хотите удалить категорию'
      }
    }
    const confirmNO = () => {
      showConfirm.value = false
    }
    const removeCategory = async () => {

      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }

      showConfirm.value = false
      try {
        await store.dispatch('shop/removeSimpleCategory', props.category.firebaseKey)
        notification.success('Категория успешно удалена!')
      }
      catch (e) {
        notification.error(e.message)
        throw new Error()
      }
    }

    return {
      showConfirm,
      used,
      openConfirm,
      confirmNO,
      removeCategory,
      modalTitle,
      modalText,
      openEditModal,
    }
  },

  components: {AppButton, AppConfirm, AdminCategoryEditForm}
}
</script>