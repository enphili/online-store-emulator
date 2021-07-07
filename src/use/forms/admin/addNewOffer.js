import {useStore} from 'vuex'
import {inject, ref, watch} from 'vue'

export const useAddNewOfferForm = (props, emit) => {
  const store = useStore()
  const notification = inject('notification')
  const defaultOptionProduct = ref('Выберите продукт акции')
  const defaultOptionPresent = ref('Выберите подарочный продукт')
  const defaultOptionType = ref('Выберите тип акции')
  const offerTitle = ref('')
  const titleErrorMsg = ref('')
  const offerEachN = ref('')
  const eachNErrorMsg = ref('')
  const offerPromoCode = ref('')
  const promoCodeErrorMsg = ref('')
  const productErrorMsg = ref('')
  const presentErrorMsg = ref('')
  const offerSale = ref('')
  const saleErrorMsg = ref('')
  const offerImage = ref('')
  const imageFileErrorMsg = ref('')
  const offerCtaStart = ref('')
  const ctaStartErrorMsg = ref('')
  const offerDeadline = ref('')
  const deadlineErrorMsg = ref('')
  const offerCtaEnd = ref('')
  const offerTypeErrorMsg = ref('')
  const isPlusOne = ref(false)
  const isPromoCode = ref(false)
  const isPresent = ref(false)
  const isSale = ref(false)
  const offerType = ref('')
  const optionProductTitle = ref('')
  const optionPresentTitle = ref('')
  const countErrors = ref([])
  offerType.value = defaultOptionType.value
  optionProductTitle.value = defaultOptionProduct.value
  optionPresentTitle.value = defaultOptionPresent.value

  const offerTypeOptions = [
    {
      id: 111,
      type: 'plusone',
      title: 'плюс товар за каждый N товар',
    },
    {
      id: 222,
      type: 'present',
      title: 'плюс подарок',
    },
    {
      id: 333,
      type: 'promocode',
      title: 'промокод',
    },
    {
      id: 444,
      type: 'sale',
      title: 'скидка',
    }
  ]

  const productsOptions = props.products.map(product => {
    return {
      id: product.id,
      title: product.title,
      type: product.title,
      firebaseKey: product.firebaseKey
    }
  })

  const whatType = () => {
    offerType.value === 'plusone' ? isPlusOne.value = true : isPlusOne.value = false
    offerType.value === 'present' ? isPresent.value = true : isPresent.value = false
    offerType.value === 'promocode' ? isPromoCode.value = true : isPromoCode.value = false
    offerType.value === 'sale' ? isSale.value = true : isSale.value = false
  }

  const checkValideForm = () => {
    countErrors.value = []
    if (offerTitle.value.length === 0) {
      titleErrorMsg.value = 'Вы не указали название акции'
      countErrors.value.push(false)
    } else if (offerTitle.value.length < 20) {
      titleErrorMsg.value = 'Название акции должно быть не менее 20 символов'
      countErrors.value.push(false)
    } else {titleErrorMsg.value = ''}
    if (offerType.value === defaultOptionType.value) {
      offerTypeErrorMsg.value = 'Вы не выбрали тип акции'
      countErrors.value.push(false)
    } else { offerTypeErrorMsg.value = ''}
    if (offerImage.value.length === 0) {
      imageFileErrorMsg.value = 'Вы не указали имя файла для картинки акции'
      countErrors.value.push(false)
    } else {imageFileErrorMsg.value = ''}
    if (offerCtaStart.value.length === 0) {
      ctaStartErrorMsg.value = 'Вы не указали призыв к действию'
      countErrors.value.push(false)
    } else {ctaStartErrorMsg.value = ''}
    if (offerDeadline.value.length === 0) {
      deadlineErrorMsg.value = 'Вы не указали срок действия акции'
      countErrors.value.push(false)
    } else if (new Date(offerDeadline.value).getTime() <= Date.now()) {
      deadlineErrorMsg.value = 'Срок действия акции не должен быть меньше текущей даты'
      countErrors.value.push(false)
    } else {deadlineErrorMsg.value = ''}
    if (isPresent.value || isPlusOne.value || isSale.value) {
      if (optionProductTitle.value === defaultOptionProduct.value) {
        productErrorMsg.value = 'Вы не выбрали продукт на который распростаняется акция'
        countErrors.value.push(false)
      } else {productErrorMsg.value = ''}
    }
    if (isPlusOne.value) {
      if (offerEachN.value.length === 0) {
        eachNErrorMsg.value = 'Вы не указали какой по счету продукт предоставляется в подарок'
        countErrors.value.push(false)
      } else {eachNErrorMsg.value = ''}
    }
    if (isPresent.value) {
      if (optionPresentTitle.value === defaultOptionPresent.value) {
        presentErrorMsg.value = 'Вы не выбрали продукт предоставляемый в качестве подарка'
        countErrors.value.push(false)
      } else {presentErrorMsg.value = ''}
    }
    if (isPromoCode.value || isSale.value) {
      if (offerSale.value.length === 0) {
        saleErrorMsg.value = 'Вы не назначили размер скидки'
        countErrors.value.push(false)
      } else {saleErrorMsg.value = ''}
    }
    if (isPromoCode.value) {
      if (offerPromoCode.value.length === 0) {
        promoCodeErrorMsg.value = 'Вы не назначили кодовое слово промокода'
        countErrors.value.push(false)
      } else if (offerPromoCode.value.length < 5) {
        promoCodeErrorMsg.value = 'Кодовое слово промокода должно быть не менее 5 символов'
        countErrors.value.push(false)
      }
      else {promoCodeErrorMsg.value = ''}
    }

    return countErrors.value.length
  }

  const watchForm = () => {
    watch(offerTitle, () => offerTitle.value.length === 0 ? titleErrorMsg.value = 'Вы не указали название акции'
      : offerTitle.value.length < 20 ? titleErrorMsg.value = 'Название акции должно быть не менее 20 символов' : titleErrorMsg.value = '')
    watch(offerType, () => offerType.value === defaultOptionType.value ? offerTypeErrorMsg.value = 'Вы не выбрали тип акции' : offerTypeErrorMsg.value = '')
    watch(offerImage, () => offerImage.value.length === 0 ? imageFileErrorMsg.value = 'Вы не указали имя файла для картинки акции' : imageFileErrorMsg.value = '')
    watch(offerCtaStart, () => offerCtaStart.value.length === 0 ? ctaStartErrorMsg.value = 'Вы не указали призыв к действию' : ctaStartErrorMsg.value = '')
    watch(offerDeadline, () => offerDeadline.value.length === 0 ? deadlineErrorMsg.value = 'Вы не указали срок действия акции'
      : new Date(offerDeadline.value).getTime() <= Date.now() ? deadlineErrorMsg.value = 'Срок действия акции не должен быть меньше текущей даты' : deadlineErrorMsg.value = '')
    watch(optionProductTitle, () => {
      if (isPresent.value || isPlusOne.value || isSale.value) {
        return optionProductTitle.value === defaultOptionProduct.value ? productErrorMsg.value = 'Вы не выбрали продукт на который распростаняется акция' : productErrorMsg.value = ''
      }
    })
    watch(offerEachN, () => {
      if (isPlusOne.value) {
        return offerEachN.value.length === 0 ? eachNErrorMsg.value = 'Вы не указали какой по счету продукт предоставляется в подарок' : eachNErrorMsg.value = ''
      }
    })
    watch(optionPresentTitle, () => {
      if (isPresent.value) {
        return optionPresentTitle.value === defaultOptionPresent.value ? presentErrorMsg.value = 'Вы не выбрали продукт предоставляемый в качестве подарка' : presentErrorMsg.value = ''
      }
    })
    watch(offerSale, () => {
      if (isPromoCode.value || isSale.value) {
        return offerSale.value.length === 0 ? saleErrorMsg.value = 'Вы не назначили размер скидки' : saleErrorMsg.value = ''
      }
    })
    watch(offerPromoCode, () => {
      if (isPromoCode.value) {
        return offerPromoCode.value.length === 0 ? promoCodeErrorMsg.value = 'Вы не назначили кодовое слово промокода'
          : offerPromoCode.value.length < 5 ? promoCodeErrorMsg.value = 'Кодовое слово промокода должно быть не менее 5 символов' : promoCodeErrorMsg.value = ''
      }
    })
  }
  watchForm()

  const onSubmit = async e => {
    const form = e.target
    const formData = {}
    formData.title = offerTitle.value.trim()
    formData.type = offerType.value
    formData.img = offerImage.value.trim()
    if (isPlusOne.value) formData.eachN = +offerEachN.value
    if (isPromoCode.value === false) {
      formData.productID = productsOptions.find(el => el.title === optionProductTitle.value) ? productsOptions.find(el => el.title === optionProductTitle.value).firebaseKey : null
    }
    formData.deadline = offerDeadline.value
    formData.ctaStart = offerCtaStart.value.trim()
    formData.ctaEnd = offerCtaEnd.value.trim()
    if (isPromoCode.value || isSale.value) formData.sale = +offerSale.value
    if (isPromoCode.value) formData.name = offerPromoCode.value.trim()
    if (isPresent.value) formData.presentID = productsOptions.find(el => el.title === optionPresentTitle.value) ? productsOptions.find(el => el.title === optionPresentTitle.value).firebaseKey : null


    if (store.getters['auth/role'] !== 'superadmin') {
      notification.warning('Данная роль администратора являтся демонстрационной', 4000)
      return
    }

    if (!checkValideForm()) {
      try {
        await store.dispatch('offers/addNewOffer', formData)
        await store.dispatch('offers/loadOffers')
        notification.success('Новая акция успешно добавлена в базу')
        emit('close-modal')
      }
      catch (e) {
        notification.error(e.message)
      }
      finally {
        form.reset()
        isPlusOne.value = isPresent.value = isPromoCode.value = isSale.value = false
        offerType.value = defaultOptionType.value
        optionProductTitle.value = defaultOptionProduct.value
        optionPresentTitle.value = defaultOptionPresent.value
      }
    } else {
      notification.error('Проверте правильность заполнения формы')
    }
  }

  return {
    onSubmit, defaultOptionProduct, defaultOptionPresent, offerTitle, titleErrorMsg, offerEachN, eachNErrorMsg,
    offerPromoCode, promoCodeErrorMsg, productErrorMsg, productsOptions, presentErrorMsg, offerSale, saleErrorMsg,
    offerImage, imageFileErrorMsg, offerCtaStart, ctaStartErrorMsg, offerDeadline, deadlineErrorMsg, offerCtaEnd,
    defaultOptionType, offerTypeOptions, offerType, isPlusOne, isPromoCode, isPresent, isSale, whatType,
    offerTypeErrorMsg, optionProductTitle, optionPresentTitle
  }
}