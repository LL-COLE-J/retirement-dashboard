# BASTION ROADMAP (v4 — EXPANDED)

---

## CORE PRINCIPLES

- Single-file first (canonical shell: root `index.html`)
- Decision > data
- One screen > multiple flows
- Fast iteration > perfect modeling

Every feature must answer:
- Am I okay?
- What happens if I change X?
- Is this safe?

---

## Platform Vision & Architecture (LOCKED IN 2.43)

### Mission

Bastion is a lifetime financial intelligence platform: **Full life planning. One intelligent system.**

Bastion is a modular planning ecosystem and institutional-grade decision platform. It is not a retirement calculator, budgeting app, or short-term fintech widget.

### Core philosophy

- Any occasion
- Any age
- Any path

### Planning and intelligence domains

Bastion models planning, tax, retirement, estate, healthcare, insurance, risk, compliance, forecasting, scenarios, and enterprise oversight across every stage of life.

### Official platform architecture

**Primary**
- Dashboard
- Plan
- Scenarios
- Advisor

**Planning**
- Retirement
- Tax
- Healthcare
- Estate
- Insurance
- Cash Flow

**Intelligence**
- Risk
- Forecasting
- Monte Carlo
- Alerts
- Optimization

**Operations**
- Reports
- Documents
- Notes
- Client Portal

**Enterprise**
- Teams
- Governance
- Audit
- Permissions

### Visual philosophy

Bastion's approved visual direction is cinematic institutional, premium enterprise fintech, deep navy, muted gold, off-white, glass/soft shadows where appropriate, elegant serif headlines, clean operational typography, high-end dashboard framing, cinematic hero imagery, and premium spacing/rhythm.

The approved Beacon Keep tower identity is the primary Bastion visual direction. All future imagery must be premium, cinematic, enterprise-grade, production-quality, and consistent with the Beacon Keep tower system. Placeholder illustrations, flat generic vectors, stock-feeling graphics, low-detail icons, temporary imagery, and random inconsistent SVGs are prohibited.

### Surface hierarchy

1. Public marketing surfaces: dark cinematic premium presentation.
2. Operational application surfaces: refined light institutional workspace.
3. Enterprise/admin surfaces: hybrid executive dark/light dashboards.
4. Reports: ultra-clean print-grade layouts.

### Progressive disclosure strategy

Bastion should show the decision first, scenario comparison second, assumptions third, and technical/compliance/reporting depth last. Complexity should appear only when it helps the user understand risk, tradeoffs, or action.

### Long-term ecosystem goals

- Preserve one intelligent planning system instead of disconnected calculators.
- Expand modular planning domains through scoped engine-owned phases.
- Keep critical financial logic auditable and separated from views.
- Preserve Profile input ownership, Dashboard output-only intent, Scenario reversibility, and Owner isolation.
- Support advisor-grade reporting, enterprise governance, audit trails, teams, permissions, and client-portal workflows without compromising consumer clarity.

### Locked brand language

- “Plan today. Protect tomorrow.”
- “Financial clarity for every stage of life.”
- “One plan. Any path.”
- “See the path before you walk it.”
- “Full life planning. One intelligent system.”


# PHASE 2 — CORE DECISION SYSTEM (CURRENT)

Goal:
Deliver a 1-screen financial decision experience

---


## 2.12 — Timeline Layer (DONE)
- Age-based timeline
- Key events (retirement, run-out, life events)

## 2.13 — Impact Layer (DONE)
- Color-coded financial events
- Income vs expense clarity

## 2.14 — Scenario Layer (DONE)
- Scenario A vs B overlay
- Visual retirement shift

## 2.15 — Advisor Insights (DONE)
- Basic insight generation
- Plain-English risk flags

## 2.16 — Recommendation Engine (IN PROGRESS)
- Insights → actions
- Delay retirement
- Reduce spending
- Build buffer

---

## 2.17 — DECISION CORE (PRIORITY)

Add:
- Am I Okay (Safe / Tight / At Risk)
- Run-out age (large, dominant)
- Biggest Risk (ONLY ONE)
- Monthly Gap

NEW:
- Retirement Reality status (On Track / At Risk)
- “If nothing changes…” baseline statement

---

## 2.18 — SCENARIO CONTROL

Add:
- Retirement age slider
- Spending slider
- Income drop toggle
- Stress Test button

NEW:
- Instant delta view (what changed vs baseline)
- One-click scenario presets

---

## 2.19 — ADVISOR DEFENSE

Add:
- Evaluate Advice input
- Output:
  - Reasonable
  - Risky
  - Concerning
- 2–3 bullet explanation
- 1 safer alternative

NEW:
- Second Opinion engine (compare vs baseline)

---

## 2.20 — OUTCOME ENGINE

Add:
- Retirement Reality summary
- Years money lasts
- Top 1–2 drivers
- Clear verdict

NEW:
- Biggest Risk callout (single dominant issue)
- Outcome-first phrasing (years lost, not %)

---

## 2.21 — INPUT SANITY CHECK

- Detect unrealistic inputs
- Flag:
  - Low expenses
  - High returns
  - Aggressive assumptions

NEW:
- Peer comparison hint

---

## 2.22 — CONFIDENCE SCORE

- Low / Medium / High
- Based on:
  - completeness
  - realism

NEW:
- Assumption transparency panel

---

## 2.36 — Modularization Foundation (DONE)
- Began separating view code into dedicated modules while preserving the single deployed app shell.
- Kept existing user flow, dark UI, routes, and calculations intact during extraction work.
- Preserved Dashboard/Profile/Advisor/Scenarios/Timeline navigation while preparing for safer future maintenance.

---

## 2.37 — Router + State Stability Lock (DONE)
- Stabilized routing around one `showView()` path and one active view at a time.
- Locked Profile-owned input persistence and Dashboard output propagation through the existing state path.
- Preserved Owner Dashboard isolation behind `owner=true`.

---

## 2.38 — Work-Branch Safety Lock (DONE)
- Confirmed Codex work can proceed on a clean active sandbox branch without requiring the local branch name to be `main`.
- Reinforced stop conditions for dirty worktrees, conflicts, detached uncertainty, and unclear source-of-truth.
- Kept phase work small, verifiable, and safe to validate before commit.

---

## 2.39a — AGENTS Operating Constitution (DONE)
- Added the permanent Bastion operating constitution to `AGENTS.md`.
- Locked safer Codex execution rules around small scoped patches, validation, auditability, financial safety, privacy, and live-agent restrictions.
- Updated visible Save State copy to 2.39a without changing app behavior or UI layout.

## 2.39b — Security + Linux Validation Guardrails (DONE)
- Strengthened `AGENTS.md` with secret exposure, destructive action, live permission, Linux validation, and deployment freeze guardrails.
- Added `scripts/check-bastion.sh` as the Codex/GitHub/Linux validation path while preserving PowerShell as the Windows local path.
- Standardized validation language across Save State and roadmap docs without changing product behavior, calculations, routes, or UI layout.

---

## 2.39c — Math Audit (DONE)
- Added `MATH_AUDIT.md` as a non-destructive inventory of current financial calculations, duplicated derived metrics, view-owned math, scenario drift risks, Tax/RMD ownership findings, Advisor-output calculation findings, future canonical owners, risk classifications, and 2.39d guardrail recommendations.
- Updated visible Save State text to 2.39c without changing product behavior, formulas, routes, or UI layout.

## 2.39d — Numeric Guardrails (DONE)
- Added `app/core/number-guards.js` as a lightweight pre-canonicalization numeric guardrail layer.
- Wrapped targeted high-risk display outputs for safe finite numbers, divide-by-zero protection, clamps, currency formatting, and percentage formatting.
- Documented that guardrails are display-safety only and do not intentionally rewrite formulas or create the canonical engine.
- Updated visible Save State text to 2.39d without redesigning the UI, changing routes, or rebuilding owner dashboard behavior.

## 2.39e — Canonical Baseline (DONE)
- Added `app/core/bastion-engine.js` as the first lightweight canonical baseline calculation layer.
- Established canonical ownership for simple low-risk calculations: rate normalization, monthly/annual conversion, savings rate, monthly gap, net worth, debt-to-asset ratio, withdrawal rate, and scenario delta.
- Routed only simple duplicated calculations through `window.BastionEngine` while preserving current visible behavior and avoiding full engine extraction.
- Left complex tax, RMD, Monte Carlo, Social Security, Advisor classification, and projection logic non-canonical for future scoped phases.
- Updated visible Save State text to 2.39e without redesigning the UI, changing routes, or rebuilding owner dashboard behavior.

## 2.39f — Scenario Delta Repair (DONE)
- Routed safe/simple Scenario A/B ending-path, Advisor impact, Decision Core years, and Timeline retirement-age deltas through the canonical scenario delta helper backed by `BastionEngine.calculateScenarioDelta()`.
- Normalized Scenario Comparison signed currency deltas, guarded percent deltas, divide-by-zero fallback, and positive/negative/neutral direction labels.
- Reduced monthly/annual mismatch in Decision Core spending-delta explanations by annualizing current and saved baseline spend values before comparison.
- Preserved the existing scenario engine, tax/RMD logic, Monte Carlo placeholders, Social Security placeholders, routes, and dark UI.
- Updated visible Save State text to 2.39f without redesigning the UI, changing routes, or rebuilding owner dashboard behavior.


## 2.39g — Dashboard/Timeline/Advisor Sync (DONE)
- Routed run-out age detection through `BastionEngine.firstRunoutAge()` so shared output views use one safe fallback.
- Added shared signed currency and signed percentage formatting helpers for Dashboard, Timeline, Advisor, Scenario, and baseline-change display labels.
- Normalized Scenario Comparison percent labels, Advisor impact summaries, Advisor intelligence savings-rate display, and baseline-change delta signs without changing core formulas.
- Clarified spending display mode in the plan setup summary so monthly vs annual input mode is not mislabeled.
- Preserved existing routes, calculations, scenario stress behavior, owner isolation, and dark UI.
- Updated visible Save State text to 2.39g without redesigning the UI, changing routes, or rebuilding owner dashboard behavior.

## 2.39h — PR Safety Checklist / Agent Deviation Test (DONE)
- Added `PR_SAFETY_CHECKLIST.md` to standardize PR summary fields, protected infrastructure file review, owner-approval triggers, rollback planning, and agent self-deviation checks.
- Updated `AGENTS.md` with protected infrastructure files, sensitive-change owner approval requirements, required PR summary fields, a proactive secret-leak probe requirement, and future agent-deviation validation notes.
- Documented that future deviation simulations must happen only in a safe branch or dedicated test harness and must not intentionally commit fake secrets or broken files.
- Updated visible Save State text to 2.39h without changing product behavior, formulas, routes, Firebase/security config, or UI layout.

## 2.39i — Firebase Rules + Environment Hardening Audit (DONE)
- Added `FIREBASE_HARDENING_AUDIT.md` to document current Firebase posture, public-vs-private config expectations, Firestore rule risk, GitHub workflow posture, deployment/config handling, environment separation readiness, least-privilege gaps, future staging/production guidance, future secret-management guidance, beta-readiness concerns, recommended hardening phases, and rollback guidance.
- Updated `AGENTS.md` with Firebase/environment hardening governance that distinguishes acceptable public Firebase browser config from true secret exposure and warns that client-side owner gates are not security boundaries.
- Added validation warnings for temporary Firestore `allow read, write: if true` rules and tracked environment-file checks in Linux and PowerShell validation.
- Added read-only contents permission to the validation-only GitHub workflow.
- Updated visible Save State text to 2.39i without changing product behavior, formulas, routes, auth behavior, Firebase rule behavior, deployment targets, owner dashboard behavior, or UI layout.

## 2.39j — App Shell Normalization (DONE)
- Added `APP_SHELL_NORMALIZATION.md` to document the pre-2.39j shell structure, repo references, deployment assumptions, canonical shell path, compatibility redirect decision, risk assessment, rollback plan, future cleanup notes, and validation results.
- Documented root `index.html` as the canonical app shell and retained `app/index.html` as a lightweight compatibility redirect because external Cloudflare settings are not visible in the repo.
- Updated Linux, PowerShell, and GitHub validation checks so future phases validate the canonical root shell and compatibility redirect without treating the redirect as the full app shell.
- Updated visible Save State text to 2.39j without changing product behavior, formulas, routes, auth behavior, Firebase rule behavior, deployment targets, owner dashboard behavior, or UI layout.


## 2.40 — Beta UX Stabilization (ACTIVE / IN PROGRESS)
- Began controlled light-theme normalization across authenticated app surfaces while preserving the dark sidebar, routes, calculations, governance systems, and app shell assumptions.
- Improved Dashboard readability and trust clarity through calmer advisor-grade cards, clearer Decision Core copy, consistent buttons/fields/summaries, and mobile spacing polish.
- No intentional governance, auth, route, deployment, Firebase, owner-dashboard, or engine rewrites occurred.
- Future UX refinement direction: onboarding, deeper profile refinement, trusted beta preparation, advisor-grade reporting polish, fallback/empty-state clarity, navigation clarity, dashboard readability, expanded profile data model, financial intelligence engine, and mobile refinement.

### 2.40a — Profile Input Stabilization (DONE)
- Stabilized Profile as Bastion's clear input center while keeping Dashboard output-only.
- Reorganized existing Profile inputs into Household, Income, Expenses, Assets, Debts, Retirement, Tax Profile, Special Accounts, Scenario Assumptions, and Life Events sections.
- Clarified labels, helper text, units, placeholder states, and future-model boundaries without changing calculations, routes, storage behavior, scenario logic, Firebase/auth/deployment config, or engine behavior.
- Added `PROFILE_INPUT_MODEL_NOTES.md` to document current Profile stabilization goals and future household, income, expense, asset/debt/equity, tax-profile, retirement-flexibility, and confidence/missing-input requirements.
- Updated visible Save State text to 2.40a and set the next phase to 2.40b — Profile UX Cohesion.


### 2.40b — Profile UX Cohesion (DONE)
- Improved Profile visual cohesion with a calmer advisor-grade light-theme intake treatment while preserving the dark sidebar and existing app flow.
- Normalized Profile spacing, card hierarchy, section summaries, field containers, helper-text readability, input alignment, and mobile stacking.
- Clarified annual vs monthly expectations in Profile review copy and special-account helper presentation without changing calculations or storage behavior.
- Preserved routes, formulas, auth/Firebase/deployment configuration, governance systems, owner isolation, Dashboard output-only behavior, and Profile input ownership.
- Updated visible Save State text to 2.40b and set the next phase to 2.40c — Dashboard Readability.


### 2.40c — Dashboard Readability (DONE)
- Improved Dashboard hierarchy with a clearer executive-summary flow and advisor-grade Decision Core presentation.
- Normalized Dashboard KPI/readout cards, recommendation presentation, helper text hierarchy, chart framing, spacing, and mobile stacking.
- Introduced restrained Dashboard trust/readiness indicators and controlled Shield+B branding integration while avoiding flashy fintech styling.
- Preserved Dashboard output-only behavior, Profile input ownership, routes, IDs, commit behavior, formulas, engines, scenarios, auth/Firebase/deployment configuration, governance warnings, and owner isolation.
- Updated visible Save State text to 2.40c and preserved future navigation clarity / trusted beta preparation as separate scoped work.


### 2.40d — Brand Token Lock (DONE)
- Normalized Bastion brand CSS tokens for navy, royal blue, slate, muted gold, sage green, off-white, text, borders, shadows, and surfaces.
- Added reusable brand utility classes for Shield+B and compact marks, wordmark lockups, trust chips, status badges, buttons, card hierarchy, branded surface cards, and report surfaces.
- Applied the brand system lightly to sidebar, header, Dashboard summary/readout surfaces, advisor drawer context, and report-style UI elements without over-applying logos.
- Preserved 2.40c Dashboard readability improvements, Profile as canonical intake/input owner, Dashboard as output-only owner, routes, input IDs, formulas, engines, scenarios, auth/Firebase/deployment configuration, governance warnings, owner isolation, and commit behavior.
- Updated visible Save State text to 2.40d and preserved future navigation clarity, beta preparation, onboarding, expanded profile model, security hardening, and financial intelligence work as future phases.


### 2.40e — Navigation & Menu Completion Audit (DONE)
- Audited visible navigation and view surfaces as a surgical readability pass only.
- Added subtle UI status labels/helper copy so unfinished areas are clearly framed and not misleading.
- Confirmed Dashboard remains output-only and Profile remains the canonical intake/input owner.
- Confirmed Profile is structurally stabilized but not feature-complete; expanded household, income, asset, debt, tax, special-account, onboarding, trusted beta, security, report generation, and financial intelligence work remain future scoped phases.
- Preserved 2.40c Dashboard readability, 2.40d brand token system, governance warnings, routes, input IDs, formulas, engines, auth/Firebase/deployment configuration, owner isolation, and commit behavior.
- Updated visible Save State text to 2.40e and preserved future navigation, trusted beta, onboarding, expanded profile model, security, report generation, and financial intelligence work as separate scoped phases.

#### 2.40e Menu / View Completion Matrix
| Menu item / view | Status | Owner | Current boundary | Future refinement path |
| --- | --- | --- | --- | --- |
| Dashboard | Active | DECISION_AGENT / OUTCOME_AGENT / UI_AGENT | Output-only Moment of Truth, Decision Output, metrics, charts, and compact advisor readout from Profile-owned inputs. | Keep decision-first hierarchy; add deeper intelligence only through engine-owned phases without adding Dashboard input ownership. |
| Profile | Partial | ONBOARDING_AGENT / INCOME_AGENT / TAX_AGENT / UI_AGENT | Canonical intake/input owner with structurally stabilized household, income, expense, asset, debt, retirement, tax, special-account, scenario-assumption, and life-event boundaries. | Expand household compositions, income streams, asset/debt/equity splits, tax profile depth, confidence/missing-input states, and onboarding in scoped future phases. |
| Advisor | MVP | ADVISOR_AGENT / INSIGHT_AGENT | Plain-English interpretation of current model outputs and compact drawer context. | Add second-opinion workflow, deeper recommendation logic, report-friendly advisor narrative, and confidence framing without overstating certainty. |
| Scenarios | MVP | SCENARIO_AGENT / STRESS_AGENT / EVENT_AGENT | Scenario overlays and stress-test framing compare alternatives without mutating baseline assumptions. | Add event presets, trusted beta scenario paths, timeline refinement, and richer tradeoff explanations as separate scoped phases. |
| Timeline | MVP | TIMELINE_AGENT / IMPACT_AGENT | Readable life-path markers using current Profile inputs and Scenario B comparison. | Refine label collision handling, richer overlays, legacy/healthcare markers, and mobile readability without moving calculations into the view. |
| Tax & RMD | Future Phase | TAX_AGENT / RMD_AGENT / PLANNING_RULES_AGENT | Educational and placeholder-level withdrawal/tax/RMD clarity surface; not CPA-level guidance. | Add versioned tax/RMD rules, state/local depth, account-type split, compliance review, and rule verification before beta reliance. |
| Reports | Future Phase | INSIGHT_AGENT / ENTERPRISE_AGENT / UI_AGENT | Snapshot/report surface for current outputs only. | Add export, advisor delivery, report generation, narrative packaging, and audit trail in separate report-generation phases. |
| Owner Dashboard (`owner=true`) | Active | Owner / REGRESSION_AGENT / DEVOPS_AGENT | Isolated owner-only governance/queue dashboard behind `owner=true`; not part of consumer menu unless owner mode is active. | Keep isolated while future trusted beta, validation, security, and deployment governance mature. |


### 2.40f — Logo Asset Integration (DONE)
- Replaced temporary/placeholder shield branding with reusable production-ready Bastion SVG logo assets as a surgical brand-asset pass only.
- Added actual reusable assets for the Primary Shield+B mark, Compact B mark, Full horizontal lockup, and Monochrome/report variant.
- Applied logo variants by surface: full horizontal lockup on the public landing surface, compact/Shield+B marks in the sidebar and header, a restrained small Shield+B mark in the Dashboard executive summary, formal monochrome branding in Reports, and a tiny compact mark in the Advisor drawer.
- Preserved the 2.40d brand token system by routing logo sizing and placement through existing brand utility classes where practical.
- Preserved Dashboard output-only behavior, Profile input ownership, routes, IDs, commit behavior, formulas, engines, scenarios, auth/Firebase/deployment configuration, governance warnings, owner isolation, and existing user flow.
- Updated visible Save State text to 2.40f and kept the beta access/security gate as a future required phase.


### 2.40g — Brand Asset Pack & Personal Site Integration (DONE)
- Completed a surgical visual-identity pass for the regular Bastion Personal site/app only.
- Added production brand assets under `app/assets/brand/`: Primary Shield+B mark, Minimal compact B mark, Tower marketing mark, Full horizontal Bastion Insight lockup, Tower accent lockup, and Monochrome/report variant.
- Applied logo variants strategically: full lockup on public landing, Tower as a premium marketing/hero accent only, Shield+B in app/sidebar/Dashboard summary contexts, compact B for header/advisor/mobile/favicon contexts, and monochrome branding for Reports.
- Refined brand CSS utilities and landing/report polish to better match the advisor-grade navy / royal blue / sage green / muted gold / slate / off-white direction while preserving 2.40c Dashboard readability and the 2.40d brand token system.
- Preserved Dashboard output-only behavior, Profile input ownership, routes, IDs, commit behavior, formulas, engines, scenarios, auth/Firebase/Firestore/deployment configuration, governance warnings, owner isolation, Enterprise as future baseline only, and existing user flow.
- Updated visible Save State text to 2.40g and preserved the beta access/security gate as a future required phase.



### 2.41 — Visual Consolidation + Brand Integration (DONE)
- Consolidated Bastion's approved tower identity across the public landing surface, app sidebar/header, reports, compact favicon/app icon, and future enterprise-ready lockup asset without creating a new brand direction.
- Standardized the premium navy / gold / white visual system, card radius, shadows, typography hierarchy, button treatment, status chips, KPI cards, chart styling, section spacing, sidebar spacing, top navigation spacing, and mobile stacking.
- Refined Dashboard/report/scenario/Tax-RMD visual surfaces toward an institutional executive-briefing feel while keeping Dashboard output-only and Profile input ownership intact.
- Added visual-only future-direction cards for home/relocation comparisons, equity unlock, lifestyle scoring, and report/export consistency without adding engines, formulas, routes, or data ownership changes.
- Preserved routes, IDs, commit behavior, formulas, engines, scenarios, auth/Firebase/Firestore/deployment configuration, governance warnings, owner isolation, Enterprise as future baseline only, and existing user flow.
- Updated visible Save State text to 2.41 and preserved beta access/security gate, healthcare modeling, relocation modeling, report export, RMD/tax rule-versioning, and financial intelligence as separate future phases.



### 2.41b — Canonical Brand Asset Adoption (DONE)
- Adopted the approved canonical SVG brand system from `assets/brand/` without changing calculations, Profile ownership, routing, mobile behavior, auth/Firebase/deployment configuration, or owner isolation.
- Added the approved asset set: `bastion-tower.svg`, `bastion-tower-lockup.svg`, `bastion-shield-b.svg`, `bastion-b-mark.svg`, `bastion-report-mark.svg`, `favicon.svg`, and `brand-tokens.css`.
- Imported canonical brand tokens globally and updated favicon, landing, app operational surfaces, compact mobile/header/drawer marks, Dashboard executive mark, and Reports branding to use canonical asset paths.
- Normalized brand usage only: public landing uses the tower lockup, app operational surfaces use Shield+B, mobile/compact surfaces use the B mark, reports use the report mark, and favicon uses the canonical favicon.
- Updated visible Save State text to 2.41b and preserved future mobile navigation architecture work as a separate scoped phase.


### 2.41d — Public Landing Restoration + Cinematic Tower Hero (DONE)
- Restored the public visitor entry as a cinematic, tower-led Bastion landing page instead of an internal app/dashboard-looking surface.
- Used `assets/brand/bastion-tower-lockup.svg` for public header branding and `assets/brand/bastion-tower.svg` as the advisor-grade hero accent.
- Added deep navy hero treatment, gold beacon/star accent, premium platform copy, Request Beta Access and See How It Works CTAs, and an advisor-grade preview card.
- Kept internal dashboard controls out of the public landing page, including the internal Save State card, mode controls, Generate Report, Advisor Drawer, and Save Baseline controls.
- Preserved app/dashboard route behavior, Profile input ownership, Dashboard output-only behavior, formulas, owner isolation, auth/Firebase/Firestore configuration, deployment configuration, and canonical brand assets.
- Updated visible Save State text to 2.41d while leaving broader onboarding, beta access plumbing, formula expansion, and route architecture as separate scoped phases.

### 2.42 — Mobile Navigation + Guided Flow System (DONE)
- Added a compact mobile brand bar, thumb-friendly bottom mobile navigation, and a lighter mobile Save State strip while preserving desktop navigation and all existing routes.
- Refined mobile page structure around executive summary first, key recommendation second, and progressively expandable details afterward.
- Added sticky Dashboard context anchors for Overview, Risks, Strategy, and Details to preserve orientation on long phone pages.
- Added expandable detail panels for Dashboard supporting charts, RMD education/schedule, Tax/RMD stress comparison, scenario detail layers, and compact advisor explanations.
- Improved mobile KPI/card spacing, chart height, table overflow behavior, and touch readability without changing formulas, engines, scenarios, routes, auth, Firebase, Firestore rules, deployment logic, input IDs, governance warnings, or commit behavior.
- Preserved future onboarding, SEO pages, healthcare expansion, relocation engine, RMD optimization, reports, enterprise, financial intelligence, advanced integrations, beta access, and security gating as separate scoped phases.
- Updated visible Save State text to 2.42 and kept Bastion's 2.40c readability system, 2.40d brand token system, and tower-led identity direction intact.

### 2.43 — Bastion Platform Identity Lock (DONE)
- Locked Bastion's platform positioning as “Full life planning. One intelligent system.”
- Documented Bastion as a lifetime financial intelligence platform, modular planning ecosystem, and institutional-grade decision platform rather than a retirement calculator.
- Added permanent platform architecture documentation covering Primary, Planning, Intelligence, Operations, and Enterprise hierarchy.
- Added canonical visual system documentation for the Beacon Keep tower identity, cinematic institutional visual language, image-quality standards, dashboard framing, spacing rhythm, navigation hierarchy, and mobile direction.
- Updated visible Save State text to 2.43 while preserving routes, calculations, engine behavior, Profile input ownership, Dashboard output-only intent, owner isolation, auth/Firebase/Firestore configuration, deployment configuration, and app shell assumptions.

### 2.44 — Canonical Visual Asset Wiring (DONE)
- Wired the locally added canonical Beacon Keep premium PNG assets from `assets/brand/` into the live UI without changing formulas, calculations, engines, auth/Firebase/Firestore behavior, routing architecture, Profile ownership, Dashboard ownership, or deployment configuration.
- Updated the public landing to use `beacon-keep-primary.PNG` for the landing brand surface and `hero-tower-cinematic.png` as the above-the-fold cinematic tower visual while preserving deep navy, muted-gold CTA styling, prominent Request Beta Access CTA, and full-life platform language.
- Updated operational app identity surfaces to use `beacon-keep-shield.png` and `beacon-keep-bmark.png` in sidebar, mobile, header, Dashboard, Advisor drawer, and report-style contexts without introducing large cinematic imagery into the workspace.
- Updated visible Save State text to 2.44 and preserved current routes, calculations, app shell assumptions, owner isolation, and light operational app readability.

## Upcoming Governance and Stabilization Subphases
- Beta Access & Security Gate remains a future required phase after the 2.42 mobile guidance/readability lock.
- Future navigation clarity: keep Dashboard / Profile / Advisor / Scenarios / Timeline flow stable while reducing beta-user friction.
- Future navigation audit: validate menu clarity and route/view expectations without changing Dashboard/Profile ownership.
- Future onboarding and public beta/contact form: prepare trusted beta access, contact capture, fallback/empty-state clarity, validation, and governance hardening as separate phases.
- Future expanded profile data model: add household, income, expense, asset, debt, tax, special accounts, healthcare, relocation, and confidence modeling only through scoped engine-owned phases.
- Future report generation: add export, advisor delivery, narrative packaging, and audit trail only in a dedicated reporting phase.
- Future RMD, tax strategy, and financial intelligence: expand versioned planning logic, recommendations, and explanations without moving calculations into views.
- Future Firebase hardening: add Firestore rules tests, Firebase Auth boundary design, staging/production separation, production rule tightening, and deployment credential least-privilege review as separate scoped phases.

---

# PHASE 3 — INTELLIGENCE LAYER

Goal:
Make Bastion feel smart and human-aware

---

## 3.1 — Risk Detection Engine
- Identify weakest point
- Surface biggest vulnerability
- Detect financial cliffs

---

## 3.2 — Strategy Agent
- Suggest better scenarios
- Suggest small impactful changes

NEW:
- Micro-adjustments
- “Try this next” buttons

---

## 3.3 — Stress Testing
- Inflation spike
- Market downturn
- Income loss

NEW:
- Failure mode visualization
- Sequence of returns risk (simplified)

---

## 3.4 — Decision Timing Signals
- When to retire
- When to convert Roth
- When to draw down

---

## 3.5 — Top Drivers Engine
- Show only 2–3 key factors

---

## 3.6 — Drift Detection
- Detect plan degradation
- Alert user

NEW:
- Financial momentum (improving / declining)

---

## 3.7 — Blind Spot Detection
- Missing:
  - insurance
  - tax strategy
  - estate planning

---

## 3.8 — Behavioral Layer

NEW:
- Detect unrealistic expectations
- Detect risk-taking bias
- Behavior-based warnings

---

## 3.9 — Stress Timeline

NEW:
- Highlight high-pressure life periods
- Show tight financial windows

---

## 3.10 — Time Intelligence

NEW:
- Time cost of decisions (“costs X years”)
- Opportunity windows

---

# PHASE 4 — FINANCIAL DEPTH

Goal:
Improve accuracy without complexity

---

## 4.1 — Withdrawal Strategy Basics
- Fixed %
- Simple comparison

---

## 4.2 — Tax Impact Layer
- Federal brackets (simple)
- Output: tax drag (years lost)

---

## 4.3 — Social Security
- Early vs delayed impact

---

## 4.4 — RMD Engine
- Timeline impact

---

## 4.5 — Multi-Income Households
- Dual income
- Staggered retirement

NEW:
- Survivor scenario

---

## 4.6 — Healthcare + LTC Modeling

NEW:
- Long-term care risk
- Healthcare shock scenarios

---

## 4.7 — Inflation Sensitivity

NEW:
- Adjustable inflation scenarios
- Longevity impact

---

# PHASE 5 — PRODUCTIZATION

Goal:
Make Bastion usable and monetizable

---

## 5.1 — Save / Load Profiles
- Local storage

---

## 5.2 — Guided Onboarding
- Income
- Spending
- Savings
- Goal

---

## 5.3 — Scenario History

---

## 5.4 — Share / Export

---

## 5.5 — Mobile Optimization
- 1-screen experience

---

## 5.6 — Paywall

Free:
- baseline result
- Am I okay

Paid:
- scenarios
- recommendations
- advisor defense

---

## 5.7 — Aha Moment Engine

NEW:
- Highlight surprising insights
- Trigger realization moments

---

## 5.8 — Narrative Flow UI

NEW:
- Guided story:
  - Where you stand
  - What breaks your plan
  - What to do

---

# PHASE 6 — DIFFERENTIATION

Goal:
Create moat

---

## 6.1 — Advisor Comparison Engine
- Upload plan
- Compare outcomes

---

## 6.2 — Financial GPS Loop
- Weekly check-in
- Drift alerts
- Trajectory updates

---

## 6.3 — Life Event Engine

NEW:
- Event chains
- Cascading impact

---

## 6.4 — Tradeoff Engine

NEW:
- Job vs time
- Spend vs save

---

## 6.5 — “Should I Do This?” Mode
- Evaluate real-life decisions

---

## 6.6 — Future Self Engine

NEW:
- Future-based insights
- Emotional framing

---

## 6.7 — Enterprise (Later)

---

# PRODUCT STRUCTURE

1. Engine  
2. Timeline  
3. Impact  
4. Scenario  
5. Advisor  
6. Strategy  
7. Behavior  

---

# CURRENT FOCUS

2.45 — Premium UI Reconstruction complete; next required phases remain scoped onboarding, SEO pages, healthcare expansion, relocation engine, RMD optimization, reports, enterprise, financial intelligence, advanced integrations, beta access, security gating, and future navigation architecture without changing current formulas/routes/auth/Firebase/deployment behavior
