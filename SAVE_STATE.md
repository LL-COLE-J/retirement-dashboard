# Bastion Save State 2.40g — Brand Asset Pack & Personal Site Integration

Locked on: 2026-05-09

- Phase 2.40g is a surgical visual-identity pass for the regular Bastion Personal site/app only.
- Root `index.html` remains the canonical deployed app shell; `app/index.html` remains compatibility redirect only.
- Dashboard remains output-only; Profile remains the canonical intake/input owner.
- Profile is structurally stabilized but not feature-complete; expanded household, income, asset, debt, tax, special-account, onboarding, trusted beta, security, report generation, and financial intelligence work remain separate future phases.
- No formulas, engines, calculations, scenarios, routes, auth, Firebase, Firestore rules, deployment logic, canonical math, input IDs, or commit behavior were intentionally changed.
- The 2.40c Dashboard readability pass and 2.40d brand token system are preserved.
- Enterprise remains future baseline only; no Enterprise pages or enterprise flows were built.
- Next phase remains 2.41 — Beta Access & Security Gate.

What changed in 2.40g:
- Updated visible Save State and phase text to Bastion Save State 2.40g — Brand Asset Pack & Personal Site Integration.
- Added a production brand asset pack under `app/assets/brand/` with the Primary Shield+B mark, Minimal compact B mark, Tower marketing mark, Full horizontal Bastion Insight lockup, Tower accent lockup, and Monochrome/report variant.
- Applied logo variants by surface: full lockup on the public landing surface, Tower mark as a premium public hero accent only, Shield+B in the app sidebar and Dashboard executive summary, compact B in header/advisor/mobile/favicon contexts, and monochrome lockup in Reports.
- Refined brand CSS utilities for tower sizing, landing hero spacing, and light advisor-grade landing/report surfaces without redesigning the app or over-logoing the Dashboard.
- Preserved the 2.40d navy / royal blue / sage green / muted gold / slate / off-white token system and the 2.40c Dashboard readability hierarchy.
- Preserved governance warnings, Dashboard output ownership, Profile input ownership, owner isolation, app shell assumptions, routes, input IDs, formulas, and existing user flow.

Validation status:
- Linux/Codex validation passed with `bash scripts/check-bastion.sh`.
- JavaScript syntax validation passed for `app/views/*.js`, `app/core/*.js`, and extracted inline `index.html` scripts.
- `git diff --check`, conflict-marker scan, compatibility redirect validation, dangerous secret-pattern scan, desktop/mobile Playwright screenshot sanity checks, and horizontal-overflow checks passed before lock.

Governance status:
- UI_AGENT result: Passed; reviewed landing, sidebar, header, Dashboard, Advisor drawer, Reports, mobile logo sizing, spacing, overflow risk, and preservation of the existing light/dark Bastion Personal language.
- REGRESSION_AGENT result: routes, Profile-owned inputs, Dashboard output ownership, calculations, app shell assumptions, owner isolation, governance warnings, and compatibility redirect remain preserved by validation.
- ANALYTICS_AGENT impact: not applicable; no behavior tracking or analytics collection changed.
- MARKET_AGENT impact: considered; brand assets improve trust, report polish, and public-site credibility while preserving Bastion's decision-first flow and not copying competitor UI.
- Secret-leak probe result: passed final validation; no private credentials, service-account files, deployment credentials, `.env` files, tokens, or private user data were intentionally added. Existing Firebase browser config remains intentionally public client configuration protected by separate rules/hardening work.
- Save State alignment: `SAVE_STATE.md`, `ROADMAP.md`, and visible UI phase text agree on Bastion Save State 2.40g — Brand Asset Pack & Personal Site Integration.
