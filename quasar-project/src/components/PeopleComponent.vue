<template>
    <div>
        <h1>People</h1>
        <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
            <q-list bordered>
                <q-item v-for="filter in filters" :key="filter.value">
                    <q-item-section>
                        <q-item-label>{{ filter.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side="right">
                        <q-toggle v-model="filter.isActive" />
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
        <q-page-container>
            <q-list bordered>
                <q-item v-for="person in filteredPeople" :key="person.name">
                    <q-item-section>
                        <q-item-label>{{ person.name }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
            <div v-if="filteredPeople.length === 0">No results found.</div>
        </q-page-container>
    </div>
</template>


<script>
import { ref, reactive, computed, watchEffect } from 'vue'
import axios from 'axios'

export default {
    setup() {
        const leftDrawerOpen = ref(false)
        const filters = reactive([
            { label: 'Films', value: 'films', isActive: false },
            { label: 'Planets', value: 'planets', isActive: false },
            { label: 'Species', value: 'species', isActive: false }
        ])
        const people = ref([])
        const films = reactive([])
        const planets = reactive([])
        const species = reactive([])

        const fetchData = async (url, targetArray) => {
            try {
                const response = await axios.get(url)
                targetArray.splice(0, targetArray.length, ...response.data.results)
            } catch (error) {
                console.error(error)
            }
        }

        watchEffect(() => {
            fetchData('https://swapi.dev/api/films/', films)
            fetchData('https://swapi.dev/api/planets/', planets)
            fetchData('https://swapi.dev/api/species/', species)
        })

        const fetchPeopleData = async () => {
            try {
                const response = await axios.get('https://swapi.dev/api/people/')
                people.value.splice(0, people.value.length, ...response.data.results)
            } catch (error) {
                console.error(error)
            }
        }

        watchEffect(() => {
            fetchPeopleData()
        })

        const filteredPeople = computed(() => {
            const activeFilters = filters.filter(filter => filter.isActive)

            if (activeFilters.length === 0) {
                return people.value
            }

            return people.value.filter(person => {
                return activeFilters.some(filter => {
                    switch (filter.value) {
                        case 'films':
                            return filterFilms(person)
                        case 'planets':
                            return filterPlanets(person)
                        case 'species':
                            return filterSpecies(person)
                        default:
                            return true
                    }
                })
            })
        })

        const filterFilms = person => {
            if (!person.films) return false
            return person.films.some(film => films.some(f => f.url === film))
        }

        const filterPlanets = person => {
            if (!person.homeworld) return false
            return planets.some(planet => planet.url === person.homeworld)
        }

        const filterSpecies = person => {
            if (!person.species) return false
            return person.species.some(specie => species.some(s => s.url === specie))
        }

        return {
            leftDrawerOpen,
            filters,
            filteredPeople
        }
    }
}
</script>
