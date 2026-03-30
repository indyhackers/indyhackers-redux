<template>
  <div id="app" :style="{ backgroundColor: appBackground }">
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
    },
    appBackground() {
      return this.$route?.path.startsWith('/job') ? 'var(--card)' : 'var(--background)'
    }
  },
}
</script>

<style>
@import '@/assets/base.scss';
@import '@/styles/main.scss';

@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Space Mono', monospace;
  font-weight: bold;
}

a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  &:hover {
    opacity: 0.7;
  }
}
</style>

<style lang="scss">
:deep(body) {
  font-size: 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 400;
  background-color: var(--background);
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--background);
}

.content {
  flex: 1;
}

.bottom {
  margin-top: auto;
  z-index: 1;
}
</style>

