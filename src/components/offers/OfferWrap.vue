<template>
  <div class="offer" v-if="isOfferValidity">
    <router-link
      rel="noopener"
      :to="{
            name: offer.type === 'promocode' ? 'cart' : 'product',
            params: offer.type === 'promocode' ? '' : {firebaseKey: offer.productID},
            query: offer.type === 'promocode' ? '' : { offer: offer.type }
          }"
      class="offer__link"
    >
      <div class="offer__img">
        <picture>
          <source type="image/webp" :srcset="require(`@/assets/img/${offer.img}.webp`)">
          <img :src="require(`@/assets/img/${offer.img}.jpg`)" :alt="offer.type">
        </picture>

        <div class="offer__cta">
          <span>{{ offerCta }}</span>
        </div>

      </div>
      <div lang="ru" class="offer__title">{{ offer.title }}</div>
    </router-link>
  </div>
</template>

<script>
import {ref} from 'vue'
import {declOfNum} from '../../utils/declination'
import {getRandomNumber} from '../../utils/getRandomNumber'

export default {
  name: "OfferWrap",
  props: ['offer'],

  setup(props) {
    const offerCta = ref('')
    const isOfferValidity = ref(true)

    // if (Date.parse(props.offer.deadline) < Date.now()) {
    //   isOfferValidity.value = false
    // }

    if (props.offer.ctaStart === 'Осталось') {
      // const deadline = new Date(Date.parse(props.offer.deadline) - Date.now()).toLocaleDateString('ru-RU', {day: 'numeric'})
      const deadline = new Date(Date.now() + getRandomNumber(2, 8) * 86400000).toLocaleDateString('ru-RU', {day: 'numeric'})
      let ctaStart
      deadline === '1' ? ctaStart = 'Остался' : ctaStart = props.offer.ctaStart
      offerCta.value = `${ctaStart} ${declOfNum(deadline, ['день', 'дня', 'дней'])} ${props.offer.ctaEnd}`
    }
    else if (props.offer.ctaStart === 'до' || props.offer.ctaStart === 'Только до') {
      // const deadline = new Date(props.offer.deadline).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})
      const deadline = new Date(Date.now() + getRandomNumber(5, 10) * 86400000).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})
      offerCta.value = `${props.offer.ctaStart} ${deadline} ${props.offer.ctaEnd ? props.offer.ctaEnd : ''}`
    }
    else {
      offerCta.value = `${props.offer.ctaStart} ${props.offer.ctaEnd ? props.offer.ctaEnd : ''}`
    }


    return {offerCta, isOfferValidity }
  },

  components: {}
}
</script>
