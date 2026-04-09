<template>
  <footer class="ih-footer">
    <div class="ih-container ih-footer__inner">
      <p class="ih-footer__copy">&copy; {{ year }} Indy Hackers — made with love by volunteers</p>
      <RouterLink to="/code-of-conduct" class="ih-footer__coc">Code of Conduct</RouterLink>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BottomLinkTree',
  computed: {
    year() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.ih-footer {
  border-top: 1px solid var(--border);
  background: transparent;
  padding: 1.5rem 0;
}

.ih-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.ih-footer__copy {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: var(--foreground);
  margin: 0;
  font-weight: normal;
}

.ih-footer__coc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: var(--foreground);
  text-decoration: none;
  font-weight: normal;
}

.ih-footer__coc:hover {
  color: var(--foreground);
  opacity: 1;
}

@media (max-width: 480px) {
  .ih-footer__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
