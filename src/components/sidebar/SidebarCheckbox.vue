<template>
  <fieldset class="filter">
    <legend>Категории</legend>
    <label class="filter-item"
           v-for="category in categories"
           :key="category.id"
    >
      <input
          type="checkbox"
          class="filter-checkbox"
          :value="category.type"
          :checked="checkedValue.includes(category.type)"
          @change="$emit('update:checkbox', $event.target.value)"
          @click="$emit('click-on-category', $event)"
      >
      <span class="filter-span">{{ category.title }}</span>
    </label>
  </fieldset>
</template>

<script>
import { useRoute } from 'vue-router'
import {computed} from 'vue'
export default {
  emits: ['update:checkbox', 'click-on-category'],
  props: ['categories'],

  setup() {
    const route = useRoute()
    const checkedValue = computed(() => route.query.cat ? (route.query.cat).split(',') : [])

    return {checkedValue}
  }
}
</script>