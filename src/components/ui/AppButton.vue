<template>
  <button :class="['app-btn', btnClass]" :disabled="isDisabled" :type="type">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    btnClass: {
      type: String,
      required: false
    },
    isDisabled: {
      type: Boolean,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>