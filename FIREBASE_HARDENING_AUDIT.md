# Phase 2.39i — Firebase Rules + Environment Hardening Audit

## 1. Current Firebase posture

Bastion currently keeps Firebase configuration in the browser-facing app shell so the owner-only Firestore helpers can initialize Firebase when `owner=true` is active. The checked-in Firebase project mapping is a single default project, and `firebase.json` points Firestore at `firestore.rules` only.

Current posture summary:

- Firebase browser config is public-facing in `index.html` by design for client SDK initialization.
- Firestore is the only Firebase product configured in `firebase.json`.
- `.firebaserc` points to one default project and does not define aliases for staging or production separation.
- The GitHub workflow is validation-only and does not deploy, write to Firebase, or use service-account credentials.
- Firestore owner collections are currently marked as temporary owner-development rules and are not beta-ready while they allow unauthenticated reads/writes.
- No service-account JSON, private key, token, `.env`, or deployment credential file should be committed.

## 2. Public vs private config clarification

Firebase web app config values such as `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, and `appId` are not equivalent to private service-account credentials when used as intended by the Firebase browser SDK. They may remain visible in browser-delivered code if the project is protected by proper Firebase Security Rules, authorized domains, API-key restrictions where practical, and least-privilege deployment credentials.

Acceptable public client config:

- Firebase web API key used only as a project identifier for the browser SDK.
- Firebase project ID, auth domain, storage bucket, sender ID, and app ID.
- Non-secret deploy target names and project aliases.

True secret exposure risks:

- Firebase service-account JSON.
- Private keys or private-key IDs.
- OAuth client secrets.
- GitHub, Firebase, Cloudflare, npm, or other deployment tokens.
- `.env` files or environment-specific credential files.
- Passwords or privileged access gates that are expected to remain secret while shipped in client-side code.
- Private user financial data, reports, or beta-user records.

## 3. Firestore rule review

`firestore.rules` defaults all unmatched documents to deny. That default-deny fallback is good.

The current risk is the temporary owner-development exception pattern:

- `owner_reports/{docId}` permits read and write if true.
- `owner_build_queue/{docId}` permits read and write if true.
- `owner_feedback/{docId}` permits read and write if true.
- `owner_intelligence/{docId}` permits read and write if true.

Impact:

- These rules are not beta-ready.
- Any user who can reach the Firebase project can read or write those owner collections while the rules remain permissive.
- Client-side `owner=true` isolation does not protect Firestore data by itself because Security Rules are the enforcement boundary.

Low-risk hardening decision for this phase:

- No rule behavior was changed because the phase is an audit/hardening documentation pass and the owner tooling may currently depend on the temporary development access.
- The temporary rules should be treated as a beta blocker before broader users, auth expansion, or enterprise testing.

Recommended future rule direction:

- Require Firebase Auth before any owner collection access.
- Restrict owner collection read/write to explicit owner/admin claims or a server-mediated function.
- Separate owner-only reports from public or tester-visible data.
- Add tests for allow/deny paths before any production rule tightening.

## 4. GitHub workflow review

The current workflow checks required repository structure on pushes to `main`. It does not deploy and does not reference repository secrets.

Hardening applied in this phase:

- The workflow now declares read-only `contents` permission, matching its validation-only behavior.

Remaining gaps:

- The workflow does not yet run the full Linux Bastion validation script.
- The workflow does not yet run secret-pattern scanning itself outside `scripts/check-bastion.sh`.
- There is no staging workflow or protected production deployment workflow in this repo.

Recommended future workflow direction:

- Add a non-deploying PR check that runs `bash scripts/check-bastion.sh`.
- Keep deploy permissions out of validation-only workflows.
- Use GitHub Environments for any future staging/production deployment gates.
- Prefer OpenID Connect or narrowly scoped deploy credentials over long-lived service-account keys where the platform supports it.

## 5. Deployment/config review

Files reviewed:

- `firebase.json`
- `firestore.rules`
- `.firebaserc`
- `.github/workflows/bastion-check.yml`
- `index.html` Firebase config usage
- `scripts/check-bastion.sh`
- `scripts/check-bastion.ps1`
- `AGENTS.md`
- `SAVE_STATE.md`
- `ROADMAP.md`

Findings:

- `firebase.json` is minimal and points only to Firestore rules.
- `.firebaserc` has a single default project and no staging alias.
- Browser Firebase config exists in `index.html` and should be treated as public client config, not as a service-account secret.
- Client-side privileged gates must not be treated as strong security boundaries.
- No service-account file was found in the reviewed Firebase/deployment configuration.

## 6. Environment separation readiness

Current readiness is limited:

- One Firebase default project is configured.
- No staging alias is defined.
- No environment-specific config loading convention exists.
- No documented promotion path exists from staging to production.

Recommended future environment model:

- `staging` Firebase project for beta validation and destructive tests.
- `production` Firebase project for live users.
- Separate GitHub Environments for staging and production.
- Explicit approval gate for production deployments.
- Clear rollback path for Firebase rules and app deployment.
- Environment-specific documentation that distinguishes public client config from private deploy credentials.

## 7. Least-privilege review

Current strengths:

- GitHub workflow is validation-only.
- No deploy credential is referenced by the workflow.
- Firestore has a default-deny catch-all.
- Protected infrastructure files are governed by AGENTS.md.

Current gaps:

- Owner Firestore collections use temporary permissive allow rules.
- Owner dashboard isolation is primarily client-side until Firebase Auth/claims or server mediation is added.
- Environment separation is not yet defined.
- Service-account handling rules are documented generally, but Firebase-specific handling needed an explicit phase audit note.

Least-privilege recommendations:

- Keep validation workflows read-only.
- Give deploy workflows only the permissions required for the target environment.
- Do not grant write access to Firebase from PR validation jobs.
- Avoid broad wildcard Firestore allow rules.
- Require owner/admin identity for owner collections.
- Keep future service accounts scoped to the smallest deploy surface possible.

## 8. Future staging/production guidance

Before beta users:

1. Create a staging Firebase project.
2. Add `.firebaserc` aliases for staging and production in a scoped infrastructure phase.
3. Add staging rules tests before changing production rules.
4. Define a production rule rollback procedure.
5. Move owner-only access behind Firebase Auth, custom claims, or trusted server mediation.
6. Confirm authorized domains and API-key restrictions are appropriate for the browser client.
7. Run Linux validation and secret-pattern scanning before every merge.

## 9. Future secret-management guidance

Never commit:

- Service-account JSON.
- Private keys.
- OAuth client secrets.
- Deployment tokens.
- Personal access tokens.
- `.env` files.
- Exported user data.
- Private financial reports.

Recommended handling:

- Store deploy credentials only in GitHub Environments or the deployment platform secret store.
- Prefer short-lived or federated credentials where available.
- Rotate any credential that may have been exposed.
- Keep public Firebase browser config documented as public and protect data with Security Rules.
- Treat any client-shipped password or privileged gate as non-secret and unsuitable for true access control.

## 10. Beta-readiness concerns

Beta blockers or near-blockers:

- Temporary Firestore owner rules allow unauthenticated read/write on owner collections.
- Owner-only behavior depends on browser-side routing/gating rather than enforceable Firebase identity.
- No staging Firebase environment is configured.
- No rules test harness exists yet.
- No production rollback runbook exists for Firebase rule changes.

Non-blocking but important:

- Public Firebase browser config is acceptable only if rules and auth boundaries are correct.
- Validation workflow should eventually run the full Bastion Linux check.
- Documentation should keep distinguishing public identifiers from true secrets.

## 11. Recommended future hardening phases

1. **2.39i-follow-up — Firestore Rules Test Harness**
   - Add emulator-based or rules-unit tests for owner collections.
   - Keep production rule behavior unchanged until tests prove the deny/allow paths.

2. **2.39k — Firebase Auth Boundary Design**
   - Define owner/admin identity requirements.
   - Decide between custom claims, server mediation, or an owner-only admin app boundary.

3. **2.39l — Staging/Production Separation Plan**
   - Add project aliases and GitHub Environment guidance.
   - Document promotion and rollback steps.

4. **2.39m — Production Rule Tightening**
   - Replace temporary `if true` owner rules with authenticated owner-only access.
   - Run tests and rollback drills before production promotion.

5. **2.39n — Deployment Credential Least-Privilege Review**
   - Add documented deploy-token scope requirements before any automated deploy workflow is introduced.

## Rollback guidance

This phase is documentation and validation-hardening only. Rollback is low risk:

- Revert the commit that adds this audit and governance text if it blocks workflow unexpectedly.
- Revert the workflow permission declaration only if GitHub validation unexpectedly fails.
- No Firebase rule behavior, app route, auth behavior, calculation, or deployment target was changed in this phase.
