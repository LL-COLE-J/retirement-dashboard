const BASTION_ENGINE = {
    run(p) {
        let assets = { 
            def: p.assets.filter(a=>a.type==='def').reduce((s,a)=>s+a.val,0), 
            tax: p.assets.filter(a=>a.type==='tax').reduce((s,a)=>s+a.val,0),
            roth: p.assets.filter(a=>a.type==='roth').reduce((s,a)=>s+a.val,0)
        };
        const timeline = [];
        const totalInc = p.incomes.reduce((s,i)=>s+i.val,0);
        
        for (let age = p.ageNow; age <= 90; age++) {
            const isRet = age >= p.ageRet;
            if (!isRet) {
                assets.def += (totalInc * 0.10); // Standard savings
            } else {
                assets.tax -= 60000; // Standard $5k/mo draw
                if (assets.tax < 0) { assets.def += assets.tax; assets.tax = 0; }
            }
            assets.def *= 1.07;
            assets.tax *= 1.058; // Tax drag applied
            assets.roth *= 1.07;
            timeline.push({ age, v: Math.round(assets.def + assets.tax + assets.roth) });
        }
        return { timeline, totalInc };
    },
    getAudit(p, res) {
        const ded = p.status === 'married' ? 32200 : 16100;
        const taxInc = Math.max(0, res.totalInc - ded);
        const credit = p.deps * 2000;
        return `<b>[HOUSEHOLD AUDIT]</b>\nFiling Status: ${p.status.toUpperCase()}\nDependents: ${p.deps} (Credit: $${credit.toLocaleString()})\nStandard Deduction: -$${ded.toLocaleString()}\nTaxable Base: $${taxInc.toLocaleString()}\nEst. Federal Liability: $${Math.round(taxInc * 0.22 - credit).toLocaleString()}`;
    }
};
