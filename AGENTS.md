# BASTION AGENT SYSTEM (v1)

---

## Locked Rules

- Dark UI is locked.
- `app/index.html` remains the deployed app file.
- Single-file structure remains for now.
- Navigation must remain: Dashboard / Profile / Advisor / Scenarios / Timeline.
- Cloudflare deploys from GitHub `main`.
- Do not break working features to add new ones.
- Always preserve current user flow unless explicitly changing it.
- Every roadmap phase must update the visible UI phase card using `phaseNumber` and `phaseDesc`.
- No phase is complete unless the visible Save State reflects the current phase/status.
- Run `scripts/check-bastion.ps1` before finishing every phase.

---

## CORE SYSTEM AGENTS (ACTIVE)

### DECISION_AGENT

Owns:
- “Am I okay?” result
- Run-out age clarity
- Biggest risk prioritization
- Safe / Risk / Fail classification

Rules:
- Always reduce to a clear decision
- Max 1–2 risks shown
- Must be understood in 10 seconds
- Must explain the user’s outcome in plain English

---

### IMPACT_AGENT

Owns:
- Financial meaning of events
- Income vs expense visualization
- Risk labeling

Rules:
- Green = positive
- Red = risk
- Blue = phase change
- Always explain why an event matters

---

### SCENARIO_AGENT

Owns:
- Scenario A vs B comparison
- Timeline shifting
- Outcome differences

Rules:
- Keep comparison simple
- No clutter
- Highlight differences only
- Do not alter baseline logic unless instructed

---

### ADVISOR_AGENT

Owns:
- Plain-English financial interpretation
- User-facing advisor readout
- Actionable insight from model output

Rules:
- Explain what the result means
- Avoid jargon unless necessary
- Give clear next-step guidance
- Do not overstate certainty

---

### TIMELINE_AGENT

Owns:
- Life-event path mapping
- Scenario timeline overlays
- Retirement, risk, and legacy markers

Rules:
- Timeline must remain readable
- Labels must not overlap when avoidable
- Scenario A and Scenario B must stay visually distinct

---

### UI_AGENT

Mandatory phase review agent.

Runs during every Bastion phase before completion.

Owns:
- Visual regression review
- Layout clarity
- Card spacing
- Text wrapping
- Mobile and desktop readability
- Sidebar/header Save State visibility

Responsibilities:
- Review all visible UI affected by the phase.
- Check dashboard, profile, advisor, scenarios, timeline, sidebar, and header.
- Identify overlapping text, broken spacing, clipped cards, unreadable labels, bad mobile wrapping, and visual regressions.
- Confirm Save State is visible and synced in sidebar and header.
- Confirm new features fit the existing dark UI language.
- Prefer CSS/layout fixes over logic changes.
- Never change formulas, calculations, state structure, or financial logic unless explicitly instructed.

Required every phase:
1. Review affected files before final summary.
2. Scan `app/index.html` for layout risks.
3. Check whether new UI creates overflow, overlap, or cramped cards.
4. Fix obvious visual regressions.
5. Run `scripts/check-bastion.ps1`.
6. Report UI_AGENT result in the phase summary.

Phase summary must include:
- UI_AGENT: Passed / Fixed issues / Issues remaining

Rules:
- Preserve current dark UI.
- Do not redesign unless asked.
- Do not change formulas.
- Fix layout issues with minimal CSS or markup changes.
- No phase is complete without UI_AGENT review.

---

### ANALYTICS_AGENT

Owns:
- User behavior tracking
- Click patterns
- Engagement flow
- Drop-off points

Tracks:
- First click
- Most used sections
- Ignored sections
- Time spent per area
- Repeated clicks
- Feature abandonment
- Decision Core engagement
- Timeline engagement
- Advisor drawer usage

Outputs:
- “Users click X first”
- “Users ignore Y”
- “Drop-off at Z”
- “High engagement in X”
- “Low confidence around Y”

Rules:
- Use real behavior only when tracking data exists.
- When no data exists, clearly label findings as hypothesis.
- Do NOT change UI directly.
- Feed findings to UI_AGENT, DECISION_AGENT, and MARKET_AGENT.
- Do not collect sensitive financial input values without explicit privacy review.
- Track behavior patterns, not private financial details.

Purpose:
- Tell us what users actually do.
- Help Bastion improve based on real engagement, not guesses.

---

### MARKET_AGENT

Owns:
- Competitor UX patterns
- User expectation alignment
- Market positioning
- Button/CTA pattern review
- Feature expectation scanning

Analyzes:
- Layout patterns
- CTA placement
- Interaction flow
- Feature emphasis
- Dashboard hierarchy
- Onboarding flow
- Pricing/upgrade prompts
- Trust signals
- What competitors make easy
- What competitors make confusing

Outputs:
- “Users expect X”
- “Competitors emphasize Y”
- “Competitors hide Z”
- “Opportunity: Z”
- “Bastion advantage: X”
- “Possible upgrade: X”

Rules:
- Do NOT copy UI.
- Extract patterns only.
- Never override Bastion UI.
- Must not introduce features that conflict with Decision Core simplicity.
- Must coordinate with UI_AGENT before suggesting visual changes.
- Must coordinate with DECISION_AGENT before suggesting feature changes.
- Must focus on user expectations, not trend chasing.
- Competitor ideas must be translated into Bastion-specific improvements.

Purpose:
- Keep Bastion aligned with market expectations.
- Help Bastion stay ahead of what users want.
- Identify practical upgrades from competitor and market patterns.

---

### REGRESSION_AGENT

Owns:
- System stability
- Preventing broken features
- Phase acceptance checks

Checks:
- Dashboard renders
- Profile renders
- Advisor renders
- Scenarios render
- Timeline renders
- Decision Core visible
- Save State synced
- `scripts/check-bastion.ps1` passes

Rules:
- Never break working features
- Prefer minimal changes
- Report issues before moving forward

---

## INTELLIGENCE LAYER AGENTS

### OUTCOME_AGENT

Owns:
- Translation of numbers into meaning
- “Years lost”
- “Money runs out at X”
- User-friendly result framing

Rules:
- No raw numbers without meaning
- Always explain impact
- Output must be understandable quickly

---

### STRATEGY_AGENT

Owns:
- Suggested improvements
- Scenario ideas
- Small impactful changes

Rules:
- Suggest simple actions
- No complex plans unless requested
- Focus on high-impact changes

---

### RISK_AGENT

Owns:
- Detect weakest point
- Identify failure points
- Rank major risks

Rules:
- Prioritize the biggest risk first
- Avoid overwhelming the user
- Tie risk to actual model output

---

### DRIFT_AGENT

Owns:
- Detect plan degradation
- Alert user when off track
- Identify negative trend movement

Rules:
- Compare against baseline when available
- Flag deterioration clearly
- Avoid false alarms

---

### BEHAVIOR_AGENT

Owns:
- Detect unrealistic inputs
- Identify user bias
- Flag over-optimistic assumptions

Rules:
- Be practical and calm
- Never shame the user
- Explain why an assumption may be risky

---

### BLINDSPOT_AGENT

Owns:
- Missing planning areas
- Insurance gaps
- Tax gaps
- Estate gaps
- Healthcare gaps

Rules:
- Identify what is missing
- Do not invent data
- Ask for missing inputs only when necessary

---

### TIMING_AGENT

Owns:
- When to act
- Optimal timing signals
- Retirement timing consequences

Rules:
- Explain timing impact clearly
- Compare early vs delayed choices
- Avoid overprecision

---

### STRESS_AGENT

Owns:
- Stress testing scenarios
- Failure visualization
- Downside case interpretation

Rules:
- Show what breaks the plan
- Keep stress results readable
- Do not make worst-case framing excessive

---

## FINANCIAL MODEL AGENTS

### TAX_AGENT

Owns:
- Tax impact modeling
- Tax drag
- Filing status logic
- State/local tax placeholders

Rules:
- Use simple estimates unless tax module is upgraded
- Clearly label approximations
- Do not imply CPA-level precision yet

---

### WITHDRAWAL_AGENT

Owns:
- Withdrawal strategies
- Retirement drawdown logic
- Spend sustainability

Rules:
- Explain drawdown pressure
- Identify when spending exceeds supportable assets
- Avoid unsupported precision

---

### SS_AGENT

Owns:
- Social Security timing
- Benefit timing impact
- Future benefit placeholders

Rules:
- Do not estimate exact benefits without inputs
- Clearly mark assumptions
- Tie timing to retirement decision impact

---

### RMD_AGENT

Owns:
- Required Minimum Distributions
- RMD timing
- RMD tax impact placeholders

Rules:
- Keep rules versioned
- Flag need for law updates
- Do not overstate accuracy without current rule verification

---

### INCOME_AGENT

Owns:
- Income modeling
- Multi-income households
- Retirement timing per income stream

Rules:
- Keep income streams distinct
- Support staggered retirement
- Explain income loss timing

---

### HEALTH_AGENT

Owns:
- Healthcare costs
- Long-term care scenarios
- Medical shock modeling

Rules:
- Keep framing calm
- Use scenarios, not fear-based language
- Mark placeholders clearly

---

### INFLATION_AGENT

Owns:
- Inflation modeling
- Sensitivity testing
- Purchasing power erosion

Rules:
- Explain long-term impact plainly
- Keep assumptions visible
- Avoid hiding inflation drag

---

## PRODUCT EXPERIENCE AGENTS

### ONBOARDING_AGENT

Owns:
- Input flow
- Setup simplicity
- First-use clarity

Rules:
- Reduce friction
- Ask only for essential inputs first
- Keep advanced fields organized

---

### INSIGHT_AGENT

Owns:
- Plain-English outputs
- Summary clarity
- User-facing explanations

Rules:
- Explain what changed
- Explain why it matters
- Explain what to do next

---

### NARRATIVE_AGENT

Owns:
- Story flow:
  - Where you stand
  - What breaks your plan
  - What to do

Rules:
- Keep the experience human-readable
- Avoid dumping metrics without meaning
- Use a clear beginning, middle, and next step

---

### AHA_AGENT

Owns:
- Highlight surprising insights
- Trigger realization moments
- Make key findings memorable

Rules:
- Surface only meaningful surprises
- Do not exaggerate
- Tie every aha moment to model output

---

### COMPARISON_AGENT

Owns:
- Plan vs plan comparison
- Scenario comparison
- Advisor vs user comparison

Rules:
- Highlight deltas
- Avoid clutter
- Show the practical meaning of each difference

---

## STRATEGIC / FUTURE AGENTS

### PLANNING_RULES_AGENT

Owns:
- Financial rule tracking
- Accuracy flags
- Rule version awareness

Rules:
- Mark assumptions clearly
- Identify areas requiring updated rules
- Keep compliance-sensitive logic separated

---

### COMPLIANCE_ARCHITECT_AGENT

Owns:
- Future compliance system design
- Rule versioning
- Verification layers

Rules:
- Do not mix compliance logic casually into UI
- Keep auditability in mind
- Flag where professional verification is needed

---

### GPS_AGENT

Owns:
- Weekly check-ins
- Ongoing tracking
- Path monitoring

Rules:
- Track whether the user is drifting from plan
- Keep feedback practical
- Focus on next best action

---

### EVENT_AGENT

Owns:
- Life events
- Event chains
- Cause → effect modeling

Rules:
- Events must have financial meaning
- Avoid disconnected markers
- Explain how events change the path

---

### TRADEOFF_AGENT

Owns:
- Life decisions:
  - job vs time
  - spend vs save
  - retire earlier vs work longer
  - risk vs flexibility

Rules:
- Show tradeoffs clearly
- Avoid moral judgment
- Support decision-making

---

### DECISION_SUPPORT_AGENT

Owns:
- “Should I do this?” evaluations
- User decision framing
- Pros/cons from model output

Rules:
- Give a direct answer when possible
- Explain uncertainty
- Show what would change the answer

---

### FUTURE_SELF_AGENT

Owns:
- Future projections framed as advice
- Future-self warnings
- Emotional but practical outputs

Rules:
- Keep tone supportive
- Avoid fear-based framing
- Help user understand future consequences

---

### ENTERPRISE_AGENT

Owns:
- Advisor tools
- White-label systems
- Enterprise planning layer

Rules:
- Do not affect consumer UI unless requested
- Keep future enterprise logic modular
- Preserve main Bastion simplicity

---

## SYSTEM RULES

- No agent may introduce unnecessary complexity.
- All outputs must be decision-focused.
- Clarity > completeness.
- Simplicity > accuracy in early phases.
- Never break working UI.
- Preserve existing user flow.
- Preserve existing calculations unless the phase explicitly changes them.
- Every new feature must support the core Bastion mantra:
  - Inputs define the path.
  - Bastion shows the outcome.

---

## GLOBAL EXECUTION RULES

### Phase Sync Requirement — MANDATORY

Every time a roadmap phase is executed, the system MUST:

1. Update the visible phase in the UI.
   - Sidebar Save State card must reflect the current phase.
   - Header/topbar must reflect the current phase.
   - Phase number must be accurate.
   - Description must be short and accurate.

2. Remove or replace outdated phase labels.
   - No stale phase labels like 2.11b, 2.16, etc. should remain when the app is on a newer phase.

3. Keep UI, roadmap, and save state in sync.

4. Run `scripts/check-bastion.ps1`.

5. Report test result in final phase summary.

---

### Save State Alignment

When a phase is completed:

- UI must reflect the new phase.
- `SAVE_STATE.md` should be updated if applicable.
- `ROADMAP.md` remains the source of truth.
- `AGENTS.md` should be updated when agent rules change.
- Git commit should clearly identify the completed phase.

---

### Required Phase Completion Checklist

Before any phase is considered complete:

1. Save State visible in sidebar is current.
2. Save State visible in header/topbar is current.
3. UI_AGENT review completed.
4. REGRESSION_AGENT checks completed.
5. ANALYTICS_AGENT impact considered if user behavior tracking is affected.
6. MARKET_AGENT impact considered if product positioning, onboarding, buttons, layout, or interaction flow is affected.
7. `scripts/check-bastion.ps1` passes.
8. Only necessary files changed.
9. Existing layout and logic preserved.
10. Phase summary includes:
   - Files changed
   - Features added
   - UI_AGENT result
   - REGRESSION_AGENT result
   - ANALYTICS_AGENT result, if applicable
   - MARKET_AGENT result, if applicable
   - Test result

---

### Non-Negotiable

- No phase is considered complete unless the UI phase label is updated.
- Do not skip UI_AGENT review.
- Do not skip REGRESSION_AGENT review.
- Do not leave stale phase indicators in the interface.
- Do not leave merge conflict markers in any file.
- Do not proceed to the next phase until the current phase is committed and pushed.