<template>
  <app-modal-wrap
    title="Новая акция"
    @close-modal="$emit('close-modal')"
  >
    <form class="auth-form" @submit.prevent="onSubmit">
      <app-input
        label="Заголовок акции"
        name="title"
        type="text"
        placeholder="Укажите название акции"
        v-model="offerTitle"
        :errorMsg="titleErrorMsg"
      />
      <app-select
        label="Тип акции"
        name="offerType"
        :options="offerTypeOptions"
        v-model:selectValue="offerType"
        :errorMsg="offerTypeErrorMsg"
        @change="whatType"
      >
        <option selected="selected" disabled>{{ defaultOptionType }}</option>
      </app-select>
      <app-input
        v-if="isPromoCode"
        label="Промокод"
        name="promoCode"
        type="text"
        placeholder="Укажите промокод"
        v-model="offerPromoCode"
        :errorMsg="promoCodeErrorMsg"
      />
      <app-select
        v-if="isPlusOne || isPresent || isSale"
        label="Продукт"
        name="product"
        :options="productsOptions"
        v-model:selectValue="optionProductTitle"
        :errorMsg="productErrorMsg"
      >
        <option selected disabled>{{ defaultOptionProduct }}</option>
      </app-select>
      <app-input
        v-if="isPlusOne"
        label="Каждый N-й продукт"
        name="eachN"
        type="number"
        placeholder="Укажите какой по счету продукт"
        v-model="offerEachN"
        :errorMsg="eachNErrorMsg"
      />
      <app-select
        v-if="isPresent"
        label="Подарок"
        name="present"
        :options="productsOptions"
        v-model:selectValue="optionPresentTitle"
        :errorMsg="presentErrorMsg"
      >
        <option disabled selected>{{ defaultOptionPresent }}</option>
      </app-select>
      <app-input
        v-if="isSale || isPromoCode"
        label="Размер скидки (в %)"
        name="sale"
        type="number"
        placeholder="Укажите размер скидки в %"
        v-model="offerSale"
        :errorMsg="saleErrorMsg"
      />
      <app-input
        label="Изображение"
        name="imageFile"
        type="text"
        placeholder="Укажите название файла картинки"
        v-model="offerImage"
        :errorMsg="imageFileErrorMsg"
      />
      <app-input
        label="Призыв первая часть"
        name="ctaStart"
        type="text"
        placeholder="Укажите начало призыва к действию"
        v-model="offerCtaStart"
        :errorMsg="ctaStartErrorMsg"
      />
      <app-input
        label="Срок действия акции"
        name="deadline"
        type="date"
        placeholder="Укажите срок действия акции"
        v-model="offerDeadline"
        :errorMsg="deadlineErrorMsg"
      />
      <app-input
        label="Призыв вторая часть"
        name="ctaEnd"
        type="text"
        placeholder="Укажите окончание призыва к действию"
        v-model="offerCtaEnd"
      />
      <app-button>Добавить</app-button>
      <app-close-form @click="$emit('close-modal')"/>
    </form>

  </app-modal-wrap>
</template>

<script>
import AppModalWrap from '../ui/AppModalWrap'
import AppButton from '../ui/AppButton'
import AppCloseForm from '../ui/AppCloseForm'
import AppInput from '../ui/AppInput'
import AppSelect from '../ui/AppSelect'
import {useAddNewOfferForm} from '../../use/forms/admin/addNewOffer'

export default {
  name: "AdminOfferAddForm",
  emits: ['close-modal'],
  props: ['products'],

  setup(props, {emit}) {

    return {
      ...useAddNewOfferForm(props, emit)
    }
  },

  components: {AppModalWrap, AppButton, AppCloseForm, AppInput, AppSelect}
}
</script>
