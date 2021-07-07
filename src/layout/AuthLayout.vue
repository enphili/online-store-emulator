<template>
  <div class="lbox lbox--visible">
    <div class="lbox__bg" @click.prevent="$router.push('/')"></div>

    <router-view></router-view>

  </div>
</template>

<script>
export default {

}
</script>