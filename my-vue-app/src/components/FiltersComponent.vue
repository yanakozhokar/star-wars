<template>
  <ul class="sidebar-left__list">
    <li class="sidebar-left__item">
      <label class="sidebar-left__label">
        {{filterItems}}
        Films
        <input
          type="checkbox"
          value="films"
          v-model="filterItems"
          ref="filmsInputRef"
          @change="setFilterValue"
        />
      </label>
    </li>
    <li class="sidebar-left__item">
      <label class="sidebar-left__label">
        Planets
        <input
          type="checkbox"
          v-model="filterItems"
          value="planets"
        />
      </label>
    </li>
    <li class="sidebar-left__item">
      <label class="sidebar-left__label">
        Species
        <input
          type="checkbox"
          v-model="filterItems"
          value="species"
        />
      </label>
    </li>
    <button class="sidebar-left__clear-btn" type="button" @click="onClearBtnClick">
      Clear local storage
    </button>
  </ul>
</template>

<script>
import {onMounted, ref, watch} from 'vue'
import { usePeopleStore } from '@/stores/peopleStore'
import {useRoute} from "vue-router";

export default {
  setup() {
    const peopleStore = usePeopleStore()
    const route = useRoute()
    const filmsInputRef = ref(null)
    const planetsInputRef = ref(null)
    const speciesInputRef = ref(null)
    const filterItems = ref(['species']);

    onMounted(() => {
      console.log(route.query);//!
    });

    const setFilterValue = () => {
      const selectedFilters = []

      if (filmsInputRef.value.checked) {
        selectedFilters.push('films')
      }
      if (planetsInputRef.value.checked) {
        selectedFilters.push('planets')
      }
      if (speciesInputRef.value.checked) {
        selectedFilters.push('species')
      }

      peopleStore.filter = selectedFilters


      const queryParams = new URLSearchParams()
      selectedFilters.forEach((filter) => {
        queryParams.set(filter, '1')
      })
      const query = queryParams.toString()
      history.replaceState(null, '', `?${query}`)

      localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters))
    }

    const onClearBtnClick = () => {
      localStorage.clear()
      history.replaceState(null, '', window.location.pathname)
    }

    const isFilterSelected = (filter) => {
      const queryParam = new URLSearchParams(window.location.search)
      return queryParam.has(filter)
    }

    watch(peopleStore.filter, () => {
      setFilterValue()
    })

    return {
      filterItems,
      filmsInputRef,
      planetsInputRef,
      speciesInputRef,
      setFilterValue,
      onClearBtnClick,
      isFilterSelected
    }
  }
}
</script>
