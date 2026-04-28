const BASTION_ENGINE = {
    // Models 2026 Progressive Taxation + FICA
    calculateTaxes(income) {
        const fica = income * 0.0765;
        const deduction = 14600; // Standard single
        const taxable = Math.max(0, income - deduction);
        
        let federal = 0;
        if (taxable > 0) {
            if (taxable <= 11600) federal = taxable * 0.10;
            else if (taxable <= 47150) federal = 1160 + (taxable - 11600) * 0.12;
            else federal = 5426 + (taxable - 47150) * 0.22; // Sunset modeling
        }
        return federal + fica;
    },

    runFullProjection(p) {
        let currentWealth = p.assets;
        const timeline = [];
        const yearsToSimulate = 90 - p.currentAge;
        
        for (let i = 0; i <= yearsToSimulate; i++) {
            const age = p.currentAge + i;
            const isRetired = age >= p.retireAge;
            
            // Adjust for Inflation (Real Dollars)
            const realReturn = (p.returnRate - p.inflationRate) / 100;
            
            if (!isRetired) {
                // Accumulation Phase
                currentWealth = (currentWealth + p.annualSave) * (1 + realReturn);
            } else {
                // Retirement Phase: 4% Rule Drawdown + Social Security assumption
                const socSec = 24000; // Estimated inflation-adjusted SS
                const withdrawal = currentWealth * 0.04; 
                currentWealth = (currentWealth - (withdrawal/12)) * (1 + (realReturn/2));
            }

            timeline.push({ age: age, wealth: Math.round(currentWealth) });
        }
        return timeline;
    }
};
