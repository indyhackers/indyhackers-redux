<template>
  <BContainer class="content clear-fix">
    <h1>Sponsors</h1>
    <p>
      Indy Hackers is built on the incredible spirit and generosity of our community. Whether you're
      helping a fellow hacker, sharing industry insights, or making that key introduction, your
      contributions have made a real impact. To keep building on this momentum, we're excited to
      partner with sponsors who share our vision of growing the tech scene in Indiana. Every
      sponsorship directly fuels better events, new opportunities, and more resources for our
      members.
    </p>
    <p>
      <em
        >Thank you for believing in this community and helping us grow—together, we're making a real
        difference.</em
      >
    </p>
    <p>
      If you or your company is interested in sponsoring Indy Hackers and showing your support for
      the builders, please contact
      <a href="mailto:sponsors@indyhackers.org">sponsors@indyhackers.org.</a>
    </p>
    <SponsorList :sponsors="silverSponsors" title="Silver Sponsors" />
    <SponsorList :sponsors="bronzeSponsors" title="Bronze Sponsors" />
    <CommunitySponsors :sponsors="communitySponsors" title="Community Sponsors" />
  </BContainer>
</template>

<script setup>
import { ref } from 'vue'
import SponsorList from './sponsors/SponsorList.vue'
import CommunitySponsors from './sponsors/CommunitySponsors.vue'

// Stub data for sponsors, to be replaced with data from PocketBase
const silverSponsors = ref([
  {
    id: 1,
    name: 'Pure Insights',
    link: 'https://mypureinsights.com/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/pureinsights.png'
  },
  {
    id: 2,
    name: 'MadeLabs',
    link: 'https://www.madelabs.io/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/madelabs.png'
  }
])

const bronzeSponsors = ref([
  {
    id: 4,
    name: 'Stellar AI',
    link: 'https://www.getstellar.ai/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/stellar.png'
  },
  {
    id: 5,
    name: 'Otava',
    link: 'https://www.otava.com/?utm_campaign=indy_hackers',
    logo: '/images/sponsors/otava.png'
  }
])

/**
 * The email address provided here is used with Gravatar (https://gravatar.com/) to
 * fetch the user's profile image. 
 * 
 * Please include in a comment the date at which the user last renewed their sponsorship
 * so we can manually remove them from this list upon non-renewal.
 */
const communitySponsors = ref([
  {
    // sponsorship began "2025-08-02"
    name: 'Alex Correa',
    email: "correa.alexanderj@gmail.com",
    jobTitle: 'Senior Product Manager, ThirtyMadison',
    link: 'https://www.linkedin.com/in/alex-j-correa/',
  },
])

// Future implementation: Fetch sponsors from PocketBase
// const fetchSponsors = async () => {
//   // Fetch data from PocketBase and update silverSponsors and bronzeSponsors
// };
</script>

<style scoped>
.sponsor-card {
  height: 200px; /* Set a fixed height for the cards */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the image vertically */
  align-items: center; /* Center the image horizontally */
}

.sponsor-image {
  height: 150px; /* Set a fixed height for the images */
  object-fit: contain; /* Ensure the image fits within the area without being cropped */
  width: 100%; /* Ensure the image takes the full width of the card */
}
</style>
