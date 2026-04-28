let wealthChart;

function switchTab(tabId) {
    document.getElementById('financials-tab').style.display = 'none';
    document.getElementById('analytics-tab').style.display = 'none';
    document.getElementById(tabId + '-tab').style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.innerText.toLowerCase().includes(tabId));
    });
    
    if (tabId === 'analytics') recalc();
}

function recalc() {
    const p = {
        currentAge: parseInt(document.getElementById('age-current').value) || 35,
        retireAge: parseInt(document.getElementById('age-retire').value) || 65,
        income: parseFloat(document.getElementById('inc-gross').value) || 0,
        assets: (parseFloat(document.getElementById('asset-cash').value) || 0) + 
                (parseFloat(document.getElementById('asset-taxable').value) || 0) + 
                (parseFloat(document.getElementById('asset-trad').value) || 0),
        annualSave: parseFloat(document.getElementById('save-annual').value) || 0,
        returnRate: parseFloat(document.getElementById('rate-return').value) || 7,
        inflationRate: parseFloat(document.getElementById('rate-inflation').value) || 3
    };

    const projection = BASTION_ENGINE.runFullProjection(p);
    const terminal = projection[projection.length - 1].wealth;
    
    // Update Advisor Lab
    document.getElementById('val-terminal').innerText = `$${terminal.toLocaleString()}`;
    const monthlyRetire = (terminal * 0.04) / 12;
    document.getElementById('val-budget').innerText = `$${Math.round(monthlyRetire).toLocaleString()}`;
    
    // Logic for Tax Score (Ratio of Qualified vs Taxable assets)
    const score = Math.min(100, (p.assets / p.income) * 10);
    document.getElementById('tax-score').innerText = `${Math.round(score)}/100`;

    // Dynamic AI Insight
    let insight = terminal > 1000000 
        ? "Current trajectory suggests a secure retirement. Focus on tax-loss harvesting."
        : "Projected terminal wealth indicates a deficit. Increase savings rate or delay retirement.";
    document.getElementById('pro-insight').innerText = insight;

    if (document.getElementById('analytics-tab').style.display !== 'none') {
        renderChart(projection);
    }
}

function renderChart(data) {
    const ctx = document.getElementById('wealthChart').getContext('2d');
    if (wealthChart) wealthChart.destroy();
    
    wealthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => `Age ${d.age}`),
            datasets: [{
                label: 'Inflation Adjusted Wealth',
                data: data.map(d => d.wealth),
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                borderWidth: 3,
                pointRadius: 0,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: '#f1f5f9' }, ticks: { callback: v => '$' + v.toLocaleString() } },
                x: { grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

window.onload = recalc;
