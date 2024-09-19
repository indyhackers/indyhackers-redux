<template>
  <div class="container mt-5">
    <b-card class="bg-dark text-white">
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderView',
  props: {
    title: String,
    content: String
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
