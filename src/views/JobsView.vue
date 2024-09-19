<template>
  <div>
    <JobsListVue />
  </div>
</template>

<script>
import JobsListVue from '../components/jobs/JobsList.vue'

export default {
  name: 'JobsView',
  components: {
    JobsListVue
  }
}
</script>
