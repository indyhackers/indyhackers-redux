<template>
  <!-- Hero -->
  <section class="sponsors-hero">
    <div class="ih-container">
      <h1>Our Sponsors</h1>
      <p class="sponsors-hero__sub">
        Indy Hackers is free because of the companies and individuals who invest in Indiana's tech
        community. Here's who makes it happen.
      </p>
    </div>
  </section>

  <!-- Annual Corporate Sponsors -->
  <section class="sponsors-section">
    <div class="ih-container">
      <div class="sponsors-section__heading">
        <icon-carbon-building class="section-icon" />
        <h2>Annual Corporate Sponsors</h2>
      </div>

      <SponsorList :sponsors="annualSponsors" />

      <div class="sponsors-cta-box">
        <h3>Interested in sponsoring?</h3>
        <p>
          Annual corporate sponsorships help fund meetups, events, and community infrastructure
          across Indiana.
        </p>
        <div class="sponsors-cta-box__action">
          <a href="mailto:hello@indyhackers.org" class="ih-btn-primary">LET'S TALK &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Monthly Backers -->
  <section class="backers-section">
    <div class="ih-container">
      <div class="sponsors-section__heading">
        <icon-carbon-favorite class="section-icon" />
        <h2>Monthly Backers</h2>
      </div>
      <p class="backers-subtitle">
        Community members who chip in monthly to keep Indy Hackers running.
        Small contributions, big impact.
      </p>

      <div class="backers-card">
        <div class="backers-pills">
          <span v-for="backer in monthlyBackers" :key="backer.name" class="backer-pill">
            <icon-carbon-favorite class="pill-icon" />
            {{ backer.name }}
          </span>
          <span v-if="monthlyBackers.length === 0" class="backers-empty">
            Be the first monthly backer!
          </span>
        </div>
        <div class="backers-join">
          <div class="backers-join__copy">
            <p class="backers-join__heading">Join them.</p>
            <p class="backers-join__sub">Back Indy Hackers for as little as $5/month.</p>
          </div>
          <a href="mailto:hello@indyhackers.org" class="ih-btn-outline">BECOME A BACKER &rarr;</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import SponsorList from '../components/sponsors/SponsorList.vue'

const annualSponsors = ref([
  {
    id: 1,
    name: 'Pure Insights',
    link: 'https://mypureinsights.com/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/pureinsights.png'
  },
  {
    id: 2,
    name: 'MadeLabs',
    link: 'https://www.madelabs.io/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/madelabs.png'
  },
  {
    id: 3,
    name: 'Stellar AI',
    link: 'https://www.getstellar.ai/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/stellar.png'
  },
  {
    id: 4,
    name: 'Otava',
    link: 'https://www.otava.com/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/otava.png'
  }
])

const monthlyBackers = ref([])
</script>

<style scoped>
.sponsors-hero {
  padding: 7rem 0 3rem;
}

.sponsors-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.sponsors-hero__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: rgba(18, 18, 18, 0.7);
  line-height: 1.6;
  max-width: 38rem;
}

.sponsors-section,
.backers-section {
  padding: 4rem 0;
}

.sponsors-section__heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.sponsors-section__heading h2 {
  font-size: 1.5rem;
  margin: 0;
}

.section-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* Dashed CTA box */
.sponsors-cta-box {
  margin-top: 2rem;
  border: 2px dashed var(--border);
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  background: var(--card);
}

.sponsors-cta-box h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.sponsors-cta-box p {
  font-family: 'Space Grotesk', sans-serif;
  color: rgba(18, 18, 18, 0.7);
  margin-bottom: 0;
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
}

.sponsors-cta-box__action {
  margin-top: 1.5rem;
}

/* Monthly Backers */
.backers-subtitle {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(18, 18, 18, 0.7);
  line-height: 1.6;
  margin: -1rem 0 1.5rem;
  max-width: 40rem;
}

.backers-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
}

.backers-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  min-height: 2.5rem;
}

.backer-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: var(--foreground);
}

.pill-icon {
  width: 12px;
  height: 12px;
}

.backers-empty {
  font-family: 'Space Grotesk', sans-serif;
  color: var(--muted-foreground);
  font-style: italic;
  align-self: center;
}

.backers-join {
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.backers-join__copy {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.backers-join__heading {
  font-family: 'Space Mono', monospace;
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
  color: var(--foreground);
}

.backers-join__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  margin: 0;
}

@media (max-width: 768px) {
  .sponsors-hero {
    padding: 5rem 0 2rem;
  }

  .backers-join {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
