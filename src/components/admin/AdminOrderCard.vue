<template>
  <div class="admin-product-card">
    <div class="admin-product-img">
      <img src="@/assets/img/order.png" alt="order">
    </div>
    <p class="admin-product-title">Заказ №: <strong>{{ order.timestamp }}</strong></p>
    <p class="admin-product-title bold">{{ order.userContact }}</p>
    <p class="admin-product-title residue">Статус : <span>{{ order.status }}</span></p>
    <app-button
      btn-class="mr-20"
      @click="$notification.warning('Заявка на склад для отгрузки товара или отмена заказа')"
    >обработать</app-button>
  </div>

</template>

<script>
import AppButton from '@/components/ui/AppButton'

export default {
  props: ['order'],

  components: {AppButton}
}
</script>