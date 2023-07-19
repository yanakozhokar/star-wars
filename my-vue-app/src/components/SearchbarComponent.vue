<template>
  <input class="searchbar" type="text" v-model="searchValue" />
  {{peopleStore}}
</template>

<script>
import {onMounted, ref, watch} from 'vue'
import { usePeopleStore } from '@/stores/peopleStore'
//usePeopleStore
export default {
  setup() {
    const peopleStore = usePeopleStore()
    const searchValue = ref('')

    //
    // onMounted(() =>  {
    //   peopleStore.films = peopleStore.films.filter((res) => {
    //   });
    // })

    // const onSearchbarChange = () => {
    //   peopleStore.setSearchbarValue(searchValue.value)
    // }

    // watch(searchValue, () => {
    //   onSearchbarChange()
    // })

    return {
      searchValue,
      peopleStore
    }
  }
}
</script>

<style>
.searchbar {
  margin-left: auto;
  margin-right: auto;
  padding: 5px 10px;
  width: 250px;
  border-radius: 5px;
  border: unset;
}

.searchbar:focus {
  outline: unset;
}
</style>
