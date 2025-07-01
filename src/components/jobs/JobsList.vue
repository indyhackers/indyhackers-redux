<template>
  <div class="job-board">
    <b-container>
      <b-row>
        <b-col cols="12" class="mt-3 mb-2">
          <create-job-modal />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <h1 class="title">Indianapolis Tech Jobs</h1>
          <p class="subtitle">
            Have an open position at your company? It is completely free to submit a job to our job
            board! Each job remains published for 60 days, and will be included in our newsletter
            while published.
          </p>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-for="job in jobs" :key="job.id" cols="12" class="mb-3">
          <b-card :title="job.title" class="job-card" @click="viewJob(job)">
            <p class="company">{{ job.company }}</p>
            <b-badge v-if="job.salary_min > 0" class="salary-badge">{{ salary(job) }}</b-badge>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CreateJobModal from './CreateJobModal.vue'

export default defineComponent({
  name: 'JobBoard',
  data() {
    return {
      jobs: []
    }
  },
  components: [CreateJobModal],
  methods: {
    async fetchJobs() {
      try {
        const jobs = await this.pocketbase.collection('jobs').getList(
          1, 100,{
            sort: '-created_at',
            where: { approved: true }
        })
        this.jobs = jobs.items
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    },
    salary(j) {
      //TODO: to locale string? probably not necessary
      if (j.salary_max != null && j.salary_min != null) {
        return `$${j.salary_min}-${j.salary_max}K`
      } else if (j.salary_min != null && j.salary_max == null) {
        return `$${j.salary_min}K (min)`
      } else if (j.salary_min == null && j.salary_max != null) {
        return `$${j.salary_min}K (max)`
      } else {
        return null
      }
    },
    viewJob(job) {
      this.$router.push({ path: `/job`, query: { id: job.id } })
    }
  },
  // computed: {

  // },
  mounted() {
    this.fetchJobs()
  }
})
</script>

<style scoped>
.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.subtitle {
  font-size: 1.2rem;
  color: #666;
}
.job-card {
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  transition: box-shadow 0.3s ease-in-out;
}
.job-card:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}
.company {
  font-size: 1.1rem;
  color: #333;
}
.salary-badge {
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
}
</style>
