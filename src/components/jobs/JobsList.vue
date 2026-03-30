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
            <b-badge class="salary-badge">{{ salary(job) }}</b-badge>
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
        const cutoff = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
        const jobs = await this.pocketbase.collection('jobs').getList(
          1, 100,{
            sort: '-approved_at',
            filter: `approved = true && approved_at != "" && approved_at >= "${cutoff}"`
        })
        this.jobs = jobs.items
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    },
    salary(j) {
      //TODO: to locale string? probably not necessary
      if (j.salary_max != 0 && j.salary_min != 0) {
        return `$${j.salary_min}-${j.salary_max}K`
      } else if (j.salary_min != 0 && j.salary_max == 0) {
        return `$${j.salary_min}K (min)`
      } else if (j.salary_min == 0 && j.salary_max != 0) {
        return `$${j.salary_max}K (max)`
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
  color: var(--muted-foreground);
}
.job-card {
  border-radius: 8px;
  border: 1px solid var(--border) !important;
  background: var(--card) !important;
  padding: 1rem;
  transition: box-shadow 0.3s ease-in-out;
}
.job-card:hover {
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
}
.company {
  font-size: 1.1rem;
  color: var(--muted-foreground);
}
.salary-badge {
  background-color: var(--foreground) !important;
  color: var(--primary-foreground) !important;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
}
</style>
