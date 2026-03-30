<template>
  <div class="board-member-card">
    <img class="avatar" :src="imageUrl" />
    <div class="board-member-card-body">
      <span class="board-member-first-name">{{ firstName }}</span>
      <span class="board-member-last-name">{{ lastName }}</span>
    </div>
    <div class="spacer" />
    <div class="board-member-contact-icons">
      <a class="icon-container" :href="email" target="_blank" v-if="email">
        <IFaEnvelope />
      </a>
      <a class="icon-container" :href="linkedin" target="_blank" v-if="linkedin">
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
    linkedin: String
  }
}
</script>

<style scoped>
.board-member-card {
  border-radius: 16px;
  background: var(--card);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.board-member-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.avatar {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  max-height: 140px;
  max-width: 140px;
}
.board-member-card-body {
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-right: 32px;
  padding: 16px;
}
.board-member-first-name {
  font-family: monospace;
  font-size: 2.1rem;
  font-weight: 900;
  line-height: 28px;
}
.board-member-last-name {
  font-family: monospace;
  font-size: 0.9rem;
  padding-left: 2px;
}
.spacer {
  flex-grow: 1;
}
.board-member-contact-icons {
  display: flex;
  flex-direction: column;
}
.icon-container {
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  min-height: 28px;
  min-width: 28px;
  padding: 16px;
  transition: all 0.5s ease;
}
.icon-container:hover {
  background-color: var(--background);
}

:deep(path) {
  fill: #000;
}
</style>
