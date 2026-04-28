const BASTION_ENGINE = {
    brackets: {
        single: [
            { threshold: 0, rate: 0.10 },
            { threshold: 11600, rate: 0.15 }, 
            { threshold: 47150, rate: 0.25 },
            { threshold: 100525, rate: 0.28 }
        ],
        married: [
            { threshold: 0, rate: 0.10 },
            { threshold: 23200, rate: 0.15 },
            { threshold: 94300, rate: 0.25 },
            { threshold: 201050, rate: 0.28 }
        ]
    },
    
    calculateTax(income, status) {
        const deduction = status === 'married' ? 29200 : 14600;
        const taxable = Math.max(0, income - deduction);
        const activeBrackets = this.brackets[status];
        let totalTax = 0;
        for (let i = 0; i < activeBrackets.length; i++) {
            const b = activeBrackets[i];
            const nextThreshold = activeBrackets[i + 1] ? activeBrackets[i + 1].threshold : Infinity;
            if (taxable > b.threshold) {
                const taxableInBracket = Math.min(taxable, nextThreshold) - b.threshold;
                totalTax += taxableInBracket * b.rate;
            }
        }
        const fica = income * 0.0765;
        return { total: totalTax + fica, taxable: taxable };
    },

    async fetchPrice(ticker) {
        try {
            const response = await fetch(`https://api.coinlore.net/api/tickers/`);
            const data = await response.json();
            const asset = data.data.find(c => c.symbol === ticker.toUpperCase());
            return asset ? parseFloat(asset.price_usd) : null;
        } catch (e) {
            console.error("Ticker fetch error", e);
            return null;
        }
    }
};
