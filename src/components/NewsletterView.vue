<template>
  <div class="content clear-fix">
    <BContainer>
      <BCard class="newsletters">
        <h1>Hacks &amp;&amp; Happenings</h1>
        <p>
          Indy Hackers is proud to present <strong>Hacks &amp;&amp; Happenings</strong>, an every so
          often (we try for every other week!) collection of projects and blog posts by local
          developers and special developer-centric events delivered straight to your inbox!
        </p>
        <iframe
          scrolling="no"
          style="width: 100% !important; height: 220px; border: 1px #ccc solid !important"
          src="https://buttondown.email/indyhackers?as_embed=true"
        ></iframe>
        <br /><br />
        <p>
          Archives are available
          <a href="https://buttondown.email/indyhackers/archive/">here</a> and older archives are
          available <a href="https://www.indyhackers.org/newsletter/archive">here</a>.
        </p>
      </BCard>
    </BContainer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BContainer, BCard } from 'bootstrap-vue-next'

// Sample ref to satisfy the linter
const sampleRef = ref(null)
</script>

<style scoped>
.content {
  padding: 20px;
}

.newsletters {
  margin-top: 20px;
}

iframe {
  margin-top: 20px;
}
</style>
