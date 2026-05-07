# Bastion Save State 2.39b — Security + Linux Validation Guardrails

Current status:
- Phase 2.39b completed the security and Linux validation guardrail lock after the prior source-of-truth cleanup.
- AGENTS.md now defines explicit secret exposure, destructive action, live permission, Linux validation, and deployment freeze rules.
- `scripts/check-bastion.sh` is now the Codex/GitHub/Linux validation path; PowerShell validation remains the local Windows path.
- Product behavior, calculations, routes, extracted view structure, and UI layout were intentionally not changed.

Patch completed:
- Added Linux validation parity with required-file checks, whitespace validation, conflict-remnant scanning, JavaScript syntax checks, inline `index.html` script checks, and secret-pattern scanning.
- Standardized validation language around Linux/Codex and Windows/PowerShell validation paths in project governance docs.
- Strengthened security guardrails so suspected secret exposure halts work and blocks commit/push recommendations until owner remediation.
- Strengthened rollback/destructive-action guardrails so destructive work requires a scoped plan, rollback path, and explicit owner approval.

Validation status:
- UI_AGENT review: passed for text-only Save State/UI phase copy updates with no layout redesign.
- REGRESSION_AGENT review: passed for guardrail-only scope via diff check, Linux validation, source scans, and JavaScript syntax checks.
- Save State alignment: `SAVE_STATE.md` and `index.html` agree on Bastion Save State 2.39b.
- Next phase remains 2.39c — Math Audit.
