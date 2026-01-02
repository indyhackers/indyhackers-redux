<script setup></script>

<template>
  <!-- <div class="centered-container"> -->
  <BContainer gutter-x="40px">
    <!-- <BRow>
      <BCol>
        <BCard no-body class="overflow-hidden mt-2 mb-2" style="background-color: #00000">
          <BCardBody
            title="Holiday Social 2025!"
            style="background-color: #960014; color: white;"
          >
            <BCardText style="background-color: #960014; color: white">
              Our largest event of the year brings everyone together for a night of celebration!
              Join us — a bunch of programmers, nerds, geeks, and hackers — to celebrate the year with food, drink, and friends, both old and new!
              <br /><br />
              There are no other agenda items&mdash; just drinks, community, and fun!
              <p class="mt-4">
                <BButton style="color:white; background-color: #00873E" target="_blank" href="https://www.eventbrite.com/e/2025-indy-hackers-holiday-social-tickets-1788837012659">Register Today!</BButton>
              </p>
            </BCardText>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <BCard no-body class="overflow-hidden mt-2 mb-2" style="background-color: #00873E">
          <BCardBody
            title="IndyHackers Season of Giving"
            style="background-color: #00873E; color: white;"
          >
            <BCardText style="background-color: #00873E; color: white">
              IndyHackers has always been about bringing people together&mdash;building connections, sharing ideas, and growing the Indiana tech community. If you have found value in what we do, please consider supporting our Season of Giving. Your donation helps us cover costs for our community, fund future programming, and keep growing what we offer. We have big plans for 2026 and every contribution&mdash; big or small, makes a difference!

              <p class="mt-4">
                <BButton style="color:white; background-color: #960014" target="_blank" href="https://donate.stripe.com/bIY17XcYL77c0HSdQQ">Donate</BButton>
              </p>
            </BCardText>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
    -->
    <BRow>
      <BCol>
        <BCard no-body class="overflow-hidden mt-2 mb-2" style="background-color: #808080">
          <BRow class="g-0">
            <BCol md="8">
              <BCardImg src="images/ih-welcome-carousel.png" alt="Image" class="rounded-0" />
            </BCol>
            <BCol md="4" variant="warning">
              <BCardBody
                title="Join us on Slack!"
                style="background-color: #ffc008; max-height: 100vh"
              >
                <BCardText>
                  Our Slack group brings hackers, programmers, makers, and tech folks of all kinds
                  together.<br /><br />You're invited - don't forget to check out our
                  <BLink to="/code-of-conduct">Code of Conduct</BLink> first!
                  <p class="mt-4">
                    <BButton
                      style="color: white; background: black"
                      href="https://slack.indyhackers.org/"
                      >Slack it to me!</BButton
                    >
                  </p>
                </BCardText>
              </BCardBody>
              <!-- <BCardBody
                title="Join us on Slack!"
                style="background-color: #808080; max-height: 100vh"
              >
                <BCardText class="vh-50">
                  Our Slack group brings hackers, programmers, makers, and tech folks of all kinds
                  together. <br /><br />You're invited - don't forget to check out our
                  <BLink to="/conduct">Code of Conduct</BLink> first!
                  <p class="mt-4">
                    <BLink href="https://slack.indyhackers.org/">Slack it to me!</BLink>
                  </p>
                </BCardText>
              </BCardBody> -->
            </BCol>
          </BRow>
        </BCard>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <BCard no-body class="overflow-hidden mt-2 mb-2">
          <BRow class="g-0">
            <BCol md="8" variant="warning">
              <BCardBody title="Fostering the Indiana Tech Community" style="max-height: 100vh">
                <BCardText>
                  A network for all tech folks in Indiana. Fostering community connections and
                  celebrating individual successes.
                </BCardText>
              </BCardBody>
            </BCol>
            <BCol md="4">
              <BCardImg src="images/high-five.png" alt="Image" class="rounded-0" />
            </BCol>
          </BRow>
        </BCard>
      </BCol>
    </BRow>
    <BRow>
      <BCol>
        <h2 class="mt-4 mb-4">What We Do</h2>
        <BCardGroup>
          <BCard
            title="Mentorship"
            img-src="images/mentor.png"
            img-alt="Mentorship"
            img-top
            img-height="300px"
            align="center"
          >
            <template #footer></template>
          </BCard>

          <BCard
            title="Events"
            img-src="images/events.png"
            img-alt="Events"
            align="center"
            img-height="300px"
          >
            <template #footer></template>
          </BCard>

          <BCard
            title="Meetups"
            img-src="images/meetups.png"
            img-alt="Meetups"
            align="center"
            img-width="100"
            img-bottom
          >
            <template #footer></template>
          </BCard>
        </BCardGroup>
      </BCol>
    </BRow>
    <BRow>
      <CalendarView />
    </BRow>
  </BContainer>
  <!-- </div> -->
</template>

<script>
import CalendarView from '../components/CalendarView.vue'

export default {
  name: 'HomeView',
  components: {
    CalendarView
  },
  async mounted() {}
}
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 53rem;
}

a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: #fff;
}
</style>
