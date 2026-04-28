let wealthChart;

function addRow(containerId, inputClass) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'entry-row';
    div.style.gridTemplateColumns = "1.2fr 1fr 40px";
    div.innerHTML = `
        <select><option>Stocks</option><option>Bonds</option><option>Other</option></select>
        <input type="number" class="${inputClass}" placeholder="0" oninput="recalc()">
        <div class="del-btn" onclick="this.parentElement.remove(); recalc()">×</div>
    `;
    container.appendChild(div);
}

function addExpenseRow() {
    const container = document.getElementById('expense-container');
    const div = document.createElement('div');
    div.className = 'entry-row';
    div.innerHTML = `
        <select><option>Housing</option><option>Medical</option><option>Lifestyle</option></select>
        <input type="number" class="exp-input" placeholder="Amount" oninput="recalc()">
        <input type="number" value="3" class="exp-inf" oninput="recalc()">
        <div class="del-btn" onclick="this.parentElement.remove(); recalc()">×</div>
    `;
    container.appendChild(div);
}

function switchTab(tabId) {
    document.getElementById('lab-tab').style.display = tabId === 'lab' ? 'block' : 'none';
    document.getElementById('analytics-tab').style.display = tabId === 'analytics' ? 'block' : 'none';
    if(tabId === 'analytics') recalc();
}

function recalc() {
    const p = {
        ageNow: parseInt(document.getElementById('age-now').value) || 35,
        ageRetire: parseInt(document.getElementById('age-retire').value) || 65,
        ageEnd: parseInt(document.getElementById('age-end').value) || 90,
        startingAssets: Array.from(document.querySelectorAll('.asset-input')).reduce((s, i) => s + (parseFloat(i.value) || 0), 0),
        ssAge: parseInt(document.getElementById('ss-age').value) || 67,
        ssBenefit: (parseFloat(document.getElementById('ss-benefit').value) || 0) * 12,
        expenses: Array.from(document.querySelectorAll('#expense-container .entry-row')).map(row => ({
            amount: (parseFloat(row.querySelector('.exp-input').value) || 0) * 12,
            inflation: (parseFloat(row.querySelector('.exp-inf').value) || 3) / 100
        }))
    };

    const projection = BASTION_ENGINE.runLifeCycleProjection(p);
    const terminal = projection[projection.length - 1].wealth;

    document.getElementById('val-terminal').innerText = `$${terminal.toLocaleString()}`;
    document.getElementById('success-indicator').innerText = terminal > 0 ? "STABLE" : "PORTFOLIO EXHAUSTED";
    document.getElementById('success-indicator').style.color = terminal > 0 ? "green" : "red";
    
    // Simple Work Log for Logic Explorer
    document.getElementById('logic-content').innerHTML = `Retirement Age: ${p.ageRetire}\nSS Start: ${p.ssAge}\nInflated Expenses @ 65: $${Math.round(projection.find(d => d.age === p.ageRetire).expenses).toLocaleString()}`;

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
            labels: data.map(d => d.age),
            datasets: [{ 
                label: 'Wealth Path', 
                data: data.map(d => d.wealth), 
                borderColor: '#0ea5e9', 
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                fill: true, 
                tension: 0.3 
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, ticks: { callback: v => '$' + v.toLocaleString() } } }
        }
    });
}

window.onload = recalc;
