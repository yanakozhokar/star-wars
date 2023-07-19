<template>
  <div class="people__list" v-if="!loading && !isSorting">
    <div class="people__sorted-list" v-if="searchbar.length === 0">
      <div class="people__list-item" v-for="person in sortedPeople" :key="person.id">
        <p v-if="person.category && person.name" class="person__list-item-category">
          {{ person.category }}: {{ person.name }}
        </p>
        <div v-for="elem in person.people" :key="elem.name">
          <router-link
            class="person__list-item-name"
            :to="{ name: 'people', params: { id: getIdFromUrl(elem.url) } }"
          >
            {{ elem.name }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="people__sorted-by-request-list" v-else>
      <div class="people__list-item" v-for="person in sortedByRequest" :key="person.id">
        <p v-if="person.category && person.name" class="person__list-item-category">
          {{ person.category }}: {{ person.name }}
        </p>
        <div v-for="elem in person.people" :key="elem.name">
          <router-link
            class="person__list-item-name"
            :to="{ name: 'people', params: { id: getIdFromUrl(elem.url) } }"
          >
            {{ elem.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="loader" v-else>
    <font-awesome-icon class="loader__icon" :icon="faSpinner" spin />
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { usePeopleStore } from '@/stores/peopleStore'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import SortService from '@/service/sort.service'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    filmsFilter: Boolean,
    planetsFilter: Boolean,
    speciesFilter: Boolean
  },
  setup(props) {
    const peopleStore = usePeopleStore()
    const people = computed(() =>
      localStorage.getItem('allPeople')
        ? JSON.parse(localStorage.getItem('allPeople'))
        : peopleStore.getAllPeople() && JSON.parse(localStorage.getItem('allPeople'))
    )
    const searchbar = computed(() => peopleStore.searchbar)
    const filter = computed(() => peopleStore.filter)
    const films = computed(() => peopleStore.films)
    const planets = computed(() => peopleStore.planets)
    const species = computed(() => peopleStore.species)
    const loading = computed(() => peopleStore.loading)
    const sortedPeople = ref([])
    const isSorting = ref(false)
    const sortedByRequest = ref([])

    const sortPeople = async () => {
      isSorting.value = true

      if (!localStorage.getItem('allPeople')) {
        await peopleStore.getAllPeople()
      }

      const sortService = new SortService(
        people.value,
        filter,
        films.value,
        planets.value,
        species.value,
        isSorting
      )
      sortedPeople.value = await sortService.sortPeople()

      isSorting.value = false
    }

    const onSearchbarChange = () => {
      const searchValue = searchbar.value.toLowerCase().trim()
      sortedByRequest.value = [{ people: [] }]
      if (searchValue !== '') {
        for (const obj of sortedPeople.value) {
          for (const person of obj.people) {
            if (person.name.toLowerCase().includes(searchValue)) {
              sortedByRequest.value.map((el) => el.people.push(person))
            }
          }
        }
      }
    }

    //TODO remove all watches
    watchEffect(async () => {
      onSearchbarChange()
      await sortPeople()
    })

    watchEffect(() => {
      peopleStore.filter = [
        ...(props.filmsFilter ? ['films'] : []),
        ...(props.planetsFilter ? ['planets'] : []),
        ...(props.speciesFilter ? ['species'] : [])
      ]
    })

    const getIdFromUrl = (url) => {
      if (url) {
        const urlParts = url.split('/')
        return urlParts[urlParts.length - 2]
      }
      return ''
    }

    return {
      sortedPeople,
      searchbar,
      loading,
      isSorting,
      sortedByRequest,
      getIdFromUrl,
      faSpinner
    }
  }
}
</script>

<style>
.people__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
}

.person__list-item-category {
  font-size: 16px;
  font-weight: 600;
  text-transform: capitalize;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.loader__icon {
  width: 40px;
  height: 40px;
  color: #475d66;
}
</style>
