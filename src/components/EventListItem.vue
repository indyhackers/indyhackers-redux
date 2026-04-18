<template>
  <b-card class="event-card mb-3" :class="{ 'all-day-event': event.isAllDay }">
    <b-card-body>
      <div class="event-header">
        <h4 class="event-title">{{ event.title }}</h4>
        <span v-if="event.isAllDay" class="all-day-pill">All Day</span>
      </div>

      <div class="event-time">
        <icon-carbon-time class="icon" />
        <span v-if="event.isAllDay">
          {{ formatDate(event.start) }}
        </span>
        <span v-else>
          {{ formatDateTime(event.start) }}
          <span v-if="event.end"> - {{ formatTime(event.end) }}</span>
        </span>
      </div>

      <div v-if="event.location" class="event-location">
        <icon-carbon-location class="icon" />
        {{ event.location }}
      </div>

      <div v-if="event.description" class="event-description" v-html="sanitizeHtml(event.description)"></div>

      <a
        v-if="event.link"
        :href="event.link"
        target="_blank"
        class="ih-btn-outline event-link-btn mt-2"
      >
        View in Calendar
      </a>
    </b-card-body>
  </b-card>
</template>

<script setup>
import { BCard, BCardBody } from 'bootstrap-vue-next'
import DOMPurify from 'dompurify'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  })
}

const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target']
  })
}
</script>

<style scoped>
.event-card {
  transition: border-color 0.15s;
  background: var(--card) !important;
  border: 1px solid var(--border) !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  width: 100%;
}

.event-card:hover {
  border-color: var(--foreground) !important;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.event-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--foreground);
}

.event-time,
.event-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--muted-foreground);
  font-size: 0.95rem;
}

.icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.event-description {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  color: var(--muted-foreground);
  line-height: 1.6;
}

.event-description:deep(a) {
  color: var(--foreground);
  text-decoration: underline;
}

.event-description:deep(a:hover) {
  opacity: 0.7;
}

.event-link-btn {
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
  display: inline-flex;
}

.all-day-pill {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: var(--foreground);
}
</style>
