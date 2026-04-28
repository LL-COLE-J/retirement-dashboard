function runCalculations() {
    const income = parseFloat(document.getElementById('income-input').value) || 0;
    const status = document.getElementById('filing-status').value;
    const res = BASTION_ENGINE.calculateTax(income, status);

    document.getElementById('tax-estimate-display').innerText = `$${Math.round(res.total).toLocaleString()} /yr`;
    document.getElementById('advisor-insight').innerHTML = `
        Your <strong>${status}</strong> filing results in a liability including FICA. <br><br>
        <strong>Insight:</strong> With a taxable base of $${Math.round(res.taxable).toLocaleString()}, optimizing your tax-advantaged accounts is key.
    `;
}

async function refreshTicker() {
    const sym = document.getElementById('ticker-input').value || 'BTC';
    const out = document.getElementById('ticker-output');
    out.innerText = "REFRESHING...";
    const price = await BASTION_ENGINE.fetchPrice(sym);
    out.innerText = price ? `$${price.toLocaleString()}` : "NOT FOUND";
}

function switchTab(tabId) {
    const tabs = ['financials', 'markets']; // Add 'dashboard' etc as you build them
    tabs.forEach(t => {
        const el = document.getElementById(t + '-tab');
        if (el) el.style.display = (t === tabId) ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.toggle('active', nav.innerText.toLowerCase() === tabId);
    });
}

window.onload = runCalculations;
