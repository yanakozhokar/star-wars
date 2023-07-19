<template>
  <div id="app">
    <LayoutComponent />
  </div>
</template>

<script>
import LayoutComponent from './components/LayoutComponent.vue'
import { usePeopleStore } from '@/stores/peopleStore'

export default {
  components: {
    LayoutComponent
  },
  mounted() {
    const peopleStore = usePeopleStore()
    const storedFilters = localStorage.selectedFilters

    if (storedFilters) {
      peopleStore.filter = JSON.parse(storedFilters)
    }
  }
}
</script>
