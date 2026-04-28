const BASTION_ENGINE = {
    getTaxWork(income, state, status) {
        let work = `[2026 TAX DERIVATION REPORT]\n\n`;
        const deduction = status === 'married' ? 32200 : 16100;
        const taxableFed = Math.max(0, income - deduction);
        
        // FICA: 6.2% up to $184,500 + 1.45% Medicare
        const ssBase = 184500;
        const ssTax = Math.min(income, ssBase) * 0.062;
        const medTax = income * 0.0145;
        const fica = ssTax + medTax;
        
        // 2026 Federal Brackets (Inflation-Adjusted Projections)
        let fedTax = 0;
        const fedBrackets = status === 'married' ? [
            { l: 24800, r: 0.10 }, { l: 100800, r: 0.12 }, { l: 211400, r: 0.22 }, { l: 403550, r: 0.24 }
        ] : [
            { l: 12400, r: 0.10 }, { l: 50400, r: 0.12 }, { l: 105700, r: 0.22 }, { l: 201775, r: 0.24 }
        ];

        let remFed = taxableFed;
        let lastL = 0;
        work += `<span>FEDERAL CALCULATION:</span>\n`;
        fedBrackets.forEach(b => {
            const chunk = Math.max(0, Math.min(remFed, b.l - lastL));
            if (chunk > 0) {
                const bTax = chunk * b.r;
                work += `$${Math.round(chunk).toLocaleString()} @ ${(b.r*100)}% = $${Math.round(bTax).toLocaleString()}\n`;
                fedTax += bTax;
            }
            lastL = b.l;
            remFed -= chunk;
        });

        // State Logic
        let stateTax = 0;
        work += `\n<span>STATE CALCULATION (${state}):</span>\n`;
        if (['TN', 'FL'].includes(state)) {
            work += `Jurisdiction exempt from state income tax.\n`;
        } else if (state === 'CA') {
            const caBrackets = [{l:10756,r:.01},{l:25499,r:.02},{l:40245,r:.04},{l:55866,r:.06},{l:70606,r:.08},{l:Infinity,r:.093}];
            let remState = income; let sLast = 0;
            caBrackets.forEach(b => {
                const chunk = Math.max(0, Math.min(remState, b.l - sLast));
                if (chunk > 0) {
                    const sTax = chunk * b.r;
                    work += `$${Math.round(chunk).toLocaleString()} @ ${(b.r*100).toFixed(1)}% = $${Math.round(sTax).toLocaleString()}\n`;
                    stateTax += sTax;
                }
                sLast = b.l; remState -= chunk;
            });
        }
        
        const total = fedTax + fica + stateTax;
        return { total, effRate: (total / income) * 100, work: work + `\nTotal Liability: $${Math.round(total).toLocaleString()}` };
    },

    runProjection(income, assets, rate, inflation) {
        let current = assets;
        const timeline = [];
        const realRate = (rate - inflation) / 100;
        for (let i = 0; i <= 30; i++) {
            current = (current + (income * 0.15)) * (1 + realRate);
            timeline.push(Math.round(current));
        }
        return timeline;
    }
};
