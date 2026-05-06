# Bastion Save State 2.37 — Router + State Stability Lock

Current status:
- Save State 2.37 active.
- Router/view switching is stabilized around one `showView()` route function and one active view at a time.
- Profile remains the input center; Dashboard remains output-only and receives updates through the existing `commit()` / `readState()` state path.
- Scenario, Advisor, Timeline, Reports, Tax & RMD, Profile, Dashboard, and Owner (`owner=true`) routes remain preserved.

Patch completed:
- Added defensive view rendering guards so missing extracted view modules show a fallback card instead of breaking the app shell.
- Normalized sidebar navigation binding to avoid duplicate listener behavior during repeated route switching.
- Guarded Dashboard metric and chart updates so state commits can continue when optional rendered nodes are unavailable.
- Updated visible Save State text in the sidebar, header, title, drawer readout, Tax/RMD view, Owner view, and this file to Phase 2.37.

Validation status:
- Navigation remains Dashboard / Profile / Advisor / Scenarios / Timeline / Tax & RMD / Reports, with Owner Dashboard isolated behind `owner=true`.
- Profile-owned inputs continue to persist through local storage and propagate to Dashboard outputs through the existing source-of-truth state read.
- UI_AGENT review: passed with no visual-design changes required.
- REGRESSION_AGENT review: passed via syntax checks, bash-equivalent Bastion check, and Playwright route smoke.
- `scripts/check-bastion.ps1` was attempted with `pwsh` and `powershell`, but neither PowerShell executable is installed in this container.
