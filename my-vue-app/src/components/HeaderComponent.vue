<template>
  <header class="header" ref="headerRef">
    <button class="header__menu-btn" ref="headerMenuBtnRef" @click="toggleSidebarLeft">
      <font-awesome-icon
        :icon="['fas', 'bars']"
        style="color: #ffffff; width: 25px; height: 20px"
      />
    </button>
    <SearchbarComponent />
  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { usePeopleStore } from '@/stores/peopleStore'
import SearchbarComponent from './SearchbarComponent.vue'

library.add(faBars)

export default {
  components: {
    FontAwesomeIcon,
    SearchbarComponent
  },
  props: {
    headerRef: {
      type: Object,
      default: null
    },
    headerMenuBtnRef: {
      type: Object,
      default: null
    }
  },
  setup() {
    const peopleStore = usePeopleStore()

    const toggleSidebarLeft = () => {
      peopleStore.toggleSidebarLeft()
    }

    return {
      toggleSidebarLeft
    }
  }
}
</script>

<style>
.header {
  display: flex;
  padding: 10px;
  width: 100%;
  background-color: #1976d2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.header__menu-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: transparent;
  border: unset;
  cursor: pointer;
}
</style>
