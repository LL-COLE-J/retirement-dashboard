# Bastion Save State 2.39g — Dashboard/Timeline/Advisor Sync

Current status:
- Phase 2.39g synchronized shared metric display behavior across Dashboard, Timeline, Advisor, and Scenario readouts without redesigning the UI or introducing new features.
- Run-out age detection now routes through `BastionEngine.firstRunoutAge()` so dashboard Decision Core, saved-baseline comparisons, Advisor summaries, and reports share the same safe run-out fallback.
- Shared signed currency and signed percentage formatting helpers now live in `app/core/number-guards.js` and are used by view-facing comparison labels where safe.
- Scenario ending-path deltas, Advisor impact summaries, Advisor compact intelligence, Timeline Scenario B retirement-age copy, Decision Core deltas, and baseline-change lists now use the same positive/negative display conventions.
- Plan setup spending copy now respects monthly vs annual input mode instead of always labeling current spending as monthly.
- Complex projection-loop cash flow, tax, RMD, Social Security, Monte Carlo, and Advisor recommendation rules remain non-canonical until future scoped phases.

Patch completed:
- Added shared signed money/percent formatting helpers in `app/core/number-guards.js`.
- Added canonical first-run-out-age ownership to `app/core/bastion-engine.js` and routed the existing UI wrapper through it.
- Normalized safe/simple display formatting in `index.html` for capture percent, scenario percentage labels, savings-rate display, baseline-change deltas, Advisor fallbacks, and mode-aware spending copy.
- Updated visible Save State and phase text to Bastion Save State 2.39g — Dashboard/Timeline/Advisor Sync.
- Updated `MATH_AUDIT.md` and `ROADMAP.md` with the 2.39g completion note.

Validation status:
- UI_AGENT review: passed; changes were limited to text/format synchronization, fallback guards, and existing dark UI labels with no redesign.
- REGRESSION_AGENT review: passed through Linux validation, JavaScript syntax checks, route-file checks, and conflict-marker scanning.
- ANALYTICS_AGENT impact: not applicable; no behavior tracking or analytics collection changed.
- MARKET_AGENT impact: minimal; no CTA, onboarding, pricing, or product-positioning flow changed.
- Save State alignment: `SAVE_STATE.md`, `ROADMAP.md`, owner/tax visible badges, and visible UI phase text agree on Bastion Save State 2.39g.
