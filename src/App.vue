<template>
  <div id="app">
    <NavigationBar />
    <RouterView />
    <!-- 
      This footer-spacer will flex-grow to take up the rest of the vertical space of the window, 
      up to the min-height:100vh #app has.
    -->
    <div class="footer-spacer" />
    <BottomLinkTree />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import BottomLinkTree from './components/BottomLinkTree.vue'

export default {
  name: 'App',
  components: {
    NavigationBar,
    BottomLinkTree,
    RouterView
  }
}
</script>

<style scoped>
/* Add any additional global styles if needed */
:deep(body) {
  font-size: 1rem;
  font-family:
    Poppins,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-weight: 400;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.footer-spacer {
  flex-grow: 1;
}
</style>
