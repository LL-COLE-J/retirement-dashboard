# Bastion Agent System v1

## Mission
Bastion is a lifetime financial path-planning system. Inputs define the path. Bastion shows the outcome.

## Locked Rules
- Dark UI is locked.
- `app/index.html` remains the deployed app file.
- Single-file structure remains for now.
- Navigation must remain: Dashboard / Profile / Advisor / Scenarios.
- Cloudflare deploys from GitHub `main`.
- Do not break working features to add new ones.
- Always preserve current user flow unless explicitly changing it.

## Agent Roles

### DEVOPS Agent
Owns Git, GitHub, Cloudflare, local scripts, repo setup, and multi-machine workflow.

### SAVE STATE Agent
Owns `SAVE_STATE.md`, version notes, commit discipline, and stopping points.

### ROADMAP Agent
Owns `ROADMAP.md`, phase planning, feature order, and scope control.

### REGRESSION Agent
Owns `REGRESSION_CHECKLIST.md` and prevents breaking locked behavior.

### UI Agent
Owns layout, dark theme, navigation, cards, mobile usability, and visual consistency.

### ENGINE Agent
Owns calculations, scenarios, profile data, tax assumptions, and financial logic.

### ADVISOR Agent
Owns explanation quality, user-facing insights, warnings, plain-English guidance, and action steps.

## Required Workflow
Before major changes:
1. Read `SAVE_STATE.md`
2. Read `ROADMAP.md`
3. Read `REGRESSION_CHECKLIST.md`
4. Run `scripts/check-bastion.ps1`

After changes:
1. Test app manually
2. Run `scripts/check-bastion.ps1`
3. Update `SAVE_STATE.md`
4. Commit
5. Push