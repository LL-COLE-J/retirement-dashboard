
/* ==========================================================================
   MODULES.JS - The Planning Lab & AI Advisor
   ========================================================================== */
function runAdvisor() {
    const data = calculateBase();
    let insights = [];
    let status = "Stable";

    // 1. Credit Karma Style Debt Check
    if (state.assets.debt > state.assets.cash * 2) {
        insights.push("Debt-to-Cash ratio is high. Prioritize a 3-month emergency fund.");
    }

    // 2. Financial Planner Style Retirement Check
    const yearsToRetire = state.assumptions.retirementAge - state.assumptions.currentAge;
    if (data.savingsRate < 15) {
        status = "At Risk";
        insights.push("Savings rate is below the 15% 'Golden Rule'. Increase contributions.");
    }

    // 3. Tax Pro Style Optimization
    const has401k = state.accounts.some(a => a.type === "401k" && a.contrib > 0);
    if (!has401k && data.grossIncome > 60000) {
        insights.push("Missing Tax Shield: Opening a 401k could lower your taxable income.");
    }

    return {
        status: status,
        failure: data.surplus < 0 ? "Monthly Deficit: " + (data.surplus / 12).toFixed(0) : "None",
        action: insights.length > 0 ? insights[0] : "Maintain current trajectory.",
        allInsights: insights
    };
}

function getProjection() {
    const base = calculateBase();
    let points = [];
    let runningNW = base.netWorth;
    
    for (let i = 0; i <= (state.assumptions.lifeExpectancy - state.assumptions.currentAge); i++) {
        // Compound interest (7%) + Annual Surplus
        runningNW = (runningNW + base.surplus) * 1.07;
        points.push({ age: state.assumptions.currentAge + i, nw: runningNW });
    }
    return points;
}
