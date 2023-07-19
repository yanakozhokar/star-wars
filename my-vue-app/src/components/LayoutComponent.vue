<template>
  <div>
    <HeaderComponent :headerRef="headerRef" :headerMenuBtnRef="headerMenuBtnRef" />
    <main class="main" ref="mainRef">
      <SidebarLeftComponent />
      <router-view></router-view>
    </main>
    <FooterComponent :footerRef="footerRef" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import HeaderComponent from './HeaderComponent.vue'
import SidebarLeftComponent from './SidebarLeftComponent.vue'
import FooterComponent from './FooterComponent.vue'

export default {
  components: {
    HeaderComponent,
    SidebarLeftComponent,
    FooterComponent
  },
  setup() {
    const headerRef = ref(null)
    const mainRef = ref(null)
    const footerRef = ref(null)
    const headerMenuBtnRef = ref(null)

    onMounted(() => {
      setMainMinHeight()
    })

    const setMainMinHeight = () => {
      const headerHeight = headerRef.value ? headerRef.value.offsetHeight : 0
      const footerHeight = footerRef.value ? footerRef.value.offsetHeight : 0
      const mainElement = mainRef.value
      if (mainElement) {
        const mainMinHeight = `calc(100vh - ${headerHeight + footerHeight}px)`
        mainElement.style.minHeight = mainMinHeight
      }
    }

    return {
      headerRef,
      mainRef,
      footerRef,
      headerMenuBtnRef
    }
  }
}
</script>

<style>
.main {
  display: flex;
  background-color: #fafafa;
}
</style>
