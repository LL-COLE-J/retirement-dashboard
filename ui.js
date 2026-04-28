let wealthChart;
let scenarios = { marketCrash: false, taxHike: false };

function switchTab(tabId) {
    console.log("Switching to:", tabId);
    
    // Hide all sections
    document.getElementById('financials-tab').style.display = 'none';
    document.getElementById('dashboard-tab').style.display = 'none';
    
    // Show selected section
    document.getElementById(tabId + '-tab').style.display = 'block';
    
    // Update Nav UI
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.innerText.toLowerCase().includes(tabId.replace('-tab','')));
    });

    // Re-render chart if switching to analytics
    if (tabId === 'dashboard') recalc();
}

function toggleScenario(key) {
    scenarios[key] = !scenarios[key];
    document.getElementById('btn-' + key).classList.toggle('active');
    recalc();
}

function recalc() {
    const inc = parseFloat(document.getElementById('inc-gross').value) || 0;
    const debt = parseFloat(document.getElementById('debt-total').value) || 0;
    const assets = (parseFloat(document.getElementById('asset-taxable').value) || 0) + 
                   (parseFloat(document.getElementById('asset-trad').value) || 0);
    
    const dti = (debt / (inc / 12)) * 100;
    const projection = BASTION_PRO.runProjection({
        initialAssets: assets,
        income: inc,
        marketCrash: scenarios.marketCrash,
        taxHike: scenarios.taxHike
    });

    document.getElementById('val-terminal').innerText = `$${projection[29].toLocaleString()}`;
    document.getElementById('val-dti').innerText = `${dti.toFixed(1)}%`;
    
    if (document.getElementById('dashboard-tab').style.display !== 'none') {
        updateChart(projection);
    }
    
    // AI Insight Trigger (Assumes ai-gate.js is loaded)
    if (typeof BASTION_AI !== 'undefined') {
        document.getElementById('pro-insight').innerText = BASTION_AI.generateInsight({
            dti: dti,
            terminalWealth: projection[29],
            ...scenarios
        });
    }
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
                fill: false,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

window.onload = recalc;
