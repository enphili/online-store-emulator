<template>
  <label class="label auth-form__label">
    {{ label }}
    <input
      :disabled="isChanged"
      :class="['input', 'auth-form__input', {invalidField: errorMsg}]"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      ref="inputField"
      @blur="blur"
      @input="$emit('update:modelValue', $event.target.value, inputField)"
      @change="$emit('getInputField', inputField)"
    >
    <small v-if="errorMsg" class="auth-form__valid-text">{{ errorMsg }}</small>
  </label>
</template>

<script>
import {ref} from 'vue'

export default {
  emits: ['update:modelValue', 'getInputField'],
  props: {
    isChanged: Boolean,
    modelValue: String,
    blur: Function,
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    errorMsg: {
      type: String,
      required: false
    }
  },
  setup() {
    const inputField = ref(null)

    return {inputField}
  }
}
</script>