import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {inject} from 'vue'

export const useForgetForm = () => {
  const store = useStore()
  const router = useRouter()
  const notification = inject('notification')
  const { handleSubmit, isSubmitting, resetForm } = useForm()

  const {value: email, errorMessage: eErrorMsg, handleBlur: eBlur} = useField('email',
    yup.string().trim().required('обязательное поле').email('email не валиден')
  )

  const onSubmit = handleSubmit( async email => {
    try {
      await store.dispatch('auth/passwordRecovery', email)
      resetForm()
      notification.success('Иструкция по восстановлению пароля выслана на указаный email')
      router.replace('/login')
    }
    catch (e) {
      console.log(e.message)
      notification.error(e.message)
    }
  })

  return {onSubmit, isSubmitting, eBlur, email, eErrorMsg}
}