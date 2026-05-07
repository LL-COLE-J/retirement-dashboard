# BASTION ROADMAP (v4 — EXPANDED)

---

## CORE PRINCIPLES

- Single-file first (app/index.html)
- Decision > data
- One screen > multiple flows
- Fast iteration > perfect modeling

Every feature must answer:
- Am I okay?
- What happens if I change X?
- Is this safe?

---

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

## Upcoming Math Repair Subphases
- 2.39f — Scenario Delta Repair: keep scenarios cloned from baseline assumptions and show differences only.
- 2.39g — Dashboard/Timeline/Advisor Sync: verify output views read the same validated engine results.

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

2.39e — Canonical Baseline complete; next phase is 2.39f — Scenario Delta Repair
