<template>
  <div class="job-view">
    <b-container class="mt-4">
      <b-row>
        <b-col cols="12" md="8" offset-md="2">
          <b-card class="job-card">
            <h2 class="job-title">{{ job.title }}</h2>
            <p class="company-name">{{ job.company }}</p>
            <div class="salary-info">
              <b-badge v-if="job.salary_min > 0" class="salary-badge">{{ salary }}</b-badge>
            </div>
            <p class="subtitle">Posted at </p>


            <!-- Render the description with markup support -->
            <div class="job-description" v-html="job.description"></div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'JobView',
  props: {},
  components: [],
  data() {
    return {
      job: {
        title: '',
        company: '',
        salary_min: null,
        salary_max: null,
        description: ''
      }
    }
  },
  methods: {
    async fetchJob(jobId) {
      try {
        // Fetch the job by ID from PocketBase
        const job = await this.pocketbase.collection('jobs').getOne(jobId)
        this.job = job
      } catch (error) {
        console.error('Error fetching job:', error)
      }
    }
  },
  computed: {
    salary() {
      const j = this.job
      if (j.salary_max != null && j.salary_min != null) {
        return `$${j.salary_min}-${j.salary_max}K`
      } else if (j.salary_min != null && j.salary_max == null) {
        return `$${j.salary_min}K (min)`
      } else if (j.salary_min == null && j.salary_max != null) {
        return `$${j.salary_min}K (max)`
      } else {
        return ''
      }
    }
  },
  mounted() {
    const jobId = this.$route.query.id // Get jobId from query parameter
    if (jobId) {
      this.fetchJob(jobId)
    } else {
      console.error('No jobId provided in query parameters.')
    }
  }
})
</script>

<style scoped>
.job-card {
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  background-color: #fff;
  transition: box-shadow 0.3s ease-in-out;
}

.row > :last-child {
  padding-bottom: 20px;
}

.job-card:hover {
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
}

.job-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.company-name {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 1rem;
}

.salary-info {
  margin-bottom: 1rem;
}

.salary-badge {
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
}

.job-description {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap; /* Support for long text with line breaks */
}
</style>
