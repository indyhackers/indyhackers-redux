<template>
  <div class="content clear-fix">
    <h1>Sponsors</h1>
    <p>
      Indy Hackers is built on the incredible spirit and generosity of our community. Whether you're
      helping a fellow hacker, sharing industry insights, or making that key introduction, your
      contributions have made a real impact. To keep building on this momentum, we're excited to
      partner with sponsors who share our vision of growing the tech scene in Indiana. Every
      sponsorship directly fuels better events, new opportunities, and more resources for our
      members.
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
    <h2>Silver Sponsors</h2>
    <b-row>
      <b-col v-for="sponsor in silverSponsors" :key="sponsor.id" cols="12" md="6" lg="4">
        <b-card :title="sponsor.name" class="mb-4 sponsor-card">
          <a :href="sponsor.link" target="_blank">
            <b-card-img
              :src="sponsor.logo"
              :alt="sponsor.name"
              top
              class="sponsor-image"
            ></b-card-img>
          </a>
        </b-card>
      </b-col>
    </b-row>
    <h2>Bronze Sponsors</h2>
    <b-row>
      <b-col v-for="sponsor in bronzeSponsors" :key="sponsor.id" cols="12" md="6" lg="4">
        <b-card :title="sponsor.name" class="mb-4 sponsor-card">
          <a :href="sponsor.link" target="_blank">
            <b-card-img
              :src="sponsor.logo"
              :alt="sponsor.name"
              top
              class="sponsor-image"
            ></b-card-img>
          </a>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BRow, BCol, BCard, BCardImg } from 'bootstrap-vue-next'

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
