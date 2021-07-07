<template>
  <teleport to="#tonot">
    <app-modal-wrap
      title="Редактирование Товара"
      @close-modal="checkedUpdated"
    >
      <form class="auth-form">
        <app-input
          label="Название"
          name="title"
          type="text"
          placeholder="Введите название продукта"
          v-model="title"
        >
        </app-input>

        <app-input
          label="Артикул"
          name="articul"
          type="number"
          placeholder="Введите артикул товара"
          v-model="articul"
        >
        </app-input>

        <app-input
          v-if="isLink"
          label="Изображение"
          name="imageLink"
          type="text"
          placeholder="Вставьте ссылку на картинку"
          v-model="imageLink"
        >
        </app-input>

        <app-input
          v-if="isFile"
          label="Изображение"
          name="imageFile"
          type="file"
          placeholder="Выберите картинку для загрузки"
          v-model="imgFile"
        >
        </app-input>

        <app-input
          label="Цена"
          name="price"
          type="number"
          placeholder="Укажите цену"
          v-model="price"
        >
        </app-input>

        <app-input
          label="Количество"
          name="count"
          type="number"
          placeholder="Укажите количество на складе"
          v-model="count"
        >
        </app-input>

        <app-select
          label="Категории"
          :defaultOption="product.category"
          name="category"
          :options="categories"
          v-model:selectValue="category"
        >
        </app-select>

        <app-input
          label="Описание"
          name="description"
          type="text"
          placeholder="Укажите описание товара"
          v-model="description"
        />

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
      :btnTextNO="confirmBtnTextNO"
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
import AppCloseForm from '@/components/ui/AppCloseForm'
import AppButton from '@/components/ui/AppButton'
import AppSelect from '@/components/ui/AppSelect'
import AppInput from '@/components/ui/AppInput'
import AppConfirm from '@/components/ui/AppConfirm'
import {computed, ref, inject} from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['close-modal', 'updated-true'],
  props: ['product', 'categories'],

  setup(props, {emit}) {
    const store = useStore()
    const isLink = ref(true)
    const isFile = ref(true)
    const title = ref(props.product.title)
    const articul = ref(props.product.id.toString())
    const imageLink = ref(props.product.img)
    const imgFile = ref(props.product.imgFile)
    const price = ref(props.product.price.toString())
    const count = ref(props.product.count.toString())
    const description = ref(props.product.description)
    const category = ref(props.product.category)
    const newProduct = ref({})
    const modalTitle = ref('')
    const confirmBtnTextOK = ref('да')
    const confirmBtnTextNO = ref('нет')
    const modalText = ref('')
    const showModal = ref(false)
    const confirm = ref(false)
    const notification = inject('notification')

    isLink.value = !!props.product.img
    isFile.value = !!props.product.imageFile

    const wasChanged = computed(() =>
      title.value !== props.product.title ||
      description.value !== props.product.description ||
      articul.value !== props.product.id ||
      imageLink.value !== props.product.img ||
      +price.value !== props.product.price ||
      +count.value !== props.product.count ||
      category.value !== props.product.category)

    const checkedUpdated = () => {
      if (wasChanged.value) {
        modalTitle.value = 'Изменение данных'
        modalText.value = 'Имеются изменненые данные. Точно не хотите их сохранить?'
        showModal.value = true
        confirmBtnTextOK.value = 'да пожалуй сохраню'
        confirmBtnTextNO.value = 'не, не буду'
      } else {
        emit('close-modal')
      }
    }

    const updateProduct = () => {
      modalTitle.value = 'Подтвердите обновление данных'
      modalText.value = 'Данные продукта были изменены. Вы точно хотите их сохранить?'
      showModal.value = true
    }

    const confirmNO = () => {
      confirm.value = false
      showModal.value = false
      emit('close-modal')
    }

    const confirmOk = () => {
      confirm.value = true
      emit('updated-true')
      onSubmit()
    }

    const onSubmit = async () => {

      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }

      if (wasChanged && confirm) {
        newProduct.value.title = title.value
        newProduct.value.description = description.value
        newProduct.value.id = articul.value
        newProduct.value.img = imageLink.value
        newProduct.value.price = +price.value
        newProduct.value.count = +count.value
        newProduct.value.category = category.value
        try {
          const firebaseKey = props.product.firebaseKey
          await store.dispatch('shop/updateProduct', {...newProduct.value, firebaseKey})
          notification.success('Продукт успешно обновлен!')
          emit('close-modal')
        }
        catch (e) {
          notification.error(e.message)
          throw new Error()
        }
      }
    }

    return {
      isLink,isFile, onSubmit, title, articul, imageLink, imgFile, price, count, description,
      category, newProduct, modalTitle, modalText, wasChanged, showModal, confirm, confirmBtnTextNO,
      confirmBtnTextOK, checkedUpdated, updateProduct, confirmOk, confirmNO
    }
  },

  components: {AppModalWrap, AppCloseForm, AppButton, AppSelect, AppInput, AppConfirm}
}
</script>