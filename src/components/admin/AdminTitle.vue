<template>
  <h2 class="h2-title">Админка магазина</h2>
  <div class="admin-title" style="text-align: left">
    Сейчас Вы находитесь в админской части магазина.
    Если у вашей учетной записи достаточно прав вы сможете
    редактировать данные в противном же случае Вам доступен только режим просмотра.
    Выбирете категорию редактируемых данных в Главном меню
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>