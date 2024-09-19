<template>
  <component :is="currentComponent"></component>
</template>

<script>
import JobsList from '../components/jobs/JobsList.vue'
import JobListing from '../components/jobs/JobListing.vue'

export default {
  name: 'OmniView',
  props: {
    currentComponent: {
      type: String,
      required: true
    }
  },
  components: {
    JobsList,
    JobListing
  }
}
</script>
