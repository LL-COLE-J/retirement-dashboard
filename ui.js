let wealthChart;

function switchTab(tabId) {
    document.getElementById('financials-tab').style.display = 'none';
    document.getElementById('analytics-tab').style.display = 'none';
    document.getElementById(tabId + '-tab').style.display = 'block';
    if (tabId === 'analytics') recalc();
}

function recalc() {
    const inc = parseFloat(document.getElementById('inc-gross').value) || 0;
    const state = document.getElementById('state-select').value;
    const status = document.getElementById('filing-status').value;
    
    const taxData = BASTION_ENGINE.getTaxWork(inc, state, status);
    
    document.getElementById('val-eff-rate').innerText = `${taxData.effRate.toFixed(1)}%`;
    document.getElementById('val-tax-total').innerText = `$${Math.round(taxData.total).toLocaleString()}`;
    document.getElementById('logic-content').innerHTML = taxData.work;

    if (document.getElementById('analytics-tab').style.display !== 'none') {
        const projection = BASTION_ENGINE.runProjection(inc, 150000, 7, 3);
        renderChart(projection);
    }
    
    document.getElementById('pro-insight').innerText = taxData.effRate > 25 
        ? "High tax drag detected. Pro Suite's tax-loss harvesting module recommended."
        : "Efficient tax profile. Consider increasing contribution to qualified accounts.";
}

function renderChart(data) {
    const ctx = document.getElementById('wealthChart').getContext('2d');
    if (wealthChart) wealthChart.destroy();
    wealthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 31}, (_, i) => 2026 + i),
            datasets: [{
                label: 'Real Wealth',
                data: data,
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}
window.onload = recalc;
