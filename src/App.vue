<template>
  <div id="app">
    <NavigationBar class="top" />
    <RouterView class="content" />
    <BottomLinkTree class="bottom" />
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
  },
  computed: {
    isLoggedIn() {
      return this.pocketbase.authStore.isValid
    },
    currentUser() {
      return this.pocketbase.authStore.model
    }
  },
}
</script>

<style>
@import '@/assets/base.scss';

@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');

.space-mono-regular {
  font-family: 'Space Mono', serif;
  font-weight: 400;
  font-style: normal;
}

.space-mono-bold {
  font-family: 'Space Mono', serif;
  font-weight: 700;
  font-style: normal;
}

.work-sans-bold {
  font-family: 'Work Sans', serif;
  font-weight: 700;
  font-style: normal;
}

.dosis-bold {
  font-family: 'Dosis', serif;
  font-weight: 700;
  font-style: normal;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Space Mono', serif;
  font-weight: 400;
  font-style: normal;
}

a {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  &:hover {
    color: #aaa;
  }
}
</style>

<style style="scss">
:deep(body) {
  font-size: 1rem;
  font-family: 'Work Sans', serif;
  font-weight: 400;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.yggdrasil {
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100vw;
  scroll-behavior: smooth;
}

.content::-webkit-scrollbar {
  display: none;
}

.top {
  position: sticky;
  top: 0;
  z-index: 1;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 3rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Ensure adequate spacing on smaller screens */
@media screen and (max-width: 768px) {
  .content {
    padding-bottom: 4rem;
  }
}

@media screen and (max-width: 480px) {
  .content {
    padding-bottom: 5rem;
  }
}

.bottom {
  margin-top: auto;
  z-index: 1;
}
</style>

<style scoped style="scss">
/* Add any additional global styles if needed */
</style>
