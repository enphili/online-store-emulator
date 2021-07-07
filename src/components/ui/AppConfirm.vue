<template>
  <app-modal-wrap
    @close-modal="$emit('close-modal')"
  >
      <div class="modal_save">
        <h2>{{ confirmTitle }}</h2>
        <p>{{ confirmText }}</p>
        <div class="modal_btn_conteiner">
          <app-button btn-class="mr-30" @click="$emit('btn-confirm')">{{ btnTextOK }}</app-button>
          <app-button btn-class="danger" @click="$emit('btn-reject')">{{ btnTextNO }}</app-button>
        </div>
      </div>
  </app-modal-wrap>
</template>

<script>
import AppModalWrap from '@/components/ui/AppModalWrap'
import AppButton from '@/components/ui/AppButton'

export default {
  props: {
    confirmTitle: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      required: true
    },
    btnTextOK: {
      type: String,
      required: false,
      default: 'Да'
    },
    btnTextNO: {
      type: String,
      required: false,
      default: 'Нет'
    }

  },

  emits: ['close-modal', 'btn-confirm', 'btn-reject'],

  components: {AppModalWrap, AppButton, }
}
</script>


<style scoped>

.modal_save {
  position: relative;
  width: 600px;
  margin: -30px -35px -30px -35px;
  padding: 15px 20px 15px 20px;
  user-select: none;
  background-color: rgb(248, 248, 248);
}
.modal_save h2 {
  margin-top: 0;
  text-align: left;
}
.modal_save p {
  font-size: 18px;
  text-align: left;
  line-height: 24px;
  margin: 15px 0 0 0;
}
.modal_btn_conteiner {
  text-align: left;
}
</style>