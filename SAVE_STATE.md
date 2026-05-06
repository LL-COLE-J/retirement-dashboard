# Bastion Save State 2.36j — Extract Dashboard View

Current status:
- Save State 2.36j active.
- Dashboard source view rendering now lives in `app/views/dashboard.js` as `renderDashboardView()`.
- Root `index.html` loads the extracted Dashboard renderer and replaces the inline Dashboard source view with a render call.
- Existing Dashboard, Decision Core placement, Owner Dashboard (`owner=true`), routing, navigation, calculations, Profile layout, and extracted views are preserved.

Patch completed:
- Created `app/views/dashboard.js` for the Dashboard source view markup.
- Replaced the inline Dashboard source view in `index.html` with a call to `renderDashboardView()`.
- Updated visible Save State text in the sidebar, header, title, drawer readout, and this file to Phase 2.36j.

Validation status:
- Dashboard source view extraction preserves existing DOM IDs and `commit()` / `readState()` hooks.
- Dashboard, Profile, Advisor, Scenarios, Timeline, Tax & RMD, Reports, and Owner Dashboard routing remain wired through existing routing logic.
- `scripts/check-bastion.ps1` was attempted with `pwsh` and `powershell`, but neither PowerShell executable is installed in the container.
- A Playwright smoke validation passed for Dashboard, Profile, Advisor, Scenarios, Timeline, Tax & RMD, Reports, and Owner Dashboard (`owner=true`) with no captured console errors after browser dependencies were installed.
