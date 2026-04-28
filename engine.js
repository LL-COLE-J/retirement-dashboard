/* ==========================================================================
   ENGINE.JS - The Mathematical Core
   ========================================================================== */
let state = {
    incomes: [],   
    expenses: [],  
    accounts: [
        {type: "401k", balance: 0, contrib: 0, match: 3},
        {type: "Roth IRA", balance: 0, contrib: 0, match: 0},
        {type: "Brokerage", balance: 0, contrib: 0, match: 0}
    ],
    assets: { cash: 0, invest: 0, debt: 0 },
    filing: "single",
    assumptions: {
        inflation: 2.5,
        currentAge: 40,
        retirementAge: 65,
        lifeExpectancy: 90
    },
    tickers: ["AAPL"]
};

const norm = (a, f) => (parseFloat(a) || 0) * (f === "monthly" ? 12 : f === "biweekly" ? 26 : 1);

function calculateBase() {
    let income = state.incomes.reduce((s, i) => s + norm(i.amount, i.freq), 0);
    let expenses = state.expenses.reduce((s, e) => s + norm(e.amount, e.freq), 0);
    let totalSavings = state.accounts.reduce((s, a) => s + (parseFloat(a.contrib) * 12 || 0), 0);
    
    // Simple Tax Pro Logic (Estimating 22% effective for planning)
    let taxableIncome = Math.max(0, income - 14600); // Standard deduction proxy
    let estTax = taxableIncome * 0.22; 

    let netWorth = (parseFloat(state.assets.cash) || 0) + 
                   state.accounts.reduce((s, a) => s + (parseFloat(a.balance) || 0), 0) - 
                   (parseFloat(state.assets.debt) || 0);

    return { 
        grossIncome: income, 
        netIncome: income - estTax,
        expenses, 
        netWorth, 
        savingsRate: income > 0 ? (totalSavings / income) * 100 : 0,
        surplus: (income - estTax) - expenses - totalSavings
    };
}
