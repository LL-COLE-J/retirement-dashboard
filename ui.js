let currentMode = 'solo';
let mainChart;

function setMode(mode) {
    currentMode = mode;
    document.getElementById('btn-solo').classList.toggle('active', mode === 'solo');
    document.getElementById('btn-compare').classList.toggle('active', mode === 'compare');
    document.getElementById('card-b').style.opacity = mode === 'compare' ? '1' : '0.5';
    document.getElementById('card-b').style.pointer_events = mode === 'compare' ? 'auto' : 'none';
    recalc();
}

function switchTab(tabId) {
    document.getElementById('lab-tab').style.display = tabId === 'lab' ? 'block' : 'none';
    document.getElementById('analytics-tab').style.display = tabId === 'analytics' ? 'block' : 'none';
    recalc();
}

function recalc() {
    const vol = parseInt(document.getElementById('volatility').value) / 100;

    const paramsA = {
        age: parseInt(document.getElementById('age-now-a').value),
        status: document.getElementById('status-a').value,
        expenses: parseInt(document.getElementById('exp-a').value),
        volatility: vol
    };

    const paramsB = {
        age: parseInt(document.getElementById('age-now-b').value),
        status: document.getElementById('status-b').value,
        expenses: parseInt(document.getElementById('exp-b').value),
        volatility: vol
    };

    const dataA = BASTION_ENGINE.runProjection(paramsA);
    const dataB = BASTION_ENGINE.runProjection(paramsB);

    document.getElementById('res-a').innerText = `$${dataA[dataA.length-1].total.toLocaleString()}`;
    document.getElementById('res-b').innerText = `$${dataB[dataB.length-1].total.toLocaleString()}`;

    if (document.getElementById('analytics-tab').style.display !== 'none') {
        renderChart(dataA, dataB);
    }
}

function renderChart(a, b) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (mainChart) mainChart.destroy();
    
    const datasets = [{
        label: 'Scenario A',
        data: a.map(d => d.total),
        borderColor: '#38bdf8',
        tension: 0.3
    }];

    if (currentMode === 'compare') {
        datasets.push({
            label: 'Scenario B',
            data: b.map(d => d.total),
            borderColor: '#f43f5e',
            tension: 0.3
        });
    }

    mainChart = new Chart(ctx, {
        type: 'line',
        data: { labels: a.map(d => d.age), datasets },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

window.onload = recalc;
