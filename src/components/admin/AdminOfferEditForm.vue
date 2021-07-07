<template>
  <teleport to="#tonot">
    <app-modal-wrap
      title="Редактирование Акций"
      @close-modal="checkedUpdated"
    >
      <form class="auth-form">
        <app-input
          label="Заголовок акции"
          name="title"
          type="text"
          placeholder="Укажите название акции"
          v-model="title"
        />

        <app-input v-if="isPlusOne"
           label="Каждый N-й продукт"
           name="eachN"
           type="number"
           placeholder="Укажите какой по счету продукт"
           v-model="eachN"
        />

        <app-input v-if="isPromoCode"
          label="Промокод"
          name="promoCode"
          type="text"
          placeholder="Укажите промокод"
          v-model="promoCode"
        />

        <app-select v-else
          label="Продукт"
          name="product"
          :options="productsOptions"
          v-model:selectValue="productTitle"
        />

        <app-select v-if="isPresent"
          label="Подарок"
          name="present"
          :options="productsOptions"
          v-model:selectValue="presentTitle"
        />

        <app-input v-if="sale"
          label="Размер скидки (в %)"
          name="sale"
          type="number"
          placeholder="Укажите размер скидки в %"
          v-model="sale"
        />

        <app-input
          label="Изображение"
          name="imageFile"
          type="text"
          placeholder="Укажите название файла картинки"
          v-model="imageFile"
        />

        <app-input
          label="Призыв первая часть"
          name="ctaStart"
          type="text"
          placeholder="Укажите начало призыва к действию"
          v-model="ctaStart"
        />

        <app-input
          label="Срок действия акции"
          name="deadline"
          type="date"
          placeholder="Укажите срок действия акции"
          v-model="deadline"
        />

        <app-input
          label="Призыв вторая часть"
          name="ctaEnd"
          type="text"
          placeholder="Укажите окончание призыва к действию"
          v-model="ctaEnd"
        />

        <app-button type="submit" :isDisabled="!wasChanged" @click.prevent="updateOffer">Обновить</app-button>

        <app-close-form @click.prevent="$emit('close-modal')"/>
      </form>
    </app-modal-wrap>
  </teleport>

  <teleport to="#tonot">
    <app-confirm
      v-if="showModal"
      :confirmTitle="modalTitle"
      :confirmText="modalText"
      :btnTextNO="confirmBtnTextNO"
      :btnTextOK="confirmBtnTextOK"
      @close-modal="showModal = false"
      @btn-reject="confirmNO"
      @btn-confirm="confirmOk"
    >
    </app-confirm>
  </teleport>

</template>

<script>
import AppModalWrap from '../ui/AppModalWrap'
import AppInput from '../ui/AppInput'
import AppSelect from '../ui/AppSelect'
import AppButton from '../ui/AppButton'
import AppCloseForm from '../ui/AppCloseForm'
import AppConfirm from '../ui/AppConfirm'
import {computed, inject, ref} from 'vue'
import {useStore} from 'vuex'

export default {
  name: "AdminOfferEditForm",
  emits: ['close-modal'],
  props: ['offer', 'products'],

  setup(props, {emit}) {
    const store = useStore()
    const title = ref(props.offer.title)
    const imageFile = ref(props.offer.img)
    const ctaStart = ref(props.offer.ctaStart)
    const ctaEnd = ref(props.offer.ctaEnd ? props.offer.ctaEnd : undefined)
    const deadline = ref(props.offer.deadline)
    const promoCode = ref(props.offer.name ? props.offer.name : undefined)
    const eachN = ref(props.offer.eachN ? props.offer.eachN.toString() : undefined)
    const sale = ref(props.offer.sale ? props.offer.sale.toString() : undefined)
    const isPromoCode = ref(props.offer.type === 'promocode' ? true : false)
    const isPlusOne = ref(props.offer.type === 'plusone' ? true : false)
    const isPresent = ref(props.offer.type === 'present' ? true : false)
    const modalTitle = ref('')
    const modalText = ref('')
    const confirmBtnTextOK = ref('')
    const confirmBtnTextNO = ref('')
    const showModal = ref(false)
    const confirm = ref(false)
    const notification = inject('notification')
    const newOffer = ref({})

    const productsOptions = props.products.map(product => {
      return {
        id: product.id,
        title: product.title,
        type: product.title,
        firebaseKey: product.firebaseKey
      }
    })

    const productTitle = ref(
      props.products.find(product => product.firebaseKey === props.offer.productID) ?
        props.products.find(product => product.firebaseKey === props.offer.productID).title : undefined)
    const presentTitle = ref(
      props.products.find(product => product.firebaseKey === props.offer.presentID) ?
        props.products.find(product => product.firebaseKey === props.offer.presentID).title : undefined)

    const wasChanged = computed(() => {
      const compare = () => title.value !== props.offer.title ||
        imageFile.value !== props.offer.img || ctaStart.value !== props.offer.ctaStart ||
        ctaEnd.value !== props.offer.ctaEnd || deadline.value !== props.offer.deadline

      if (props.offer.type === 'plusone') {
        return compare() ||
          +eachN.value !== props.offer.eachN ||
          productTitle.value !== props.products.find(product => product.firebaseKey === props.offer.productID).title
      }
      if (props.offer.type === 'sale') {
        return compare() ||
          +sale.value !== props.offer.sale ||
          productTitle.value !== props.products.find(product => product.firebaseKey === props.offer.productID).title
      }
      if (props.offer.type === 'present') {
        return compare() ||
          presentTitle.value !== props.products.find(product => product.firebaseKey === props.offer.presentID).title ||
          productTitle.value !== props.products.find(product => product.firebaseKey === props.offer.productID).title
      }
      if (props.offer.type === 'promocode') {
        return compare() || +sale.value !== props.offer.sale || promoCode.value !== props.offer.name
      }
    })

    const updateOffer = () => {
      modalTitle.value = 'Подтвердите обновление данных'
      modalText.value = 'Акция была изменена. Вы уверены в ее сохранении?'
      showModal.value = true
      confirmBtnTextOK.value = 'да'
      confirmBtnTextNO.value = 'нет'
    }

    const checkedUpdated = () => {
      if (wasChanged.value) {
        modalTitle.value = 'Изменение данных'
        modalText.value = 'Имеются изменненые данные. Точно не хотите их сохранить?'
        showModal.value = true
        confirmBtnTextOK.value = 'да пожалуй сохраню'
        confirmBtnTextNO.value = 'не, не буду'
      } else {
        emit('close-modal')
      }
    }

    const confirmNO = () => {
      confirm.value = false
      showModal.value = false
      emit('close-modal')
    }

    const confirmOk = () => {
      confirm.value = true
      onSubmitOffer()
    }

    const onSubmitOffer = async () => {
      if (store.getters['auth/role'] !== 'superadmin') {
        notification.warning('Данная роль администратора являтся демонстрационной', 4000)
        return
      }
      if (wasChanged && confirm) {
        newOffer.value.title = title.value
        newOffer.value.img = imageFile.value
        newOffer.value.ctaStart = ctaStart.value
        newOffer.value.ctaEnd = ctaEnd.value
        newOffer.value.deadline = deadline.value
        promoCode.value ? newOffer.value.name = promoCode.value : null
        eachN.value ? newOffer.value.eachN = eachN.value : null
        sale.value ? newOffer.value.sale = sale.value : null
        productTitle.value ? newOffer.value.productID = productsOptions.find(el => el.title === productTitle.value).firebaseKey : null
        presentTitle.value ? newOffer.value.presentID = productsOptions.find(el => el.title === presentTitle.value).firebaseKey : null
        try {
          await store.dispatch('offers/updateOffer', {...newOffer.value, type: props.offer.type, fbKey: props.offer.fbKey })
          notification.success('Акция успешно обновлена!')
          emit('close-modal')
        }
        catch (e) {
          notification.error(e.message)
          throw new Error()
        }
      }
    }

    return {
      title, ctaStart, ctaEnd, deadline, promoCode, isPlusOne, eachN, isPromoCode,
      imageFile, wasChanged, updateOffer, modalTitle, modalText, confirmBtnTextOK, confirmBtnTextNO,
      showModal, checkedUpdated, confirmNO, confirmOk, confirm, sale, productsOptions,
      productTitle, isPresent, presentTitle, onSubmitOffer
    }
  },

  components: {AppModalWrap, AppInput, AppButton, AppCloseForm, AppConfirm, AppSelect}
}
</script>
