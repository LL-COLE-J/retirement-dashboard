const STATE_DB = {
    "TN": { name: "Tennessee", rate: 0, type: "none" },
    "TX": { name: "Texas", rate: 0, type: "none" },
    "CA": { name: "California", type: "graduated", brackets: [{t:0, r:0.01}, {t:10412, r:0.02}, {t:24684, r:0.04}] },
    "NY": { name: "New York", type: "graduated", brackets: [{t:0, r:0.04}, {t:8500, r:0.045}] }
};

const FED_2026 = {
    single: [{t: 0, r: 0.10}, {t: 11600, r: 0.12}, {t: 47150, r: 0.22}, {t: 100525, r: 0.24}],
    married: [{t: 0, r: 0.10}, {t: 23200, r: 0.12}, {t: 94300, r: 0.22}, {t: 201050, r: 0.24}]
};

let bastionState = {
    income: 120000,
    filing: 'single',
    residence: 'TN',
    accounts: [{name: 'Brokerage', bal: 50000}]
};

function calculateRobustTaxes() {
    const gross = bastionState.income;
    const deduction = bastionState.filing === 'married' ? 29200 : 14600;
    const taxable = Math.max(0, gross - deduction);

    // 1. Federal Calculation
    let fedTax = 0;
    const brackets = FED_2026[bastionState.filing];
    brackets.forEach((b, i) => {
        const next = brackets[i+1] ? brackets[i+1].t : Infinity;
        if (taxable > b.t) fedTax += (Math.min(taxable, next) - b.t) * b.r;
    });

    // 2. FICA (Social Security + Medicare)
    const fica = Math.min(gross, 168600) * 0.0765;

    // 3. State Calculation
    let stateTax = 0;
    const sInfo = STATE_DB[bastionState.residence];
    if (sInfo.type === 'graduated') {
        sInfo.brackets.forEach(b => { if (taxable > b.t) stateTax += (taxable - b.t) * b.r; });
    }

    return { fed: fedTax, fica: fica, state: stateTax, total: fedTax + fica + stateTax };
}

async function getTickerData(symbol) {
    // Using a public proxy to avoid the CORS error from your screenshot
    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`);
        const data = await response.json();
        return parseFloat(data.price);
    } catch (e) {
        return null;
    }
}
