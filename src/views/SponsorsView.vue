<template>
  <div class="sponsors-page">
    <div class="ih-container">

      <!-- Page title -->
      <div class="sponsors-title">
        <h1>Our Sponsors</h1>
        <p class="sponsors-title__sub">
          The companies and people who make Indy Hackers possible.
        </p>
        <div class="sponsors-intro">
          <p>Indy Hackers is built on the incredible spirit and generosity of our community. Whether you're helping a fellow hacker, sharing industry insights, or making that key introduction, your contributions have made a real impact. To keep building on this momentum, we're excited to partner with sponsors who share our vision of growing the tech scene in Indiana. Every sponsorship directly fuels better events, new opportunities, and more resources for our members.</p>
          <p>Thank you for believing in this community and helping us grow—together, we're making a real difference.</p>
        </div>
      </div>

      <!-- Sponsor sections -->
      <div class="sponsors-main">

        <!-- Annual Corporate Sponsors -->
        <section class="sponsor-section">
          <div class="sponsor-section__heading">
            <icon-carbon-building class="section-icon" />
            <h2>Annual Corporate Sponsors</h2>
          </div>
          <div class="sponsor-grid">
            <a
              v-for="sponsor in annualSponsors"
              :key="sponsor.id"
              :href="sponsor.link"
              target="_blank"
              rel="noopener noreferrer"
              class="sponsor-card"
            >
              <div class="sponsor-card__logo-box">
                <img
                  :src="sponsor.logo"
                  :alt="sponsor.name"
                  class="sponsor-card__img"
                  @error="handleImageError"
                />
              </div>
              <p class="sponsor-card__name">{{ sponsor.name }}</p>
            </a>
          </div>
        </section>

        <!-- Meetup Sponsors -->
        <section class="sponsor-section">
          <div class="sponsor-section__heading">
            <icon-carbon-events class="section-icon" />
            <h2>Meetup Sponsors</h2>
          </div>
          <div class="sponsor-grid">
            <a
              v-for="sponsor in meetupSponsors"
              :key="sponsor.id"
              :href="sponsor.link"
              target="_blank"
              rel="noopener noreferrer"
              class="sponsor-card"
            >
              <div class="sponsor-card__logo-box">
                <img
                  :src="sponsor.logo"
                  :alt="sponsor.name"
                  class="sponsor-card__img"
                  @error="handleImageError"
                />
              </div>
              <p class="sponsor-card__name">{{ sponsor.name }}</p>
            </a>
          </div>
        </section>

      </div>

      <!-- Full-width CTA -->
      <div class="sponsors-cta">
        <div class="sponsors-cta__copy">
          <h3>Interested in sponsoring?</h3>
          <p>If you or your company is interested in sponsoring Indy Hackers and showing your support for the builders, contact us at <a href="mailto:sponsors@indyhackers.org">sponsors@indyhackers.org</a>.</p>
        </div>
        <a href="mailto:sponsors@indyhackers.org" class="ih-btn-primary">LET'S TALK &rarr;</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  }
])

const meetupSponsors = ref([
  {
    id: 3,
    name: 'Java House',
    link: 'https://www.javahouse.com/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/java_house.png'
  }
])

const handleImageError = (e) => {
  e.target.style.display = 'none'
}
</script>

<style scoped>
.sponsors-page {
  padding: 3rem 0;
}

/* Title */
.sponsors-title {
  margin-bottom: 2.5rem;
}

.sponsors-title h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.sponsors-title__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: rgba(18, 18, 18, 0.7);
  line-height: 1.6;
  margin: 0 0 1.5rem;
}

.sponsors-intro {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: var(--muted-foreground);
  line-height: 1.7;

  p {
    margin: 0 0 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.sponsors-main {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.sponsor-section__heading {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}

.sponsor-section__heading h2 {
  font-size: 1.25rem;
  margin: 0;
}

.section-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

/* Card grid — 2 columns */
.sponsor-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* Sponsor card — logo box + name caption below */
.sponsor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  color: inherit;
}

.sponsor-card:hover .sponsor-card__logo-box {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.sponsor-card--placeholder .sponsor-card__logo-box {
  border-style: dashed;
  border-width: 2px;
  cursor: default;
}

.sponsor-card--placeholder:hover .sponsor-card__logo-box {
  box-shadow: none;
}

.sponsor-card__logo-box {
  width: 80%;
  aspect-ratio: 3 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--border);
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.sponsor-card__logo-box--empty {
  background: #fff;
}

.placeholder-icon {
  width: 28px;
  height: 28px;
  color: rgba(18, 18, 18, 0.3);
}

.sponsor-card__img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.sponsor-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.sponsor-card__name {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: bold;
  color: var(--foreground);
  text-align: center;
  margin: 0;
}

.sponsor-card__tagline {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8125rem;
  color: rgba(18, 18, 18, 0.6);
  margin: 0;
  line-height: 1.5;
}

.placeholder-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--foreground);
  text-decoration: none;
  margin-top: 0.25rem;
}

.placeholder-link:hover {
  text-decoration: underline;
}

/* Full-width CTA bar */
.sponsors-cta {
  margin-top: 2.5rem;
  border: 2px dashed var(--border);
  border-radius: 12px;
  padding: 1.5rem 2rem;
  background: var(--card);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.sponsors-cta__copy {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sponsors-cta h3 {
  font-size: 1.125rem;
  margin: 0;
}

.sponsors-cta p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  color: rgba(18, 18, 18, 0.7);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 560px) {
  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
