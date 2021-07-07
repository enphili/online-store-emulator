import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import {inject} from 'vue'

export const useLoginForm = () => {
  const store = useStore()
  const router = useRouter()
  const notification = inject('notification')

  const { handleSubmit, isSubmitting } = useForm()

  const PASS_MIN_LENGTH = 6

  const {value: email, errorMessage: emErrorMsg, handleBlur: emBlur} = useField('email',
    yup.string().trim().required('обязательное поле').email('email не валиден')
  )
  const {value: password, errorMessage: pErrorMsg, handleBlur: pBlur} = useField('password',
    yup.string().trim().required('обязательное поле').min(PASS_MIN_LENGTH, `Минимальная длина пароля ${PASS_MIN_LENGTH} символов`)
  )

  const onSubmit = handleSubmit(async (values, { resetForm }) => {
    try {
      await store.dispatch('auth/login', values)
      resetForm()
      notification.success('Вы успешно залогинились!')
      router.back()
    } catch (e) {
      notification.error(e.message)
    }
  })

  return {onSubmit, password, email,
    isSubmitting, pErrorMsg, pBlur,
    emBlur, emErrorMsg}
}