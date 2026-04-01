# Design Overhaul Handoff

## What We Did

**Goal:** Full visual redesign of IndyHackers Redux based on a "Civic Monospace" spec — yellow canvas, white cards, Space Mono headings/buttons/nav, Space Grotesk body text, warm design tokens throughout.

**Stack:** Vue 3 + Bootstrap Vue Next + SCSS. No Tailwind. All styling via CSS custom properties.

**Branch:** `design-spike` (all work here, not merged to main)

---

## Key Architecture Decisions

1. **CSS token system** in `src/assets/base.scss`:
   - `--background: #FFCC00` (yellow canvas)
   - `--foreground: #121212` (near-black text)
   - `--primary: #121212` / `--primary-foreground: #FFCC00` (button pair)
   - `--card: #FFFFFF` (white cards)
   - `--border: #CFC4A8` (warm border)
   - `--muted-foreground: #595959`

2. **Padding rule:** `.ih-container` owns horizontal padding (`0 3rem`), outer elements own vertical only — never stack both or you get double gutters.

3. **`main.scss` must be imported in `App.vue`** — it holds `.ih-btn-primary`, `.ih-btn-outline`, and `.ih-container`. Was missing early on and caused buttons to render as unstyled links.

4. **`SponsorsView` lives in `src/views/`** not `src/components/` — router import was updated accordingly.

5. **Fonts:** Space Mono (400, 700) for headings/nav/buttons; Space Grotesk (300–700) for body. Imported in `App.vue`. Dosis and Work Sans removed.

---

## Files Modified

| File | What Changed |
|------|-------------|
| `src/assets/base.scss` | CSS custom property tokens, `html`/`body` base styles |
| `src/styles/_variables.scss` | SCSS vars aligned to tokens |
| `src/styles/main.scss` | `.ih-container`, `.ih-btn-primary`, `.ih-btn-outline`, heading sizes |
| `src/App.vue` | Font imports, `main.scss` import, removed content padding |
| `src/components/NavigationBar.vue` | Full rewrite — plain `<nav>`, yellow bg, Space Mono links, mobile hamburger |
| `src/components/BottomLinkTree.vue` | Minimal copyright bar + Code of Conduct link |
| `src/views/HomeView.vue` | Full rebuild — Hero, What We Do (3-col grid), Events section |
| `src/views/SponsorsView.vue` | Full rebuild — hero, sponsor grid, dashed CTA box, monthly backers card |
| `src/components/sponsors/SponsorList.vue` | 4-col grid, warm borders, placeholder cards when < 4 sponsors |
| `src/components/EventsView.vue` | Removed Bootstrap container, `ih-btn` classes |
| `src/components/EventListItem.vue` | `var(--primary)` left border, yellow All Day pill |
| `src/components/CalendarView.vue` | `ih-container` wrapper, `ih-btn` classes |
| `src/components/NewsletterView.vue` | White card for iframe, design token colors |
| `src/components/jobs/JobsList.vue` + `JobListing.vue` | Token colors, removed hardcoded hex |
| `src/components/LoginPage.vue` | `ih-btn` classes |
| `src/views/PlaceholderView.vue` | Yellow canvas, white card |
| `src/views/AboutView.vue` | Hero section, 2-col board grid, `BoardMemberCard` mobile fix |
| `src/router/index.js` | `SponsorsView` import path updated to `views/` |

---

## What's Left

- Visual QA pass across all pages
- Events section left-bleed: Bootstrap card gutter behavior may still cause layout issues on some screen sizes
- Decide when to merge `design-spike` → `main`
