<template>
  <div class="job-view">
    <b-container class="mt-4">
      <b-row>
        <b-col cols="12" md="8" offset-md="2">
          <b-card class="job-card">
            <h2 class="job-title">{{ job.title }}</h2>
            <p class="company-name">{{ job.company }}</p>
            <div class="salary-info">
              <b-badge class="salary-badge">{{ salary }}</b-badge>
            </div>
            <p class="subtitle">Posted {{ formattedDate }}</p>

            <!-- Render the description and how to apply with markup support -->
            <div class="job-description" v-html="sanitizedDescription"></div>
            <div class="how-to-apply" v-if="job.how_to_apply">
              <p class="how-to-apply-title">How to apply:</p>
              <div class="job-how-to-apply" v-html="sanitizedHowToApply"></div>
            </div>

          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import DOMPurify from 'dompurify'

export default defineComponent({
  name: 'JobView',
  props: {},
  components: [],
  data() {
    return {
      job: {
        title: '',
        company: '',
        salary_min: 0,
        salary_max: 0,
        description: '',
        how_to_apply: ''
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
    formattedDate() {
      const job = this.job
      if (job.approved_at != null && job.approved_at !== '') {
        const date = new Date(job.approved_at)
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: "medium"
        }).format(date)
      } else {
        return ''
      }
    },
    salary() {
      const j = this.job
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
    sanitizedDescription() {
      return DOMPurify.sanitize(this.job.description)
    },
    sanitizedHowToApply() {
      return DOMPurify.sanitize(this.job.how_to_apply)
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
  border-radius: 12px;
  border: 1px solid var(--border) !important;
  background: var(--card) !important;
  padding: 2rem;
  transition: box-shadow 0.3s ease-in-out;
}

.row > :last-child {
  padding-bottom: 20px;
}

.job-card:hover {
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
}

.job-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.company-name {
  font-size: 1.2rem;
  color: var(--muted-foreground);
  margin-bottom: 1rem;
}

.salary-info {
  margin-bottom: 1rem;
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

.job-description,
.job-how-to-apply {
  font-size: 1rem;
  color: var(--foreground);
  line-height: 1.6;
  white-space: pre-wrap;
}

.how-to-apply-title {
  margin-top: 1.5rem;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
