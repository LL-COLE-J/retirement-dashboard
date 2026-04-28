function recalc() {
    // Inputs
    const inc = parseFloat(document.getElementById('inc-gross').value) || 0;
    const status = document.getElementById('filing-status').value;
    const cash = parseFloat(document.getElementById('asset-cash').value) || 0;
    const housing = parseFloat(document.getElementById('debt-housing').value) || 0;
    const consumer = parseFloat(document.getElementById('debt-consumer').value) || 0;
    const totalMonthlyDebt = housing + consumer;

    // Calculations
    const taxTotal = BASTION_PRO.getTax(inc, status);
    const dti = BASTION_PRO.getDTI(inc, totalMonthlyDebt);
    const liq = BASTION_PRO.getLiquidityRatio(cash, totalMonthlyDebt);

    // Update UI Values
    document.getElementById('val-tax').innerText = `$${Math.round(taxTotal).toLocaleString()}`;
    document.getElementById('val-dti').innerText = `${dti.toFixed(1)}%`;
    document.getElementById('val-liq').innerText = `${liq.toFixed(1)}x`;

    // Advisor Badging & Insights
    updateBadge('dti-badge', dti < 36 ? 'Optimal' : 'High', dti < 36 ? 'pass' : 'warn');
    updateBadge('liq-badge', liq >= 6 ? 'Secure' : 'Low', liq >= 6 ? 'pass' : 'warn');

    let insight = `At an effective tax rate of ${((taxTotal/inc)*100).toFixed(1)}%, your strategy is `;
    insight += dti > 43 ? "critically over-leveraged for a standard mortgage." : "well within professional lending limits.";
    
    document.getElementById('pro-insight').innerHTML = `<strong>Advisor Insight:</strong> ${insight}`;
}

function updateBadge(id, text, type) {
    const b = document.getElementById(id);
    b.innerText = text;
    b.className = `badge ${type}`;
}

function switchTab(tabId) {
    // Placeholder for tab switching logic if needed
    console.log("Switching to", tabId);
}

// Initial Run
window.onload = recalc;
