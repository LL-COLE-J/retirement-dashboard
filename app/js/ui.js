let mainChart;
function toggleDrawer() { document.getElementById('drawer').classList.toggle('open'); }

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
    cont.appendChild(div);
    recalc();
}

function recalc() {
    const p = {
        ageNow: parseInt(document.getElementById('age-now').value) || 35,
        ageRet: parseInt(document.getElementById('age-ret').value) || 65,
        status: document.getElementById('status').value,
        incomes: Array.from(document.querySelectorAll('#income-cont div')).map(r => ({ val: parseFloat(r.querySelector('.income-val').value) })),
        assets: Array.from(document.querySelectorAll('#asset-cont div')).map(r => ({ val: parseFloat(r.querySelector('.asset-val').value) }))
    };
    const res = BASTION_ENGINE.run(p);
    document.getElementById('res-wealth').innerText = `$${res.terminal.toLocaleString()}`;
    document.getElementById('res-tax').innerText = `$${res.totalTax.toLocaleString()}`;
    document.getElementById('logic-content').innerHTML = BASTION_ENGINE.getAudit(p, res);
    updateChart(res);
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

window.onload = () => { addRow('income', 100000); addRow('asset', 50000); };
