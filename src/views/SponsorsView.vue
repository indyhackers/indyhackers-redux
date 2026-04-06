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
        <section class="sponsor-section sponsor-section--annual">
          <div class="sponsor-section__heading">
            <icon-carbon-building class="section-icon" />
            <h2>Annual Corporate Sponsors</h2>
          </div>
          <div class="sponsor-grid sponsor-grid--annual">
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

        <div class="supporters-section">
          <div class="supporters-section__heading">
            <div class="sponsor-section__heading">
              <h2>Become a Member</h2>
            </div>
            <p class="supporters-section__sub">Monthly supporters keep Indy Hackers alive. Pick a tier and join the crew.</p>
          </div>
          <div class="supporter-tiers">
            <a
              href="https://donate.stripe.com/bJeeVcdEvcOpdnE0oQgrS01"
              target="_blank"
              rel="noopener noreferrer"
              class="supporter-tier-card"
            >
              <span class="supporter-tier-card__name">HACKER</span>
              <span class="supporter-tier-card__price">$5 / month</span>
              <span class="supporter-tier-card__cta">Join &rarr;</span>
            </a>
            <a
              href="https://donate.stripe.com/aFaeVcasj5lX4R80oQgrS02"
              target="_blank"
              rel="noopener noreferrer"
              class="supporter-tier-card"
            >
              <span class="supporter-tier-card__name">BUILDER</span>
              <span class="supporter-tier-card__price">$15 / month</span>
              <span class="supporter-tier-card__cta">Join &rarr;</span>
            </a>
            <a
              href="https://donate.stripe.com/8x2bJ0cAr9CddnE9ZqgrS03"
              target="_blank"
              rel="noopener noreferrer"
              class="supporter-tier-card"
            >
              <span class="supporter-tier-card__name">CHAMPION</span>
              <span class="supporter-tier-card__price">$25 / month</span>
              <span class="supporter-tier-card__cta">Join &rarr;</span>
            </a>
          </div>
          <a
            href="https://donate.stripe.com/bIY17XcYL77c0HSdQQ"
            target="_blank"
            rel="noopener noreferrer"
            class="supporters-onetime-link"
          >or make a one-time donation &rarr;</a>
        </div>

        <!-- Meetup Sponsors -->
        <section class="sponsor-section">
          <div class="sponsor-section__heading">
            <icon-carbon-events class="section-icon" />
            <h2>Meetup Sponsors</h2>
          </div>
          <div class="meetup-logo-strip">
            <a
              v-for="sponsor in meetupSponsors"
              :key="sponsor.id"
              :href="sponsor.link"
              target="_blank"
              rel="noopener noreferrer"
              class="meetup-logo-item"
            >
              <img
                :src="sponsor.logo"
                :alt="sponsor.name"
                class="meetup-logo-item__img"
                @error="handleImageError"
              />
              <span class="meetup-logo-item__name">{{ sponsor.name }}</span>
            </a>
          </div>
        </section>

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
  padding: 22px;
}

.sponsor-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  padding: 8px;
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


@media (max-width: 560px) {
  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Supporters: tier membership cards ─────────────────────────────── */
.supporters-section {
  /* plain section, no box */
}

.supporters-section__heading {
  margin-bottom: 1.5rem;
}

.supporters-section__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9375rem;
  color: var(--muted-foreground);
  margin: 0.25rem 0 0;
  line-height: 1.6;
}

.supporter-tiers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.supporter-tier-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 2rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
  text-decoration: none;
  color: inherit;
  text-align: center;
  transition: box-shadow 0.2s;
}

.supporter-tier-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.supporter-tier-card__name {
  font-family: 'Space Mono', monospace;
  font-size: 0.6875rem;
  font-weight: bold;
  letter-spacing: 0.12em;
  color: var(--muted-foreground);
}

.supporter-tier-card__price {
  font-family: 'Space Mono', monospace;
  font-size: 1.375rem;
  font-weight: bold;
  color: var(--foreground);
}

.supporter-tier-card__cta {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: var(--foreground);
}

.supporters-onetime-link {
  display: block;
  text-align: center;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.03em;
  color: var(--muted-foreground);
  text-decoration: none;
  margin-top: 0.5rem;
}

.supporters-onetime-link:hover {
  color: var(--foreground);
}

@media (max-width: 680px) {
  .supporter-tiers {
    grid-template-columns: 1fr;
  }
}
/* CTA card — single-cell (odd sponsors) */
.sponsor-cta-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  color: inherit;
}

.sponsor-cta-card__face {
  width: 80%;
  aspect-ratio: 3 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--secondary);
  text-align: center;
  padding: 1.5rem;
  transition: box-shadow 0.2s;
}

.sponsor-cta-card:hover .sponsor-cta-card__face {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.sponsor-cta-card__heading {
  font-family: 'Space Mono', monospace;
  font-size: 0.8125rem;
  font-weight: bold;
  color: var(--foreground);
  margin: 0;
}

.sponsor-cta-card__email {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  color: var(--muted-foreground);
  margin: 0;
}

.sponsor-cta-card__label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: var(--foreground);
}

/* CTA card — full-row (even sponsors) */
.sponsor-cta-card--full {
  grid-column: 1 / -1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--secondary);
  padding: 1.5rem 2rem;
  transition: box-shadow 0.2s;
}

.sponsor-cta-card--full:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.sponsor-cta-card--full .sponsor-cta-card__face {
  width: auto;
  aspect-ratio: unset;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border: none;
  border-radius: 0;
  background: transparent;
  padding: 0;
  text-align: left;
}

.sponsor-cta-card--full .sponsor-cta-card__label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary);
  color: var(--primary-foreground);
  font-family: 'Space Mono', monospace;
  font-weight: bold;
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  padding: 0.875rem 2rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Annual sponsors: warm-stage cards ────────────────────────────── */

/* Warm off-white container — provides framing so white logo cells never
   sit on white. Both transparent-bg and white-bg logos handled without
   per-logo treatment. */
.sponsor-section--annual {
  background: hsl(40, 20%, 97%);
  border-radius: 16px;
  padding: 2rem;
}

.sponsor-grid--annual {
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.sponsor-grid--annual .sponsor-card {
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 32px;
  overflow: hidden;
  border: 1px solid hsl(40, 15%, 82%);
  border-radius: 12px;
  background: var(--card);
  transition: box-shadow 0.2s;

}

.sponsor-grid--annual .sponsor-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

/* Suppress the default logo-box hover shadow — card handles it */
.sponsor-grid--annual .sponsor-card:hover .sponsor-card__logo-box {
  box-shadow: none;
}

/* White logo field — neutral stage for both transparent and white-bg logos.
   The warm section background outside the card provides the framing. */
.sponsor-grid--annual .sponsor-card__logo-box {
  width: 100%;
  aspect-ratio: 3 / 2;
  background: #ffffff;
  border: none;
  border-bottom: 1px solid hsl(40, 15%, 82%);
  border-radius: 0;
}

/* Name strip matches section background — card footer melts into the panel */
.sponsor-grid--annual .sponsor-card__name {
  text-align: center;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  background: hsl(40, 20%, 97%);
}

/* ── Meetup sponsors: logo strip ───────────────────────────────────── */
.meetup-logo-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  align-items: center;
}

.meetup-logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
}

.meetup-logo-item__img {
  height: 48px;
  width: auto;
  max-width: 140px;
  object-fit: contain;
  opacity: 0.75;
  transition: opacity 0.2s;
}

.meetup-logo-item:hover .meetup-logo-item__img {
  opacity: 1;
}

.meetup-logo-item__name {
  font-family: 'Space Mono', monospace;
  font-size: 0.6875rem;
  font-weight: bold;
  letter-spacing: 0.06em;
  color: var(--muted-foreground);
}

@media (max-width: 680px) {
  .sponsor-grid--annual {
    grid-template-columns: 1fr;
  }
}

</style>