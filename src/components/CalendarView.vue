<template>
  <section class="calendar-section">
    <div class="ih-container">
      <h1>Indy Tech Event Calendar</h1>
      <iframe
        title="IndyHackers Tech Event Calendar"
        src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;ctz=America%2FNew_York&amp;src=aWc3ZTBqNnY4dWI5cTZrZ2EyNTZuNzcwNDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%230B8043"
        width="100%"
        height="800"
        allowfullscreen
      />
      <div class="calendar-actions">
        <a
          class="ih-btn-primary"
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdlfIqF42uU8iyoYyqKDFPEYRsNCOCFYpFJwMTvdVOkK3otSg/viewform?usp=sf_link"
        >Recommend Event</a>
        <a
          class="ih-btn-outline"
          href="webcal://calendar.google.com/calendar/ical/ig7e0j6v8ub9q6kga256n77048%40group.calendar.google.com/public/basic.ics"
        >Subscribe to Calendar</a>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.calendar-section {
  padding: 3rem 0;
}

.calendar-section h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.calendar-section h2 {
  margin-bottom: 1.5rem;
}

.calendar-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}
</style>
