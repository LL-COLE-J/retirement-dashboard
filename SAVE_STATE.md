# Bastion Save State 2.39a — AGENTS Operating Constitution

Current status:
- Governance Phase 2.39a active for repository instructions.
- Added the permanent `AGENTS.md` operating constitution to make future Codex/agent execution safer, smaller, easier to validate, and less likely to regress.
- App behavior and visible UI were intentionally not changed in this documentation/governance phase.
- Deployed app Save State text remains at the prior app stabilization state until a future UI phase explicitly updates `app/index.html`.

Patch completed:
- Added Bastion Core Principle, scoped execution, Codex safety, environment, save state, validation, user-proofing, financial safety, live-agent restriction, permission tier, no silent mutation, auditability, security/privacy, emergency shutdown, priority order, and forbidden-action rules to `AGENTS.md`.
- Updated `ROADMAP.md` to record Phase 2.39a as a completed governance phase.
- No app features, calculations, routes, or visual design were changed.

Validation status:
- Documentation-only phase; no app smoke test required.
- UI_AGENT review: passed with no UI files changed.
- REGRESSION_AGENT review: passed for documentation scope via diff check, heading verification, and merge-conflict marker scan.
- `scripts/check-bastion.ps1` was attempted through available PowerShell executables; PowerShell is unavailable in this Codex container, so equivalent bash documentation validation passed.
