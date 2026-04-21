<template>
  <div class="member">
    <img class="member__photo" :src="imageUrl" :alt="`${firstName} ${lastName}`" />
    <div class="member__info">
      <span class="member__name">{{ firstName }} {{ lastName }}</span>
      <span v-if="title" class="member__title">{{ title }}</span>
    </div>
    <div class="member__links">
      <a
        v-if="email"
        :href="email"
        target="_blank"
        class="member__link"
        :aria-label="`Email ${firstName} ${lastName}`"
      >
        <IFaEnvelope />
      </a>
      <a
        v-if="linkedin"
        :href="linkedin"
        target="_blank"
        class="member__link"
        :aria-label="`${firstName} ${lastName} on LinkedIn`"
      >
        <IFaLinkedin />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardMemberCard',
  props: {
    email: String,
    imageUrl: String,
    firstName: String,
    lastName: String,
    linkedin: String,
    title: String
  }
}
</script>

<style scoped>
.member {
  text-align: center;
}

.member__photo {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: var(--radius-md);
}

.member__info {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.member__name {
  font-family: var(--font-mono);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--text-primary);
}

.member__title {
  font-size: 0.8125rem;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

.member__links {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 0.75rem;
}

.member__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--radius-sm);
  transition: background-color 0.2s ease;
  text-decoration: none;
}

.member__link:hover {
  background-color: var(--surface-1);
}

:deep(path) {
  fill: var(--text-muted);
  transition: fill 0.2s ease;
}

.member__link:hover :deep(path) {
  fill: var(--text-primary);
}
</style>
