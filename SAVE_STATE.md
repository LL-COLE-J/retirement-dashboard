# Bastion Save State 2.41b — Canonical Brand Asset Adoption

Locked on: 2026-05-09

Current scope:
- Phase 2.41b is a surgical brand-asset adoption phase for the regular Bastion Personal site/app.
- The approved canonical SVG brand system now loads from `assets/brand/` for public landing, app operational surfaces, compact/mobile marks, reports, and favicon usage.
- Profile remains the canonical intake/input owner, Dashboard remains output-only, and scenarios continue to clone/compare baseline assumptions without mutating the baseline.
- Existing mobile navigation behavior, desktop navigation, routes, Save State metadata, calculations, app shell assumptions, owner isolation, Firebase/auth/deployment configuration, and current user flow remain preserved.
- Future sticky mobile nav, module-aware lower action surfaces, and collapsible routing drawer work remain prepared only by spacing/visual consistency and are not fully rewritten in this phase.

What changed in 2.41b:
- Updated visible Save State and phase text to Bastion Save State 2.41b — Canonical Brand Asset Adoption.
- Added the canonical approved brand asset set under `assets/brand/`: `bastion-tower.svg`, `bastion-tower-lockup.svg`, `bastion-shield-b.svg`, `bastion-b-mark.svg`, `bastion-report-mark.svg`, `favicon.svg`, and `brand-tokens.css`.
- Imported `assets/brand/brand-tokens.css` globally before the app stylesheet.
- Updated favicon, landing hero, sidebar/app operational mark, mobile compact mark, header compact mark, advisor drawer compact mark, Dashboard executive mark, and Reports branding to use canonical SVG asset paths.
- Preserved governance warnings, Dashboard output ownership, Profile input ownership, owner isolation, app shell assumptions, routes, input IDs, formulas, calculations, engines, Firebase/auth/deployment configuration, existing desktop behavior, and existing mobile behavior.

Validation status:
- Linux/Codex validation passed with `bash scripts/check-bastion.sh`.
- JavaScript syntax validation passed for `app/views/*.js`, `app/core/*.js`, and extracted inline `index.html` scripts.
- `git diff --check`, conflict-marker scan, compatibility redirect validation, dangerous secret-pattern scan, and canonical asset path checks passed before lock.
- Mobile/desktop visual structure was reviewed for logo sizing, spacing, sidebar/header consistency, landing brand usage, and report brand usage without route, calculation, or layout rewrites.

Governance status:
- UI_AGENT result: Passed after canonical SVG brand adoption review; sidebar/header mark sizing, mobile compact B usage, landing lockup usage, Reports lockup usage, and dark UI consistency were reviewed.
- REGRESSION_AGENT result: routes, Profile-owned inputs, Dashboard output ownership, calculations, app shell assumptions, owner isolation, governance warnings, and compatibility redirect remain preserved by validation.
- ANALYTICS_AGENT impact: not applicable; no behavior tracking or analytics collection changed.
- MARKET_AGENT impact: considered; canonical assets align the product with a premium institutional brand language without copying competitor UI or changing Bastion's decision-first simplicity.
- Secret-leak probe result: passed final validation; no private credentials, service-account files, deployment credentials, `.env` files, tokens, or private user data were intentionally added. Existing Firebase browser config remains intentionally public client configuration protected by separate rules/hardening work.
- Save State alignment: `SAVE_STATE.md`, `ROADMAP.md`, and visible UI phase text agree on Bastion Save State 2.41b — Canonical Brand Asset Adoption.
