<template>
  <div class="events-view">
    <div class="events-header">
      <h2>Upcoming Events</h2>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="events-loading">
      <b-spinner variant="primary" label="Loading events..."></b-spinner>
      <p>Loading events...</p>
    </div>

    <!-- Error State -->
    <b-alert v-else-if="error" variant="danger" show class="my-4">
      <h5>Unable to load events</h5>
      <p>{{ error }}</p>
      <button class="ih-btn-outline" @click="fetchEvents">Retry</button>
    </b-alert>

    <!-- No Events State -->
    <b-alert v-else-if="events.length === 0" variant="info" show class="my-4">
      <h5>No upcoming events</h5>
      <p>Check back soon for new events, or recommend one below!</p>
    </b-alert>

    <!-- Events List -->
    <div v-else class="events-list">
      <EventListItem
        v-for="event in visibleEvents"
        :key="event.id"
        :event="event"
      />
      <div v-if="hasMore" class="load-more">
        <button class="ih-btn-outline" @click="loadMore">Load More</button>
      </div>
    </div>

    <!-- Actions -->
    <div class="events-actions">
      <a
        class="ih-btn-primary"
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdlfIqF42uU8iyoYyqKDFPEYRsNCOCFYpFJwMTvdVOkK3otSg/viewform?usp=sf_link"
      >
        Recommend an Event
      </a>
      <a
        class="ih-btn-outline"
        href="webcal://calendar.google.com/calendar/ical/ig7e0j6v8ub9q6kga256n77048%40group.calendar.google.com/public/basic.ics"
      >
        Subscribe to Calendar
      </a>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { BAlert, BSpinner } from 'bootstrap-vue-next'
import { useCalendar } from '@/composables/useCalendar'
import EventListItem from '@/components/EventListItem.vue'

const props = defineProps({
  limit: {
    type: Number,
    default: 5
  }
})

const { events, loading, error, fetchEvents, visibleEvents, hasMore, loadMore } = useCalendar({ initialCount: props.limit })

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
.events-view {
  width: 100%;
}

.events-header {
  margin-bottom: 2rem;
}

.events-loading {
  text-align: center;
  padding: 3rem 0;
  color: var(--text-muted);
}

.events-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.load-more {
  text-align: center;
  padding-top: 1.5rem;
}

.events-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid color-mix(in srgb, var(--border) 10%, transparent);
}
</style>
