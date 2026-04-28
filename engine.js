// engine.js
const TAX_2026 = {
    single: { deduction: 14600, brackets: [{limit: 11600, rate: 0.10}, {limit: 47150, rate: 0.12}, {limit: 100525, rate: 0.22}] },
    married: { deduction: 29200, brackets: [{limit: 23200, rate: 0.10}, {limit: 94300, rate: 0.12}, {limit: 201050, rate: 0.22}] }
};

function calculateTaxes(income, status) {
    const config = TAX_2026[status];
    const taxable = Math.max(0, income - config.deduction);
    let tax = 0;
    let lastLimit = 0;

    for (const b of config.brackets) {
        if (taxable > lastLimit) {
            const amountInBracket = Math.min(taxable - lastLimit, b.limit - lastLimit);
            tax += amountInBracket * b.rate;
        }
        lastLimit = b.limit;
    }
    // Add FICA (7.65%)
    return tax + (income * 0.0765);
}

// FIXED: Uses a CORS-friendly public API instead of Binance
async function getMarketData(symbol) {
    try {
        const res = await fetch(`https://api.coinlore.net/api/ticker/?id=90`); // BTC price example
        const data = await res.json();
        return data[0].price_usd;
    } catch (e) {
        console.error("Fetch error:", e);
        return null;
    }
}
