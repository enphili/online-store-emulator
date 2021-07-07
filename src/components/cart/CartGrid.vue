<template>
	<div class="cart-grid">
		<div class="carttable-01">изображение</div>
		<div class="carttable-02">наименование</div>
		<div class="carttable-04">цена</div>
		<div class="carttable-05">количество</div>
		<div class="carttable-06">сумма</div>
		<div class="carttable-00"></div>

    <cart-product
      v-for="product in products"
      :key="product.id"
      :product="product"
    />

    <div class="div-block-37"><div>Промокод:&nbsp;</div></div>

		<div class="div-block-38">
      <form @submit.prevent="getSaleFromPromocode">
        <input type="text" class="promocode-inp" v-model.trim="promoCode">
        <button class="promocode-btn">Применить</button>
      </form>
    </div>

		<div class="grid-item-11">ИТОГО:</div>
		<div class="grid-item-10">{{ declOfNum(prettify(totalCost), ['рубль', 'рубля', 'рублей']) }}</div>
		<div class="note">*Скидки промокодов не суммируются с другими скидками</div>
    <div></div>
	</div>
</template>

<script>
import CartProduct from '@/components/cart/CartProduct'
import {prettify} from '@/utils/prettify'
import { declOfNum } from '@/utils/declination.js'
import {errors} from '@/utils/errors.js'
import {computed, inject, ref} from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    products: {
      type: Array,
    },
    totalCost: {
      type: Number
    }
  },

  setup() {
    const store = useStore()
    const notification = inject('notification')
    const promoCode = ref(null)
    const isPromocodeApplied = computed(() => store.getters['cart/isPromocodeApplied'])
    const promocodeSale = computed(() => store.getters['cart/promocodeSale'])

    const getSaleFromPromocode = async () => {
      if (promoCode.value === null || promoCode.value === '') {
        notification.error('Вы не указали промокод')
        return
      }
      if (isPromocodeApplied.value) {
        notification.error('Промокод уже использован')
        promoCode.value = ''
        return
      }
      // ${promoCode.value.toLowerCase()}
      try {
        const url = `${process.env.VUE_APP_BASE_BD_URL}/offers/promocode.json`
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) throw new Error(response.statusText)
        if (!data) throw new Error(data.error.message)
        const code = Object.values(data).find(code => code.name.toLowerCase() === promoCode.value.toLowerCase())
        if (!code) notification.error('Недействительный промокод')
        if (new Date(code.deadline) < new Date()) {
          notification.error('Данный промокод более недействителен!')
          return
        }
        if (promocodeSale.value && promocodeSale.value === (1 - code.sale / 100)) {
          notification.error('Промокод уже использован')
          return
        }
        await store.dispatch('cart/promocodeSale', code.sale)
        await store.commit('cart/promocodeApplied')
        await store.dispatch('cart/totalCost')
        notification.success('Промокод успешно применен!')
      } catch (e) {
        notification.error(errors(e.message))
      }
      finally {
        promoCode.value = ''
      }
    }

    return {prettify, declOfNum, getSaleFromPromocode, promoCode, isPromocodeApplied}
  },

  components: {CartProduct}
}
</script>