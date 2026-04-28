// ai-gate.js
const BASTION_AI = {
    generateInsight(metrics) {
        if (metrics.dti > 43) return "DTI exceeds qualified mortgage limits. Focus on debt consolidation before 2026 tax shifts.";
        if (metrics.liq < 3) return "Emergency reserves are below the 3-month floor. Liquidity is your primary risk factor.";
        
        // This is where you trigger the API call to OpenAI/Claude
        return "System analysis indicates a balanced profile. Ready for Monte Carlo stress testing?";
    }
};
