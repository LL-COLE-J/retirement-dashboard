const BASTION_PRO = {
    runProjection(params) {
        let currentWealth = params.initialAssets;
        const dataPoints = [];
        const annualSavings = params.income * 0.15; 
        
        for (let year = 1; year <= 30; year++) {
            let returnRate = 0.07;
            if (params.marketCrash && year === 1) returnRate = -0.20;

            const growth = currentWealth * returnRate;
            const taxDrag = params.taxHike ? 0.25 : 0.15;
            const netGrowth = growth - (growth * 0.20 * taxDrag);

            currentWealth = currentWealth + netGrowth + annualSavings;
            dataPoints.push(Math.round(currentWealth));
        }
        return dataPoints;
    }
};
