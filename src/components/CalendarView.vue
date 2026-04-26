<template>
  <section class="calendar-hero">
    <div class="ih-container">
      <h1>Event Calendar</h1>
      <p class="calendar-hero__sub">
        Meetups, workshops, and community events across Indiana tech.
      </p>
    </div>
  </section>

  <section class="calendar-embed">
    <div class="ih-container">
      <div class="calendar-embed__frame">
        <iframe
          title="IndyHackers Tech Event Calendar"
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;ctz=America%2FNew_York&amp;src=aWc3ZTBqNnY4dWI5cTZrZ2EyNTZuNzcwNDhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%230B8043"
          width="100%"
          height="600"
          allowfullscreen
        />
      </div>
      <div class="calendar-actions">
        <a
          class="ih-btn-primary"
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdlfIqF42uU8iyoYyqKDFPEYRsNCOCFYpFJwMTvdVOkK3otSg/viewform?usp=sf_link"
        >Recommend an Event</a>
        <a
          class="ih-btn-outline"
          href="webcal://calendar.google.com/calendar/ical/ig7e0j6v8ub9q6kga256n77048%40group.calendar.google.com/public/basic.ics"
        >Subscribe to Calendar</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.calendar-hero {
  padding: 3rem 0 2rem;
}

.calendar-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1.25rem;
}

.calendar-hero__sub {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.calendar-embed {
  padding: 0 0 4rem;
}

.calendar-embed__frame {
  border: 1px solid color-mix(in srgb, var(--border) 15%, transparent);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.calendar-embed__frame iframe {
  display: block;
  border: none;
}

.calendar-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .calendar-embed__frame iframe {
    height: 450px;
  }
}
</style>
