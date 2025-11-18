<template>
  <b-container id="event-calendar" class="text-center w-100">
    <b-row>
      <b-col>
        <h2>Indy Tech Event Calendar</h2>

        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;ctz=America%2FNew_York&amp;src=aWc3ZTBqNnY4dWI5cTZrZ2EyNTZuNzcwNDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%230B8043"
          width="100%"
          height="600"
          allowfullscreen
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button-group class="mt-3">
          <!-- <b-button variant="primary" href="/recommend-event">Recommend event</b-button> -->
          <b-button
            variant="primary"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdlfIqF42uU8iyoYyqKDFPEYRsNCOCFYpFJwMTvdVOkK3otSg/viewform?usp=sf_link"
          >Recommend event</b-button
          >
          <b-button
            variant="secondary"
            href="webcal://calendar.google.com/calendar/ical/ig7e0j6v8ub9q6kga256n77048%40group.calendar.google.com/public/basic.ics"
          >Subscribe to calendar</b-button
          >
        </b-button-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
import { ref } from 'vue'
import { BContainer, BRow, BCol, BButton, BButtonGroup } from 'bootstrap-vue-next'

// You can add any reactive data or methods here if needed
</script>

<style scoped>
#event-calendar {
  margin-top: 20px;
}
</style>
