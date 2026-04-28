let wealthChart;
let activeStressors = { market: false, medical: false, layoff: false };

function switchTab(tabId) {
    document.getElementById('financials-tab').style.display = 'none';
    document.getElementById('analytics-tab').style.display = 'none';
    document.getElementById(tabId + '-tab').style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.innerText.toLowerCase().includes(tabId.split('-')[0]));
    });
    if (tabId === 'analytics') recalc();
}

function toggleStress(key) {
    activeStressors[key] = !activeStressors[key];
    document.getElementById(`stress-${key}`).classList.toggle('active');
    recalc();
}

function recalc() {
    const inc = parseFloat(document.getElementById('inc-gross').value) || 0;
    const state = document.getElementById('state-select').value;
    const status = document.getElementById('filing-status').value;
    
    const taxData = BASTION_ENGINE.getTaxWork(inc, state, status);
    const projection = BASTION_ENGINE.runProjection({ income: inc, stressors: activeStressors });
    const terminal = projection[projection.length - 1].wealth;
    
    document.getElementById('val-eff-rate').innerText = `${taxData.effRate.toFixed(1)}%`;
    document.getElementById('val-terminal').innerText = `$${terminal.toLocaleString()}`;
    document.getElementById('logic-content').innerHTML = taxData.work;

    if (document.getElementById('analytics-tab').style.display !== 'none') {
        renderChart(projection);
    }
    
    let insight = "Baseline strategy is functional.";
    if (terminal < 400000) insight = "WARNING: Plan failure likely under stress. Current liquidity cannot absorb concurrent shocks.";
    if (activeStressors.market && terminal > 1000000) insight = "RESILIENCE: Portfolio shows high recovery capacity despite market shocks.";
    
    document.getElementById('pro-insight').innerText = insight;
}

function renderChart(data) {
    const ctx = document.getElementById('wealthChart').getContext('2d');
    if (wealthChart) wealthChart.destroy();
    wealthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => d.year),
            datasets: [{
                label: 'Wealth Projection',
                data: data.map(d => d.wealth),
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            scales: {
                y: { grid: { color: '#f1f5f9' }, ticks: { callback: v => '$' + v.toLocaleString() } },
                x: { grid: { display: false } }
            }
        }
    });
}

window.onload = recalc;
