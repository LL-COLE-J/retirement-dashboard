# Bastion Save State 2.41d — Public Landing Restoration + Cinematic Tower Hero

Locked on: 2026-05-09

Current scope:
- Phase 2.41d restores the public visitor entry as a premium cinematic Bastion landing page rather than an internal app/dashboard-looking screen.
- Public landing now uses the approved canonical tower identity from `assets/brand/bastion-tower-lockup.svg` and `assets/brand/bastion-tower.svg` with a deep navy hero, gold beacon accent, premium landing copy, Request Beta Access and See How It Works CTAs, and an advisor-grade preview card.
- Public visitors on the public host see the landing page first; the internal app shell remains hidden there.
- The app/dashboard route behavior, Profile input ownership, Dashboard output-only behavior, formulas, owner isolation, auth/Firebase/Firestore configuration, deployment configuration, and canonical brand asset paths remain preserved.

What changed in 2.41d:
- Updated visible Save State and phase text to Bastion Save State 2.41d — Public Landing Restoration + Cinematic Tower Hero.
- Replaced the prior light/mobile-first public entry presentation with a cinematic tower-led landing page.
- Removed internal-dashboard messaging and controls from the public landing surface, including Save State card exposure, Annual/Monthly mode controls, Generate Report, Advisor Drawer, and Save Baseline controls.
- Kept the authenticated app shell and dashboard controls separate from the public landing through the existing public-host boot visibility gate.

Validation status:
- Linux/Codex validation passed with `bash scripts/check-bastion.sh`.
- JavaScript syntax validation passed for `app/views/*.js`, `app/core/*.js`, and extracted inline `index.html` scripts.
- `git diff --check`, conflict-marker scan, compatibility redirect validation, dangerous secret-pattern scan, and canonical asset path checks passed before lock.
- Desktop and mobile landing screenshots were captured from the public-host code path.
- Public landing was checked to confirm internal dashboard controls are not visible there, and the app/dashboard shell was checked separately to confirm it still renders.

Governance status:
- UI_AGENT result: Passed after restoring the deep navy cinematic tower hero and checking desktop/mobile landing readability, CTA wrapping, preview-card spacing, and dark UI consistency.
- REGRESSION_AGENT result: routes, Profile-owned inputs, Dashboard output ownership, calculations, app shell assumptions, owner isolation, governance warnings, auth/Firebase/Firestore configuration, and compatibility redirect remain preserved by validation.
- ANALYTICS_AGENT impact: not applicable; no behavior tracking or analytics collection changed.
- MARKET_AGENT impact: considered; public entry now better matches a premium financial intelligence platform while preserving Bastion's decision-first simplicity and avoiding competitor UI copying.
- Secret-leak probe result: passed final validation; no private credentials, service-account files, deployment credentials, `.env` files, tokens, or private user data were intentionally added. Existing Firebase browser config remains intentionally public client configuration protected by separate rules/hardening work.
- Save State alignment: `SAVE_STATE.md`, `ROADMAP.md`, and visible UI phase text agree on Bastion Save State 2.41d — Public Landing Restoration + Cinematic Tower Hero.
