/* ==========================================================================
   1. GLOBAL STATE (Extended for Advisor-Level Modeling)
   ========================================================================== */
let state = {
  incomes: [],   // {type, amount, freq, growth: 3}
  expenses: [],  // {cat, amount, freq, essential: true, sensitivity: 2.5}
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
  // New Advisor assumptions for Priority 4 & 5
  assumptions: {
    inflation: 2.5,
    retirementAge: 65,
    lifeExpectancy: 90,
    currentAge: 30
  }
};

let chart;

/* ==========================================================================
   2. CORE CALCULATION ENGINE (Stable - Extended for match/savings logic)
   ========================================================================== */
function cleanNumber(val) {
  if (!val) return 0;
  return parseFloat(val.toString().replace(/[^0-9.-]/g, '')) || 0;
}

function money(n) {
  return "$" + Math.round(n || 0).toLocaleString();
}

function norm(a, f) {
  return cleanNumber(a) * (f === "monthly" ? 12 : f === "biweekly" ? 26 : 1);
}

function calculate() {
  let income = state.incomes.reduce((s, i) => s + norm(i.amount, i.freq), 0);
  let expenses = state.expenses.reduce((s, e) => s + norm(e.amount, e.freq), 0);
  
  // Dependents
  expenses += state.dependents.reduce((s, d) => s + (d.cost || 0), 0);

  // Contributions & Match
  let contrib = state.accounts.reduce((s, a) => s + (a.contrib || 0), 0);
  let match = state.accounts.reduce((s, a) => {
    return s + (a.match ? (a.contrib * a.match / 100) : 0);
  }, 0);

  let totalSavings = contrib + match;
  let net = income - expenses - contrib;
  let accountValue = state.accounts.reduce((s, a) => s + (a.balance || 0), 0);

  let netWorth = accountValue + (state.assets.cash || 0) + (state.assets.invest || 0) - (state.assets.debt || 0);
  let savingsRate = income > 0 ? ((totalSavings) / income) * 100 : 0;

  return { income, expenses, net, netWorth, savingsRate, contrib, match, totalSavings };
}

/* ==========================================================================
   3. ADVISOR PROJECTION ENGINE (Priority 4 & 5)
   ========================================================================== */
function runProjection() {
  const current = calculate();
  let timeline = [];
  let runningNW = current.netWorth;
  let annualExp = current.expenses;
  let annualInc = current.income;
  
  const years = state.assumptions.lifeExpectancy - state.assumptions.currentAge;

  for (let i = 0; i <= years; i++) {
    let age = state.assumptions.currentAge + i;
    let isRetired = age >= state.assumptions.retirementAge;

    // Apply Priority 1 & 2: Growth and Inflation
    if (!isRetired) {
      annualInc *= 1.03; // 3% Wage Growth Default
    } else {
      annualInc = current.income * 0.2; // 20% floor (Social Security proxy)
    }
    
    annualExp *= (1 + (state.assumptions.inflation / 100));

    // Priority 3: Account Returns (Compounding)
    let avgReturn = isRetired ? 1.04 : 1.07; // Conservative in retirement
    runningNW = (runningNW + (annualInc - annualExp)) * avgReturn;

    timeline.push({ age, nw: runningNW });
    if (runningNW < -1000000) break; // Break if debt spiral is too deep
  }
  return timeline;
}

function getAdvisorInsights() {
  const d = calculate();
  const timeline = runProjection();
  const deathPoint = timeline[timeline.length - 1];
  
  let insights = { status: "Stable", failure: "None detected", action: "Portfolio optimized." };

  if (deathPoint.nw < 0) {
    let failAge = timeline.find(t => t.nw < 0)?.age || "N/A";
    insights.status = "Critical";
    insights.failure = `Wealth depletion at age ${failAge}`;
    let gap = Math.abs(deathPoint.nw) / (timeline.length * 12);
    insights.action = `Increase monthly savings by ${money(gap)} to survive to age ${state.assumptions.lifeExpectancy}.`;
  } else if (d.savingsRate < 15) {
    insights.status = "Warning";
    insights.action = "Savings rate below 15%. Maximize tax-advantaged accounts.";
  }

  return insights;
}

/* ==========================================================================
   4. RENDER & UI CONTROLS (Priority 6)
   ========================================================================== */
function renderAll() {
  renderDashboard();
  renderFinancials();
  saveProfile();
}

function commit() {
  renderAll();
}

function renderDashboard() {
  const d = calculate();
  const adv = getAdvisorInsights();
  const timeline = runProjection();

  // Metrics
  document.getElementById("netWorth").innerText = money(d.netWorth);
  document.getElementById("income").innerText = money(d.income);
  document.getElementById("expensesOut").innerText = money(d.expenses);
  document.getElementById("savingsRate").innerText = d.savingsRate.toFixed(1) + "%";

  // Side Panel
  document.getElementById("status").innerText = adv.status;
  document.getElementById("failure").innerText = adv.failure;
  document.getElementById("action").innerText = adv.action;

  // Charting
  const ctx = document.getElementById("chart")?.getContext("2d");
  if (!ctx) return;

  const labels = timeline.map(t => t.age);
  const data = timeline.map(t => t.nw);

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  } else {
    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Wealth Projection",
          data: data,
          borderColor: "#0f172a",
          backgroundColor: "rgba(15, 23, 42, 0.05)",
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: { y: { ticks: { callback: v => money(v) } } }
      }
    });
  }
}

function renderFinancials() {
  // Income List with Growth
  document.getElementById("incomeList").innerHTML = state.incomes.map((i, idx) => `
    <div class="row">
      <select onchange="state.incomes[${idx}].type=this.value;commit()">
        <option ${i.type === 'salary' ? 'selected' : ''}>salary</option>
        <option ${i.type === 'bonus' ? 'selected' : ''}>bonus</option>
        <option ${i.type === 'passive' ? 'selected' : ''}>passive</option>
      </select>
      <input type="number" value="${i.amount}" onblur="state.incomes[${idx}].amount=+this.value;commit()">
      <select onchange="state.incomes[${idx}].freq=this.value;commit()">
        <option ${i.freq === 'yearly' ? 'selected' : ''}>yearly</option>
        <option ${i.freq === 'monthly' ? 'selected' : ''}>monthly</option>
      </select>
    </div>
  `).join("");

  // Account List with Contrib/Match
  document.getElementById("accountList").innerHTML = state.accounts.map((a, idx) => `
    <div class="row">
      <div class="label">${a.type.toUpperCase()}</div>
      <input placeholder="Balance" value="${a.balance}" onblur="state.accounts[${idx}].balance=+this.value;commit()">
      <input placeholder="Contrib" value="${a.contrib}" onblur="state.accounts[${idx}].contrib=+this.value;commit()">
      <input placeholder="Match %" value="${a.match}" onblur="state.accounts[${idx}].match=+this.value;commit()">
    </div>
  `).join("");

  // Sync basic assets
  document.getElementById("cash").value = state.assets.cash;
  document.getElementById("invest").value = state.assets.invest;
  document.getElementById("debt").value = state.assets.debt;
}

/* ==========================================================================
   5. STORAGE & INIT
   ========================================================================== */
function saveProfile() { localStorage.setItem("bastion_data", JSON.stringify(state)); }
function loadProfile() {
  const data = localStorage.getItem("bastion_data");
  if (data) state = JSON.parse(data);
}

function addIncome() { state.incomes.push({ type: "salary", amount: 0, freq: "yearly" }); commit(); }
function addAccount() { state.accounts.push({ type: "brokerage", balance: 0, contrib: 0, match: 0 }); commit(); }

window.onload = () => {
  loadProfile();
  renderAll();
};
