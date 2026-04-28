const BASTION_ENGINE = {
    getTaxWork(income, state, status) {
        let work = `[2026 TAX DERIVATION REPORT]\n\n`;
        const deduction = status === 'married' ? 32200 : 16100;
        const taxableFed = Math.max(0, income - deduction);
        const fica = (Math.min(income, 184500) * 0.062) + (income * 0.0145);
        let fedTax = taxableFed > 0 ? taxableFed * 0.22 : 0; 
        
        work += `FILING STATUS: ${status.toUpperCase()}\nGross: $${income.toLocaleString()}\nStandard Deduction: -$${deduction.toLocaleString()}\nFICA Tax: $${Math.round(fica).toLocaleString()}\nEst. Federal: $${Math.round(fedTax).toLocaleString()}\n\nSTATE: ${state} (Tax Exempt)`;
        
        const total = fedTax + fica;
        return { total, effRate: (total / income) * 100, work };
    },

    runLifeCycleProjection(p) {
        // Initialize asset buckets
        let buckets = {
            taxable: p.assets.filter(a => a.type === 'taxable').reduce((s, a) => s + a.value, 0),
            deferred: p.assets.filter(a => a.type === 'deferred').reduce((s, a) => s + a.value, 0),
            taxfree: p.assets.filter(a => a.type === 'taxfree').reduce((s, a) => s + a.value, 0)
        };

        const timeline = [];
        const baseGrowth = 0.07;
        const taxDrag = 0.015; // 1.5% annual drag on taxable accounts

        for (let age = p.ageNow; age <= p.ageEnd; age++) {
            const isRetired = age >= p.ageRetire;
            const hasSS = age >= p.ssAge;

            let yearExpenses = p.expenses.reduce((sum, exp) => {
                return sum + (exp.amount * Math.pow(1 + exp.inflation, age - p.ageNow));
            }, 0);

            let flow = 0;
            if (!isRetired) {
                flow = 125000 * 0.15; // Saving into deferred
                buckets.deferred += flow;
            } else {
                let ssIncome = hasSS ? p.ssBenefit : 0;
                let needed = yearExpenses - ssIncome;
                
                // Withdrawal Priority: Taxable -> Deferred -> TaxFree
                if (buckets.taxable >= needed) {
                    buckets.taxable -= needed;
                } else {
                    needed -= buckets.taxable;
                    buckets.taxable = 0;
                    buckets.deferred = Math.max(0, buckets.deferred - needed);
                }
            }

            // Apply Growth with Specific Tax Rules
            buckets.taxable *= (1 + (baseGrowth - taxDrag));
            buckets.deferred *= (1 + baseGrowth);
            buckets.taxfree *= (1 + baseGrowth);

            const total = buckets.taxable + buckets.deferred + buckets.taxfree;
            timeline.push({ age, totalWealth: Math.round(total), expenses: yearExpenses });
        }
        return timeline;
    }
};
