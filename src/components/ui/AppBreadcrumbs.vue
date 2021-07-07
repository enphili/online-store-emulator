<template>
  <div class="breadcrumbs">
    <router-link title="Перейти на Главную." to="/" class="home"></router-link>
    <span
      v-for="(breadcrumb, idx) in breadcrumbList"
      :key="idx"
      @click.prevent="routeTo(idx)"
    >&nbsp;<span>&gt;&nbsp;</span>
      <span
        :class="['breadcrumbs-item', {'current-breadcrumbs': !breadcrumb.link}]"
        :title="'Перейти к ' + breadcrumb.name"
      >{{ breadcrumb.name }}</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: []
    }
  },

  methods: {
    updateList() {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
    routeTo(idx) {
      if (this.breadcrumbList[idx].link) {
        this.$router.push(this.breadcrumbList[idx].link)
      }
    }
  },

  watch: {
    $route: function () {
      this.updateList()
    }
  },

  mounted() {
    this.updateList()
  }
}
</script>