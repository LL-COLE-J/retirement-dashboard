 codex/add-owner-intelligence-engine-features-ix379a
# Bastion Save State 2.33 — Critical Engine Regression Repair + Owner Blocker Sync

- Save State 2.33 active.
- Projection math/state flow repaired to prevent false run-out defaults and stale outcomes.
- Save Baseline now persists a metrics snapshot and inputs snapshot for scenario deltas.
- Advisor Drawer now stays compact and links to full Advisor page.
- Owner Dashboard now surfaces blocker rows for engine, baseline, drawer, and owner-intelligence validation failures.
=======
# Bastion Save State 2.32 — Owner Intelligence Engine

- Save State 2.32 active.
- Owner Dashboard now runs a live Owner Intelligence evaluation loop.
- Agent lifecycle movement now updates Completed Validations, Feedback Inbox, and Approved Build Queue from live checks.
- Suggested next phase logic is now dynamic and no longer references legacy 2.22 labels.

## Phase 2.32
- Added `evaluateOwnerIntelligence()` and connected it to app load, Owner Dashboard render, manual refresh, and post-commit flow.
- Added Refresh Intelligence action in Owner Dashboard with live refresh status feedback.
- Updated Owner summary cards and section empty states to reflect live unresolved/completed counts.
- Updated visible save-state labels to 2.32 in sidebar, header, and owner command center.

## Sync checks
- Sidebar visible save state: `Bastion Save State 2.32 — Owner Intelligence Engine`
- Header/topbar visible save state: `Bastion Save State 2.32 keeps Dashboard output-first while making Owner Intelligence live and self-updating.`
- File-based save state: `Bastion Save State 2.32 — Owner Intelligence Engine`
 main
