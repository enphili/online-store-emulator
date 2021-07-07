<template>
  <div class="notification-wrapper" v-for="toast in toastsArray">
    <transition
      name="note"
      appear
    >
      <div :class="['notification_block', `${toast.type}`]">
        <div class="notification-icon"></div>
        <p>{{ toast.msg }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import {computed, ref} from 'vue'
import store from '@/store/index'

export default {
  setup() {
    const toastsArray = computed(() => store.getters['toast/allToast'])

    return {toastsArray, }
  }
}
</script>

<style scoped>
.notification-wrapper {
  position: relative;
  left: 5%;
}
.note-enter-from,
.note-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.note-enter-active,
.note-leave-active {
  transition: 0.7s ease;
}
.notification_block {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 450px;
  width: auto;
  padding: 8px 30px 8px 20px;
  background-color: #323548;
  font-size: 18px;
  text-align: left;
  line-height: 22px;
  color: white;
  border-radius: 8px;
  box-shadow: 0 6px 40px 6px rgba(0, 0, 0, .14);
  z-index: 9999;
}
.notification_block p {
  padding: 0;
  display: block;
  margin-left: 20px;
  word-break: break-word;
  overflow-wrap: break-word;
}
.notification_block div {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 50%;
}
.success {
  border: 2px solid rgb(74, 245, 153);
  color: rgb(74, 245, 153);
}
.success div {
  background-image: url("../../assets/img/primary.png");
}
.error {
  border: 2px solid rgb(229, 75, 75);
  color: rgb(229, 75, 75);
}
.error div {
  background-image: url("../../assets/img/danger.png");
}
.warning {
  border: 2px solid #fdc275;
  color: #fdc275;
}
.warning div {
  background-image: url("../../assets/img/warning.png");
}
</style>