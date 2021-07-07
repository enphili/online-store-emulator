<template>
  <span>{{ offerCta }}</span>
</template>

<script>
import {ref} from 'vue'
import {declOfNum} from '../../utils/declination'

export default {
  name: "OfferCta",
  props: ['offer'],

  setup(props) {
    const offerCta = ref('')

    if (props.offer.ctaStart === 'Осталось') {
      const deadline = new Date(Date.parse(props.offer.deadline) - Date.now()).toLocaleDateString('ru-RU', {day: 'numeric'})
      offerCta.value = `${props.offer.ctaStart} ${declOfNum(deadline, ['день', 'дня', 'дней'])} ${props.offer.ctaEnd}`
    }
    else if (props.offer.ctaStart === 'до' || props.offer.ctaStart === 'Только до') {
      const deadline = new Date(props.offer.deadline).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})
      offerCta.value = `${props.offer.ctaStart} ${deadline} ${props.offer.ctaEnd ? props.offer.ctaEnd : ''}`
    }
    else {
      offerCta.value = `${props.offer.ctaStart} ${props.offer.ctaEnd ? props.offer.ctaEnd : ''}`
    }

    new Date(props.offer.deadline).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long'})

    return {offerCta}
  }
}
</script>