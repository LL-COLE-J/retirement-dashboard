# Bastion Math Audit — Phase 2.39c

## 1. Phase summary

Phase 2.39c is a non-destructive inventory of Bastion's current financial math. It identifies where calculations live today, which calculations are view-owned, where formulas or derived metrics are duplicated, and how the current math should map to future canonical owners.

Scope outcome:
- Product behavior changed: no.
- Formula changes made: no.
- Route changes made: no.
- Refactors or logic moves made: no.
- Owner dashboard priority: explicitly out of scope except for noting visible text and owner-only intelligence helpers.
- Next intended phase: 2.39d Numeric Guardrails.

Audit basis:
- Inspected `index.html` as the current inline engine and application coordinator.
- Inspected extracted view files under `app/views/`.
- No separate canonical engine/core/helper module was found in the current file inventory.

## 2. Financial logic inventory

### Current calculation host summary

| Area | Current location | Current role | Risk |
| --- | --- | --- | --- |
| Input parsing and numeric coercion | `index.html` helpers `num`, `safeNum`, `safeFieldNum`, `clamp`, `val` | Converts form values into numeric inputs and caps some scenario controls. | HIGH |
| Spend mode conversion | `index.html` `annualSpendValue`, `setMode`, projection spend branches | Converts monthly and annual spend entries. | HIGH |
| Return profile assumptions | `index.html` `returnRate` | Maps conservative, moderate, and growth selections to hard-coded annual return rates. | HIGH |
| Inflation assumptions | `index.html` `inflationRate`, `inflatedAmount`, projection fixed-income inflation branch | Inflates spending and optionally fixed income. | HIGH |
| Income timing | `index.html` `grossIncomeAtAge`, `currentGrossIncome`, `project` structured income loops | Determines earned income availability by age and additional stream income. | HIGH |
| Tax estimate | `index.html` `TAX_CODES`, `estimateBracketTax`, `estimateFederalTax`, `estimateStateTax`, `estimateLocalTax`, `taxSummaryForIncome` | Simplified federal, state, and local tax estimates. | CRITICAL |
| Projection engine | `index.html` `project` | Builds net worth path across ages, applies income, taxes, spend, events, debts, fixed income, returns, and scenario overlays. | CRITICAL |
| Event math | `index.html` `eventSign`, `eventAnnualImpact`, `eventApplies`, `eventImpactNow`, projection event branches | Converts life events and structured life-event rows into annual cash-flow impacts. | HIGH |
| Run-out detection | `index.html` `firstRunoutAge` | Finds first age where projected assets are non-positive. | CRITICAL |
| Decision metrics | `index.html` `calculateDecisionMetricsFromState`, `renderDecisionCore` | Classifies SAFE, RISK, or FAIL and chooses drivers and next-step text. | CRITICAL |
| Dashboard metrics | `index.html` `commit` | Computes displayed net worth, surplus, score, status, and dispatches render updates. | HIGH |
| Scenario comparison | `index.html` `renderScenarioComparison`, scenario overlay inside `project`, inputs in `app/views/scenarios.js` | Compares baseline and scenario ending path and active causes. | HIGH |
| Timeline derived math | `index.html` `renderTimeline`, `renderTimelineAdvisorInsights` | Builds event ages, risk ages, care-cost placeholder, marker positions, and summary impacts. | MEDIUM |
| Tax/RMD strategy | `index.html` `rmdDivisor`, `renderTaxRmdStrategy`; display shell in `app/views/tax-rmd.js` | Estimates account splits, lifetime taxes, optimization placeholder, RMD schedule, and RMD tax. | CRITICAL |
| Advisor output | `index.html` `renderAdvisor`, `renderDecisionReport`, `renderBastionPhase29`; view shell in `app/views/advisor.js` and `app/views/reports.js` | Turns model outputs and selected thresholds into recommendations, risk text, and reports. | CRITICAL |
| Profile field defaults | `app/views/dashboard.js`, `app/views/profile.js` | Duplicates user input defaults and option labels used by current math. | MEDIUM |
| Owner intelligence heuristics | `index.html` owner helper functions | Owner-only checks of phase, queue priority, and UI presence. Financial math impact is indirect. | LOW |

### Existing engine/core/helper files

No dedicated `app/engine`, `app/core`, or financial helper module was present in the current source file list. Current calculation ownership remains concentrated in `index.html`, even though view shells have been extracted into `app/views/`.

## 3. View-owned math findings

The following calculations currently happen inside render or view-adjacent functions instead of a canonical engine layer:

1. `renderDecisionCore` calculates monthly gap, target-life status, driver scores, risk thresholds, baseline-vs-current deltas, and next-step recommendation text. This is a CRITICAL view-owned math finding because it directly affects user-facing decision classification and recommendations.
2. `renderTaxRmdStrategy` calculates assumed taxable, traditional, and Roth account splits, lifetime taxes, optimization amount, RMD schedule values, estimated RMD tax, and tax strategy text. This is CRITICAL because it touches tax/RMD compliance-sensitive output and recommendations.
3. `renderTimeline` calculates long-term-care placeholder amount, scenario risk age, legacy age, event marker positions, and retirement spend shift. This is MEDIUM because most outputs are explanatory or visual, but retirement and scenario markers can shape user interpretation.
4. `renderTimelineAdvisorInsights` produces timeline advice from derived retirement-age and scenario-risk metrics. This is MEDIUM because it is recommendation-adjacent but currently depends on timeline display inputs.
5. `renderAdvisor` derives primary risk driver and next action using retirement spend, taxes, debt, and event-path delta. This is CRITICAL because it can advise users what to do next.
6. `renderScenarioComparison` calculates scenario ending-path delta and selects a primary cause for the comparison. This is HIGH because it explains plan differences.
7. `renderDecisionReport` does not calculate complex metrics directly, but it publishes decision outputs and assumptions into a report. It is MEDIUM by itself and CRITICAL through its dependency on decision math.
8. `commit` is a coordinator but also calculates starting net worth, gross surplus, captured surplus, score, and status. This is HIGH because it mixes orchestration, display updates, and supporting derived metrics.

## 4. Duplicated or potentially duplicated math findings

1. **Tax summaries are computed in multiple ways.** `taxSummaryForIncome` is canonical-ish today, but `calculateDecisionMetricsFromState` separately recomputes federal, state, local, gross surplus, capture rate, and monthly gap for state snapshots. Risk: CRITICAL because decision classification can drift from dashboard tax results.
2. **Monthly or annual spend conversion appears in multiple places.** `annualSpendValue`, projection spend conversion, `setMode`, and decision snapshot logic all independently branch on `mode`. Risk: HIGH because spend mode drift can alter projection and surplus outputs.
3. **Captured surplus appears in more than one place.** `commit` calculates gross and captured surplus from current inputs; `calculateDecisionMetricsFromState` duplicates similar logic for baseline/current comparison. Risk: HIGH because baseline drift can change SAFE/RISK/FAIL messaging.
4. **Run-out and status thresholds are partly duplicated.** `calculateDecisionMetricsFromState` and `renderDecisionCore` both classify status using run-out age, path minimum, and monthly gap, but they use slightly different labels and threshold details. Risk: CRITICAL because user-facing classification can disagree.
5. **Scenario stress controls are read in multiple places.** `project` applies scenario stress; `renderTimeline` independently reads scenario stress controls to decide risk markers; `renderScenarioComparison` reads projected causes from `project`. Risk: HIGH because timeline and projection can drift.
6. **Event impact has parallel paths.** Standard events use `eventAnnualImpact`; structured life-event rows inside `project` use a local sign rule. Risk: HIGH because Scenarios and Profile-derived event rows can treat event types differently.
7. **Income streams are split between simple inputs and structured rows.** `grossIncomeAtAge` reads main income fields or projection state, while `project` additionally loops household and custom income streams. Risk: HIGH because income may be double-counted or omitted depending on source.
8. **Tax/RMD account split assumptions are embedded in a view-owned function.** `renderTaxRmdStrategy` uses 60/20/20 percentages directly instead of a canonical account-allocation model. Risk: CRITICAL because RMD and tax strategy output depends on hidden assumptions.
9. **Long-term care assumptions appear in multiple forms.** `project` uses a hard-coded annual LTC drag when the toggle is active; `renderTimeline` separately computes an LTC placeholder as a percentage of retirement spend with a floor. Risk: HIGH because projection and timeline risk may communicate different amounts.
10. **Decision next-step and advisor next-action logic overlap.** `renderDecisionCore` and `renderAdvisor` both select next actions from related but separate branches. Risk: CRITICAL because advice can diverge across Dashboard and Advisor.

## 5. Scenario drift risks

Scenario handling is currently distributed across UI inputs, projection overlays, timeline overlays, scenario comparison, and report text.

Key risks:
- Baseline and scenario both call `project`, but `project(false)` disables normal events and scenario stress while `project(true)` enables both normal events and scenario stress. That means the displayed baseline comparison may be a no-events baseline rather than a cloned baseline with only Scenario B deltas separated. Risk: HIGH.
- Scenario retirement changes subtract Income 1 during a specific age window inside `project`, but base income timing remains controlled by `grossIncomeAtAge` and the source state. Risk: HIGH.
- Survivor scenario removes Income 2 and adds back 25% of retirement spend in `project`; pass-away event logic elsewhere reduces spending by 25%. These are related but separate assumptions. Risk: HIGH.
- Market crash stress applies once at `start + 1`; timeline scenario risk appears at a later derived risk age. Risk: MEDIUM to HIGH because visual timing can differ from modeled timing.
- Scenario tax increase subtracts a percentage of gross income from annual cash flow instead of flowing through tax functions. Risk: CRITICAL because tax stress may not match tax module behavior.
- Medical/LTC scenario can be one-time or annual in projection, while timeline only shows a generic higher-risk window. Risk: MEDIUM.
- Scenario cause tracking is string-based inside `project`, with the first cause treated as primary by `renderScenarioComparison`. Risk: MEDIUM.

## 6. Tax/RMD calculation ownership findings

Current tax/RMD ownership is split between `index.html` engine-ish helpers and `renderTaxRmdStrategy`, which is view-owned.

Findings:
- Federal tax brackets and standard deductions are hard-coded under `TAX_CODES.FEDERAL_2025_SIMPLE`. Risk: CRITICAL because tax law changes can make outputs stale.
- State tax estimates use a small set of no-tax, flat-rate, and rough-progressive placeholders. Risk: CRITICAL because state/local estimates influence planning outputs but are not complete tax models.
- Local tax uses county and city rate fields directly as a percent of income. Risk: MEDIUM to HIGH depending on jurisdiction.
- RMD divisor table is hard-coded for ages 73 through 90, then falls back to a formula. Risk: CRITICAL because RMD rules are compliance-sensitive and should be versioned.
- Tax-deferred, Roth, and taxable balances are assumed as 60%, 20%, and 20% of invested assets. Risk: CRITICAL because RMD projections and withdrawal-order recommendations can be materially wrong for many users.
- Lifetime tax estimate is current yearly tax multiplied by years to age 95. Risk: HIGH because it does not model changing income, withdrawals, RMDs, deductions, or brackets over time.
- Optimization estimate is a flat 8% reduction from lifetime taxes. Risk: CRITICAL because it presents strategy value from a placeholder formula.
- RMD schedule estimates tax on RMD income alone through `taxSummaryForIncome(rmd)`, rather than adding RMDs to other taxable income. Risk: CRITICAL.

Future owner recommendation: move all tax/RMD assumptions to a versioned TAX_AGENT/RMD_AGENT module with visible assumptions, law version labels, and guardrails before expanding tax advice.

## 7. Advisor-output calculation findings

Advisor and report outputs currently depend on calculations in multiple functions:

- `renderDecisionCore` determines SAFE/RISK/FAIL, confidence, biggest risk, monthly gap, next step, baseline statement, trend, and decision report state.
- `renderAdvisor` independently picks a primary risk driver and next action from retirement spend vs income, debt, or general tax/inflation drag.
- `renderTimelineAdvisorInsights` independently recommends actions based on retirement age, Scenario B timing, and risk count.
- `renderTaxRmdStrategy` independently recommends tax/RMD next moves.
- `renderBastionPhase29` adds an older phase summary and recommendation card from current projection outputs.

Risk findings:
- Dashboard, Advisor, Timeline, Tax/RMD, and Reports can state related recommendations from separate logic branches. Risk: CRITICAL.
- Advisor action thresholds are simplified and not tied to the same risk ranking used by the Decision Core. Risk: CRITICAL.
- Report output inherits decision and tax text but does not snapshot all assumptions required to reproduce the result. Risk: HIGH.
- Some recommendation text implies strategic or tax benefits from placeholder math. Risk: CRITICAL.

Future owner recommendation: DECISION_AGENT should own the single decision classification and primary next step; ADVISOR_AGENT should translate canonical results into plain English without recalculating financial meaning; TAX_AGENT/RMD_AGENT should own tax-specific recommendations.

## 8. Future canonical ownership map

| Current math area | Future canonical owner | Supporting agents/modules | Notes |
| --- | --- | --- | --- |
| Input normalization and numeric validation | Profile/Input Guardrails | BEHAVIOR_AGENT, REGRESSION_AGENT | 2.39d should add numeric guardrails before any formula repair. |
| Baseline projection path | Engine | INCOME_AGENT, WITHDRAWAL_AGENT, INFLATION_AGENT | One canonical projection result should feed Dashboard, Timeline, Advisor, Reports, and Scenarios. |
| Income timing and retirement phase changes | INCOME_AGENT | TIMING_AGENT | Keep simple income, partner income, streams, SS, pension, and retirement ages distinct. |
| Spending, withdrawal pressure, and surplus capture | WITHDRAWAL_AGENT | DECISION_AGENT, OUTCOME_AGENT | Make monthly/annual conversion and capture rate single-source. |
| Inflation and returns | INFLATION_AGENT / Engine assumptions | STRESS_AGENT | Return profiles should be named assumptions with documented rates. |
| Tax estimates | TAX_AGENT | PLANNING_RULES_AGENT | Version tax assumptions and separate estimates from display. |
| RMD schedule and withdrawal-order tax impact | RMD_AGENT | TAX_AGENT, COMPLIANCE_ARCHITECT_AGENT | Compliance-sensitive rules need versioning and disclaimers. |
| Scenario cloning and scenario deltas | SCENARIO_AGENT | COMPARISON_AGENT, DRIFT_AGENT | Scenario B should clone baseline and report deltas only. |
| Life events | EVENT_AGENT | IMPACT_AGENT, TIMELINE_AGENT | Event definitions should have one sign and timing model. |
| Decision classification | DECISION_AGENT | RISK_AGENT, OUTCOME_AGENT | Single SAFE/RISK/FAIL owner. |
| Advisor explanation | ADVISOR_AGENT | INSIGHT_AGENT, STRATEGY_AGENT | Advisor should explain canonical outputs, not recalculate them. |
| Timeline display | TIMELINE_AGENT | IMPACT_AGENT | Timeline may derive positions, but financial meaning should come from engine/event outputs. |
| Reports | REPORTS/Advisor output layer | ADVISOR_AGENT, TAX_AGENT | Reports should snapshot canonical inputs, assumptions, outputs, and generated time. |
| Owner intelligence | Owner-only intelligence layer | MARKET_AGENT, ANALYTICS_AGENT, REGRESSION_AGENT | Must remain isolated behind `owner=true`. |

## 9. Risk classification scale

- LOW: Display-only or cosmetic derived values.
- MEDIUM: Supporting derived metrics.
- HIGH: Affects planning outcomes.
- CRITICAL: Affects compliance, recommendations, or financial decision outputs.

### Current risk classifications

| Finding | Level | Reason |
| --- | --- | --- |
| Money formatting and signed display helpers | LOW | Cosmetic unless sign formatting is misunderstood. |
| Timeline marker position math | LOW to MEDIUM | Mostly layout, but age placement can affect comprehension. |
| Timeline LTC placeholder amount | MEDIUM | Supporting risk display, not direct projection output. |
| Profile default duplication | MEDIUM | Defaults influence first-run calculations and can drift across views. |
| Scenario cause text | MEDIUM | Explanation quality risk; lower direct numeric impact. |
| Spend mode conversion duplication | HIGH | Can alter planning outcomes if monthly/annual handling diverges. |
| Income timing split across simple and structured inputs | HIGH | Can change projected cash flows materially. |
| Event sign and duration handling split across event systems | HIGH | Can change projected path and scenario outcomes. |
| Projection path and net worth roll-forward | CRITICAL | Core planning outcome. |
| Tax estimate functions | CRITICAL | Tax-sensitive planning output and recommendations. |
| RMD divisor and schedule | CRITICAL | Compliance-sensitive output. |
| Decision SAFE/RISK/FAIL classification | CRITICAL | Primary user decision output. |
| Advisor next-action logic | CRITICAL | Recommendation output. |
| Tax optimization placeholder | CRITICAL | Strategy recommendation value could be mistaken for precision. |

## 10. Recommended next phase actions for 2.39d Numeric Guardrails

Recommended scope for 2.39d:

1. Add guardrails only; do not repair formulas yet.
2. Define safe numeric ranges for high-risk inputs: ages, retirement ages, income, spending, assets, debt, tax rates, capture rate, inflation, scenario shock amounts, market crash percent, and tax increase percent.
3. Centralize input parsing around existing helpers before deeper refactors, but avoid moving projection logic in 2.39d unless explicitly approved.
4. Add warnings or safe clamps for impossible values, especially negative ages, retirement ages before current age, tax rates over reasonable caps, capture rate over 100%, and scenario controls outside allowed ranges.
5. Add validation coverage for the current highest-risk calculations:
   - monthly versus annual spend conversion,
   - captured surplus calculation,
   - first run-out age detection,
   - basic tax summary totals,
   - RMD divisor fallback behavior,
   - scenario stress clamps.
6. Keep Dashboard output-only: guardrails should prevent bad input propagation without moving input ownership into Dashboard.
7. Keep Tax/RMD outputs clearly labeled as simplified estimates until TAX_AGENT and RMD_AGENT modules are canonicalized.
8. Preserve all existing behavior unless a guardrail is explicitly intended to prevent invalid or unsafe values.
9. Re-run the Linux validation path after each small guardrail patch.

Acceptance target for 2.39d:
- Numeric guardrails are visible or testable.
- No formulas are silently changed.
- Existing user flow is preserved.
- Save State, ROADMAP, and visible phase text are aligned to 2.39d when the phase completes.
