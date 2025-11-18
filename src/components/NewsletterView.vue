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

      <!-- Newsletter Posts Section -->
      <div v-if="loading" class="text-center my-4">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-if="error" class="alert alert-danger my-4" role="alert">
        {{ error }}
      </div>

      <div v-if="!loading && posts.length > 0" class="newsletter-posts mt-4">
        <h2>Recent Newsletter Posts</h2>
        <BCard v-for="post in posts" :key="post.guid" class="newsletter-post mb-4">
          <h3>
            <a :href="post.link" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
          </h3>
          <p class="post-date text-muted">{{ post.pubDateFormatted }}</p>
          <div class="post-description" v-html="sanitizeHtml(post.description)"></div>
          <a :href="post.link" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-3"
            >Read More</a
          >
        </BCard>
      </div>
    </BContainer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { BContainer, BCard } from 'bootstrap-vue-next'
import { useNewsletter } from '@/composables/useNewsletter'
import DOMPurify from 'dompurify'

const { posts, loading, error, fetchNewsletter } = useNewsletter()

const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'img'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class']
  })
}

onMounted(() => {
  fetchNewsletter()
})
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
