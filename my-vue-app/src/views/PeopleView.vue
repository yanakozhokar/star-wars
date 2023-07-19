<template>
  <template v-if="loading">
    <div class="loader">
      <font-awesome-icon class="loader__icon" :icon="faSpinner" spin />
    </div>
  </template>
  <template v-else>
    <div v-if="person">
      <h2>{{ person.name }}</h2>
      <p>Height: {{ person.height }}</p>
      <p>Mass: {{ person.mass }}</p>
      <p>Hair Color: {{ person.hair_color }}</p>
      <p>Skin Color: {{ person.skin_color }}</p>
      <p>Eye Color: {{ person.eye_color }}</p>
      <p>Birth Year: {{ person.birth_year }}</p>
      <p>Gender: {{ person.gender }}</p>
      <p>Homeworld: {{ homeworld }}</p>
      <h3>Films:</h3>
      <ul>
        <li v-for="film in films" :key="film.url">
          {{ film.title }}
        </li>
      </ul>
      <h3>Species:</h3>
      <ul>
        <li v-for="specie in species" :key="specie.url">
          {{ specie.name }}
        </li>
      </ul>
      <h3>Vehicles:</h3>
      <ul>
        <li v-for="vehicle in vehicles" :key="vehicle.url">
          {{ vehicle.name }}
        </li>
      </ul>
      <h3>Starships:</h3>
      <ul>
        <li v-for="starship in starships" :key="starship.url">
          {{ starship.name }}
        </li>
      </ul>
    </div>
  </template>
</template>

<script>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import APIService from '@/service/api.service'

export default {
  name: 'PeopleView',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const route = useRoute()
    const person = ref(null)
    const films = ref([])
    const species = ref([])
    const vehicles = ref([])
    const starships = ref([])
    const homeworld = ref(null)
    const loading = ref(true)

    onBeforeMount(async () => {
      const personId = route.params.id
      try {
        person.value = await APIService.fetchPerson(`https://swapi.dev/api/people/${personId}/`)
        if (person.value) {
          await fetchExtraData(person.value)
        }
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    })

    const fetchExtraData = async (person) => {
      const filmPromises = person.films.map((filmUrl) => APIService.fetchFilm(filmUrl))
      films.value = await Promise.all(filmPromises)

      const speciePromises = person.species.map((specieUrl) => APIService.fetchSpeccy(specieUrl))
      species.value = await Promise.all(speciePromises)

      const vehiclePromises = person.vehicles.map((vehicleUrl) =>
        APIService.fetchVehicle(vehicleUrl)
      )
      vehicles.value = await Promise.all(vehiclePromises)

      const starshipPromises = person.starships.map((starshipUrl) =>
        APIService.fetchStarship(starshipUrl)
      )
      starships.value = await Promise.all(starshipPromises)

      const planet = await APIService.fetchPlanet(person.homeworld)
      homeworld.value = planet ? planet.name : null
    }

    return {
      person,
      films,
      species,
      vehicles,
      starships,
      homeworld,
      loading,
      faSpinner
    }
  }
}
</script>

<style>
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
