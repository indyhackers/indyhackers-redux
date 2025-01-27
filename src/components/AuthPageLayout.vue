<template>
  <div class="auth-layout dark-mode">
    <b-card>
      <h1>{{ title }}</h1>
      <div class="auth-content">
        <slot></slot>
      </div>
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue-next'

export default {
  components: { BCard },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.auth-layout {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.auth-layout h1 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  color: #333;
}

.auth-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(.dark-mode) {
  background-color: #121212;
  color: #ffffff;
  /* Add other dark mode styles here */
}
</style>
