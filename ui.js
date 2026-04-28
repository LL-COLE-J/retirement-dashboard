// ui.js
let chart;

function updateAll() {
    const income = parseFloat(document.getElementById('income-input').value) || 0;
    const status = document.getElementById('filing-status').value;
    const res = BASTION_ENGINE.calculateTax(income, status);

    // Update Advisor Lab
    document.getElementById('tax-display').innerText = `$${Math.round(res.total).toLocaleString()}`;
    document.getElementById('rate-display').innerText = `${res.rate.toFixed(1)}% Effective`;
    
    document.getElementById('ai-insight').innerHTML = `
        Your <strong>2026 strategy</strong> shows a taxable base of $${Math.round(res.taxable).toLocaleString()}. 
        <br><br><strong>Pro Tip:</strong> At your current bracket, a $10k 401k contribution would reduce your tax bill by ~$2,500.
    `;

    renderChart(income, res.total);
}

function renderChart(income, tax) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    const net = income - tax;
    const data = [];
    let wealth = 0;

    for (let i = 0; i <= 20; i++) {
        wealth = (wealth + (net * 0.2)) * 1.07; // 20% savings rate @ 7% return
        data.push(wealth);
    }

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 21}, (_, i) => 2026 + i),
            datasets: [{ label: 'Wealth Path', data: data, borderColor: '#1e293b', fill: true, tension: 0.4 }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

async function refreshTicker() {
    const id = document.getElementById('ticker-input').value;
    const out = document.getElementById('ticker-output');
    out.innerText = "LOADING...";
    
    const price = await BASTION_ENGINE.fetchPrice(id);
    if (price) {
        out.innerText = `$${price.toLocaleString()}`;
    } else {
        out.innerText = "ASSET NOT FOUND";
    }
}

function switchTab(tabId, el) {
    ['dashboard', 'financials', 'markets'].forEach(t => {
        document.getElementById(t + '-tab').style.display = (t === tabId) ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
}

// Startup
window.onload = updateAll;
