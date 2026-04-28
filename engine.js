// engine.js
const BASTION_ENGINE = {
    // 2026 Brackets (Projected after TCJA sunset)
    brackets: {
        single: [
            { threshold: 0, rate: 0.10 },
            { threshold: 11600, rate: 0.15 }, // Rate jump in 2026
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
        
        // Add FICA (Social Security 6.2% + Medicare 1.45%)
        const fica = income * 0.0765;
        return {
            total: totalTax + fica,
            taxable: taxable,
            rate: ((totalTax + fica) / income) * 100
        };
    },

    async fetchPrice(id) {
        try {
            // CoinGecko allows browser-side fetching without CORS blocks for simple price checks
            const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id.toLowerCase()}&vs_currencies=usd`);
            const data = await res.json();
            return data[id.toLowerCase()].usd;
        } catch (e) {
            console.error("Engine Error: Ticker Fetch Failed", e);
            return null;
        }
    }
};
