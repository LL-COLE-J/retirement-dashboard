let wealthChart;
let scenarios = { marketCrash: false, taxHike: false };

function toggleScenario(key) {
    scenarios[key] = !scenarios[key];
    document.getElementById(`btn-${key === 'marketCrash' ? 'market-crash' : 'tax-hike'}`).classList.toggle('active');
    recalc();
}

function recalc() {
    const inc = parseFloat(document.getElementById('inc-gross').value) || 0;
    const debt = parseFloat(document.getElementById('debt-total').value) || 0;
    const taxable = parseFloat(document.getElementById('asset-taxable').value) || 0;
    const trad = parseFloat(document.getElementById('asset-trad').value) || 0;
    
    const totalAssets = taxable + trad;
    const dti = (debt / (inc / 12)) * 100;

    const projection = BASTION_PRO.runProjection({
        initialAssets: totalAssets,
        income: inc,
        returnRate: 7,
        marketCrash: scenarios.marketCrash,
        taxHike: scenarios.taxHike
    });

    const terminalWealth = projection[29];
    
    // Update UI
    document.getElementById('val-terminal').innerText = `$${terminalWealth.toLocaleString()}`;
    document.getElementById('val-dti').innerText = `${dti.toFixed(1)}%`;
    
    const dtiBadge = document.getElementById('dti-badge');
    dtiBadge.innerText = dti < 36 ? 'Optimal' : 'High';
    dtiBadge.className = `badge ${dti < 36 ? 'pass' : 'warn'}`;

    updateChart(projection);

    const insight = BASTION_AI.generateInsight({
        marketCrash: scenarios.marketCrash,
        taxHike: scenarios.taxHike,
        terminalWealth: terminalWealth,
        dti: dti
    });
    document.getElementById('pro-insight').innerHTML = `<strong>Advisor Insight:</strong> ${insight}`;
}

function updateChart(data) {
    const ctx = document.getElementById('wealthChart').getContext('2d');
    if (wealthChart) wealthChart.destroy();
    
    wealthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => 2026 + i),
            datasets: [{
                label: 'Projected Wealth',
                data: data,
                borderColor: '#1e293b',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { ticks: { callback: v => '$' + (v/1000000).toFixed(1) + 'M' } } }
        }
    });
}

function switchTab(tabId) {
    console.log("Switching to", tabId);
}

window.onload = recalc;
