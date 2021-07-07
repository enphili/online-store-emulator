import {isUrlValid} from '@/utils/isUrlValid'
import {reactive, ref, watch} from 'vue'

const countErrorField = ref([])
const category = ref('Выберите категорию продукта')
const defaultOption = ref('Выберите категорию продукта')
const count = ref('')
const price = ref('')
const articul = ref('')
const title = ref('')
const imageLink = ref('')
const imageFile = ref('')
const fileData = reactive({
  fileSize: '',
  fileName: '',
  fileType: ''
})
const tErrorMsg = ref('')
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

const formData = {}

export const checkValid = () => {
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

export const watchByForm = () => {
  // если выбран способ загрузки изображения как ссылка то input type=file блокируется и наоборот соответственно
  watch(imageLink, () => imageLink.value.length ? isLinkChanged.value = true : isLinkChanged.value = false)
  watch(imageFile, () => imageFile.value.length ? isImgChanged.value = true : isImgChanged.value = false)

  watch(title, () => title.value.length < 2 ? tErrorMsg.value = 'Вы не указали наименование' : tErrorMsg.value = '')

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

export const resetInputValue = () => {
  title.value = ''
  articul.value = ''
  imageLink.value = ''
  price.value = ''
  count.value = ''
  imageFile.value = ''
  category.value = 'Выберите категорию продукта'
}

export const validateForm = () => {
  formData.category = category.value
  formData.title = title.value.trim()
  formData.id = articul.value
  formData.img = imageLink.value
  formData.price = +price.value
  formData.count = +count.value
  formData.dataCreated = new Date()

  return { category, count, price, articul, title, imageLink, tErrorMsg,
    ilErrorMsg, iiErrorMsg, pErrorMsg, cErrorMsg, sErrorMsg, aErrorMsg,
    ImgInput, defaultOption, formData, imageFile, isLinkChanged,
    isImgChanged, fileData
  }
}