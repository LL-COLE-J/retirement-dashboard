const BASTION_ENGINE = {
    // Uniform Lifetime Table (Divisors) starting at age 72
    irsDivisors: {
        72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2,
        81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9,
        90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4
    },

    getTaxWork(income, state, status) {
        const deduction = status === 'married' ? 32200 : 16100;
        const taxableFed = Math.max(0, income - deduction);
        let fedTax = taxableFed > 0 ? taxableFed * 0.22 : 0; 
        let work = `Standard Ded: -$${deduction.toLocaleString()}\nEst. Federal Tax: $${Math.round(fedTax).toLocaleString()}`;
        return { total: fedTax, work };
    },

    runLifeCycleProjection(p) {
        let buckets = {
            deferred: p.assets.filter(a => a.type === 'deferred').reduce((s, a) => s + a.value, 0),
            taxable: p.assets.filter(a => a.type === 'taxable').reduce((s, a) => s + a.value, 0),
            taxfree: p.assets.filter(a => a.type === 'taxfree').reduce((s, a) => s + a.value, 0)
        };

        const timeline = [];
        const growth = 0.07;
        const taxDrag = 0.012; 

        for (let age = p.ageNow; age <= p.ageEnd; age++) {
            const isRetired = age >= p.ageRetire;
            const yearsIn = age - p.ageNow;

            // 1. Inflation
            let yearExpenses = p.expenses.reduce((sum, exp) => sum + (exp.amount * Math.pow(1 + exp.inflation, yearsIn)), 0);

            // 2. RMD Check (Uses dynamic divisor or defaults to 10 if age > 100)
            let rmdAmount = 0;
            if (age >= p.rmdAge) {
                let divisor = this.irsDivisors[age] || 10;
                rmdAmount = buckets.deferred / divisor;
            }

            // 3. Flow Logic
            if (!isRetired) {
                buckets.deferred += (125000 * 0.15); // Pre-tax savings phase
            } else {
                let ssIncome = (age >= p.ssAge) ? p.ssBenefit : 0;
                let gap = yearExpenses - ssIncome;

                // Handle forced RMD first
                if (rmdAmount > 0) {
                    let rmdNet = rmdAmount * 0.80; // 20% flat tax simulation
                    if (rmdNet >= gap) {
                        buckets.taxable += (rmdNet - gap);
                        buckets.deferred -= rmdAmount;
                        gap = 0;
                    } else {
                        gap -= rmdNet;
                        buckets.deferred -= rmdAmount;
                    }
                }

                // If gap remains, drain taxable -> deferred -> taxfree
                if (gap > 0) {
                    let fromTaxable = Math.min(buckets.taxable, gap);
                    buckets.taxable -= fromTaxable;
                    gap -= fromTaxable;
                }
                if (gap > 0) {
                    let fromDef = Math.min(buckets.deferred, gap / 0.8);
                    buckets.deferred -= fromDef;
                    gap = 0;
                }
            }

            // 4. Compounding
            buckets.deferred *= (1 + growth);
            buckets.taxable *= (1 + (growth - taxDrag));
            buckets.taxfree *= (1 + growth);

            timeline.push({ age, total: Math.round(buckets.deferred + buckets.taxable + buckets.taxfree) });
        }
        return timeline;
    }
};
