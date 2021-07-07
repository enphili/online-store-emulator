<template>
  <div class="admin-product-card">
    <div class="admin-product-img">
      <img :src="product.img" :alt="product.title">
    </div>
    <p class="admin-product-title">Артикул: <strong>{{ product.id }}</strong></p>
    <p class="admin-product-title bold">{{ product.title }}</p>
    <p class="admin-product-title residue">Остаток : <span>{{ product.count }}</span></p>
    <div class="btn-block">
      <app-button
        btn-class="admin-btn"
        @click="openEditModal = true"
      >
        Редактировать
      </app-button>

      <app-button btn-class="admin-btn danger" @click="openConfirm">Удалить</app-button>
    </div>
  </div>

  <teleport to="#app">
    <admin-product-edit-form
      v-if="openEditModal"
      @close-modal="openEditModal = false"
      :product="product"
      :categories="categories"
      @updated-true="$emit('updated-true')"
    />
  </teleport>

  <teleport to="#tonot">
    <app-confirm
      v-if="showConfirm"
      :confirmTitle="modalTitle"
      :confirmText="modalText"
      @close-modal="showConfirm = false"
      @btn-reject="showConfirm = false"
      @btn-confirm="removeProduct"
    >
    </app-confirm>
  </teleport>


</template>

<script>
import AppButton from '@/components/ui/AppButton'
import AdminProductEditForm from '@/components/admin/AdminProductEditForm'
import AppConfirm from '@/components/ui/AppConfirm'
import {inject, ref} from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['updated-true', 'remove-product-success'],

  props: ['product', 'categories'],

  setup(props, {emit}) {
    const store = useStore()
    const openEditModal = ref(false)
    const showConfirm = ref(false)
    const modalTitle = ref('')
    const modalText = ref('')
    const notification = inject('notification')

    const openConfirm = () => {
      modalTitle.value = 'Удаление данных'
      modalText.value = 'Вы точно хотите удалить данный продукт?'
      showConfirm.value = true
    }

    const removeProduct = async () => {
      showConfirm.value = false

      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }

      try {
        await store.dispatch('shop/removeSimpleProduct', props.product.firebaseKey)
        notification.success('Продукт успешно удален!')
        emit('remove-product-success')
      } catch (e) {
        notification.error(e.message)
        throw new Error()
      }
    }

    return {
      openEditModal,
      removeProduct,
      modalTitle,
      modalText,
      showConfirm,
      openConfirm,
    }
  },

  components: {AppButton, AdminProductEditForm, AppConfirm}
}
</script>