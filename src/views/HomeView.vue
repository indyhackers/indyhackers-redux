<template>
  <!-- Hero -->
  <section class="hero">
    <div class="ih-container">
      <h1 class="hero__heading">Fostering the Indiana<br />Tech Community</h1>
      <p class="hero__sub">
        A network for all tech folks in Indiana. Fostering community connections and celebrating
        individual successes.
      </p>
      <div class="hero__ctas">
        <a href="https://slack.indyhackers.org/" target="_blank" class="ih-btn-primary">
          Slack it to me!
        </a>
        <RouterLink to="/calendar" class="ih-btn-outline">Upcoming Events</RouterLink>
      </div>
    </div>
  </section>

  <!-- Community Proof -->
  <section class="proof">
    <div class="ih-container">
      <div class="proof__strip">
        <div class="proof__item">
          <span class="proof__number">3,200+</span>
          <span class="proof__label">members on Slack</span>
        </div>
        <div class="proof__item">
          <span class="proof__number">50+</span>
          <span class="proof__label">meetups a year</span>
        </div>
        <div class="proof__item">
          <span class="proof__number">2013</span>
          <span class="proof__label">and still going</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Upcoming Events -->
  <section class="events-section">
    <div class="ih-container">
      <EventsView />
    </div>
  </section>

</template>
<script>
import EventsView from '../components/EventsView.vue'

export default {
  name: 'HomeView',
  components: {
    EventsView
  }
}
</script>

<style scoped>
/* Hero */
.hero {
  padding: 7rem 1.25rem 5rem;
}

.hero__heading {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  max-width: 40rem;
}

.hero__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: rgba(18, 18, 18, 0.7);
  line-height: 1.6;
  max-width: 32rem;
  margin-bottom: 2rem;
}

.hero__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Community Proof */
.proof {
  padding: 3rem 1.25rem 4rem;
}

.proof__strip {
  display: flex;
  gap: 4rem;
}

.proof__item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.proof__number {
  font-family: 'Space Mono', monospace;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: bold;
  line-height: 1;
  letter-spacing: -0.02em;
}

.proof__label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  color: rgba(18, 18, 18, 0.65);
}

/* Events */
.events-section {
  padding: 5rem 0;
}


@media (max-width: 768px) {
  .hero {
    padding: 5rem 0 3rem;
  }

  .proof__strip {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
