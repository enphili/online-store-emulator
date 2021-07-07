<template>
  <teleport to="#tonot">
    <app-modal-wrap
      title="Редактирование Категорий"
      @close-modal="checkedUpdated"
    >
      <form class="auth-form">
        <app-input
          label="Название"
          name="title"
          type="text"
          placeholder="Введите название категории"
          v-model="title"
          :errorMsg="tErrorMsg"
        >
        </app-input>

        <app-input
          label="ID категории"
          name="categoryID"
          type="number"
          placeholder="Введите ID категории"
          v-model="categoryID"
          :errorMsg="idErrorMsg"
        >
        </app-input>

        <app-input
          label="Изображение"
          name="imageLink"
          type="text"
          placeholder="Вставьте ссылку на картинку"
          v-model="imageLink"
          :errorMsg="imgErrorMsg"
        >
        </app-input>

        <app-input
          label="Тип"
          name="type"
          type="text"
          placeholder="Укажите тип категории"
          v-model="type"
          :errorMsg="typeErrorMsg"
        >
        </app-input>

        <app-button type="submit" :isDisabled="!wasChanged" @click.prevent="updateProduct">Обновить</app-button>

        <app-close-form @click.prevent="$emit('close-modal')"/>
      </form>
    </app-modal-wrap>
  </teleport>

  <teleport to="#tonot">
    <app-confirm
      v-if="showModal"
      :confirmTitle="modalTitle"
      :confirmText="modalText"
      :btnTextNO="no"
      :btnTextOK="confirmBtnTextOK"
      @close-modal="showModal = false"
      @btn-reject="confirmNO"
      @btn-confirm="confirmOk"
    >
    </app-confirm>
  </teleport>

</template>

<script>
import AppModalWrap from '@/components/ui/AppModalWrap'
import AppConfirm from '@/components/ui/AppConfirm'
import AppInput from '@/components/ui/AppInput'
import AppButton from '@/components/ui/AppButton'
import AppCloseForm from '@/components/ui/AppCloseForm'
import {computed, ref, inject} from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['close-modal'],
  props: ['category'],

  setup(props, {emit}) {
    const store = useStore()
    const title = ref(props.category.title)
    const categoryID = ref(props.category.id)
    const imageLink = ref(props.category.img)
    const type = ref(props.category.type)
    const tErrorMsg = ref('')
    const idErrorMsg = ref('')
    const imgErrorMsg = ref('')
    const typeErrorMsg = ref('')
    const modalTitle = ref('')
    const modalText = ref('')
    const confirmBtnTextOK = ref('')
    const confirmBtnTextNO = ref('')
    const showModal = ref(false)
    const confirm = ref(false)
    const newCategory = ref({})
    const notification = inject('notification')


    const wasChanged = computed(() =>
      title.value !== props.category.title ||
      categoryID.value !== props.category.id ||
      imageLink.value !== props.category.img ||
      type.value !== props.category.type)

    const checkedUpdated = () => {
      if (wasChanged.value) {
        modalTitle.value = 'Изменение данных'
        modalText.value = 'Имеются изменненые данные. Точно не хотите их сохранить?'
        showModal.value = true
        confirmBtnTextOK.value = 'да сохраню'
        confirmBtnTextNO.value = 'нет, не буду'
      } else {
        emit('close-modal')
      }
    }

    const updateProduct = () => {
      modalTitle.value = 'Подтвердите обновление данных'
      modalText.value = 'Данные категории были изменены. Вы точно хотите их сохранить?'
      showModal.value = true
      confirmBtnTextOK.value = 'да'
      confirmBtnTextNO.value = 'нет'
    }

    const confirmNO = () => {
      showModal.value = false
      confirm.value = false
      emit('close-modal')
    }

    const confirmOk = () => {
      confirm.value = true
      onSubmit()
    }

    const onSubmit = async () => {
      if (wasChanged && confirm) {
        newCategory.value.title = title.value
        newCategory.value.id = categoryID.value.toString()
        newCategory.value.img = imageLink.value
        newCategory.value.type = type.value

        if (store.getters['auth/role'] !== 'superadmin') {
          notification.warning('Данная роль администратора являтся демонстрационной', 4000)
          return
        }

        try {
          const firebaseKey = props.category.firebaseKey
          await store.dispatch('shop/updateCategory', {...newCategory.value, firebaseKey})
          notification.success('Обновление категории успешно!')
          emit('close-modal')
        }
        catch (e) {
          notification.error(e.message)
          throw new Error()
        }
      }
    }

    return {
      title,
      tErrorMsg,
      categoryID,
      idErrorMsg,
      imageLink,
      imgErrorMsg,
      type,
      typeErrorMsg,
      wasChanged,
      updateProduct,
      showModal,
      modalTitle,
      modalText,
      confirmNO,
      confirmOk,
      confirm,
      checkedUpdated,
      confirmBtnTextOK,
      confirmBtnTextNO,
    }
  },

  components: { AppModalWrap, AppConfirm, AppInput, AppButton, AppCloseForm}
}
</script>