const TAX_DB = {
    fed_2026: {
        single: [
            { limit: 11600, rate: 0.10 },
            { limit: 47150, rate: 0.12 },
            { limit: 100525, rate: 0.22 }
        ],
        married: [
            { limit: 23200, rate: 0.10 },
            { limit: 94300, rate: 0.12 },
            { limit: 201050, rate: 0.22 }
        ]
    }
};

function calculateTaxes(income, status) {
    const brackets = TAX_DB.fed_2026[status];
    let tax = 0;
    let remaining = Math.max(0, income - (status === 'married' ? 29200 : 14600)); // Standard Deduction

    for (let i = 0; i < brackets.length; i++) {
        const currentBracket = brackets[i];
        const prevLimit = i === 0 ? 0 : brackets[i-1].limit;
        const taxableInBracket = Math.min(remaining, currentBracket.limit - prevLimit);
        
        if (taxableInBracket <= 0) break;
        
        tax += taxableInBracket * currentBracket.rate;
        if (remaining <= (currentBracket.limit - prevLimit)) break;
    }
    
    // Add FICA (7.65%)
    tax += income * 0.0765;
    return tax;
}

// Fixed Ticker using a CORS-friendly API
async function getMarketData(symbol) {
    try {
        // Switching to CryptoCompare or similar which permits browser-side fetches
        const res = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol.toUpperCase()}&tsyms=USD`);
        const data = await res.json();
        return data.USD || null;
    } catch (err) {
        console.error("Ticker Error:", err);
        return null;
    }
}
