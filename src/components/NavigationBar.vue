<template>
  <BNavbar variant="warning" toggleable="lg">
    <BNavbarNav class="d-flex flex-row align-items-center w-100">
      <BNavbarBrand href="/" class="d-flex align-items-center">
        <img
          src="/images/ih-logo-black.png"
          class="img-fluid me-2"
          style="max-height: 35px"
          alt="IndyHackersLogo"
        />
      </BNavbarBrand>
      <BNavbarToggle class="ms-auto d-lg-none" target="navbar-collapse" />
    </BNavbarNav>
    <BCollapse id="navbar-collapse" is-nav>
      <BNavbarNav>
        <BNavItem right><RouterLink to="/">Home</RouterLink></BNavItem>
        <BNavItem right><RouterLink to="/calendar">Calendar</RouterLink></BNavItem>
        <BNavItem right><RouterLink to="/newsletter">Newsletter</RouterLink></BNavItem>
        <BNavItem right><RouterLink to="/jobs">Jobs</RouterLink></BNavItem>
        <BNavItem right><RouterLink to="/sponsors">Sponsors</RouterLink></BNavItem>
        <BNavItem right><RouterLink to="/about">About</RouterLink></BNavItem>
      </BNavbarNav>
    </BCollapse>
    <!-- <UserProfileDropdown /> -->
  </BNavbar>
</template>

<script>
// import UserProfileDropdown from './UserProfileDropdown.vue'

export default {
  name: 'NavigationBar',
  components: {
    // UserProfileDropdown
  },
  data() {
    return {
      expanded: false
    }
  }
}
</script>

<style scoped>
:deep(.container-fluid) {
  background-image: linear-gradient(to bottom, #1a1a2e, #2e2e44, var(--color-dark-20)) !important;
  background-color: var(--color-dark-15) !important;
}

:deep(a, [class^='nav-'], [class*=' nav-']) {
  font-size: 1.4rem !important;
  color: var(--color-text-light-1) !important;
  text-decoration: none;

  font-family: 'Dosis', serif;
  font-weight: 600;
  font-style: normal;
  text-transform: uppercase;
}

a:hover {
  color: var(--color-text-light-6) !important;
}

li.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (min-width: 992px) {
  .navbar-nav {
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    padding-right: 36px !important;
  }
}
</style>
