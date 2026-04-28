const BASTION_ENGINE = {
    getTaxWork(income, state, status) {
        let work = `[2026 TAX DERIVATION REPORT]\n\n`;
        const deduction = status === 'married' ? 32200 : 16100;
        const taxableFed = Math.max(0, income - deduction);
        const fica = (Math.min(income, 184500) * 0.062) + (income * 0.0145);
        
        let fedTax = taxableFed > 0 ? taxableFed * 0.22 : 0; 
        
        work += `<span>FEDERAL CALCULATION:</span>\nGross: $${income.toLocaleString()}\n- Deduction: $${deduction.toLocaleString()}\n+ FICA: $${Math.round(fica).toLocaleString()}\n= Est Fed: $${Math.round(fedTax + fica).toLocaleString()}\n\n`;

        let stateTax = 0;
        if (state === 'CA') {
            stateTax = income * 0.06;
            work += `<span>STATE CALCULATION (CA):</span>\nEst. Progressive: $${Math.round(stateTax).toLocaleString()}`;
        } else {
            work += `<span>STATE CALCULATION (${state}):</span>\nJurisdiction Tax Exempt.`;
        }
        
        const total = fedTax + fica + stateTax;
        return { total, effRate: (total / income) * 100, work };
    },

    runProjection(params) {
        let current = 150000; 
        const timeline = [];
        const realRate = (7 - 3) / 100; 
        
        for (let i = 0; i <= 30; i++) {
            let yearReturn = realRate;
            let yearSavings = params.income * 0.15;
            current = (current + yearSavings) * (1 + yearReturn);
            timeline.push({ year: 2026 + i, wealth: Math.max(0, Math.round(current)) });
        }
        return timeline;
    }
};
