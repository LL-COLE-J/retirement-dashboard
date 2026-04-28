let wealthChart;
let savedModels = JSON.parse(localStorage.getItem('bastion_models')) || {};

function addRow(containerId, inputClass) {
    const container = document.getElementById(containerId);
    const div = document.createElement('div');
    div.className = 'entry-row';
    const options = containerId === 'asset-container' 
        ? ['Stocks', 'Bonds', 'CDs', 'Brokerage', 'Real Estate', 'Other'] 
        : ['Housing', 'Food', 'Auto', 'Debt', 'Insurance', 'Other'];
    
    div.innerHTML = `
        <select>${options.map(o => `<option>${o}</option>`).join('')}</select>
        <input type="number" class="${inputClass}" placeholder="0" oninput="recalc()">
        <div class="del-btn" onclick="this.parentElement.remove(); recalc()">×</div>
    `;
    container.appendChild(div);
}

function recalc() {
    // Collect Aggregate Totals
    const totalInc = 125000; // Static placeholder or add income row logic
    const totalAssets = Array.from(document.querySelectorAll('.asset-input')).reduce((s, i) => s + (parseFloat(i.value) || 0), 0);
    const totalExp = Array.from(document.querySelectorAll('.exp-input')).reduce((s, i) => s + (parseFloat(i.value) || 0), 0) * 12;

    const state = document.getElementById('state-select').value;
    
    // Core Engine Call (Strict Implementation)
    const taxData = BASTION_ENGINE.getTaxWork(totalInc, state, 'single');
    const projection = BASTION_ENGINE.runProjection({ income: totalInc, stressors: {} });

    // Update UI
    document.getElementById('val-eff-rate').innerText = `${taxData.effRate.toFixed(1)}%`;
    document.getElementById('val-terminal').innerText = `$${projection[projection.length-1].wealth.toLocaleString()}`;
    document.getElementById('logic-content').innerHTML = taxData.work;
}

// Persistance logic
function saveModel() {
    const name = prompt("Name this scenario:");
    if (!name) return;
    savedModels[name] = {
        state: document.getElementById('state-select').value,
        assets: Array.from(document.querySelectorAll('.asset-input')).map(i => i.value),
        expenses: Array.from(document.querySelectorAll('.exp-input')).map(i => i.value)
    };
    localStorage.setItem('bastion_models', JSON.stringify(savedModels));
    renderList();
}

function renderList() {
    const list = document.getElementById('scenario-list');
    list.innerHTML = Object.keys(savedModels).map(n => `
        <div style="background:rgba(255,255,255,0.05); padding:8px; border-radius:4px; margin-bottom:5px; font-size:12px; cursor:pointer" onclick="loadModel('${n}')">${n}</div>
    `).join('');
}

window.onload = () => { renderList(); recalc(); };
