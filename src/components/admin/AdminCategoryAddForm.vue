<template>
  <app-modal-wrap
    title="Новая категория"
    @close-modal="$emit('close-modal')"
  >

    <form class="auth-form" @submit.prevent="onSubmit">
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

      <app-button>Добавить</app-button>

      <app-close-form @click="$emit('close-modal')"/>
    </form>

  </app-modal-wrap>
</template>

<script>
import AppModalWrap from '@/components/ui/AppModalWrap'
import AppInput from '@/components/ui/AppInput'
import AppButton from '@/components/ui/AppButton'
import AppCloseForm from '@/components/ui/AppCloseForm'
import {useAddNewCategoryForm} from '@/use/forms/admin/addNewCategory'
export default {
  emits: ['close-modal'],

  setup(_, {emit}) {

    return {
      ...useAddNewCategoryForm(emit)
    }
  },

  components: {AppModalWrap, AppInput, AppButton, AppCloseForm}
}
</script>