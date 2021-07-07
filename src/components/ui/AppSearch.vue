<template>
  <div :class="cssClass">
    <input
      type="text"
      class="search-input"
      maxlength="256"
      name="s"
      :placeholder="placeholder"
      :value="searchText"
      @input="$emit('update:searchText', $event.target.value)"
    >
    <slot></slot>
  </div>
</template>

<script>
export default {
  emits: ['update:searchText'],
  props: {
    searchText: String,
    cssClass: String,
    placeholder: String
  }
}
</script>