# Bastion Save State 2.39i — Firebase Rules + Environment Hardening Audit

Current status:
- Phase 2.39i audits Bastion's Firebase rules, deployment configuration, environment separation readiness, and least-privilege posture before future beta users, auth expansion, or enterprise growth.
- `FIREBASE_HARDENING_AUDIT.md` now documents the current Firebase posture, public-vs-private config boundaries, Firestore rule risks, GitHub workflow posture, deployment/config findings, environment separation gaps, secret-management guidance, beta-readiness concerns, rollback guidance, and recommended future hardening phases.
- `AGENTS.md` now includes Firebase/environment hardening rules that distinguish acceptable public Firebase browser config from true secret exposure and warn that client-side owner gates are not security boundaries.
- Linux and PowerShell validation now warn when temporary Firestore `allow read, write: if true` rules are present and fail if tracked `.env` files appear.
- The GitHub validation workflow now declares read-only repository contents permission.
- No product behavior changed. No formulas, routes, auth behavior, Firebase rule behavior, UI layout, owner dashboard behavior, or deployment target changed.

Patch completed:
- Added `FIREBASE_HARDENING_AUDIT.md`.
- Updated `AGENTS.md` with Firebase/environment hardening governance.
- Updated `.github/workflows/bastion-check.yml` with least-privilege read-only contents permission.
- Updated `scripts/check-bastion.sh` and `scripts/check-bastion.ps1` with Firebase hardening posture warnings and tracked environment-file checks.
- Updated `ROADMAP.md` to mark 2.39i complete and keep 2.39j — App Shell Normalization as the next phase.
- Updated visible Save State and phase text to Bastion Save State 2.39i — Firebase Rules + Environment Hardening Audit.

Next phase:
- 2.39j — App Shell Normalization.
- Preserve future Firestore rules testing, Firebase Auth boundary design, staging/production separation, and production rule tightening as separate scoped hardening phases.
- Preserve future Beta UX Stabilization direction.

Validation status:
- UI_AGENT review: passed; visible changes were limited to Save State/phase text with no layout redesign.
- REGRESSION_AGENT review: passed through Linux validation, JavaScript syntax checks, inline script checks, route-file checks, conflict-remnant scanning, secret-pattern scanning, Firebase hardening posture warnings, and tracked environment-file checks.
- ANALYTICS_AGENT impact: not applicable; no behavior tracking or analytics collection changed.
- MARKET_AGENT impact: not applicable; no CTA, onboarding, pricing, layout, product-positioning, or interaction flow changed.
- Secret-leak probe result: passed for newly added or changed text/configuration; no service-account JSON, private key, token, `.env` file, or private user data was added. Existing public Firebase browser config remains intentionally public client config, and existing client-side privileged gate strings remain documented as unsuitable for true access control without repeating their values.
- Save State alignment: `SAVE_STATE.md`, `ROADMAP.md`, and visible UI phase text agree on Bastion Save State 2.39i.
