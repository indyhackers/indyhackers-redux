<template>
  <div class="sponsor-list">
    <div class="sponsor-grid">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.id"
        :href="sponsor.link"
        target="_blank"
        rel="noopener noreferrer"
        class="sponsor-card"
      >
        <div class="sponsor-card__logo">
          <img
            :src="sponsor.logo"
            :alt="sponsor.name"
            class="sponsor-card__img"
            @error="handleImageError"
          />
        </div>
        <p class="sponsor-card__name">{{ sponsor.name }}</p>
      </a>

      <!-- Placeholder slots to fill grid to 4 -->
      <div
        v-for="n in placeholderCount"
        :key="`placeholder-${n}`"
        class="sponsor-card sponsor-card--placeholder"
      >
        <div class="sponsor-card__logo sponsor-card__logo--placeholder">
          <icon-carbon-building class="placeholder-icon" />
        </div>
        <p class="sponsor-card__name">Your Company Here</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  sponsors: {
    type: Array,
    default: () => []
  }
})

const MIN_GRID_ITEMS = 4

const placeholderCount = computed(() => {
  const count = props.sponsors.length
  if (count >= MIN_GRID_ITEMS) return 0
  return MIN_GRID_ITEMS - count
})

const handleImageError = (e) => {
  e.target.style.display = 'none'
}
</script>

<style scoped>
.sponsor-list {
  padding: 0;
}

.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.sponsor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  min-height: 180px;
  transition: box-shadow 0.3s;
  text-decoration: none;
  color: inherit;
}

.sponsor-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.sponsor-card--placeholder {
  cursor: default;
  opacity: 0.5;
}

.sponsor-card--placeholder:hover {
  box-shadow: none;
}

.sponsor-card__logo {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.sponsor-card__logo--placeholder {
  background: var(--muted);
  border-radius: 8px;
  width: 64px;
  height: 64px;
}

.placeholder-icon {
  width: 28px;
  height: 28px;
  color: var(--muted-foreground);
}

.sponsor-card__img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.sponsor-card__name {
  font-family: 'Space Mono', monospace;
  font-size: 0.875rem;
  font-weight: bold;
  color: var(--foreground);
  text-align: center;
  margin: 0;
}

@media (max-width: 768px) {
  .sponsor-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .sponsor-grid {
    grid-template-columns: 1fr;
  }
}
</style>
