<template>
  <!-- Hero -->
  <section class="hero">
    <div class="ih-container hero__layout">
      <div class="hero__copy">
        <h1 class="hero__heading">Indiana's tech community<br />since 2017</h1>
        <p class="hero__sub">
          What started as a few devs meeting for coffee is now 3,000 members strong.
          Come hang out.
        </p>
        <div class="hero__ctas">
          <a href="https://slack.indyhackers.org/" target="_blank" class="ih-btn-primary">
            Slack it to me!
          </a>
          <RouterLink to="/calendar" class="ih-btn-outline">Upcoming Events</RouterLink>
        </div>
      </div>
      <div class="hero__photo">
        <img src="/images/welcome.jpg" alt="IndyHackers community event" />
      </div>
    </div>
  </section>

  <!-- Community Proof -->
  <section class="proof">
    <div class="ih-container">
      <div class="proof__strip">
        <div class="proof__item">
          <span class="proof__number">3,000+</span>
          <span class="proof__label">members on Slack</span>
        </div>
        <div class="proof__item">
          <span class="proof__number">50+</span>
          <span class="proof__label">meetups a year</span>
        </div>
        <div class="proof__item">
          <span class="proof__number">2017</span>
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
  },
}
</script>

<style scoped>
/* Hero */
.hero {
  padding: 7rem 0 5rem;
}

.hero__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero__heading {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: bold;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}

.hero__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: #453a22;
  line-height: 1.6;
  max-width: 32rem;
  margin-bottom: 2rem;
}

.hero__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero__photo img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(18, 18, 18, 0.1);
}

/* Community Proof */
.proof {
  padding: 3rem 0 4rem;
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
  color: #453a22;
  letter-spacing: 0.01em;
}

/* Events */
.events-section {
  padding: 4rem 0 5rem;
  border-top: 1px solid rgba(18, 18, 18, 0.12);
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 0 3rem;
  }

  .hero__layout {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .proof__strip {
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
