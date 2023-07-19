import axios from 'axios'

class APIService {
  async fetchAllPeople() {
    let page = 1
    let nextPage = null
    let allPeople = []

    do {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
        const data = response.data
        page += 1
        nextPage = data.next
        const filteredPeople = data.results.map((person) => {
          return { id: person.name.toLowerCase().replaceAll(' ', '-'), ...person }
        })
        allPeople.push(...filteredPeople)
      } catch (error) {
        console.log(error)
      }
    } while (nextPage)

    return allPeople
  }

  fetchPerson = async (url) => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw new Error(`Error fetching person: ${error.message}`)
    }
  }

  fetchFilm = async (url) => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw new Error(`Error fetching film: ${error.message}`)
    }
  }

  fetchPlanet = async (url) => {
    try {
      const response = await fetch(url)
      return response.json()
    } catch (error) {
      throw new Error(`Error fetching planet: ${error.message}`)
    }
  }

  fetchSpeccy = async (url) => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw new Error(`Error fetching speccy: ${error.message}`)
    }
  }

  fetchVehicle = async (url) => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw new Error(`Error fetching vehicle: ${error.message}`)
    }
  }

  fetchStarship = async (url) => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      throw new Error(`Error fetching starship: ${error.message}`)
    }
  }

  fetchFilms = async (filmUrls) => {
    const uniqueFilmUrls = [...new Set(filmUrls)]

    const fetchFilmPromises = uniqueFilmUrls.map(async (filmUrl) => {
      try {
        const response = await axios.get(filmUrl)
        return response.data
      } catch (error) {
        throw new Error(`Error fetching film: ${error.message}`)
      }
    })

    return Promise.all(fetchFilmPromises)
  }

  fetchPlanets = async (planetUrls) => {
    const uniquePlanetUrls = [...new Set(planetUrls)]

    const fetchPlanetPromises = uniquePlanetUrls.map(async (planetUrl) => {
      try {
        const response = await axios.get(planetUrl)
        return response.data
      } catch (error) {
        throw new Error(`Error fetching planet: ${error.message}`)
      }
    })

    return Promise.all(fetchPlanetPromises)
  }

  fetchSpecies = async (speciesUrls) => {
    const uniqueSpeciesUrls = [...new Set(speciesUrls)]

    const fetchSpeciesPromises = uniqueSpeciesUrls.map(async (speciesUrl) => {
      try {
        const response = await axios.get(speciesUrl)
        return response.data
      } catch (error) {
        throw new Error(`Error fetching species: ${error.message}`)
      }
    })

    return Promise.all(fetchSpeciesPromises)
  }
}

export default new APIService()
