<template>
  <ul class="pagination">
    <li class="pagination-item">
      <app-button
        btn-class="pagin-btn"
        @click="$emit('update:modelValue', modelValue - 1)"
        :isDisabled="modelValue === 1"
      >&#9668;</app-button>
    </li>
    <li class="pagination-item" v-for="p in pages">
      <app-button
        btn-class="pagin-btn"
        :class="{p_curent: p === modelValue }"
        @click="$emit('update:modelValue', p)"
      >{{ p }}</app-button>
    </li>
    <li class="pagination-item">
      <app-button
        btn-class="pagin-btn prev-pagin-btn"
        @click="$emit('update:modelValue', modelValue + 1)"
        :isDisabled="modelValue === pages"
      >&#9658;</app-button>
    </li>
  </ul>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import {computed} from 'vue'

export default {
  emits: ['update:modelValue'],
  props: ['allCount', 'size', 'modelValue'],
  setup(props) {
    const pages = computed(() => Math.ceil(props.allCount / props.size))

    return {
      pages
    }
  },

components: {AppButton}
}
</script>

<style scoped>
.pagination {
  display: inline-flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
.pagin-btn {
  margin: 0 7px 0 0;
  padding: 0;
  border: 1px solid #4284f0;
  background-color: transparent;
  color: #868686;
  width: 35px;
  height: 25px;
}
.pagin-btn:disabled {
  background-color: #e7e7e7;
  border: 1px solid #e7e7e7;
}
.prev-pagin-btn {
  margin-right: 0;
}
.p_curent {
  background-color: #4284f0;
  color: white;
}

</style>