<template>
  <aside class="sidebar-left" ref="sidebarLeftRef" v-if="isSidebarLeftVisible">
    <FiltersComponent />
  </aside>
</template>

<script>
import { computed } from 'vue'
import { usePeopleStore } from '@/stores/peopleStore'
import FiltersComponent from './FiltersComponent.vue'

export default {
  components: {
    FiltersComponent
  },
  setup() {
    const peopleStore = usePeopleStore()

    const isSidebarLeftVisible = computed(() => peopleStore.isSidebarLeftVisible)

    return {
      isSidebarLeftVisible
    }
  }
}
</script>

<style>
.sidebar-left {
  flex-shrink: 0;
  padding: 25px 16px 16px;
  width: 300px;
  min-height: 100%;
  overflow-y: auto;
  color: #9e9e9e;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
}
</style>
