# Performance Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve Lighthouse performance score from 66 to 85+ and reduce LCP from 6.4s to under 3s on dev.indyhackers.org.

**Architecture:** Six independent optimizations to the existing Vue 3 + Vite SPA: route-level code splitting, font loading fix, responsive images, logo WebP conversion, Bootstrap CSS tree-shaking, and analytics deferral. Each task is independently deployable.

**Tech Stack:** Vue 3, Vite, Bootstrap 5 SCSS, vite-plugin-radar, cwebp

**Verification:** Run `node scripts/lighthouse-scan.mjs` before and after changes, compare with `node scripts/lighthouse-compare.mjs`. The scan scripts are already in `scripts/` and output to `tmp/lighthouse/`.

---

### Task 1: Capture baseline Lighthouse scan

**Files:**
- None modified — this captures the "before" measurement

- [ ] **Step 1: Run baseline scan against localhost**

```bash
node scripts/lighthouse-scan.mjs http://localhost:5173 before-perf
```

Expected: scores printed, JSON saved to `tmp/lighthouse/before-perf-*.report.json`

- [ ] **Step 2: Note the JSON path for later comparison**

Save the exact path printed by the scan script — you'll pass it to `lighthouse-compare.mjs` at the end.

---

### Task 2: Route-level code splitting

**Files:**
- Modify: `src/router/index.js`

Currently all 15 route components are statically imported at the top of the file, forcing the entire app into a single 711KB JS bundle. Convert non-home routes to dynamic imports so Vite creates separate chunks per route.

- [ ] **Step 1: Replace static imports with dynamic imports**

Replace the entire `src/router/index.js` with:

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      props: { title: 'Home', content: 'Welcome to IndyHackers.' }
    },
    {
      path: '/jobs',
      name: 'Jobs',
      component: () => import('../views/OmniView.vue'),
      props: { currentComponent: 'JobsList' }
    },
    {
      path: '/job',
      component: () => import('../views/OmniView.vue'),
      props: { currentComponent: 'JobListing' }
    },
    {
      path: '/jobs-markdown',
      name: 'JobsMarkdown',
      component: () => import('../components/jobs/JobsMarkdown.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('../views/PlaceholderView.vue'),
      props: { title: 'Privacy Policy', content: 'Our privacy policy.' }
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('../views/PlaceholderView.vue'),
      props: { title: 'Terms of Service', content: 'Our terms of service.' }
    },
    {
      path: '/support',
      name: 'Support',
      component: () => import('../views/PlaceholderView.vue'),
      props: { title: 'Support', content: 'Get support.' }
    },
    { path: '/admin', name: 'Admin', component: () => import('../components/AdminLogin.vue') },
    { path: '/login', name: 'Login', component: () => import('../components/LoginPage.vue') },
    { path: '/signup', name: 'Signup', component: () => import('../components/SignupPage.vue') },
    { path: '/sponsors', name: 'Sponsors', component: () => import('../views/SponsorsView.vue') },
    { path: '/newsletter', name: 'Newsletter', component: () => import('../components/NewsletterView.vue') },
    { path: '/recommend-event', name: 'RecommendEvent', component: () => import('../components/EventRecommendationForm.vue') },
    { path: '/calendar', name: 'Calendar', component: () => import('../components/CalendarView.vue') },
    { path: '/events', redirect: '/calendar' },
    { path: '/events-markdown', name: 'EventsMarkdown', component: () => import('../components/EventsMarkdown.vue') },
    { path: '/code-of-conduct', name: 'CodeOfConduct', component: () => import('../components/CodeOfConduct.vue') }
  ]
})

export default router
```

- [ ] **Step 2: Verify dev server still works**

```bash
curl -s http://localhost:5173 | head -20
```

Expected: HTML response with `<div id="app">`. The dev server should hot-reload automatically.

- [ ] **Step 3: Verify production build creates multiple chunks**

```bash
npm run build 2>&1 | tail -15
```

Expected: Multiple JS files in the output instead of a single `index-*.js`. The main chunk should be significantly smaller than 711KB.

- [ ] **Step 4: Commit**

```bash
git add src/router/index.js
git commit -m "perf: lazy-load route components for code splitting"
```

---

### Task 3: Font loading optimization

**Files:**
- Modify: `index.html`
- Modify: `src/App.vue`

The `@import url(...)` in App.vue's `<style>` block is render-blocking — the browser won't paint anything until the font CSS downloads. Move font loading to `index.html` with `preconnect` and non-blocking loading.

- [ ] **Step 1: Add font preconnect and stylesheet links to index.html**

In `index.html`, add these lines inside `<head>`, after the `<meta name="viewport">` line and before the `<meta name="description">` line:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Remove the @import url() from App.vue**

In `src/App.vue`, delete this line from the first `<style>` block:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

- [ ] **Step 3: Verify fonts still load**

Open `http://localhost:5173` in a browser. Confirm text renders in Space Mono (headings) and Space Grotesk (body). There may be a brief flash of fallback font — that's expected and correct (FOUT is better than FOIT for performance).

- [ ] **Step 4: Commit**

```bash
git add index.html src/App.vue
git commit -m "perf: move Google Fonts from render-blocking @import to preconnected stylesheet"
```

---

### Task 4: Responsive hero image with srcset

**Files:**
- Modify: `src/views/HomeView.vue`
- Create: `public/images/welcome-640.webp`
- Create: `public/images/welcome-1024.webp`

The hero image is 2048px wide (217KB WebP) but served to all viewports. Generate smaller variants and use `srcset` so mobile/tablet devices download less data.

- [ ] **Step 1: Generate responsive image variants**

```bash
cwebp -q 80 -resize 640 0 public/images/welcome.jpg -o public/images/welcome-640.webp
cwebp -q 80 -resize 1024 0 public/images/welcome.jpg -o public/images/welcome-1024.webp
```

Expected: Two new files. Verify sizes:
```bash
ls -lh public/images/welcome*.webp
```

Expected approximate sizes: welcome-640.webp ~30-50KB, welcome-1024.webp ~90-120KB, welcome.webp ~217KB.

- [ ] **Step 2: Update the picture element in HomeView.vue**

In `src/views/HomeView.vue`, replace the existing `<picture>` block inside `.hero__photo` with:

```html
        <picture>
          <source
            srcset="/images/welcome-640.webp 640w, /images/welcome-1024.webp 1024w, /images/welcome.webp 2048w"
            sizes="(max-width: 768px) 100vw, 50vw"
            type="image/webp"
          />
          <img
            src="/images/welcome.jpg"
            alt="IndyHackers community event"
            fetchpriority="high"
          />
        </picture>
```

- [ ] **Step 3: Update the preload hint in index.html**

In `index.html`, replace the existing `<link rel="preload" ... welcome.webp>` with:

```html
    <link rel="preload" as="image" type="image/webp" href="/images/welcome-1024.webp" imagesrcset="/images/welcome-640.webp 640w, /images/welcome-1024.webp 1024w, /images/welcome.webp 2048w" imagesizes="(max-width: 768px) 100vw, 50vw">
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:5173` and confirm the hero image loads. Check the Network tab — on a desktop viewport it should load `welcome-1024.webp` or `welcome.webp`; on a narrow viewport it should load `welcome-640.webp`.

- [ ] **Step 5: Commit**

```bash
git add public/images/welcome-640.webp public/images/welcome-1024.webp src/views/HomeView.vue index.html
git commit -m "perf: add responsive srcset for hero image (640/1024/2048)"
```

---

### Task 5: Convert logo to WebP

**Files:**
- Create: `public/images/ih-logo-black.webp`
- Modify: `src/components/NavigationBar.vue`

The logo is a 53KB PNG. Convert to WebP and use `<picture>` with PNG fallback.

- [ ] **Step 1: Convert the logo**

```bash
cwebp -q 90 public/images/ih-logo-black.png -o public/images/ih-logo-black.webp
ls -lh public/images/ih-logo-black.*
```

Expected: WebP file significantly smaller than the 53KB PNG.

- [ ] **Step 2: Update NavigationBar.vue**

In `src/components/NavigationBar.vue`, replace:

```html
        <img src="/images/ih-logo-black.png" alt="Indy Hackers" />
```

with:

```html
        <picture>
          <source srcset="/images/ih-logo-black.webp" type="image/webp" />
          <img src="/images/ih-logo-black.png" alt="Indy Hackers" />
        </picture>
```

- [ ] **Step 3: Verify the logo displays correctly**

Open `http://localhost:5173`. The logo in the navbar should look identical. Check the Network tab to confirm the `.webp` file is loaded.

- [ ] **Step 4: Commit**

```bash
git add public/images/ih-logo-black.webp src/components/NavigationBar.vue
git commit -m "perf: convert navbar logo from PNG to WebP (53KB -> smaller)"
```

---

### Task 6: Bootstrap CSS tree-shaking

**Files:**
- Modify: `src/assets/base.scss`

The full Bootstrap SCSS import produces a 354KB CSS bundle. The project only uses forms, buttons, cards, modals, grid, badges, alerts, spinners, and tooltips. Replace the blanket import with selective imports.

- [ ] **Step 1: Replace the full Bootstrap import with selective imports**

In `src/assets/base.scss`, replace:

```scss
// Import Bootstrap and Bootstrap-Vue SCSS
@import 'bootstrap/scss/bootstrap';
```

with:

```scss
// Bootstrap core (required)
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/variables-dark';
@import 'bootstrap/scss/maps';
@import 'bootstrap/scss/mixins';
@import 'bootstrap/scss/utilities';

// Bootstrap base
@import 'bootstrap/scss/root';
@import 'bootstrap/scss/reboot';
@import 'bootstrap/scss/type';
@import 'bootstrap/scss/containers';
@import 'bootstrap/scss/grid';

// Bootstrap components (only what we use)
@import 'bootstrap/scss/forms';
@import 'bootstrap/scss/buttons';
@import 'bootstrap/scss/card';
@import 'bootstrap/scss/modal';
@import 'bootstrap/scss/badge';
@import 'bootstrap/scss/alert';
@import 'bootstrap/scss/spinners';
@import 'bootstrap/scss/tooltip';
@import 'bootstrap/scss/close';
@import 'bootstrap/scss/transitions';

// Bootstrap utilities API (generates utility classes)
@import 'bootstrap/scss/utilities/api';
```

- [ ] **Step 2: Verify the build succeeds**

```bash
npm run build 2>&1 | tail -10
```

Expected: Build succeeds. The CSS file in the output should be noticeably smaller than 354KB.

- [ ] **Step 3: Verify the site visually**

Open `http://localhost:5173` and navigate to several pages: Home, Jobs, About, Calendar, Sponsors. Check that layouts, forms, buttons, modals, and cards still look correct. Pay special attention to:
- Job listing cards
- Event recommendation form
- Login/signup forms
- Sponsor page layout

If anything looks broken, a Bootstrap module is missing — add it to the import list.

- [ ] **Step 4: Commit**

```bash
git add src/assets/base.scss
git commit -m "perf: tree-shake Bootstrap CSS to only used modules"
```

---

### Task 7: Defer Google Analytics

**Files:**
- Modify: `vite.config.js`

The gtag script (158KB transfer) loads in the `<head>` and competes with critical resources. Move it to load after the page is interactive by setting `injectTo: 'body'` in the vite-plugin-radar config.

- [ ] **Step 1: Update vite-plugin-radar config**

In `vite.config.js`, change the `VitePluginRadar` config from:

```js
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: 'G-ZF5Q1C13NM'
      }
    })
```

to:

```js
    VitePluginRadar({
      // Google Analytics tag injection — load after page renders
      analytics: {
        id: 'G-ZF5Q1C13NM',
        injectTo: 'body'
      }
    })
```

- [ ] **Step 2: Verify the build output**

```bash
npm run build && grep -l 'gtag' dist/index.html
```

Expected: The gtag script tags should appear near the end of `<body>` instead of in `<head>`.

- [ ] **Step 3: Commit**

```bash
git add vite.config.js
git commit -m "perf: defer Google Analytics to body for faster initial paint"
```

---

### Task 8: Final verification

**Files:**
- None modified — this captures the "after" measurement and compares

- [ ] **Step 1: Run production build**

```bash
npm run build 2>&1 | tail -15
```

Record the new bundle sizes. Compare to the original: JS was 711KB, CSS was 354KB.

- [ ] **Step 2: Run Lighthouse scan against localhost**

```bash
node scripts/lighthouse-scan.mjs http://localhost:5173 after-perf
```

- [ ] **Step 3: Compare before and after**

```bash
node scripts/lighthouse-compare.mjs tmp/lighthouse/before-perf-*.report.json tmp/lighthouse/after-perf-*.report.json
```

Expected: Improvements in Performance score, FCP, LCP, and total transfer size.

- [ ] **Step 4: Commit the spec and plan docs**

```bash
git add docs/superpowers/
git commit -m "docs: add performance optimization spec and plan"
```
