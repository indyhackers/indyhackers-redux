<template>
  <b-container id="event-calendar" class="w-100">
    <b-row>
      <b-col>
        <div class="text-center mb-4">
          <h2>Upcoming Events</h2>
          <p class="text-muted">Join us for exciting tech events and meetups in Indianapolis</p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <b-spinner variant="primary" label="Loading events..."></b-spinner>
          <p class="mt-3 text-muted">Loading events...</p>
        </div>

        <!-- Error State -->
        <b-alert v-else-if="error" variant="danger" show class="my-4">
          <h5>Unable to load events</h5>
          <p>{{ error }}</p>
          <b-button variant="danger" @click="fetchEvents">Retry</b-button>
        </b-alert>

        <!-- No Events State -->
        <b-alert v-else-if="events.length === 0" variant="info" show class="my-4">
          <h5>No upcoming events</h5>
          <p>Check back soon for new events, or recommend one below!</p>
        </b-alert>

        <!-- Events List -->
        <div v-else class="events-list">
          <EventListItem
            v-for="event in events"
            :key="event.id"
            :event="event"
          />
        </div>

        <!-- Buttons -->
        <div class="text-center mt-4">
          <b-button-group>
            <b-button
              variant="primary"
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdlfIqF42uU8iyoYyqKDFPEYRsNCOCFYpFJwMTvdVOkK3otSg/viewform?usp=sf_link"
            >
              Recommend event
            </b-button>
            <b-button
              variant="secondary"
              href="webcal://calendar.google.com/calendar/ical/ig7e0j6v8ub9q6kga256n77048%40group.calendar.google.com/public/basic.ics"
            >
              Subscribe to calendar
            </b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { onMounted } from 'vue'
import {
  BContainer,
  BRow,
  BCol,
  BButton,
  BButtonGroup,
  BAlert,
  BSpinner
} from 'bootstrap-vue-next'
import { useCalendar } from '../composables/useCalendar'
import EventListItem from './EventListItem.vue'

const { events, loading, error, fetchEvents } = useCalendar()

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
#event-calendar {
  margin-top: 20px;
  //max-width: 900px;
}

.events-list {
  margin-top: 2rem;
}
</style>
