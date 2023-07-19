import APIService from '@/service/api.service'
import { usePeopleStore } from '@/stores/peopleStore'

export default class SortService {
  constructor(people, filter, films, planets, species, isSorting) {
    this.people = people
    this.filter = filter
    this.films = films
    this.planets = planets
    this.species = species
    this.isSorting = isSorting
    this.peopleStore = usePeopleStore()
  }

  async sortPeople() {
    if (!localStorage.getItem('allPeople')) {
      await this.peopleStore.getAllPeople()
    }

    let sortedPeople = []

    if (
      this.filter.value.includes('films') &&
      this.filter.value.length === 1 &&
      localStorage.getItem('sortedByFilms')
    ) {
      sortedPeople = JSON.parse(localStorage.getItem('sortedByFilms'))
    } else if (
      this.filter.value.includes('planets') &&
      this.filter.value.length === 1 &&
      localStorage.getItem('sortedByPlanets')
    ) {
      sortedPeople = JSON.parse(localStorage.getItem('sortedByPlanets'))
    } else if (
      this.filter.value.includes('species') &&
      this.filter.value.length === 1 &&
      localStorage.getItem('sortedBySpecies')
    ) {
      sortedPeople = JSON.parse(localStorage.getItem('sortedBySpecies'))
    } else if (
      this.filter.value.includes('films') &&
      this.filter.value.includes('planets') &&
      this.filter.value.length === 2 &&
      localStorage.getItem('sortedByFilms') &&
      localStorage.getItem('sortedByPlanets')
    ) {
      const sortedByFilms = JSON.parse(localStorage.getItem('sortedByFilms'))
      const sortedByPlanets = JSON.parse(localStorage.getItem('sortedByPlanets'))
      sortedPeople = [...sortedByFilms, ...sortedByPlanets]
    } else if (
      this.filter.value.includes('films') &&
      this.filter.value.includes('species') &&
      this.filter.value.length === 2 &&
      localStorage.getItem('sortedByFilms') &&
      localStorage.getItem('sortedBySpecies')
    ) {
      const sortedByFilms = JSON.parse(localStorage.getItem('sortedByFilms'))
      const sortedBySpecies = JSON.parse(localStorage.getItem('sortedBySpecies'))
      sortedPeople = [...sortedByFilms, ...sortedBySpecies]
    } else if (
      this.filter.value.includes('species') &&
      this.filter.value.includes('planets') &&
      this.filter.value.length === 2 &&
      localStorage.getItem('sortedBySpecies') &&
      localStorage.getItem('sortedByPlanets')
    ) {
      const sortedBySpecies = JSON.parse(localStorage.getItem('sortedBySpecies'))
      const sortedByPlanets = JSON.parse(localStorage.getItem('sortedByPlanets'))
      sortedPeople = [...sortedBySpecies, ...sortedByPlanets]
    } else if (
      this.filter.value.includes('films') &&
      this.filter.value.includes('planets') &&
      this.filter.value.includes('species') &&
      localStorage.getItem('sortedByFilms') &&
      localStorage.getItem('sortedByPlanets') &&
      localStorage.getItem('sortedBySpecies')
    ) {
      const sortedByFilms = JSON.parse(localStorage.getItem('sortedByFilms'))
      const sortedByPlanets = JSON.parse(localStorage.getItem('sortedByPlanets'))
      const sortedBySpecies = JSON.parse(localStorage.getItem('sortedBySpecies'))
      sortedPeople = [...sortedByFilms, ...sortedByPlanets, ...sortedBySpecies]
    } else {
      if (this.filter.value.includes('films') && this.filter.value.length === 1) {
        sortedPeople = await this.sortByFilms()
      } else if (this.filter.value.includes('planets') && this.filter.value.length === 1) {
        sortedPeople = await this.sortByPlanets()
      } else if (this.filter.value.includes('species') && this.filter.value.length === 1) {
        sortedPeople = await this.sortBySpecies()
      } else if (
        this.filter.value.includes('films') &&
        this.filter.value.includes('planets') &&
        this.filter.value.length === 2
      ) {
        const sortedByFilms = await this.sortByFilms()
        const sortedByPlanets = await this.sortByPlanets()
        sortedPeople = [...sortedByFilms, ...sortedByPlanets]
      } else if (
        this.filter.value.includes('films') &&
        this.filter.value.includes('species') &&
        this.filter.value.length === 2
      ) {
        const sortedByFilms = await this.sortByFilms()
        const sortedBySpecies = await this.sortBySpecies()
        sortedPeople = [...sortedByFilms, ...sortedBySpecies]
      } else if (
        this.filter.value.includes('species') &&
        this.filter.value.includes('planets') &&
        this.filter.value.length === 2
      ) {
        const sortedBySpecies = await this.sortBySpecies()
        const sortedByPlanets = await this.sortByPlanets()
        sortedPeople = [...sortedBySpecies, ...sortedByPlanets]
      } else if (
        this.filter.value.includes('films') &&
        this.filter.value.includes('planets') &&
        this.filter.value.includes('species')
      ) {
        const sortedByFilms = await this.sortByFilms()
        const sortedByPlanets = await this.sortByPlanets()
        const sortedBySpecies = await this.sortBySpecies()
        sortedPeople = [...sortedByFilms, ...sortedByPlanets, ...sortedBySpecies]
      } else {
        sortedPeople = this.people
      }

      if (
        this.filter.value.length > 0 &&
        sortedPeople.length > 0 &&
        !localStorage.getItem('sortedByFilms') &&
        !localStorage.getItem('sortedByPlanets') &&
        !localStorage.getItem('sortedBySpecies')
      ) {
        localStorage.setItem('sortedByFilms', JSON.stringify(sortedPeople))
      }
    }

    return sortedPeople
  }

  async sortByFilms() {
    const sortedPeople = []

    for (const obj of this.people) {
      for (const person of obj.people) {
        for (const filmUrl of person.films) {
          const storedFilm = this.films.find((el) => el.url === filmUrl)
          if (storedFilm && !storedFilm.people.find((el) => el.url === person.url)) {
            await this.peopleStore.updateFilmPeople(storedFilm.url, person)
          } else {
            const filmName = await APIService.fetchFilm(filmUrl)
            await this.peopleStore.addFilm({
              name: filmName.title,
              url: filmUrl,
              category: 'film',
              people: [person]
            })
          }
        }
      }
    }

    localStorage.setItem('sortedByFilms', JSON.stringify(this.films))
    sortedPeople.push(...this.films)
    return sortedPeople
  }

  async sortByPlanets() {
    const sortedPeople = []

    for (const obj of this.people) {
      for (const person of obj.people) {
        const storedPlanet = this.planets.find((el) => el.url === person.homeworld)
        if (storedPlanet && !storedPlanet.people.find((el) => el.url === person.url)) {
          await this.peopleStore.updatePlanetPeople(storedPlanet.url, person)
        } else {
          const planetName = await APIService.fetchPlanet(person.homeworld)
          await this.peopleStore.addPlanet({
            name: planetName.name,
            url: person.homeworld,
            category: 'planet',
            people: [person]
          })
        }
      }
    }

    localStorage.setItem('sortedByPlanets', JSON.stringify(this.planets))
    sortedPeople.push(...this.planets)
    return sortedPeople
  }

  async sortBySpecies() {
    const sortedPeople = []

    for (const obj of this.people) {
      for (const person of obj.people) {
        for (const speccyUrl of person.species) {
          const storedSpeccy = this.species.find((el) => el.url === speccyUrl)
          if (storedSpeccy && !storedSpeccy.people.find((el) => el.url === person.url)) {
            await this.peopleStore.updateSpeccyPeople(storedSpeccy.url, person)
          } else {
            const speccyName = await APIService.fetchSpeccy(speccyUrl)
            await this.peopleStore.addSpeccy({
              name: speccyName.name,
              url: speccyUrl,
              category: 'speccy',
              people: [person]
            })
          }
        }
      }
    }

    localStorage.setItem('sortedBySpecies', JSON.stringify(this.species))
    sortedPeople.push(...this.species)
    return sortedPeople
  }
}
