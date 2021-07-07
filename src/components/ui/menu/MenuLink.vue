<template>
  <li class="flex-center">
    <router-link :to="to">
      <slot></slot>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ['to']
}
</script>