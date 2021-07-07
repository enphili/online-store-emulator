<template>
  <div class="left-sidebar">
    <p class="filter-title">Фильтры</p>

    <app-search
      cssClass="filter-search"
      placeholder="Поиск товара"
      v-model:searchText="searchText"
    >
      <button class="search-clear-btn" @click="resetSearch">&times;</button>
    </app-search>

    <sidebar-checkbox
      :categories="categories"
      v-model:checkbox="selectedCategory"
      @click-on-category="changeCategory"
    ></sidebar-checkbox>

    <app-button @click="resetFilters">Сбросить фильтры</app-button>

  </div>
</template>

<script>
import AppSearch from '@/components/ui/AppSearch'
import AppButton from '@/components/ui/AppButton'
import SidebarCheckbox from '@/components/sidebar/SidebarCheckbox'
import {ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

export default {
  emits: ['receiveFilter'],
  props: ['categories'],

  setup(props, {emit}) {
    const router = useRouter()
    const route = useRoute()
    const selectedCategory = ref(null)
    const searchText = ref(null)
    const queryCategoriesStr = ref(null)

    queryCategoriesStr.value = route.query.cat ? route.query.cat : ''
    let checkedCat = route.query.cat ? (route.query.cat).split(',') : []

    const changeCategory = e => {
      const checkBox = e.target
      if (!checkBox.checked && checkedCat.includes(checkBox.value))  {
        checkedCat.splice(checkedCat.indexOf(checkBox.value), 1)
      } else {
        checkedCat.push(checkBox.value)
      }
      queryCategoriesStr.value = checkedCat.join(',')
    }

    watch([searchText, queryCategoriesStr], ([newS, newC]) => {
      const query = {}
      if (newS) {
        query.s = newS.toLowerCase().trim()
      }
      if (newC) {
        query.cat = newC
      }
      router.replace({query})
      emit('receiveFilter', query)
    })

    const resetSearch = () => {
      searchText.value = null
    }

    const resetFilters = () => {
      resetSearch()
      checkedCat = []
      queryCategoriesStr.value = null
    }

    return { selectedCategory, resetSearch, resetFilters, searchText, changeCategory}
  },

  components: {AppSearch, AppButton, SidebarCheckbox}
}
</script>