# Performance Optimization Design

**Date:** 2026-04-20
**Baseline (dev.indyhackers.org):** Performance 66, Accessibility 100, Best Practices 100, SEO 92
**Target:** Performance 85+, LCP under 3s

## Current Bottlenecks

| Issue | Impact | Detail |
|-------|--------|--------|
| Single JS bundle (711KB / 226KB gz) | High | All routes loaded upfront; 513KB unused on home page |
| Single CSS bundle (354KB / 49KB gz) | Medium | Full Bootstrap included, ~43KB unused per page |
| Render-blocking Google Fonts | High | `@import url()` in App.vue blocks first paint |
| Hero image (217KB WebP) | Medium | Full 2048px served to all viewports |
| Logo PNG (53KB) | Low | Not converted to WebP |
| Google Analytics blocking | Medium | gtag loaded synchronously in head |

## Approach A: Incremental Optimization (selected)

Six changes, all within the existing Vue 3 + Vite stack. No new frameworks or infrastructure.

### 1. Route-level code splitting

Change all static route imports in `src/router/index.js` to dynamic `() => import(...)`. Keep HomeView as a static import since it's the landing page. Vite will automatically create separate chunks per route.

**Expected impact:** Initial JS payload drops from ~711KB to ~200-300KB. Each route loads its own chunk on navigation.

**Files:** `src/router/index.js`

### 2. Font loading optimization

Replace the render-blocking `@import url('https://fonts.googleapis.com/...')` in `App.vue` with:
- `<link rel="preconnect" href="https://fonts.googleapis.com">` in `index.html`
- `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` in `index.html`
- `<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?...&display=swap">` in `index.html`
- A regular `<link rel="stylesheet">` with the same URL

Add `font-display: swap` (already in the URL via `&display=swap`). This unblocks rendering — text appears in a fallback font, then swaps to the custom font once loaded.

**Expected impact:** FCP improves by eliminating font as a render-blocking resource.

**Files:** `index.html`, `src/App.vue`

### 3. Responsive hero image

Generate additional WebP sizes from the source JPEG:
- 640w for mobile
- 1024w for tablet
- 2048w for desktop (existing)

Use `<source srcset="...640.webp 640w, ...1024.webp 1024w, ...2048.webp 2048w" sizes="(max-width: 768px) 100vw, 50vw">` in the `<picture>` element.

**Expected impact:** Mobile users download ~40-60KB instead of 217KB.

**Files:** `src/views/HomeView.vue`, `public/images/` (new sized variants)

### 4. Logo to WebP

Convert `ih-logo-black.png` (53KB) to WebP. Use `<picture>` with PNG fallback where the logo is rendered.

**Expected impact:** ~30-40KB savings.

**Files:** `public/images/`, component(s) rendering the logo

### 5. Bootstrap CSS tree-shaking

Instead of importing all of Bootstrap via `@import 'bootstrap/scss/bootstrap'`, import only the modules actually used (grid, utilities, buttons, navbar, forms, etc.). This requires auditing which Bootstrap features are in use and building a custom import list.

**Expected impact:** CSS bundle drops from 354KB to ~100-150KB.

**Files:** `src/assets/base.scss` (or wherever Bootstrap is imported)

### 6. Defer Google Analytics

The `vite-plugin-radar` plugin injects gtag in the `<head>`. Configure it to load asynchronously/deferred so it doesn't compete with critical resources during initial paint.

**Expected impact:** Removes ~158KB transfer from the critical rendering path.

**Files:** `vite.config.js`

## Future Options

### Approach B: SSG / Prerendering

Add a prerendering step (e.g., `vite-ssg` or `vite-plugin-prerender`) to generate static HTML for the home page and other static routes. The browser can paint immediately without waiting for JS hydration.

**When to consider:** If Approach A doesn't achieve sub-2.5s LCP, or if SEO becomes a higher priority (search engines prefer pre-rendered content).

**Trade-offs:** Adds a build-time rendering step. Dynamic content (calendar events) needs special handling — either fetched client-side after hydration, or fetched at build time and refreshed periodically.

### Approach C: Nuxt 3 Migration

Migrate the entire app to Nuxt 3 for full server-side rendering.

**When to consider:** If the site grows significantly in complexity, needs authenticated server-rendered pages, or if SEO/performance requirements become much stricter.

**Trade-offs:** Major rewrite. The site is a community portal, not a content-heavy SEO play — this is likely overkill for the foreseeable future.
