<template>
  <div class="auth-layout">
    <b-card class="auth-card">
      <h1>{{ title }}</h1>
      <slot></slot>
    </b-card>
  </div>
</template>

<script>
import { BCard, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next'

export default {
  components: { BCard, BForm, BFormGroup, BFormInput, BButton },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    handleSubmit() {
      // Handle form submission
    }
  }
}
</script>

<style>
.auth-layout {
  justify-content: center;
  width: 40vw;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    background-color 0.3s,
    color 0.3s;
}

.auth-card {
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s;
}

.auth-layout h1 {
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
}

.auth-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
