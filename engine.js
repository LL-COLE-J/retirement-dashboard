const BASTION_ENGINE = {
    runLifeCycleProjection(p) {
        let buckets = {
            deferred: p.assets.filter(a => a.type === 'deferred').reduce((s, a) => s + a.value, 0),
            taxable: p.assets.filter(a => a.type === 'taxable').reduce((s, a) => s + a.value, 0),
            taxfree: p.assets.filter(a => a.type === 'taxfree').reduce((s, a) => s + a.value, 0)
        };

        const timeline = [];
        const growth = 0.07;
        const inflation = 0.03;

        for (let age = p.ageNow; age <= 90; age++) {
            const isRetired = age >= p.ageRetire;
            const currentExpenses = p.expenses * Math.pow(1 + inflation, age - p.ageNow);
            let taxPaid = 0;
            let passive = (buckets.taxable + buckets.taxfree) * 0.04; // 4% Rule simulation

            if (!isRetired) {
                buckets.deferred += (p.income * 0.15);
            } else {
                let draw = currentExpenses;
                // Simple Tax logic for withdrawals
                if(buckets.taxable > draw) {
                    buckets.taxable -= draw;
                } else {
                    let rem = draw - buckets.taxable;
                    buckets.taxable = 0;
                    taxPaid = rem * 0.20;
                    buckets.deferred -= (rem + taxPaid);
                }
            }

            buckets.deferred *= (1 + growth);
            buckets.taxable *= (1 + (growth - 0.01)); // Tax drag
            buckets.taxfree *= (1 + growth);

            timeline.push({
                age,
                total: Math.round(buckets.deferred + buckets.taxable + buckets.taxfree),
                expenses: Math.round(currentExpenses),
                passiveIncome: Math.round(passive),
                taxPaid: taxPaid
            });
        }
        return timeline;
    }
};
