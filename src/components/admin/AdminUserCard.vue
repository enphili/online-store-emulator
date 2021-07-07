<template>
  <div class="admin-product-card">
    <div class="admin-product-img">
      <img src="@/assets/img/User_icon.png" alt="User_icon">
    </div>
    <p class="admin-product-title w-300">User name: <strong>{{ user.login }}</strong></p>
    <p class="admin-product-title">Login: <strong>{{ user.email }}</strong></p>
    <p class="admin-product-title residue"></p>

    <select class="users-select"
            v-model="userRole"
    >
      <option
        v-for="role in roles"
        :key="role"
      >{{ role }}</option>
    </select>


    <div class="btn-block w-300">
      <app-button btn-class="admin-btn" :isDisabled="!wasChanged" @click="updateUser">сохранить</app-button>
      <app-button btn-class="admin-btn danger" @click="removeUser">Удалить</app-button>
    </div>


    <teleport to="#tonot">
      <app-confirm
        v-if="showModal"
        :confirmTitle="modalTitle"
        :confirmText="modalText"
        @close-modal="showModal = false"
        @btn-reject="showModal = false"
        @btn-confirm="confirmOk"
      >
      </app-confirm>
    </teleport>


  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import AppConfirm from '@/components/ui/AppConfirm'
import {computed, ref, inject} from 'vue'
import { useStore } from 'vuex'
import {onBeforeRouteLeave, useRouter} from 'vue-router'
export default {
  props: ['user'],

  setup(props) {
    const store = useStore()
    const router = useRouter()
    const roles = ref(['superadmin', 'admin', 'buyer'])
    const userRole = ref(props.user.role)
    const showModal = ref(false)
    const wantLeave = ref(false)
    const canLeave = ref(false)
    const modalTitle = ref('')
    const modalText = ref('')
    const goTo = ref('')
    const notification = inject('notification')

    const wasChanged = computed(() => userRole.value !== props.user.role)

    const updateUser = () => {
      showModal.value = true
      modalTitle.value = 'Сохранение данных'
      modalText.value = 'Точно хотите изменит роль пользователя?'
    }

    const confirmOk = () => {
      if (wasChanged.value && !wantLeave.value) {
        wasChanged.value = false
        confirmUpdateUser()
      } else {
        canLeave.value = true
        showModal.value = false
        router.push(goTo.value)
      }
    }

    const confirmUpdateUser = async () => {

      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }

      try {
        await store.dispatch('admin/updateUser', { key: props.user.uiID, role: userRole.value})
        notification.success('Роль пользователя успешно изменена!')
        showModal.value = false
      }
      catch (e) {
        notification.error(e.message)
        throw new Error()
      }
    }

    const removeUser = async () => {

      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }

      try {
        await store.dispatch('admin/removeUser', {userID: props.user.uiID, idToken: props.user.idToken})
        await store.dispatch('admin/loadAllUsers')
        notification.success(`Пользаватель ${props.user.login} успешо удален`)
      }
      catch (e) {
        notification.error(e.message)
        throw new Error()
      }
    }

    onBeforeRouteLeave(to => {
      goTo.value = to.path
      if (wasChanged.value && !canLeave.value) {
        showModal.value = true
        modalTitle.value = 'Изменения на странице'
        modalText.value = 'Изменена роль пользователя! Вы точно хотите покинуть страницу без сохранения?'
        wantLeave.value = true
        return false
      }
      return true
    })

    return {
      roles,
      wasChanged,
      wantLeave,
      canLeave,
      userRole,
      updateUser,
      showModal,
      modalTitle,
      modalText,
      confirmOk,
      removeUser,
    }
  },

  components: {AppButton, AppConfirm,}
}
</script>