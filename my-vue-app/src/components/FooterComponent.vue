<template>
  <footer class="footer" ref="footerRef">
    <p class="copyright">&copy; 2023</p>
  </footer>
</template>

<script>
export default {
  props: {
    footerRef: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
.footer {
  padding: 12px;
  width: 100%;
  background-color: #475d66;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.2);
}

.copyright {
  font-size: 12px;
  text-align: center;
  color: #ffffff;
}
</style>
