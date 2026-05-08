# App Shell Normalization — Phase 2.39j

## 1. Current shell structure before 2.39j
- `index.html` at the repository root contained the visible Bastion app shell, Save State text, route mounting, owner-mode bootstrapping, and script references into `app/core/*` and `app/views/*`.
- `app/index.html` was a redirect-only file pointing users back to `../index.html`.
- `firebase.json` defined Firestore rules only and did not define Firebase Hosting, a hosting `public` directory, rewrites, or an alternate deployed shell path.
- The validation workflow and governance docs still contained older assumptions that `app/index.html` was required, which made the redirect-only shell look more authoritative than it was.

## 2. Repo references found
- Root `index.html` is referenced by Linux and PowerShell validation as the Save State source and inline-script syntax target.
- Root `index.html` loads app modules from `app/core/*` and `app/views/*`.
- `app/index.html` was referenced by the GitHub validation workflow and governance docs as a required structure artifact.
- `ROADMAP.md`, `SAVE_STATE.md`, and the visible Save State text referenced the prior 2.39i phase and needed a text-only phase sync.
- No repo-owned router, Firebase Hosting config, or module import was found that requires `app/index.html` to contain the full app shell.

## 3. Deployment assumptions found
- `firebase.json` has no Hosting configuration, so no Firebase Hosting entry path is declared in this repo.
- `.github/workflows/bastion-check.yml` is a validation-only workflow on `main`; it checks repo structure and does not deploy.
- Existing governance says Cloudflare deploys from GitHub `main`, but no Cloudflare build file in this repo declares an app subdirectory as the deploy root.
- Because external Cloudflare settings are not visible in the repo, preserving `app/index.html` as a compatibility redirect is safer than deleting it.

## 4. Chosen canonical shell path
- Canonical app shell path: `index.html` at the repository root.
- Root `index.html` remains the public app entry for current repo-visible behavior.
- Validation should treat root `index.html` as authoritative for Save State alignment, inline JavaScript syntax checks, route shell checks, and public entry behavior.

## 5. `app/index.html` decision
- Decision: replaced with a clearly documented lightweight compatibility redirect.
- Reason: repo evidence shows root `index.html` is the real app shell, but external deployment settings are not fully visible, and the existing workflow/governance previously expected an `app/index.html` file.
- Compatibility behavior: requests that land on `app/index.html` are redirected back to `../index.html`, preserving query strings and hash fragments through the JavaScript fallback.
- `app/index.html` must not become a second full app shell unless a future owner-approved deployment-entry phase explicitly changes the canonical path.

## 6. Risk assessment
- Product behavior risk: low. The visible app shell remains root `index.html`, and `app/index.html` continues to redirect to it.
- Deployment risk: low-to-medium because Cloudflare dashboard settings are external to the repo. Retaining the compatibility redirect reduces this risk.
- Routing risk: low. No app routes were changed.
- UI risk: low. Visible UI changes are limited to Save State phase text.
- Calculation risk: none intended. No formulas or engine calculations were changed.
- Security/auth/config risk: low. No Firebase rules, auth behavior, environment variables, or deployment targets were changed.

## 7. Rollback plan
- If routing or deployment entry behavior breaks, restore the previous redirect-only `app/index.html` from git history or revert the 2.39j commit.
- If an external deploy setting unexpectedly requires `app/index.html` to be the full shell, perform a separate owner-approved deployment-entry phase with a documented rollback path before moving the full shell.
- Keep root `index.html` as the known-good shell until a deployment audit confirms a different public entry path.

## 8. Future cleanup notes
- Before deleting `app/index.html`, confirm Cloudflare Pages project settings, custom domains, preview URLs, and any downstream links do not target `/app/`.
- Keep validation aligned with the canonical shell decision so future checks do not require a deleted file or mistake a compatibility redirect for the app shell.
- Beta UX Stabilization should preserve this shell structure unless a later owner-approved deployment phase changes it.

## 9. Validation results
- `git diff --check`: passed during 2.39j validation.
- `bash scripts/check-bastion.sh`: passed during 2.39j validation.
- `node --check app/views/*.js`: passed during 2.39j validation.
- `node --check app/core/*.js`: passed during 2.39j validation.
- Inline root `index.html` JavaScript syntax check: passed during 2.39j validation.
- `app/index.html` syntax/compatibility check: passed during 2.39j validation.
- Conflict-remnant scan: passed during 2.39j validation.
- Secret-pattern scan and proactive secret-leak probe: passed for changed code and documentation; no private credentials, service-account files, deployment credentials, environment files, or private user data were added.
- `rg` verification of `index.html` references: completed during 2.39j audit and validation.
