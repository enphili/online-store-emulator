<template>
  <label class="label auth-form__label">
    {{ label }}

    <select class="form-select"
      :name="name"
      :value="selectValue"
      @input="$emit('update:selectValue', $event.target.value)"
    >
      <slot></slot>
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.type"
      >
        {{ option.title }}
      </option>
    </select>

    <small v-if="errorMsg" class="auth-form__valid-text">{{ errorMsg }}</small>
  </label>
</template>

<script>
export default {
  emits: ['update:selectValue'],
  props: {
    defaultOption: String,
    options: Object,
    selectValue: String,
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    errorMsg: {
      type: String,
      required: false
    }
  }
}
</script>