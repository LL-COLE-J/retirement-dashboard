let wealthChart;
let scenarios = JSON.parse(localStorage.getItem('bastion_scenarios')) || {};

function saveScenario() {
    const name = prompt("Enter Scenario Name (e.g., 'Baseline', 'Late Retirement'):");
    if (!name) return;

    const data = {
        ageNow: document.getElementById('age-now').value,
        ageRetire: document.getElementById('age-retire').value,
        ageEnd: document.getElementById('age-end').value,
        state: document.getElementById('state-select').value,
        status: document.getElementById('filing-status').value,
        deps: document.getElementById('dependents').value,
        income: Array.from(document.querySelectorAll('.inc-val')).map(i => i.value),
        assets: Array.from(document.querySelectorAll('.asset-val')).map(a => a.value)
    };

    scenarios[name] = data;
    localStorage.setItem('bastion_scenarios', JSON.stringify(scenarios));
    renderScenarioList();
}

function loadScenario(name) {
    const s = scenarios[name];
    document.getElementById('age-now').value = s.ageNow;
    document.getElementById('age-retire').value = s.ageRetire;
    document.getElementById('age-end').value = s.ageEnd;
    document.getElementById('state-select').value = s.state;
    document.getElementById('filing-status').value = s.status;
    document.getElementById('dependents').value = s.deps;
    
    // Refresh Dynamic Lists
    document.getElementById('income-list').innerHTML = s.income.map(val => `
        <div class="entry-row"><select><option>Primary Salary</option></select><input type="number" value="${val}" class="inc-val" oninput="recalc()"><div class="del-btn" onclick="this.parentElement.remove(); recalc();">×</div></div>
    `).join('');
    
    document.getElementById('asset-list').innerHTML = s.assets.map(val => `
        <div class="entry-row"><select><option>Brokerage</option></select><input type="number" value="${val}" class="asset-val" oninput="recalc()"><div class="del-btn" onclick="this.parentElement.remove(); recalc();">×</div></div>
    `).join('');

    recalc();
}

function renderScenarioList() {
    const list = document.getElementById('scenario-list');
    list.innerHTML = Object.keys(scenarios).map(name => `
        <div class="scenario-item" onclick="loadScenario('${name}')">
            ${name} <span style="color:#ef4444" onclick="deleteScenario('${name}'); event.stopPropagation();">×</span>
        </div>
    `).join('');
}

function deleteScenario(name) {
    delete scenarios[name];
    localStorage.setItem('bastion_scenarios', JSON.stringify(scenarios));
    renderScenarioList();
}

function addRow(containerId, inputClass) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'entry-row';
    div.innerHTML = `<select><option>Additional</option></select><input type="number" placeholder="0" class="${inputClass}" oninput="recalc()"><div class="del-btn" onclick="this.parentElement.remove(); recalc();">×</div>`;
    container.appendChild(div);
}

function switchTab(tabId) {
    document.getElementById('financials-tab').style.display = 'none';
    document.getElementById('analytics-tab').style.display = 'none';
    document.getElementById(tabId + '-tab').style.display = 'block';
    document.getElementById('nav-financials').classList.toggle('active', tabId === 'financials');
    document.getElementById('nav-analytics').classList.toggle('active', tabId === 'analytics');
    if (tabId === 'analytics') recalc();
}

function recalc() {
    const totalInc = Array.from(document.querySelectorAll('.inc-val')).reduce((sum, el) => sum + (parseFloat(el.value) || 0), 0);
    const totalAssets = Array.from(document.querySelectorAll('.asset-val')).reduce((sum, el) => sum + (parseFloat(el.value) || 0), 0);
    
    const p = {
        ageNow: parseInt(document.getElementById('age-now').value) || 35,
        ageRetire: parseInt(document.getElementById('age-retire').value) || 65,
        ageEnd: parseInt(document.getElementById('age-end').value) || 90,
        income: totalInc,
        startingAssets: totalAssets,
        state: document.getElementById('state-select').value,
        status: document.getElementById('filing-status').value,
        deps: parseInt(document.getElementById('dependents').value) || 0
    };

    const taxData = BASTION_ENGINE.getTaxWork(p.income, p.state, p.status, p.deps);
    const projection = BASTION_ENGINE.runFullLifeProjection(p);
    
    document.getElementById('val-eff-rate').innerText = `${taxData.effRate.toFixed(1)}%`;
    document.getElementById('val-terminal').innerText = `$${projection[projection.length-1].wealth.toLocaleString()}`;
    document.getElementById('logic-content').innerHTML = taxData.work;

    if (document.getElementById('analytics-tab').style.display !== 'none') {
        renderWealthChart(projection);
    }
}

function renderWealthChart(data) {
    const ctx = document.getElementById('wealthChart').getContext('2d');
    if (wealthChart) wealthChart.destroy();
    wealthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => `Age ${d.age}`),
            datasets: [{
                label: 'Inflation-Adjusted Net Worth',
                data: data.map(d => d.wealth),
                borderColor: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

window.onload = () => { renderScenarioList(); recalc(); };
