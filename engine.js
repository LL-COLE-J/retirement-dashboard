const BASTION_PRO = {
    // 2026 Brackets
    getTax(income, isHike) {
        const rate = isHike ? 0.28 : 0.22; // Modeling the jump
        const fica = 0.0765;
        return income * (rate + fica);
    },

    runProjection(params) {
        let currentWealth = params.initialAssets;
        const dataPoints = [];
        const annualSavings = params.income * 0.15; 
        
        for (let year = 1; year <= 30; year++) {
            let returnRate = params.returnRate / 100;
            
            // Stress Test: Year 1 Market Crash
            if (params.marketCrash && year === 1) {
                returnRate = -0.20;
            }

            const growth = currentWealth * returnRate;
            // Apply tax drag on growth for taxable portion
            const taxDrag = params.taxHike ? 0.20 : 0.15;
            const netGrowth = growth - (growth * 0.30 * taxDrag); // Assume 30% turnover

            currentWealth = currentWealth + netGrowth + annualSavings;
            dataPoints.push(Math.round(currentWealth));
        }
        return dataPoints;
    }
};
