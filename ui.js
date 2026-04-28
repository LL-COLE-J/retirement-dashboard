let currentMode = 'solo';
let mainChart;

function setMode(m) {
    currentMode = m;
    document.getElementById('btn-solo').classList.toggle('active', m==='solo');
    document.getElementById('btn-compare').classList.toggle('active', m==='compare');
    const b = document.getElementById('card-b');
    b.style.opacity = m==='compare' ? '1' : '0.4';
    b.style.pointerEvents = m==='compare' ? 'auto' : 'none';
    recalc();
}

function switchTab(t) {
    document.getElementById('lab-tab').style.display = t === 'lab' ? 'block' : 'none';
    document.getElementById('analytics-tab').style.display = t === 'analytics' ? 'block' : 'none';
    recalc();
}

function addRow(type, scenario) {
    const cont = document.getElementById(`${type}-cont-${scenario}`);
    const div = document.createElement('div');
    div.className = 'entry-row';
    if (type === 'inc') {
        div.innerHTML = `<select class="inc-type"><option value="w2">W2 Salary</option><option value="k1">Business/K-1</option><option value="passive">Passive</option></select>
                         <input type="number" class="inc-val" value="100000" oninput="recalc()">
                         <div class="del-btn" onclick="this.parentElement.remove(); recalc()">×</div>`;
    } else {
        div.innerHTML = `<select class="asset-type"><option value="def">Qualified (401k)</option><option value="tax">Non-Qualified</option><option value="roth">Roth</option></select>
                         <input type="number" class="asset-val" value="50000" oninput="recalc()">
                         <div class="del-btn" onclick="this.parentElement.remove(); recalc()">×</div>`;
    }
    cont.appendChild(div);
    recalc();
}

function recalc() {
    const getP = (s) => ({
        ageNow: parseInt(document.getElementById(`age-now-${s}`).value) || 35,
        ageRet: parseInt(document.getElementById(`age-ret-${s}`).value) || 65,
        status: document.getElementById(`status-${s}`).value,
        deps: parseInt(document.getElementById(`deps-${s}`).value) || 0,
        incomes: Array.from(document.querySelectorAll(`#inc-cont-${s} .entry-row`)).map(r => ({ type: r.querySelector('.inc-type').value, val: parseFloat(r.querySelector('.inc-val').value) })),
        assets: Array.from(document.querySelectorAll(`#asset-cont-${s} .entry-row`)).map(r => ({ type: r.querySelector('.asset-type').value, val: parseFloat(r.querySelector('.asset-val').value) }))
    });

    const resA = BASTION_ENGINE.run(getP('a'));
    const resB = BASTION_ENGINE.run(getP('b'));
    
    document.getElementById('logic-content').innerHTML = BASTION_ENGINE.getAudit(getP('a'), resA);
    if (document.getElementById('analytics-tab').style.display !== 'none') render(resA, resB);
}

function render(a, b) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (mainChart) mainChart.destroy();
    const datasets = [{ label: 'Scenario A', data: a.timeline.map(d=>d.v), borderColor: '#38bdf8', tension: 0.3 }];
    if (currentMode === 'compare') datasets.push({ label: 'Scenario B', data: b.timeline.map(d=>d.v), borderColor: '#f43f5e', tension: 0.3 });
    mainChart = new Chart(ctx, { type: 'line', data: { labels: a.timeline.map(d=>d.age), datasets }, options: { responsive: true, maintainAspectRatio: false } });
}

window.onload = () => { ['inc','asset'].forEach(t => addRow(t, 'a')); recalc(); };
