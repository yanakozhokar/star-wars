import { defineStore } from 'pinia'
import APIService from '../service/api.service'

export const usePeopleStore = defineStore('people', {
  state: () => ({
    allPeople: [],
    searchbar: '',
    filter: [],
    films: [],
    planets: [],
    species: [],
    loading: false,
    isSidebarLeftVisible: true,
  }),
  actions: {
    getAllPeople() {
      this.loading = true
      return new Promise((resolve) => {
        APIService.fetchAllPeople()
          .then((result) => {
            this.allPeople = [{ people: result }]
            localStorage.setItem('allPeople', JSON.stringify(this.allPeople))
            resolve(result)
          })
          .catch((error) => console.log(error))
          .finally(() => {
            this.loading = false
          })
      })
    },
    setSearchbarValue(value) {
      return new Promise((resolve) => {
        resolve((this.searchbar = value))
      })
    },
    async setFilterValue(event) {
      return new Promise((resolve) => {
        const filterValue = event.target.value
        const index = this.filter.indexOf(filterValue)

        if (index !== -1) {
          this.filter.splice(index, 1)
        } else {
          this.filter.push(filterValue)
        }

        localStorage.setItem('selectedFilters', JSON.stringify(this.filter))
        resolve(this.filter)
      }).catch((error) => console.log(error))
    },

    async addFilm(newFilm) {
      return new Promise((resolve) => {
        if (this.films.find((el) => el.name === newFilm.name)) {
          return
        }
        resolve(this.films.push(newFilm))
      }).catch((error) => console.log(error))
    },
    async updateFilmPeople(filmUrl, newPerson) {
      return new Promise((resolve) => {
        resolve(this.films.find((film) => film.url === filmUrl).people.push(newPerson))
      }).catch((error) => console.log(error))
    },
    async addPlanet(newPlanet) {
      return new Promise((resolve) => {
        if (this.planets.find((el) => el.name === newPlanet.name)) {
          return
        }
        resolve(this.planets.push(newPlanet))
      })
    },
    async updatePlanetPeople(planetUrl, newPerson) {
      return new Promise((resolve) => {
        resolve(this.planets.find((planet) => planet.url === planetUrl).people.push(newPerson))
      }).catch((error) => console.log(error))
    },
    async addSpeccy(newSpeccy) {
      return new Promise((resolve) => {
        if (this.species.find((el) => el.name === newSpeccy.name)) {
          return
        }
        resolve(this.species.push(newSpeccy))
      }).catch((error) => console.log(error))
    },
    async updateSpeccyPeople(speccyUrl, newPerson) {
      return new Promise((resolve) => {
        resolve(this.species.find((speccy) => speccy.url === speccyUrl).people.push(newPerson))
      }).catch((error) => console.log(error))
    },
    toggleSidebarLeft() {
      return new Promise((resolve) => {
        resolve((this.isSidebarLeftVisible = !this.isSidebarLeftVisible))
      })
    }
  }
})
