function runCalculations() {
    const income = parseFloat(document.getElementById('income-input').value) || 0;
    const status = document.getElementById('filing-status').value;
    
    const taxTotal = calculateTaxes(income, status);
    
    document.getElementById('tax-estimate-display').innerText = 
        `Tax Estimate: $${Math.round(taxTotal).toLocaleString()} /yr`;
        
    const taxableIncome = income - (status === 'married' ? 29200 : 14600);
    document.getElementById('advisor-insight').innerHTML = 
        `Your <strong>${status}</strong> filing in <strong>TN</strong> results in a liability including FICA. <br><br>` +
        `Strategy: Since your taxable income is $${taxableIncome.toLocaleString()}, contributing to a 401k is highly recommended.`;
}

async function fetchPrice() {
    const sym = document.getElementById('ticker-input').value || 'BTC';
    const out = document.getElementById('ticker-output');
    out.innerText = "REFRESHING...";
    
    const price = await getMarketData(sym);
    if (price) {
        out.innerHTML = `$${price.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    } else {
        out.innerText = "TICKER NOT FOUND";
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-pane').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(tabId + '-tab').style.display = 'block';
    event.currentTarget.classList.add('active');
}

// Run on load
window.onload = runCalculations;
