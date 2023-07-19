import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeopleView from '../views/PeopleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: (route) => ({
        filmsFilter: route.query.films === '1',
        planetsFilter: route.query.planets === '1',
        speciesFilter: route.query.species === '1'
      })
    },
    {
      path: '/people/:id',
      name: 'people',
      component: PeopleView
    }
  ]
})

export default router
