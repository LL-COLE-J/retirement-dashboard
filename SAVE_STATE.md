# Bastion Save State 2.39j — App Shell Normalization

Current status:
- Phase 2.39j normalizes Bastion's app shell structure by documenting root `index.html` as the canonical app shell and preserving `app/index.html` as a compatibility redirect.
- `APP_SHELL_NORMALIZATION.md` documents the pre-2.39j shell structure, repo references found, deployment assumptions, canonical shell path, compatibility decision, risk assessment, rollback plan, future cleanup notes, and validation results.
- Linux, PowerShell, and GitHub validation now check the canonical root shell and ensure the retained `app/index.html` file stays compatibility-only rather than becoming a second app shell.
- No intentional product behavior, formula, route, auth behavior, Firebase rule behavior, deployment target, owner dashboard behavior, or UI redesign changes occurred.

Patch completed:
- Added `APP_SHELL_NORMALIZATION.md`.
- Replaced `app/index.html` with a documented lightweight compatibility redirect to root `index.html`.
- Updated `scripts/check-bastion.sh`, `scripts/check-bastion.ps1`, and `.github/workflows/bastion-check.yml` with canonical app shell validation.
- Updated `AGENTS.md` with app shell handling governance and root/app shell documentation requirements.
- Updated `ROADMAP.md` to mark 2.39j complete and set 2.40 — Beta UX Stabilization as the next phase.
- Updated visible Save State and phase text to Bastion Save State 2.39j — App Shell Normalization.

Next phase:
- 2.40 — Beta UX Stabilization.
- Focus areas: uniform UI cohesion, profile input cleanup, advisor-grade light-theme direction, and trusted beta preparation.
- Preserve future Firestore rules testing, Firebase Auth boundary design, staging/production separation, and production rule tightening as separate scoped hardening phases.

Validation status:
- UI_AGENT review: passed; visible changes were limited to Save State/phase text with no layout redesign.
- REGRESSION_AGENT review: passed through Linux validation, JavaScript syntax checks, inline script checks, canonical app shell checks, route-file checks, conflict-remnant scanning, secret-pattern scanning, Firebase hardening posture warnings, and tracked environment-file checks.
- ANALYTICS_AGENT impact: not applicable; no behavior tracking or analytics collection changed.
- MARKET_AGENT impact: not applicable; no CTA, onboarding, pricing, layout, product-positioning, or interaction flow changed.
- Secret-leak probe result: passed for newly added or changed code/documentation; no private credentials, service-account files, deployment credentials, `.env` files, or private user data were added. Existing public Firebase browser config remains intentionally public client config.
- Save State alignment: `SAVE_STATE.md`, `ROADMAP.md`, and visible UI phase text agree on Bastion Save State 2.39j.
