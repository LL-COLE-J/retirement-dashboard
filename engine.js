const BASTION_ENGINE = {
    // 2026 Brackets (Projected after TCJA sunset)
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
        return {
            total: totalTax + fica,
            taxable: taxable,
            rate: ((totalTax + fica) / income) * 100
        };
    },

    // FIXED: Removed nested function syntax error and switched to CoinLore for CORS stability
    async fetchPrice(ticker) {
        try {
            // CoinLore is more reliable for "no-budget" GitHub Pages deployments
            const response = await fetch(`https://api.coinlore.net/api/tickers/`);
            const data = await response.json();
            
            // Find the asset by symbol (e.g., BTC, ETH)
            const asset = data.data.find(c => c.symbol === ticker.toUpperCase());
            
            if (asset) {
                return parseFloat(asset.price_usd);
            } else {
                throw new Error("Asset not found in top 100");
            }
        } catch (e) {
            console.error("Ticker Fetch Failed:", e);
            return null;
        }
    }
};
