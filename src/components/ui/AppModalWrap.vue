<template>
  <div class="lbox lbox--visible">
    <div class="lbox__bg" @click="$emit('close-modal')"></div>
    <div class="lbox__form-wrap form-wrap">
      <p class="form-wrap__form-title form-title">{{ title }}</p>

      <slot></slot>

    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  emits: ['close-modal'],

}
</script>