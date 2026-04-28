let charts = {};

function switchTab(tabId) {
    document.getElementById('lab-tab').style.display = tabId === 'lab' ? 'block' : 'none';
    document.getElementById('analytics-tab').style.display = tabId === 'analytics' ? 'block' : 'none';
    
    // Update active state in sidebar
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    recalc();
}

function addAssetRow() {
    const container = document.getElementById('asset-container');
    const div = document.createElement('div');
    div.className = 'entry-row';
    div.style.gridTemplateColumns = "1.2fr 1fr 40px";
    div.innerHTML = `
        <select class="asset-type"><option value="deferred">401k/IRA</option><option value="taxable">Brokerage</option><option value="taxfree">Roth</option></select>
        <input type="number" class="asset-input" placeholder="0" oninput="recalc()">
        <div class="del-btn" onclick="this.parentElement.remove(); recalc()">×</div>`;
    container.appendChild(div);
}

function recalc() {
    const p = {
        ageNow: parseInt(document.getElementById('age-now').value) || 35,
        ageRetire: parseInt(document.getElementById('age-retire').value) || 65,
        filingStatus: document.getElementById('filing-status').value,
        assets: Array.from(document.querySelectorAll('#asset-container .entry-row')).map(row => ({
            type: row.querySelector('.asset-type').value,
            value: parseFloat(row.querySelector('.asset-input').value) || 0
        })),
        income: 125000,
        expenses: 36000 // Monthly $3k base
    };

    const projection = BASTION_ENGINE.runLifeCycleProjection(p);
    
    // Update Stats
    const final = projection[projection.length-1];
    document.getElementById('val-terminal').innerText = `$${final.total.toLocaleString()}`;
    document.getElementById('val-tax').innerText = `$${Math.round(projection.reduce((s, d) => s + d.taxPaid, 0)).toLocaleString()}`;
    
    const crossover = projection.find(d => d.passiveIncome > d.expenses);
    document.getElementById('val-crossover').innerText = crossover ? crossover.age : "Never";

    if(document.getElementById('analytics-tab').style.display !== 'none') {
        renderCharts(projection);
    }
}

function renderCharts(data) {
    // Wealth Chart
    if(charts.wealth) charts.wealth.destroy();
    charts.wealth = new Chart(document.getElementById('wealthChart'), {
        type: 'line',
        data: {
            labels: data.map(d => d.age),
            datasets: [{ label: 'Net Worth', data: data.map(d => d.total), borderColor: '#0ea5e9', fill: true, backgroundColor: 'rgba(14, 165, 233, 0.1)', tension: 0.3 }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    // Income vs Expense Chart
    if(charts.income) charts.income.destroy();
    charts.income = new Chart(document.getElementById('incomeChart'), {
        type: 'bar',
        data: {
            labels: data.filter(d => d.age % 5 === 0).map(d => d.age),
            datasets: [
                { label: 'Expenses', data: data.filter(d => d.age % 5 === 0).map(d => d.expenses), backgroundColor: '#ef4444' },
                { label: 'Passive Income', data: data.filter(d => d.age % 5 === 0).map(d => d.passiveIncome), backgroundColor: '#16a34a' }
            ]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

window.onload = recalc;
