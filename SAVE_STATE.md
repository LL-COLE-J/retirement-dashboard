 codex/update-agents.md-with-operating-constitution
# Bastion Save State 2.39a — AGENTS Operating Constitution

Current status:
- Governance Phase 2.39a active for repository instructions.
- Added the permanent `AGENTS.md` operating constitution to make future Codex/agent execution safer, smaller, easier to validate, and less likely to regress.
- App behavior, calculations, routes, and UI layout were intentionally not changed in this documentation/governance phase.
- Visible Save State text in `index.html` now reflects Phase 2.39a so the deployed app, `SAVE_STATE.md`, `ROADMAP.md`, and `AGENTS.md` agree.

Patch completed:
- Added Bastion Core Principle, scoped execution, Codex safety, environment, save state, validation, user-proofing, financial safety, live-agent restriction, permission tier, no silent mutation, auditability, security/privacy, emergency shutdown, priority order, and forbidden-action rules to `AGENTS.md`.
- Updated `ROADMAP.md` to record Phase 2.39a as a completed governance phase.
- No app features, calculations, routes, or visual design were changed.
- Updated visible Save State copy in `index.html` from 2.37 to 2.39a without changing behavior or layout.

Validation status:
- Governance/text-only phase; no app behavior smoke test required because routes, calculations, and layout were not changed.
- UI_AGENT review: passed with Save State copy synced and no UI layout changes.
- REGRESSION_AGENT review: passed for governance scope via save-state alignment check, inline JavaScript syntax check, diff check, and merge-conflict marker scan.
- Phase 2.39a PR conflict-resolution review: no merge-conflict markers remain, and Save State alignment was revalidated across `index.html`, `app/index.html`, `SAVE_STATE.md`, `ROADMAP.md`, and `AGENTS.md`.
- `scripts/check-bastion.ps1` was attempted through available PowerShell executables; PowerShell is unavailable in this Codex container, so equivalent bash validation passed.
=======
# Bastion Save State 2.38 — Work Branch Safety Lock

Current status:
- Save State 2.38 active.
- Codex sandbox work branches are accepted as safe execution branches when the repository path, clean working tree, the known router/state lock merge commit, and conflict-marker scan pass.
- No local `main` checkout or pull is required for phase execution in the Codex sandbox.
- Router/view switching and Profile-owned state propagation remain preserved from the prior router/state lock.

Patch completed:
- Updated visible Save State text in the sidebar, header, title, advisor drawer readout, Owner view, and this file to Phase 2.38.
- Updated the roadmap current focus to Phase 2.38.
- Strengthened `scripts/check-bastion.ps1` so local validation reports the branch, remotes, latest commit, repository path, and merge-conflict marker scan without requiring the local branch name to be `main`.

Validation status:
- Navigation remains Dashboard / Profile / Advisor / Scenarios / Timeline / Tax & RMD / Reports, with Owner Dashboard isolated behind `owner=true`.
- Profile-owned inputs continue to persist through local storage and propagate to Dashboard outputs through the existing source-of-truth state read.
- UI_AGENT review: passed with text-only Save State updates and no layout redesign required.
- REGRESSION_AGENT review: passed via syntax checks, bash-equivalent Bastion validation, and a Playwright dashboard screenshot smoke check.
- `scripts/check-bastion.ps1` was attempted, but this container does not include `pwsh` or `powershell`; the bash-equivalent validation passed against the same phase, path, route, Save State, and conflict-marker requirements.
 main
