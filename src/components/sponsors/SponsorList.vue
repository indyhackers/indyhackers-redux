<template>
  <div class="sponsor-list">
    <h2 class="sponsor-title">{{ title }}</h2>
    <div class="sponsor-grid">
      <a 
        v-for="sponsor in sponsors" 
        :key="sponsor.id" 
        :href="sponsor.link"
        target="_blank"
        rel="noopener noreferrer"
        class="sponsor-card"
      >
        <div class="sponsor-image-container">
          <img 
            :src="sponsor.logo" 
            :alt="sponsor.name"
            class="sponsor-image"
            @error="handleImageError"
          />
        </div>
        <h3 class="sponsor-name">{{ sponsor.name }}</h3>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
  sponsors: {
    type: Array,
  }
})
</script>

<style scoped>
.sponsor-list {
  padding: 1rem 0;
}

.sponsor-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.sponsor-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  justify-content: center;
}

.sponsor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  outline: none;
  width: 450px;
  flex-shrink: 0;
}

.sponsor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.sponsor-image-container {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 4px;
}

.sponsor-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .sponsor-grid {
    gap: 1rem;
  }
  
  .sponsor-card {
    padding: 1rem;
    width: 300px;
  }
  
  .sponsor-image-container {
    height: 100px;
  }
  
  .sponsor-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .sponsor-grid {
    gap: 0.75rem;
  }
  
  .sponsor-card {
    padding: 0.75rem;
    width: 250px;
  }
  
  .sponsor-image-container {
    height: 80px;
  }
  
  .sponsor-name {
    font-size: 1rem;
  }
}
</style>