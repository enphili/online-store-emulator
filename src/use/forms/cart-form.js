import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import 'yup-phone'
import {useCreateOrder} from '@/use/createOrder'
import {pay} from '@/utils/pay'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {errors} from '../../utils/errors'


export const useCartForm = emit => {

  const store = useStore()
  const router = useRouter()

  const { handleSubmit, isSubmitting, resetForm } = useForm()

  const {value: crtName, errorMessage: crtErrorMsg, handleBlur: crtBlur} = useField('crtName',
    yup.string()
      .trim()
      .required('Вы не сказали как Вас зовут')
  )
  const {value: phone, errorMessage: phErrorMsg, handleBlur: phBlur} = useField('phone',
    yup.string()
      .required('Иначе не сможем с Вами связаться')
      .phone("RU", true, 'Номер должен быть в формате страны Россия')
  )
  const {value: comment, errorMessage: comErrorMsg, handleBlur: comBlur} = useField('comment',
    yup.string()
      .trim()
  )

  const onSubmit = handleSubmit(async values => {
      try {
        const order = useCreateOrder(values)
        await store.dispatch('admin/saveOrder', order)
        await pay(order)
        await store.dispatch('cart/clearCartList')
        await store.dispatch('admin/updateOrderStatus', order.timestamp)
        emit('send-order-success')
        router.push('/thanks')
        await store.dispatch('shop/loadProducts')
      } catch (e) {
        emit('send-order-fail', errors(e))
      } finally {
        resetForm()
      }
  })

  return {
    onSubmit, isSubmitting, crtName, crtErrorMsg,
    crtBlur, phone, phErrorMsg, phBlur, comment,
    comErrorMsg, comBlur
  }
}