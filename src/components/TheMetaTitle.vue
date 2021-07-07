<template>

</template>

<script>
export default {
  name: "TheMetaTitle",
  props: ['title'],
  watch: {
    title: {
      immediate: true,
      handler() {
        document.title = this.title
      }
    }
  },
  render() {},
}
</script>