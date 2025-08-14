<script setup></script>

<template>
  <!-- <div class="centered-container"> -->
  <BContainer gutter-x="40px">
    <BRow>
      <BCol>
        <BCard no-body class="overflow-hidden mt-2 mb-2" style="background-color: #00000">
          <BCardBody
            title="Community Survey is Live!"
            style="background-color: black; color: white;"
          >
            <BCardText style="background-color: black; color: yellow">
              You're invited to take the annual <a href="" style="text-decoration: underline; color: white">Indy Hacker Community Survey</a>. The 2-minute survey is fully anonymous and helps us understand how we can best serve this community over the coming year.
              This information helps us set priorities and shape Indy Hackers based on what matters most to you.
              <br/><br/>
              Thanks in advance for those who participate!
            </BCardText>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>
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
                    <BLink href="https://slack.indyhackers.org/">Slack it to me!</BLink>
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
  async mounted() {
  }
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
