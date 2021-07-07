<template>
  <header>
    <div class="container">
      <div class="header flex-center">
        <div class="flex-center">
          <div class="logo flex-center"><span>V</span>-Shop</div>
          <div class="separator">
          </div>
          <h1 class="description">Эмулятор интернет магазина на framework'е Vue.js v.3</h1>
        </div>
        <div class="flex-center">
          <div class="header__icon-img flex-center">
            <img :src="require('@/assets/img/mail.svg')" alt="mail-icon">
          </div>
          <div class="header__icon-text">
            <div class="icon-text">info@info.ru</div>
            <a href="mailto:info@info.ru?subject=Обращение с сайта" class="icon-link" @click.prevent="message">Написать сообщение</a>
          </div>
        </div>
        <div class="flex-center">
          <div class="header__icon-img flex-center">
            <img :src="require('@/assets/img/phone.svg')" alt="phone-icon">
          </div>
          <div class="header__icon-text">
            <div class="icon-text">+7 (999) 999-99-99</div>
            <a href="tel:+79999999999" class="icon-link" @click.prevent="calling">Позвонить</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {

  methods: {
    message() {
      this.$notification.warning('Функция отправки e-mail заблокирована в данном приложении')
    },
    calling() {
      this.$notification.error('Функция звонков заблокирована в данном приложении',3000)
    }
  }

}
</script>