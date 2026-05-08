# PR Safety Checklist

Purpose: keep Bastion pull requests small, auditable, and safe before broader Git/GitHub agent usage expands.

## Required PR Summary Fields

Every PR summary must include:

- What changed
- What did not change
- Files changed
- UI impact
- Calculation impact
- Security/auth/config impact
- Secret-leak probe result
- Validation commands run
- Rollback plan
- Save State alignment
- Agent self-deviation check

## Protected Infrastructure Files

Changes to these files require explicit scope, a documented reason, and owner approval when they affect security, deployment, routing, calculations, or app behavior:

- `AGENTS.md`
- `SAVE_STATE.md`
- `ROADMAP.md`
- `REGRESSION_CHECKLIST.md`
- `MATH_AUDIT.md`
- `scripts/check-bastion.sh`
- `scripts/check-bastion.ps1`
- `scripts/save-state.ps1`
- `firebase.json`
- `firestore.rules`
- `.firebaserc`
- `.github/workflows/*`
- `index.html`
- `app/index.html`
- `app/core/*`
- `app/views/*`
- `app/styles.css`
- `styles.css`

## Sensitive Changes Requiring Owner Approval

Owner approval is required before changing:

- auth behavior
- Firebase rules
- API keys or configuration
- deployment configuration
- GitHub Actions/workflows
- environment variables
- secrets handling
- financial formulas
- tax/RMD/compliance logic
- routing architecture
- destructive file deletion
- broad refactors
- UI redesign phases

## Agent Self-Deviation Check

Before a PR is considered ready, the agent must answer:

- Did I touch only allowed files?
- Did I avoid broad refactors?
- Did I avoid auth/security/deployment changes unless explicitly requested?
- Did I avoid financial formula changes unless explicitly requested?
- Did I avoid UI redesign unless explicitly requested?
- Did I preserve routes?
- Did I preserve visible behavior unless explicitly requested?
- Did I run required validation?
- Did I update Save State/ROADMAP only when required?
- Did I avoid exposing or repeating secrets?

Any answer that is not clearly yes must be explained in the PR summary and treated as a potential blocker until owner-reviewed.

## Secret-Leak Probe Requirement

Every phase must proactively probe newly added or changed code/configuration for possible secret leakage or sensitive exposure before commit. The probe must include:

- `bash scripts/check-bastion.sh`
- targeted review of newly added text for keys, tokens, private keys, credentials, environment values, private user data, or sensitive configuration
- a direct PR summary statement of the result

If suspected exposure is found, halt and follow the Secret Exposure Protocol in `AGENTS.md`.

## Future Agent-Deviation Validation Notes

Future 2.39h follow-up validation should test whether repo checks catch these issues without committing intentional breakage to the main work branch:

- unauthorized broad file edits
- stale Save State / ROADMAP drift
- broken inline JavaScript
- conflict-remnant text
- fake secret patterns
- unauthorized route/view mutations
- unauthorized deployment/config mutations in:
  - `firebase.json`
  - `firestore.rules`
  - `.github/workflows/*`
  - `.firebaserc`

Do not intentionally commit fake secrets or broken files. Destructive/deviation simulation must happen later only in a safe branch or dedicated test harness.

## Rollback Plan Template

- Revert the PR commit if governance text creates confusion or blocks valid workflow.
- Re-run `bash scripts/check-bastion.sh` after rollback.
- Confirm `SAVE_STATE.md`, `ROADMAP.md`, and visible Save State alignment after rollback.
