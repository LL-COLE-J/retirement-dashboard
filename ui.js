let mainChart;

function toggleDrawer() { document.getElementById('drawer').classList.toggle('open'); }

function addRow(type) {
    const cont = document.getElementById(`${type}-cont`);
    const div = document.createElement('div');
    div.style.display = 'flex'; div.style.gap = '10px'; div.style.marginBottom = '10px';
    div.innerHTML = `
        <select class="asset-type"><option value="def">Deferred (401k)</option><option value="tax">Taxable</option></select>
        <input type="number" class="asset-val" value="150000" oninput="recalc()">
        <button onclick="this.parentElement.remove(); recalc()" style="background:none; border:none; color:red; cursor:pointer;">×</button>`;
    cont.appendChild(div);
    recalc();
}

function recalc() {
    const p = {
        ageNow: parseInt(document.getElementById('age-now').value) || 35,
        ageRet: parseInt(document.getElementById('age-ret').value) || 65,
        status: document.getElementById('status').value,
        assets: Array.from(document.querySelectorAll('#asset-cont div')).map(r => ({
            type: r.querySelector('.asset-type').value,
            val: parseFloat(r.querySelector('.asset-val').value)
        }))
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
            datasets: [{
                label: 'Wealth Accumulation',
                data: res.timeline.map(d => d.v),
                borderColor: '#d4af37',
                backgroundColor: 'rgba(212, 175, 55, 0.05)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

window.onload = () => { addRow('asset'); recalc(); };
