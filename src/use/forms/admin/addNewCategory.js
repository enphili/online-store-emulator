import {useStore} from 'vuex'
import {ref, inject} from 'vue'

export const useAddNewCategoryForm = emit => {
  const store = useStore()
  const title = ref('')
  const tErrorMsg = ref('')
  const categoryID = ref('')
  const idErrorMsg = ref('')
  const imageLink = ref('')
  const imgErrorMsg = ref('')
  const typeErrorMsg = ref('')
  const type = ref('')
  const formData = ref({})
  const notification = inject('notification')


  const onSubmit = async e => {
    formData.value.id = categoryID.value,
      formData.value.img = imageLink.value,
      formData.value.title = title.value,
      formData.value.type = type.value


    if (store.getters['auth/role'] !== 'superadmin') {
      notification.warning('Данная роль администратора являтся демонстрационной', 4000)
      return
    }

    try {
      await store.dispatch('shop/addNewCategory', formData.value)
      await store.dispatch('shop/loadCategories')
      emit('close-modal')
      notification.success('Новая категория успешно добавлена в базу')
    }
    catch (e) {
      notification.error(e.message)
    }
    finally {
      e.target.reset()
    }
  }

  return {
    title,
    tErrorMsg,
    categoryID,
    idErrorMsg,
    imageLink,
    imgErrorMsg,
    typeErrorMsg,
    type,
    onSubmit
  }
}