<template>
  <app-modal-wrap
    title="Новый товар"
    @close-modal="$emit('close-modal')"
  >
    <form class="auth-form" @submit.prevent="onSubmit">
      <app-input
        label="Название"
        name="title"
        type="text"
        placeholder="Введите название продукта"
        v-model="title"
        :errorMsg="tErrorMsg"
      >
      </app-input>

      <app-input
        label="Артикул"
        name="articul"
        type="number"
        placeholder="Введите артикул товара"
        v-model="articul"
        :errorMsg="aErrorMsg"
      >
      </app-input>

      <app-input
        label="Изображение"
        name="imageLink"
        type="text"
        placeholder="Вставьте ссылку на картинку"
        v-model="imageLink"
        :errorMsg="ilErrorMsg"
        :isChanged="isImgChanged"
      >
      </app-input>

      <app-input
        label="Изображение"
        name="imageFile"
        type="file"
        placeholder="Выберите картинку для загрузки"
        v-model="imageFile"
        :errorMsg="iiErrorMsg"
        @getInputField="ImgInput"
        @change="$notification.warning('В текущей версии приложения отправка изображений отключена!')"
        :isChanged="isLinkChanged"
      >
      </app-input>

      <app-input
        label="Цена"
        name="price"
        type="number"
        placeholder="Укажите цену"
        v-model="price"
        :errorMsg="pErrorMsg"
      >
      </app-input>

      <app-input
        label="Количество"
        name="count"
        type="number"
        placeholder="Укажите количество на складе"
        v-model="count"
        :errorMsg="cErrorMsg"
      >
      </app-input>

      <app-select
        label="Категории"
        :defaultOption="defaultOption"
        name="category"
        :options="categories"
        v-model:selectValue="category"
        :errorMsg="sErrorMsg"
      >
        <option disabled selected>{{ defaultOption }}</option>
      </app-select>

      <app-input
        label="Описание"
        name="description"
        type="text"
        placeholder="Введите описание продукта"
        v-model="description"
        :errorMsg="descErrorMsg"
      >
      </app-input>

      <app-button>Создать</app-button>

      <app-close-form @click.prevent="$emit('close-modal')"/>
    </form>
  </app-modal-wrap>
</template>

<script>
import AppInput from '@/components/ui/AppInput'
import AppCloseForm from '@/components/ui/AppCloseForm'
import AppButton from '@/components/ui/AppButton'
import AppSelect from '@/components/ui/AppSelect'
import AppModalWrap from '@/components/ui/AppModalWrap'
import {inject, reactive, ref, watch} from 'vue'
import {useStore} from 'vuex'
import {isUrlValid} from '@/utils/isUrlValid'

export default {
  emits: ['close-modal'],
  props: ['categories'],

  setup(_, {emit}) {
    const store = useStore()
    const notification = inject('notification')
    const countErrorField = ref([])
    const category = ref('Выберите категорию продукта')
    const defaultOption = ref('Выберите категорию продукта')
    const count = ref('')
    const price = ref('')
    const articul = ref('')
    const title = ref('')
    const description = ref('')
    const imageLink = ref('')
    const imageFile = ref('')
    const fileData = reactive({
      fileSize: '',
      fileName: '',
      fileType: ''
    })
    const tErrorMsg = ref('')
    const descErrorMsg = ref('')
    const ilErrorMsg = ref('')
    const iiErrorMsg = ref('')
    const pErrorMsg = ref('')
    const cErrorMsg = ref('')
    const sErrorMsg = ref('')
    const aErrorMsg = ref('')

    const ImgInput = input => {
      fileData.fileSize = input.files[0].size
      fileData.fileName = input.files[0].name
      fileData.fileType = input.files[0].type
    }

    const MAX_FILE_SIZE = 300 * 1024
    const IMG_FILE_TYPE = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

    const isLinkChanged = ref(false)
    const isImgChanged = ref(false)

    const checkValid = () => {
      countErrorField.value = []
      if (category.value === defaultOption.value) {
        sErrorMsg.value = 'Вы не выбрали категорию'
        countErrorField.value.push(false)
      } else {
        sErrorMsg.value = ''
      }

      if (count.value.length === 0) {
        cErrorMsg.value = 'Вы не указали количество'
        countErrorField.value.push(false)
      } else if (count.value < 0) {
        cErrorMsg.value = 'количество не может быть меньше 0'
        countErrorField.value.push(false)
      } else {
        cErrorMsg.value = ''
      }

      if (price.value.length === 0) {
        pErrorMsg.value = 'Вы не указали цену'
        countErrorField.value.push(false)
      } else if (price.value < 0) {
        pErrorMsg.value = 'цена не может быть меньше 0'
        countErrorField.value.push(false)
      } else {
        pErrorMsg.value = ''
      }

      if (articul.value.length === 0) {
        aErrorMsg.value = 'Вы не указали артикул'
        countErrorField.value.push(false)
      } else if (articul.value <= 0) {
        aErrorMsg.value = 'Артикул должен быть больше 0'
        countErrorField.value.push(false)
      } else {
        aErrorMsg.value = ''
      }

      if (title.value.length < 2) {
        tErrorMsg.value = 'Вы не указали наименование'
        countErrorField.value.push(false)
      } else {
        tErrorMsg.value = ''
      }

      if (description.value.length < 10) {
        descErrorMsg.value = 'Вы не указали описание'
        countErrorField.value.push(false)
      } else {
        descErrorMsg.value = ''
      }

      if (imageLink.value.length === 0 && fileData.fileName.length === 0) {
        ilErrorMsg.value = 'Вставьте ссылку на изображение'
        countErrorField.value.push(false)
        iiErrorMsg.value = 'Не загружено изображение'
        countErrorField.value.push(false)
      } else if (imageLink.value && fileData.fileName.length === 0) {
        if (!isUrlValid(imageLink.value)) {
          ilErrorMsg.value = 'Не валидная ссылка'
          countErrorField.value.push(false)
        } else {
          ilErrorMsg.value = ''
        }
      } else if (imageLink.value.length === 0 && fileData.fileName.length) {
        if (fileData.fileName.length === 0) {
          iiErrorMsg.value = 'Не загружено изображение'
          countErrorField.value.push(false)
        } else {
          iiErrorMsg.value = ''
          countErrorField.value.push(false) // т.к. отправка изображений отлючена
        }
      }
      return countErrorField.value.length
    }

    const watchByForm = () => {
      // если выбран способ загрузки изображения как ссылка то input type=file блокируется и наоборот соответственно
      watch(imageLink, () => imageLink.value.length ? isLinkChanged.value = true : isLinkChanged.value = false)
      watch(imageFile, () => imageFile.value.length ? isImgChanged.value = true : isImgChanged.value = false)

      watch(title, () => title.value.length < 2 ? tErrorMsg.value = 'Вы не указали наименование' : tErrorMsg.value = '')
      watch(description, () => description.value.length < 10 ? descErrorMsg.value = 'Описание должно быть более 10 символов' : descErrorMsg.value = '')

      watch(price, () => !price.value.length
        ? pErrorMsg.value = 'Вы не указали цену'
        : price.value < 0
          ?  pErrorMsg.value = 'цена не может быть меньше 0'
          : pErrorMsg.value = '')

      watch(articul, () => !articul.value.length
        ? aErrorMsg.value = 'Вы не указали артикул'
        : articul.value < 0
          ?  aErrorMsg.value = 'Артикул не может быть меньше 0'
          : aErrorMsg.value = '')

      watch(count, () => !count.value
        ? cErrorMsg.value = 'Вы не указали количество'
        : count.value < 0
          ? cErrorMsg.value = 'количество не может быть меньше 0'
          : cErrorMsg.value = '')

      watch(category, () => category.value === defaultOption.value ? sErrorMsg.value = 'Вы не выбрали категорию' : sErrorMsg.value = '')

      watch(imageLink, () => {
        if (isUrlValid(imageLink.value)) {
          ilErrorMsg.value = ''
          iiErrorMsg.value = ``
        } else {
          ilErrorMsg.value = 'Не валидная ссылка'
        }
      })

      watch(fileData, () => {
        if (fileData.fileSize > MAX_FILE_SIZE) {
          iiErrorMsg.value = `Мах размер файла - ${MAX_FILE_SIZE / 1024} кБ`
          ilErrorMsg.value = ''
        } else if (!IMG_FILE_TYPE.includes(fileData.fileType)) {
          iiErrorMsg.value = 'Не поддерживаемый формат'
          ilErrorMsg.value = ''
        } else  {
          iiErrorMsg.value = ``
          ilErrorMsg.value = ''
        }
      })
    }
    watchByForm()

    const onSubmit = async e => {
      const formData = {}
      formData.category = category.value
      formData.title = title.value.trim()
      formData.description = description.value.trim()
      formData.id = articul.value
      formData.img = imageLink.value
      formData.price = +price.value
      formData.count = +count.value
      formData.dataCreated = new Date()

      if (isImgChanged.value) {
        notification.warning('Загрузка изображений в данной версии приложения отключена! Измените на ссылку к изображению')
        isImgChanged.value = false
        fileData.fileName = ''
        imageFile.value = ''
      }

      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }

      if (!checkValid()) {
        try {
          await store.dispatch('shop/addNewProduct', formData)
          await store.dispatch('shop/loadProducts')
          notification.success('Новый продукт успешно добавлен в базу')
          emit('close-modal')
        }
        catch (e) {
          notification.error(e.message)
        }
        finally {
          e.target.reset()
          isLinkChanged.value = false
          isImgChanged.value = false
          category.value = 'Выберите категорию продукта'
        }
      }
    }

    return {
      category, count, price, articul, title, description, imageLink, tErrorMsg,
      ilErrorMsg, iiErrorMsg, pErrorMsg, cErrorMsg, sErrorMsg, aErrorMsg, descErrorMsg,
      ImgInput, defaultOption, imageFile, isLinkChanged,
      isImgChanged, fileData, onSubmit,
    }
  },

  components: { AppInput, AppCloseForm, AppButton, AppSelect, AppModalWrap }
}
</script>