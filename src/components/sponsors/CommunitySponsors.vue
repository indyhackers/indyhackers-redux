<template>
  <div class="community-sponsors">
    <h2 class="community-sponsors-title">{{ title }}</h2>
    <div class="community-sponsors-grid">
      <CommunitySponsorsCard 
        v-for="sponsor in sponsors" 
        :key="sponsor.name" 
        :link="sponsor.link"
        :name="sponsor.name"
        :jobTitle="sponsor.jobTitle"
        :email="sponsor.email"
      />
    </div>
  </div>
</template>

<script setup>
import CommunitySponsorsCard from './CommunitySponsorsCard.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  sponsors: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.community-sponsors {
  padding: 1rem 0;
}

.community-sponsors-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
}

.community-sponsors-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  justify-content: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .community-sponsors-grid {
    gap: 0.75rem;
    padding: 0 0.5rem;
  }
  
  .community-sponsors-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .community-sponsors-grid {
    gap: 0.5rem;
    padding: 0;
  }
  
  .community-sponsors-title {
    font-size: 1.3rem;
  }
}
</style>