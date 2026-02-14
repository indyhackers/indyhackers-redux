<template>
  <b-card class="event-card mb-3" :class="{ 'all-day-event': event.isAllDay }">
    <b-card-body>
      <div class="event-header">
        <h4 class="event-title">{{ event.title }}</h4>
        <b-badge v-if="event.isAllDay" variant="info">All Day</b-badge>
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

      <b-button
        v-if="event.link"
        variant="primary"
        size="sm"
        :href="event.link"
        target="_blank"
        class="mt-2"
      >
        View in Google Calendar
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script setup>
import { BCard, BCardBody, BButton, BBadge } from 'bootstrap-vue-next'
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
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid #0B8043;
}

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.all-day-event {
  border-left-color: #4285F4;
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
  color: #2c3e50;
}

.event-time,
.event-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #5f6368;
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
  border-top: 1px solid #e9ecef;
  color: #5f6368;
  line-height: 1.6;
}

.event-description:deep(a) {
  color: #0B8043;
  text-decoration: none;
}

.event-description:deep(a:hover) {
  text-decoration: underline;
}
</style>
