# Bastion Save State 2.22

## Current Status
- Local repo stable at `D:\dev\retirement-dashboard`
- Deploy path remains root `index.html`
- Dark UI preserved
- Dashboard / Profile / Advisor / Scenarios / Timeline intact
- Owner tools remain hidden unless `?owner=true`

## Phase 2.22 - Owner Intelligence Bridge
- Owner Dashboard agent findings now flow into an owner-controlled build pipeline.
- Approved ideas become Build Queue candidates only.
- Parked and Rejected ideas stay out of the active Build Queue.
- No approved idea executes automatically.
- Customer-facing projection math and dashboard behavior are unchanged.

## Owner Build Queue
- Owner-only section: `Approved Build Queue`
- Firestore collection: `owner_build_queue`
- Approved queue records include:
  - agent
  - source
  - finding
  - recommendation
  - priority
  - status: `Queued`
  - phaseCandidate
  - createdAt
  - updatedAt
  - ownerDecision: `Approved`
  - executionAllowed: `false`

## Suggested Phase Logic
- High priority -> `Next Phase`
- Medium priority -> `Soon`
- Low priority -> `Later`

## Daily Intelligence Report
- Daily Intelligence Report remains read-only.
- Report content does not enter the Build Queue until the owner approves a finding.

## Save State Sync
- Sidebar visible save state: `Bastion Save State 2.22`
- Header/topbar visible save state: `Bastion Save State 2.22`
- File-based save state: `Bastion Save State 2.22`

## Latest Known Phase
- Phase 2.22 - Owner Intelligence Bridge

## Next Phase
- Select from owner-approved Build Queue candidates.
