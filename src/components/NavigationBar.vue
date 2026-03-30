<template>
  <nav class="ih-navbar">
    <div class="ih-navbar__inner ih-container">
      <RouterLink to="/" class="ih-navbar__brand">
        <img src="/images/ih-logo-black.png" alt="Indy Hackers" />
      </RouterLink>

      <div class="ih-navbar__links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/calendar">Calendar</RouterLink>
        <RouterLink to="/newsletter">Newsletter</RouterLink>
        <RouterLink to="/jobs">Jobs</RouterLink>
        <RouterLink to="/sponsors">Sponsors</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>

      <button class="ih-navbar__hamburger" @click="open = !open" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="ih-navbar__mobile" :class="{ 'ih-navbar__mobile--open': open }">
      <RouterLink to="/" @click="open = false">Home</RouterLink>
      <RouterLink to="/calendar" @click="open = false">Calendar</RouterLink>
      <RouterLink to="/newsletter" @click="open = false">Newsletter</RouterLink>
      <RouterLink to="/jobs" @click="open = false">Jobs</RouterLink>
      <RouterLink to="/sponsors" @click="open = false">Sponsors</RouterLink>
      <RouterLink to="/about" @click="open = false">About</RouterLink>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  data() {
    return {
      open: false
    }
  }
}
</script>

<style scoped>
.ih-navbar {
  background: var(--background);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 1.25rem 1.25rem;
}

.ih-navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ih-navbar__brand img {
  height: 28px;
  display: block;
}

.ih-navbar__links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.ih-navbar__links a,
.ih-navbar__mobile a {
  font-family: 'Space Mono', monospace;
  font-size: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(18, 18, 18, 0.6);
  font-weight: 400;
  text-decoration: none;
}

.ih-navbar__links a:hover,
.ih-navbar__mobile a:hover {
  color: var(--foreground);
  opacity: 1;
}

.ih-navbar__links a.router-link-active {
  color: var(--foreground);
  font-weight: 700;
  border-bottom: 2px solid var(--foreground);
  padding-bottom: 2px;
}

.ih-navbar__mobile a.router-link-active {
  color: var(--foreground);
  font-weight: 700;
}

.ih-navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.ih-navbar__hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--foreground);
  border-radius: 2px;
}

.ih-navbar__mobile {
  display: none;
  flex-direction: column;
  border-top: 1px solid var(--border);
  padding: 1rem 1.5rem;
  gap: 1rem;
}

.ih-navbar__mobile--open {
  display: flex;
}

@media (max-width: 768px) {
  .ih-navbar__links {
    display: none;
  }

  .ih-navbar__hamburger {
    display: flex;
  }
}
</style>
