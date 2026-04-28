const BASTION_PRO = {
    // 2026 Sunsetting Tax Brackets
    getTax(income, status) {
        const deduction = status === 'married' ? 29200 : 14600;
        const taxable = Math.max(0, income - deduction);
        let tax = 0;
        
        // Simplified Progressive Logic for 2026
        const rates = status === 'married' ? [0.10, 0.15, 0.25, 0.28] : [0.10, 0.15, 0.25, 0.28];
        const limits = status === 'married' ? [23200, 94300, 201050] : [11600, 47150, 100525];

        let prevLimit = 0;
        for (let i = 0; i < limits.length; i++) {
            if (taxable > prevLimit) {
                tax += (Math.min(taxable, limits[i]) - prevLimit) * rates[i];
                prevLimit = limits[i];
            }
        }
        if (taxable > prevLimit) tax += (taxable - prevLimit) * rates[rates.length - 1];

        return tax + (income * 0.0765); // Includes FICA
    },

    getDTI(annualGross, monthlyDebt) {
        const monthlyGross = annualGross / 12;
        return (monthlyDebt / monthlyGross) * 100;
    },

    getLiquidityRatio(cash, monthlyDebt) {
        return monthlyDebt > 0 ? (cash / monthlyDebt) : 0;
    }
};
