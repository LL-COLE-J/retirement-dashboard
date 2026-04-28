const BASTION_ENGINE = {
    // Original 2026 Engine Core (Locked)
    getTaxWork(income, state, status) {
        const deduction = status === 'married' ? 32200 : 16100;
        const taxableFed = Math.max(0, income - deduction);
        const fica = (Math.min(income, 184500) * 0.062) + (income * 0.0145);
        let fedTax = taxableFed > 0 ? taxableFed * 0.22 : 0; 
        const total = fedTax + fica;
        return { total, effRate: (total / income) * 100 };
    },

    // New Life-Cycle Processor
    runLifeCycleProjection(p) {
        let currentAssets = p.startingAssets;
        const timeline = [];
        const growthRate = 0.07; // 7% Market Growth
        const generalInflation = 0.03; // 3% Purchasing Power Drag

        for (let age = p.ageNow; age <= p.ageEnd; age++) {
            const isRetired = age >= p.ageRetire;
            const hasSS = age >= p.ssAge;

            // Calculate current year inflated expenses
            let yearExpenses = p.expenses.reduce((sum, exp) => {
                return sum + (exp.amount * Math.pow(1 + exp.inflation, age - p.ageNow));
            }, 0);

            let netCashFlow = 0;
            if (!isRetired) {
                // In Savings Phase: Assume $125k income, 15% savings rate
                const income = 125000;
                netCashFlow = income * 0.15;
            } else {
                // In Withdrawal Phase: Expenses minus Social Security
                const ssIncome = hasSS ? p.ssBenefit : 0;
                netCashFlow = ssIncome - yearExpenses;
            }

            // Apply compounding growth minus inflation drag
            currentAssets = (currentAssets + netCashFlow) * (1 + (growthRate - generalInflation));

            timeline.push({
                age: age,
                wealth: Math.max(0, Math.round(currentAssets)),
                expenses: yearExpenses
            });
        }
        return timeline;
    }
};
