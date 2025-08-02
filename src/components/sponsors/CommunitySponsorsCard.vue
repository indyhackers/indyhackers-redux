<template>
  <a 
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    class="community-sponsor-card"
  >
    <div class="community-sponsor-avatar">
      <img 
        :src="gravatarUrl" 
        :alt="`${name} avatar`"
        class="avatar-image"
        @error="handleAvatarError"
      />
    </div>
    <div class="community-sponsor-content">
      <h4 class="community-sponsor-name">{{ name }}</h4>
      <p class="community-sponsor-title">{{ jobTitle }}</p>
    </div>
  </a>
</template>

<script setup>
import { computed } from 'vue'
import CryptoJS from 'crypto-js'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    default: ''
  }
})

const gravatarUrl = computed(() => {
  if (!props.email) {
    return 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=40'
  }
  
  const hash = CryptoJS.MD5(props.email.toLowerCase().trim()).toString()
  return `https://www.gravatar.com/avatar/${hash}?d=mp&s=40`
})

const handleAvatarError = (event) => {
  // If gravatar fails to load, show a grey circle
  event.target.style.display = 'none'
  event.target.parentElement.classList.add('no-avatar')
}
</script>

<style scoped>
.community-sponsor-card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  min-height: 80px;
  width: 220px;
  flex-shrink: 0;
  gap: 0.75rem;
}

.community-sponsor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.community-sponsor-avatar.no-avatar::before {
  content: '';
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-radius: 50%;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.community-sponsor-content {
  flex: 1;
  text-align: left;
}

.community-sponsor-card:hover {
  transform: translateY(-2px);
  border-color: #b0b0b0;
  background-color: #f8f9fa;
  text-decoration: none;
}

.community-sponsor-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: #333;
  text-align: left;
  margin: 0;
  line-height: 1.3;
}

.community-sponsor-card:hover .community-sponsor-name {
  color: #2c5aa0;
}

.community-sponsor-title {
  font-size: 0.75rem;
  font-weight: 400;
  color: #666;
  text-align: left;
  margin: 0.25rem 0 0 0;
  line-height: 1.2;
}

.community-sponsor-card:hover .community-sponsor-title {
  color: #555;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .community-sponsor-card {
    width: 100%;
    min-width: 150px;
  }
}

@media (max-width: 480px) {
  .community-sponsor-card {
    padding: 0.75rem;
    min-height: 70px;
  }
  
  .community-sponsor-name {
    font-size: 0.85rem;
  }
  
  .community-sponsor-title {
    font-size: 0.7rem;
  }
}
</style>