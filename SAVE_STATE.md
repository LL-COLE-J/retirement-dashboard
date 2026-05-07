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
