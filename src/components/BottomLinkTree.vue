<template>
  <!-- TODO: fixed-bottom -->
  <footer class="footer mt-auto py-3 bg-dark w-100">
    <BContainer>
      <BRow>
        <BCol alignSelf="center" class="text-center">
          <ul>
            <li class="mb-3"><b>About</b></li>
            <li class=""><BLink to="/board">Meet our Board</BLink></li>
            <li class=""><BLink to="/code-of-conduct">Code of Conduct</BLink></li>
            <li class="">
              <BLink href="https://donate.stripe.com/bIY17XcYL77c0HSdQQ" target="_blank"
                >Donate</BLink
              >
            </li>
          </ul>
        </BCol>
        <BCol alignSelf="center" class="text-center">
          <img src="/images/yellow-sq-ih-logo.png" class="mb-3" width="80px" />
          <br />
          <span>Made with 🤍 by the Indy Hackers Board</span>
        </BCol>
        <BCol alignSelf="center" class="text-center">
          <ul>
            <li class="mb-3"><b>Contact</b></li>
            <li class="">
              <BLink href="https://twitter.com/indyhackersorg">@indyhackersorg</BLink>
            </li>
            <li class=""><BLink href="https://slack.indyhackers.org/">Slack Community</BLink></li>
            <li class="">
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
  background-color: grey !important;
}

span {
  font-size: 0.8rem;
  font-weight: 600;
  font-style: bold;
  color: white;
}

:deep(a) {
  color: white;
  text-decoration: none;
}
:deep(a:hover) {
  text-decoration: underline;
}
li {
  list-style-type: none;
  color: white;
}
:deep(footer),
:deep(div) {
  background-color: grey !important;
}
</style>
