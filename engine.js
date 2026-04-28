const BASTION_ENGINE = {
    runProjection(p) {
        let total = 250000; // Baseline starting assets
        const timeline = [];
        const baseGrowth = 0.07;
        const inflation = 0.03;

        for (let age = p.age; age <= 90; age++) {
            const isRetired = age >= 65;
            
            // Apply volatility (random variance if vol > 0)
            const randomShock = (Math.random() - 0.5) * p.volatility;
            const actualGrowth = baseGrowth + randomShock;

            const yearlyExp = (p.expenses * 12) * Math.pow(1 + inflation, age - p.age);

            if (!isRetired) {
                total += (125000 * 0.15); // Savings
            } else {
                total -= yearlyExp;
            }

            total *= (1 + actualGrowth);
            if (total < 0) total = 0;

            timeline.push({ age, total: Math.round(total) });
        }
        return timeline;
    }
};
