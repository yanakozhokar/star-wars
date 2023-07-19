<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Star Wars
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-toolbar>
        <q-toolbar-title>
          Filters
        </q-toolbar-title>
      </q-toolbar>
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
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)
    const filters = ref([
      { label: 'Films', value: 'films', isActive: false },
      { label: 'Planets', value: 'planets', isActive: false },
      { label: 'Species', value: 'species', isActive: false }
    ])

    return {
      leftDrawerOpen,
      filters,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
