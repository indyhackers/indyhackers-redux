<template>
  <!-- <b-navbar theme="primary"> -->
  <!-- <BNav variant="warning" class="mb-4"> -->
  <BNavbar toggleable="lg" variant="warning" v-b-color-mode="'dark'">
    <BNavbarBrand href="#"
      ><a href="/"><img src="/images/ih-logo-black.png" height="35px" class="mt-1" /></a
    ></BNavbarBrand>

    <!-- Right aligned nav items -->
    <BNavbarNav class="ms-auto mb-2 mb-lg-0">
      <BNavItem right><RouterLink to="/newsletter">Newsletter</RouterLink></BNavItem>
      <BNavItem right><RouterLink to="/jobs">Jobs</RouterLink></BNavItem>
      <BNavItem right><RouterLink to="/events">Events</RouterLink></BNavItem>
      <BNavItem right><RouterLink to="/about">About Us</RouterLink></BNavItem>
    </BNavbarNav>
  </BNavbar>
  <!-- </BNav> -->
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
/* Additional styles if needed */
:deep(a, [class^='nav-'], [class*=' nav-']) {
  font-size: 1.2rem;
  color: #000 !important;
  text-decoration: none;
}

a:hover {
  color: #fff !important;
}
</style>
