<template>

  <the-meta-title title="Ваша корзина | V-Shop - эмулятор интернет магазина"></the-meta-title>

  <div class="container">
    <cart-title
      :isCartEmpty="isCartEmpty"
    />

    <cart-grid
      v-if="!isCartEmpty"
      :products="products"
      :totalCost="totalCost"
    />

    <div v-if="!isCartEmpty && !isAuth">
      <div>Вы не авторизованы на сайте.
        Что бы оформить покупку
        <router-link to="/login">Войдите</router-link> или
        <router-link to="/registry">Зарегистрируйтесь.</router-link>
      </div><div>Или заполните форму ниже:</div>

      <cart-form
        @send-order-success="$notification.success('Заказ успешно оплачен')"
        @send-order-fail="text => $notification.error(text)"
       />
    </div>

    <div class="payment-button-wrap" v-if="isAuth && !isCartEmpty">
      <app-button btn-class="admin-btn" @click="sendPay">
        Оплатить
      </app-button>
      <div>test cart: 4242 4242 4242 4242</div>
    </div>
  </div>

</template>

<script>
import CartTitle from '@/components/cart/CartTitle'
import CartGrid from '@/components/cart/CartGrid'
import CartForm from '@/components/cart/CartForm'
import AppButton from '@/components/ui/AppButton'
import TheMetaTitle from '@/components/TheMetaTitle'
import {useCreateOrder} from '@/use/createOrder'
import {pay} from '@/utils/pay'
import {errors} from '@/utils/errors'
import {computed, onMounted, inject} from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const notification = inject('notification')

    onMounted(() => {
      const  paymentScript = document.createElement('script')
      paymentScript.src = `https://widget.cloudpayments.ru/bundles/cloudpayments`
      document.body.append(paymentScript)
    })


    const isCartEmpty = computed(() => store.getters['cart/isCartEmpty'])
    const products = computed(() => store.getters['cart/cart'])
    const totalCost = computed(() => store.getters['cart/totalCost'])
    const isAuth = computed(() => store.getters['auth/isAuthorized'])

    const sendPay = async () => {
      const order = useCreateOrder()
      try {
        await pay(order)
        await store.dispatch('cart/clearCartList')
        await store.dispatch('admin/updateOrderStatus', order.timestamp)
        await store.dispatch('shop/loadProducts')
        notification.success('Заказ успешно оплачен! В ближайшее время будет к Вам отправлен')
        router.push('/thanks')
      } catch (e) {
        await store.dispatch('admin/saveOrder', order)
        notification.error(errors(e))
      }
    }

    return {
      isCartEmpty,
      products,
      totalCost,
      isAuth,
      sendPay,
    }
  },

  components: {CartTitle, CartGrid, CartForm, AppButton, TheMetaTitle}
}
</script>