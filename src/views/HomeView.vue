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

  <!-- What We Do -->
  <section class="what-we-do">
    <div class="ih-container">
      <h2 class="section-heading">What We Do</h2>
      <div class="what-we-do__grid">
        <div class="feature-card">
          <div class="feature-card__icon">
            <icon-carbon-user-multiple />
          </div>
          <h3>Mentorship</h3>
          <p>Connecting experienced professionals with those growing their careers in tech.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">
            <icon-carbon-calendar />
          </div>
          <h3>Events</h3>
          <p>From workshops to social meetups — something for every kind of hacker.</p>
        </div>
        <div class="feature-card">
          <div class="feature-card__icon">
            <icon-carbon-group />
          </div>
          <h3>Community</h3>
          <p>A Slack community of thousands connecting Indiana's tech folks every day.</p>
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

/* What We Do */
.what-we-do {
  padding: 5rem 1.25rem;
}

.section-heading {
  margin-bottom: 3rem;
}

.what-we-do__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.feature-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  transition: box-shadow 0.3s;
}

.feature-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-card__icon {
  width: 48px;
  height: 48px;
  background: var(--background);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-family: 'Space Grotesk', sans-serif;
  color: rgba(18, 18, 18, 0.7);
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

/* Events */
.events-section {
  padding: 5rem 0;
}


@media (max-width: 768px) {
  .hero {
    padding: 5rem 0 3rem;
  }

  .what-we-do__grid {
    grid-template-columns: 1fr;
  }

  .slack-cta__card {
    padding: 2.5rem 1.5rem;
  }
}
</style>
