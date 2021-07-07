<template>
  <app-loader v-if="isLoader"/>
  <div v-else class="admin-product-card">
    <div class="admin-product-img">
      <picture>
        <source type="image/webp" :srcset="require(`@/assets/img/${offer.img}.webp`)">
        <img :src="require(`@/assets/img/${offer.img}.jpg`)" :alt="offer.type">
      </picture>
    </div>
    <p class="admin-product-title">{{ offer.title }}</p>
    <div class="btn-block">
      <app-button btn-class="admin-btn" @click="openEditModal = true">Редактировать</app-button>
      <app-button btn-class="admin-btn danger" @click="openConfirm">Удалить</app-button>
    </div>
  </div>

  <teleport to="#app">
    <admin-offer-edit-form
      v-if="openEditModal"
      @close-modal="openEditModal = false"
      :offer="offer"
      :products="products"
    />
  </teleport>

  <teleport to="#tonot">
    <app-confirm
      v-if="showConfirm"
      :confirmTitle="modalTitle"
      :confirmText="modalText"
      @close-modal="showConfirm = false"
      @btn-reject="showConfirm = false"
      @btn-confirm="removeOffer"
    >
    </app-confirm>
  </teleport>

</template>

<script>
import AppButton from '../ui/AppButton'
import AppConfirm from '../ui/AppConfirm'
import AdminOfferEditForm from './AdminOfferEditForm'
import AppLoader from '../ui/AppLoader'
import {inject, ref} from 'vue'
import {useStore} from 'vuex'

export default {
  name: "AdminOffersCard",
  props: ['offer', 'products'],

  setup(props) {
    const store = useStore()
    const notification = inject('notification')
    const openEditModal = ref(false)
    const showConfirm = ref(false)
    const modalTitle = ref('')
    const modalText = ref('')
    const isLoader = ref(false)

    const openConfirm = () => {
      showConfirm.value = true
      modalTitle.value = 'Удаление акции'
      modalText.value = 'Вы точно хотите удалить акцию?'
    }

    const removeOffer = async () => {
      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }
      showConfirm.value = false
      try {
        isLoader.value = true
        await store.dispatch('offers/removeOffer', {type: props.offer.type, fbKey: props.offer.fbKey})
        notification.success('Акция успешно удалена!')
        isLoader.value = false
      }
      catch (e) {
        notification.error(e.message)
        throw new Error()
      }
    }

    return {
      showConfirm,
      modalTitle,
      modalText,
      openConfirm,
      removeOffer,
      openEditModal,
      isLoader
    }
  },

  components: {AppButton, AppConfirm, AdminOfferEditForm, AppLoader}
}
</script>