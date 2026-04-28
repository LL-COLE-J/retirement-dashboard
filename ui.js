function renderFinancials() {
    const taxes = calculateRobustTaxes();
    const gross = bastionState.income;
    
    // Planner Report UI
    document.getElementById('tax-report-ui').innerHTML = `
        <div class="report-row"><span>Gross Income</span> <span>$${gross.toLocaleString()}</span></div>
        <div class="report-row"><span>Estimated Fed</span> <span>-$${taxes.fed.toLocaleString()}</span></div>
        <div class="report-row"><span>State (${bastionState.residence})</span> <span>-$${taxes.state.toLocaleString()}</span></div>
        <div class="report-row"><span>FICA/SocSec</span> <span>-$${taxes.fica.toLocaleString()}</span></div>
        <hr>
        <div class="report-row total"><span>Net Take-Home</span> <span>$${(gross - taxes.total).toLocaleString()}</span></div>
        <div class="effective-badge">Effective Rate: ${((taxes.total/gross)*100).toFixed(1)}%</div>
    `;
}

async function refreshTicker() {
    const sym = document.getElementById('ticker-input').value || 'BTC';
    const output = document.getElementById('ticker-output');
    output.innerText = "LOADING...";
    
    const price = await getTickerData(sym);
    if (price) {
        output.innerHTML = `$${price.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    } else {
        output.innerText = "TICKER ERROR";
    }
}

function updateTaxProfile(key, val) {
    bastionState[key] = val;
    renderFinancials();
}

// Initial Load
window.onload = () => {
    renderFinancials();
};
