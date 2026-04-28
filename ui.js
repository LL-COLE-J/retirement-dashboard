/* ==========================================================================
   UI.JS - Dashboard & Event Handlers
   ========================================================================== */
function renderDashboard() {
    const data = calculateBase();
    const advisor = runAdvisor();

    // Mapping to your UI IDs
    document.getElementById("netWorth").innerText = "$" + data.netWorth.toLocaleString();
    document.getElementById("income").innerText = "$" + data.grossIncome.toLocaleString();
    document.getElementById("expensesOut").innerText = "$" + data.expenses.toLocaleString();
    document.getElementById("savingsRate").innerText = data.savingsRate.toFixed(1) + "%";

    // AI Advisor Mapping
    document.getElementById("status").innerText = advisor.status;
    document.getElementById("failure").innerText = advisor.failure;
    document.getElementById("action").innerText = advisor.action;
    document.getElementById("aiOutput").innerText = advisor.allInsights.join("\n\n");
}

function updateAssumption(key, value) {
    state.assumptions[key] = parseFloat(value);
    saveAndRefresh();
}

function saveAndRefresh() {
    localStorage.setItem("bastion_save", JSON.stringify(state));
    renderDashboard();
    // If you have a chart, trigger update here
}
