<template>
  <form class="cart-form" @submit.prevent="onSubmit">
    <div class="cart-form__title">Оформить заказ</div>

    <app-input
      label="Имя"
      name="crtName"
      type="text"
      placeholder="Как к Вам обращаться"
      :errorMsg="crtErrorMsg"
      :blur="crtBlur"
      v-model="crtName"
    />

    <app-input
      label="Телефон"
      name="phone"
      type="phone"
      placeholder="Укажите Ваш номер телефона"
      :errorMsg="phErrorMsg"
      :blur="phBlur"
      v-model="phone"
    />


    <app-input
      label="Комметрарий"
      name="comment"
      type="textarea"
      placeholder="Напишите комментарий"
      :errorMsg="comErrorMsg"
      :blur="comBlur"
      v-model="comment"
    />

    <app-button :isDisabled="isSubmitting">Оплатить</app-button>
    4242 4242 4242 4242
  </form>
</template>

<script>
import AppInput from '@/components/ui/AppInput'
import AppButton from '@/components/ui/AppButton'
import {useCartForm} from '@/use/forms/cart-form'

export default {
  emits: ['send-order-success', 'send-order-fail'],
  setup(_, {emit}) {
    return {
      ...useCartForm(emit)
    }
  },

  components: {AppInput, AppButton}
}
</script>