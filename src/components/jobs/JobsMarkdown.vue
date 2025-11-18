<template>
  <b-container class="jobs-markdown-page py-4">
    <b-row>
      <b-col>
        <div class="text-center mb-4">
          <h2>Jobs Markdown</h2>
          <p class="text-muted">Copy and paste the markdown below</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <b-spinner variant="primary" label="Loading jobs..."></b-spinner>
          <p class="mt-3 text-muted">Loading jobs...</p>
        </div>

        <!-- Error State -->
        <b-alert v-else-if="error" variant="danger" show class="my-4">
          <h5>Unable to load jobs</h5>
          <p>{{ error }}</p>
          <b-button variant="danger" @click="fetchJobs">Retry</b-button>
        </b-alert>

        <!-- No Jobs State -->
        <b-alert v-else-if="jobs.length === 0" variant="info" show class="my-4">
          <h5>No jobs available</h5>
          <p>Check back soon for new job postings!</p>
        </b-alert>

        <!-- Markdown Output -->
        <div v-else>
          <div class="d-flex justify-content-end mb-3">
            <b-button variant="primary" @click="copyToClipboard" size="sm">
              {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
            </b-button>
          </div>

          <div class="markdown-output">
            <pre>{{ markdownText }}</pre>
          </div>

          <div class="mt-3 text-muted text-center">
            <small>{{ jobs.length }} job{{ jobs.length !== 1 ? 's' : '' }} available</small>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { BContainer, BRow, BCol, BButton, BAlert, BSpinner } from 'bootstrap-vue-next'

const pocketbase = inject('pocketbase')
const jobs = ref([])
const loading = ref(false)
const error = ref(null)
const copied = ref(false)

// Fetch jobs from PocketBase
const fetchJobs = async () => {
  loading.value = true
  error.value = null

  try {
    const result = await pocketbase.collection('jobs').getList(1, 100, {
      sort: '-created',
      filter: 'approved = true'
    })
    jobs.value = result.items
  } catch (err) {
    console.error('Error fetching jobs:', err)
    error.value = err.message || 'Failed to fetch jobs'
  } finally {
    loading.value = false
  }
}

// Format a single job as markdown
const formatJobAsMarkdown = (job) => {
  const title = job.title
  const company = job.company
  const jobUrl = `${window.location.origin}/job?id=${job.id}`

  return `[${title} at ${company}](${jobUrl})`
}

// Generate the complete markdown text
const markdownText = computed(() => {
  if (jobs.value.length === 0) {
    return 'No jobs available.'
  }

  return jobs.value
    .map(job => formatJobAsMarkdown(job))
    .join('\n')
})

// Copy to clipboard function
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(markdownText.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}

onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
.jobs-markdown-page {
  max-width: 900px;
}

.markdown-output {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 1.5rem;
  max-height: 600px;
  overflow-y: auto;
}

.markdown-output pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.8;
  color: #2c3e50;
}
</style>
