<template>
  <section class="newsletter-section">
    <div class="ih-container">
      <div class="newsletter-hero">
        <h1>Hacks &amp; Happenings</h1>
        <p class="newsletter-hero__sub">
          An every-so-often collection of projects and blog posts by local developers and
          developer-centric events — delivered straight to your inbox.
        </p>
      </div>

      <div class="newsletter-signup">
        <iframe
          title="IndyHackers Newsletter Signup"
          scrolling="no"
          style="width: 100%; height: 220px; border: 1px solid var(--border);"
          src="https://buttondown.email/indyhackers?as_embed=true"
        ></iframe>
        <p class="newsletter-archive">
          Archives available
          <a href="https://buttondown.email/indyhackers/archive/">here</a> and older archives
          <a href="https://www.indyhackers.org/newsletter/archive">here</a>.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="newsletter-loading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="newsletter-error">{{ error }}</div>

      <!-- Posts -->
      <div v-if="!loading && posts.length > 0" class="newsletter-posts">
        <h2>Recent Issues</h2>
        <div v-for="post in posts" :key="post.guid" class="newsletter-post">
          <h3>
            <a :href="post.link" target="_blank" rel="noopener noreferrer">{{ post.title }}</a>
          </h3>
          <p class="post-date">{{ post.pubDateFormatted }}</p>
          <div class="post-description" v-html="sanitizeHtml(post.description)"></div>
          <a :href="post.link" target="_blank" rel="noopener noreferrer" class="ih-btn-outline post-read-more">
            Read More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNewsletter } from '@/composables/useNewsletter'
import DOMPurify from 'dompurify'

const { posts, loading, error, fetchNewsletter } = useNewsletter()

const sanitizeHtml = (html) => {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'img'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'title', 'class']
  })
  // Mark any images missing alt as decorative
  return clean.replace(/<img(?![^>]*\balt=)/gi, '<img alt=""')
}

onMounted(() => {
  fetchNewsletter()
})
</script>

<style scoped>
.newsletter-section {
  padding: 3rem 0;
}

.newsletter-hero {
  margin-bottom: 2.5rem;
}

.newsletter-hero h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.newsletter-hero__sub {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.125rem;
  color: rgba(18, 18, 18, 0.7);
  max-width: 38rem;
  line-height: 1.6;
}

.newsletter-signup {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
}

.newsletter-archive {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  margin: 1rem 0 0;
}

.newsletter-loading {
  text-align: center;
  padding: 3rem 0;
}

.newsletter-error {
  background: var(--card);
  border: 1px solid var(--destructive);
  border-radius: 8px;
  padding: 1rem;
  color: var(--destructive);
  margin-bottom: 2rem;
}

.newsletter-posts h2 {
  margin-bottom: 1.5rem;
}

.newsletter-post {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 1.25rem;
}

.newsletter-post h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.newsletter-post h3 a {
  color: var(--foreground);
  text-decoration: none;
}

.newsletter-post h3 a:hover {
  opacity: 0.7;
}

.post-date {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  color: var(--muted-foreground);
  margin-bottom: 1rem;
}

.post-description {
  font-family: 'Space Grotesk', sans-serif;
  color: rgba(18, 18, 18, 0.8);
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.post-read-more {
  padding: 0.5rem 1.25rem;
  font-size: 0.75rem;
}
</style>
