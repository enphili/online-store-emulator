<template>
  <the-meta-title title="Страница регистрации | V-Shop - эмулятор интернет магазина"></the-meta-title>
  <div class="lbox__form-wrap form-wrap">
    <p class="form-wrap__form-title form-title">Регистрация</p>

    <form
      novalidate
      class="auth-form"
      @submit.prevent="isValid && onSubmit($event)"
    >

      <app-input
        label="Логин"
        name="login"
        type="text"
        placeholder="Укажите логин"
        :errorMsg="logErrorMsg"
        v-model="login"
      >
      </app-input>

      <app-input
        label="Почта"
        name="email"
        type="email"
        placeholder="Укажите email"
        :errorMsg="eErrorMsg"
        v-model="email"
      >
      </app-input>

      <app-input
        label="Пароль"
        name="password"
        type="password"
        placeholder="Установите пароль"
        :errorMsg="pErrorMsg"
        v-model="password"
      >
      </app-input>

      <app-input
        label="Совпадение пароля"
        name="cPassword"
        type="password"
        placeholder="Подтвердите пароль"
        :errorMsg="cpErrorMsg"
        v-model="cPassword"
      >
      </app-input>

      <app-button>Зарегистрировать</app-button>

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
import {useStore} from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import {ref, watch, inject} from 'vue'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const notification = inject('notification')

    const MIN_LOGIN_LENGTH = 4
    const MIN_PASS_LENGTH = 6
    const regX = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/

    const login = ref('')
    const isValid = ref(false)
    const email = ref('')
    const password = ref('')
    const cPassword = ref('')
    const logErrorMsg = ref('')
    const eErrorMsg = ref('')
    const pErrorMsg = ref('')
    const cpErrorMsg = ref('')
    const loginValid = ref(false)
    const emailValid = ref(false)
    const passValid = ref(false)
    const cPassValid = ref(false)


    watch(login, () => {
      if (login.value.length < MIN_LOGIN_LENGTH) {
        logErrorMsg.value = `Логин должен быть не менее ${MIN_LOGIN_LENGTH} символов`
        loginValid.value = false
      } else {
        logErrorMsg.value = ''
        loginValid.value = true
      }
    })

    watch(email, () => {
      if (regX.test(email.value)) {
        eErrorMsg.value = ''
        emailValid.value = true
      } else {
        eErrorMsg.value = 'Введите валидный email'
        emailValid.value = false
      }
    })

    watch(password, () => {
      if (password.value.length < MIN_PASS_LENGTH) {
        pErrorMsg.value = `Пароль должен быть не менее ${MIN_PASS_LENGTH} символов`
        passValid.value = false
      } else {
        pErrorMsg.value = ''
        passValid.value = true
      }
    })

    watch(cPassword, () => {
      if (password.value === cPassword.value) {
        cpErrorMsg.value = ''
        cPassValid.value =  true
      } else {
        cpErrorMsg.value = 'Пароли не совпадают'
        cPassValid.value =  false
      }
    })

    watch([loginValid, emailValid, passValid, cPassValid], () => {
      if (loginValid.value && emailValid.value && passValid.value && cPassValid.value) {
        return isValid.value = true
      } else {
        return isValid.value = false
      }
    })

    const onSubmit = async e => {
      try {
        const formData = {
          login: login.value.trim(),
          email: email.value.trim(),
          password: password.value.trim()
        }
        await store.dispatch('auth/registry', formData)
        e.target.reset()
        notification.success('Регистрация прошла успешно!')
        if (route.params.from === 'login') {
          router.go(-2)
        } else {
          router.back()
        }
      }
      catch (e) {
        notification.error(e.message)
        throw new Error()
      }

    }

    return { login, email, password, cPassword,
      onSubmit, logErrorMsg, eErrorMsg, isValid,
      pErrorMsg, cpErrorMsg}
  },

  components: {AppCloseForm, AppButton, AppInput, TheMetaTitle}
}
</script>