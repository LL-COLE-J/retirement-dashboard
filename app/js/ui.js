let mainChart;
function toggleDrawer() { document.getElementById('drawer').classList.toggle('open'); }

const appState = {
    ageNow: 35,
    ageRet: 65,
    status: 'single',
    deps: 0,
    incomes: [],
    assets: []
};

function toNum(v, fallback = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
}

function syncStateFromDom() {
    appState.ageNow = toNum(document.getElementById('age-now').value, 35);
    appState.ageRet = Math.max(appState.ageNow, toNum(document.getElementById('age-ret').value, 65));
    appState.status = document.getElementById('status').value === 'married' ? 'married' : 'single';
    appState.deps = Math.max(0, toNum(document.getElementById('deps').value, 0));
    appState.incomes = Array.from(document.querySelectorAll('#income-cont div')).map(r => ({
        type: r.querySelector('.income-type')?.value || 'W2 Salary',
        val: toNum(r.querySelector('.income-val')?.value, 0)
    }));
    appState.assets = Array.from(document.querySelectorAll('#asset-cont div')).map(r => ({
        type: r.querySelector('.asset-type')?.value || 'Qualified (401k)',
        val: toNum(r.querySelector('.asset-val')?.value, 0)
    }));
}

function addRow(type, val = 100000, label = "W2 Salary") {
    const cont = document.getElementById(`${type}-cont`);
    const div = document.createElement('div');
    div.style.display = 'flex'; div.style.gap = '8px'; div.style.marginBottom = '8px';
    div.innerHTML = `
        <select style="flex:2" class="${type}-type">
            ${type === 'income' ? '<option>W2 Salary</option><option>Rental</option>' : '<option>Qualified (401k)</option><option>Taxable</option>'}
        </select>
        <input style="flex:2" type="number" class="${type}-val" value="${val}" oninput="recalc()">
        <button onclick="this.parentElement.remove(); recalc()" style="background:none; border:none; color:#ef4444; font-weight:800; cursor:pointer;">×</button>`;
    const select = div.querySelector(`.${type}-type`);
    if (select && label) select.value = label;
    select?.addEventListener('change', recalc);
    cont.appendChild(div);
    recalc();
}

function recalc() {
    syncStateFromDom();
    const p = { ...appState };
    const res = BASTION_ENGINE.run(p);
    document.getElementById('res-wealth').innerText = `$${res.terminal.toLocaleString()}`;
    document.getElementById('res-tax').innerText = `$${res.totalTax.toLocaleString()}`;
    document.getElementById('logic-content').innerHTML = BASTION_ENGINE.getAudit(p, res);
    updateChart(res);
    renderAdvisorPanel(p, res);
renderProfilePanel(p);
}

function updateChart(res) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (mainChart) mainChart.destroy();
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: res.timeline.map(d => d.age),
            datasets: [{ label: 'Wealth Accumulation', data: res.timeline.map(d => d.v), borderColor: '#d4af37', backgroundColor: 'rgba(212, 175, 55, 0.05)', fill: true, tension: 0.3 }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
}

window.onload = () => {
    document.getElementById('age-now').addEventListener('input', recalc);
    document.getElementById('age-ret').addEventListener('input', recalc);
    document.getElementById('status').addEventListener('change', recalc);
    document.getElementById('deps').addEventListener('input', recalc);
    addRow('income', 100000, 'W2 Salary');
    addRow('asset', 50000, 'Qualified (401k)');
};
