<template>
  <the-meta-title title="Восстановление пароля | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="lbox__form-wrap form-wrap">
    <p class="form-wrap__form-title form-title">Восстановление пароля</p>
    <form class="auth-form" @submit.prevent="onSubmit">

      <app-input
        label="Зарегистрированный email"
        name="email"
        type="email"
        placeholder="Введите email"
        :errorMsg="eErrorMsg"
        :blur="eBlur"
        v-model="email"
      >
      </app-input>

      <app-button>Восстановить</app-button>

      <div class="auth-form__link-wrap">
        <router-link class="auth-form__link" to="/login">Обратно на страницу входа</router-link>
      </div>
    </form>

    <app-close-form @click.prevent="$router.push('/')"/>

  </div>
</template>

<script>
import AppCloseForm from '@/components/ui/AppCloseForm'
import AppButton from '@/components/ui/AppButton'
import AppInput from '@/components/ui/AppInput'
import TheMetaTitle from '@/components/TheMetaTitle'
import {useForgetForm} from '@/use/forms/forget-form'

export default {
  setup() {
    return {
      ...useForgetForm()
    }
  },

  components: {AppCloseForm, AppButton, AppInput, TheMetaTitle}
}
</script>