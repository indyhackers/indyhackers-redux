<template>
  <!-- TODO: fixed-bottom -->
  <footer class="footer mt-auto py-3 bg-dark w-100">
    <BContainer class="container-sm footer-container">
      <BRow>
        <BCol alignSelf="center" class="text-start">
          <ul>
            <li class="mb-0"><b>About</b></li>
            <li class="mb-0"><BLink to="/about">Meet our Board</BLink></li>
            <li class="mb-0"><BLink to="/code-of-conduct">Code of Conduct</BLink></li>
            <li class="mb-0">
              <BLink href="https://donate.stripe.com/bIY17XcYL77c0HSdQQ" target="_blank"
                >Donate</BLink
              >
            </li>
          </ul>
        </BCol>
        <BCol alignSelf="center" class="text-center">
          <img src="/images/yellow-sq-ih-logo.png" class="mb-3 rounded" width="60px" />
          <br />
          <span>Made with 🤍 by the Indy Hackers Board</span>
        </BCol>
        <BCol alignSelf="center" class="text-end">
          <ul>
            <li class="mb-0"><b>Contact</b></li>
            <li class="mb-0">
              <BLink href="https://twitter.com/indyhackersorg">@indyhackersorg</BLink>
            </li>
            <li class="mb-0"><BLink href="https://slack.indyhackers.org/">Slack Community</BLink></li>
            <li class="mb-0">
              <BLink href="https://github.com/indyhackers/indyhackers.org">GitHub</BLink>
            </li>
          </ul>
        </BCol>
      </BRow>
    </BContainer>
    <div class="container text-center"></div>
  </footer>
</template>

<script>
export default {
  name: 'BottomLinkTree'
}
</script>

<style scoped>
.bg-dark {
  background-color: oklch(26.8% 0.007 34.298) !important;
}

span {
  font-size: 0.8rem;
  font-weight: 600;
  font-style: bold;
  color: white;
}

:deep(a) {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: normal;
}
:deep(a:hover) {
  text-decoration: underline;
  color: white;
}
li {
  list-style-type: none;
  color: white;
}
:deep(footer),
:deep(div) {
  background-color: oklch(26.8% 0.007 34.298) !important;
}

.footer-container {
  max-width: 1000px !important;
}
</style>
