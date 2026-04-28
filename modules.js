/**
 * BASTION INSIGHTS - CORE MODULES
 * Priority: Income Expansion, Expense Upgrades, Account Growth, and Advisor Logic.
 */

/* ==========================================================================
   1. GLOBAL STATE (The Source of Truth)
   ========================================================================== */
let state = {
    incomes: [],   
    expenses: [],  
    accounts: [
        {type: "checking", balance: 0, contrib: 0, match: 0, growth: 0, tax: "taxable"},
        {type: "401k", balance: 0, contrib: 0, match: 3, growth: 7, tax: "deferred"},
        {type: "roth", balance: 0, contrib: 0, match: 0, growth: 7, tax: "exempt"},
        {type: "brokerage", balance: 0, contrib: 0, match: 0, growth: 7, tax: "taxable"},
        {type: "hsa", balance: 0, contrib: 0, match: 0, growth: 7, tax: "exempt"}
    ],
    dependents: [],
    assets: { cash: 0, invest: 0, debt: 0 },
    filing: "single",
    assumptions: {
        inflation: 2.5,
        currentAge: 30,
        retirementAge: 65,
        lifeExpectancy: 90
    }
};

let chart;

/* ==========================================================================
   2. CALCULATION ENGINE (Standardized Logic)
   ========================================================================== */
const norm = (a, f) => (parseFloat(a) || 0) * (f === "monthly" ? 12 : f === "biweekly" ? 26 : 1);
const money = (n) => "$" + Math.round(n || 0).toLocaleString();

function calculate() {
    let income = state.incomes.reduce((s, i) => s + norm(i.amount, i.freq), 0);
    let expenses = state.expenses.reduce((s, e) => s + norm(e.amount, e.freq), 0);
    
    // Add dependent costs
    expenses += state.dependents.reduce((s, d) => s + (parseFloat(d.cost) || 0), 0);

    // Contributions & Employer Match
    let contribs = state.accounts.reduce((s, a) => s + (parseFloat(a.contrib) * 12 || 0), 0);
    let match = state.accounts.reduce((s, a) => {
        // Simple match logic: % of gross income
        return s + (a.match ? (income * (a.match / 100)) : 0);
    }, 0);

    let accountValue = state.accounts.reduce((s, a) => s + (parseFloat(a.balance) || 0), 0);
    let netWorth = accountValue + (parseFloat(state.assets.cash) || 0) - (parseFloat(state.assets.debt) || 0);
    let savingsRate = income > 0 ? (((contribs + match) / income) * 100) : 0;

    return { income, expenses, netWorth, savingsRate, net: income - expenses - contribs, totalSavings: contribs + match };
}

/* ==========================================================================
   3. ADVISOR & PROJECTION (Priority 4 & 5)
   ========================================================================== */
function runProjection() {
    const d = calculate();
    let timeline = [];
    let nw = d.netWorth;
    let currentInc = d.income;
    let currentExp = d.expenses;

    const yearsToSim = state.assumptions.lifeExpectancy - state.assumptions.currentAge;

    for (let i = 0; i <= yearsToSim; i++) {
        let age = state.assumptions.currentAge + i;
        let isRetired = age >= state.assumptions.retirementAge;

        // Wage Growth vs Retirement Floor
        if (!isRetired) {
            currentInc *= 1.03; // Priority 1: 3% Wage growth
        } else {
            currentInc = d.income * 0.20; // 20% Floor (Social Security/Pension)
        }

        // Priority 2: Inflation Sensitivity
        currentExp *= (1 + (state.assumptions.inflation / 100));

        // Priority 3: Tax-Treated Growth
        let growthRate = isRetired ? 1.04 : 1.07; 
        nw = (nw + (currentInc - currentExp)) * growthRate;

        timeline.push({ age, nw });
        if (nw < -2000000) break; // Optimization break
    }
    return timeline;
}

function getAdvisorInsights() {
    const d = calculate();
    const timeline = runProjection();
    const lastYear = timeline[timeline.length - 1];
    
    let insights = { status: "Healthy", failure: "No gap detected", action: "Portfolio is optimized for your timeline." };

    if (lastYear.nw < 0) {
        let failAge = timeline.find(t => t.nw < 0)?.age || "N/A";
        insights.status = "At Risk";
        insights.failure = `Wealth depletion at age ${failAge}`;
        // Calculate the fix: required additional monthly savings
        let gapFix = Math.abs(lastYear.nw) / (timeline.length * 12);
        insights.action = `Increase monthly savings by ${money(gapFix)} to reach age ${state.assumptions.lifeExpectancy}.`;
    } else if (d.savingsRate < 15) {
        insights.status = "Warning";
        insights.action = "Your savings rate is below the 15% benchmark. Increase 401k contributions.";
    }

    return insights;
}

/* ==========================================================================
   4. UI RENDERING (Priority 6)
   ========================================================================== */
function renderAll() {
    const d = calculate();
    const adv = getAdvisorInsights();
    const timeline = runProjection();

    // Core Metrics
    document.getElementById("netWorth").innerText = money(d.netWorth);
    document.getElementById("income").innerText = money(d.income);
    document.getElementById("expensesOut").innerText = money(d.expenses);
    document.getElementById("savingsRate").innerText = d.savingsRate.toFixed(1) + "%";

    // Advisor Panel
    document.getElementById("status").innerText = adv.status;
    document.getElementById("failure").innerText = adv.failure;
    document.getElementById("action").innerText = adv.action;

    // Charts
    updateChart(timeline);
    renderFinancials();
    saveProfile();
}

function updateChart(timeline) {
    const canvas = document.getElementById("chart");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const labels = timeline.map(t => t.age);
    const data = timeline.map(t => t.nw);

    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    } else {
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Wealth Projection',
                    data,
                    borderColor: '#0f172a',
                    backgroundColor: 'rgba(15, 23, 42, 0.05)',
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { ticks: { callback: v => money(v) } }
                }
            }
        });
    }
}

function renderFinancials() {
    // Income List
    document.getElementById("incomeList").innerHTML = state.incomes.map((i, idx) => `
        <div class="row">
            <select onchange="state.incomes[${idx}].type=this.value;commit()">
                <option value="salary" ${i.type==='salary'?'selected':''}>Salary</option>
                <option value="bonus" ${i.type==='bonus'?'selected':''}>Bonus</option>
                <option value="passive" ${i.type==='passive'?'selected':''}>Passive</option>
            </select>
            <input type="number" value="${i.amount}" onblur="state.incomes[${idx}].amount=+this.value;commit()">
            <select onchange="state.incomes[${idx}].freq=this.value;commit()">
                <option value="yearly" ${i.freq==='yearly'?'selected':''}>Yearly</option>
                <option value="monthly" ${i.freq==='monthly'?'selected':''}>Monthly</option>
            </select>
        </div>
    `).join("");

    // Account List
    document.getElementById("accountList").innerHTML = state.accounts.map((a, idx) => `
        <div class="row">
            <div style="flex:1; font-size:12px; font-weight:600;">${a.type.toUpperCase()}</div>
            <input style="flex:2" placeholder="Balance" type="number" value="${a.balance}" onblur="state.accounts[${idx}].balance=+this.value;commit()">
            <input style="flex:2" placeholder="Contrib/mo" type="number" value="${a.contrib}" onblur="state.accounts[${idx}].contrib=+this.value;commit()">
        </div>
    `).join("");

    // Fixed Assets
    document.getElementById("cash").value = state.assets.cash;
    document.getElementById("debt").value = state.assets.debt;
}

/* ==========================================================================
   5. UTILITIES & INIT
   ========================================================================== */
function saveProfile() { localStorage.setItem("bastion_profile", JSON.stringify(state)); }
function loadProfile() {
    const data = localStorage.getItem("bastion_profile");
    if (data) state = JSON.parse(data);
}

function commit() { renderAll(); }

function addIncome() {
    state.incomes.push({ type: "salary", amount: 0, freq: "yearly", growth: 3 });
    renderAll();
}

function updateAssumption(key, val) {
    state.assumptions[key] = parseFloat(val) || 0;
    renderAll();
}

window.onload = () => {
    loadProfile();
    renderAll();
};
