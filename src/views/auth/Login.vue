<template>
  <the-meta-title title="Страница входа | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="lbox__form-wrap form-wrap">
      <p class="form-wrap__form-title form-title">Авторизация</p>
      <form class="auth-form" @submit.prevent="onSubmit">

        <app-input
          label="Email"
          name="email"
          type="email"
          placeholder="Введите ваш email"
          :errorMsg="emErrorMsg"
          :blur="emBlur"
          v-model="email"
        >
        </app-input>

        <app-input
          label="Пароль"
          name="password"
          type="password"
          placeholder="Введите ваш пароль"
          :errorMsg="pErrorMsg"
          :blur="pBlur"
          v-model="password"
        >
        </app-input>

        <app-button :isDisabled="isSubmitting">Войти</app-button>

        <div class="auth-form__link-wrap">
          <router-link class="auth-form__link" to="/forget">Забыли пароль</router-link>
          <router-link class="auth-form__link" :to="{name: 'registry', params: {from: 'login'}}">Регистрация</router-link>
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
import {useLoginForm} from '@/use/forms/login-form'

export default {
  setup() {
    return {
      ...useLoginForm(),
    }
  },

  components: {AppCloseForm, AppButton, AppInput, TheMetaTitle}
}
</script>
