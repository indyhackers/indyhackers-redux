# IndyHackers Design System Roadmap

## Phase 1: Foundation Tokens
Define the full token palette in `base.scss`. No component changes — just establish the vocabulary.

- [x] **1.1 Text hierarchy tokens** — Replace all inline `rgba()` hacks with named tokens
  - `--text-primary`, `--text-secondary`, `--text-muted`
  - Files to update: `base.scss`
  - Validates on: HomeView hero subtitle, NewsletterView post descriptions, AboutView hero subtitle

- [x] **1.2 Surface layer tokens** — More than "white card on yellow"
  - `--surface-0` (page bg), `--surface-1` (cards), `--surface-2` (nested sections like sponsor bg), `--surface-hover`
  - Files to update: `base.scss`

- [x] **1.3 Semantic status tokens** — Replace Bootstrap color leak-through
  - `--success` + `--success-subtle`, `--warning` + `--warning-subtle`, `--info` + `--info-subtle`, `--danger-subtle` (danger already exists as `--destructive`)
  - Files to update: `base.scss`

- [x] **1.4 Interactive state tokens** — Replace opacity-only hover/focus
  - `--focus-ring`, button hover colors, link hover treatment
  - Files to update: `base.scss`, `main.scss`

## Phase 2: Accent Expansion
Yellow is the only accent. Add 2-3 warm-adjacent accents that feel like family.

- [x] **2.1 Choose accent palette** — Propose 2-3 accent colors alongside the yellow
  - A warm neutral (formalize the HSL the sponsors page already invented)
  - A deep tone for emphasis/premium (dark ochre, warm brown, deep amber)
  - Optional cool accent for contrast (muted teal or slate — not bright blue)
  - Define as tokens with subtle variants (`--accent-warm`, `--accent-warm-subtle`, etc.)
  - Files to update: `base.scss`

- [x] **2.2 Audit yellow usage** — Decide where yellow is canvas vs. accent
  - Home page: yellow canvas (keep)
  - Inner pages: white canvas (keep)
  - Buttons, badges, highlights: yellow as accent (refine)
  - Kill unused `$primary-yellow: #Cfff27` in `_variables.scss`

## Phase 3: Component Application
Sweep through components and apply the token system.

- [x] **3.1 Sponsors page** — Highest visual impact, most broken
  - Tier cards (HACKER/BUILDER/CHAMPION) get distinct visual treatments using accent scale
  - Annual sponsor section uses `--surface-2` instead of ad-hoc `hsl()` values
  - Tier value progression visible at a glance
  - Files: `SponsorsView.vue`

- [x] **3.2 Jobs page** — Needs differentiation
  - Salary badge gets a dedicated accent (not just inverted primary)
  - Job metadata (company, location) uses `--text-muted`
  - Consider "NEW" badge treatment if data supports it
  - Files: `JobsList.vue`, `JobListing.vue`, `jobs.scss`

- [x] **3.3 Events** — Badge and metadata cleanup
  - "All Day" badge uses proper badge token
  - Event metadata uses text hierarchy tokens
  - Files: `EventListItem.vue`, `EventsView.vue`

- [x] **3.4 Newsletter** — Text hierarchy + error states
  - Post cards use `--text-secondary` / `--text-muted` tokens
  - Error state uses `--danger-subtle`
  - Files: `NewsletterView.vue`

- [x] **3.5 About page** — Text hierarchy for member cards
  - Board member names use text tokens
  - Contact icon states use interactive tokens
  - Files: `AboutView.vue`, `BoardMemberCard.vue`, `about.scss`

- [x] **3.6 Home page** — Hardcoded color cleanup
  - Replace `#453a22` with `--text-secondary`
  - Hero photo shadow uses token
  - Files: `HomeView.vue`

- [x] **3.7 Global sweep** — Catch remaining hardcoded colors
  - Replace every remaining hardcoded hex/rgb/hsl with a token
  - Replace opacity-only hovers with color-shift hovers
  - Unify link styles across pages
  - Files: `NavigationBar.vue`, `BottomLinkTree.vue`, `header.scss`, `content.scss`, `main.scss`

## Phase 4: Consolidation
Clean up duplication and document the system.

- [x] **4.1 Consolidate variable files** — Single source of truth
  - Merge `_variables.scss` into `base.scss` or clearly separate concerns (SCSS vars for compile-time, CSS custom props for runtime)
  - Remove duplicate definitions
  - Files: `_variables.scss`, `base.scss`

- [x] **4.2 Document the token inventory** — Comment block in `base.scss`
  - Group tokens by purpose (text, surface, accent, semantic, interactive)
  - Note which tokens are required vs. optional for new components

- [x] **4.3 Remove Bootstrap color dependencies** — Replace remaining Bootstrap variant usage
  - Swap `variant="danger"` / `variant="info"` alerts with custom-styled equivalents
  - Files: `EventsView.vue`, `CreateJobModal.vue`
