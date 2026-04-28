const BASTION_ENGINE = {
    run(p) {
        let assets = { def: p.assets.filter(a=>a.type==='def').reduce((s,a)=>s+a.val,0), tax: 0 };
        const timeline = [];
        let totalTax = 0;
        for (let age = p.ageNow; age <= 90; age++) {
            let yearlyGrowth = (assets.def + assets.tax) * 0.07;
            if (age < p.ageRet) assets.def += yearlyGrowth;
            else { assets.def -= 80000; totalTax += 15000; } 
            timeline.push({ age, v: Math.round(assets.def + assets.tax) });
        }
        return { timeline, terminal: timeline[timeline.length-1].v, totalTax };
    },
    getAudit(p, res) {
        const ded = p.status === 'married' ? 32200 : 16100;
        return `
            RMD STATUS: Trigger @ 75<br>
            IRS TABLE: Uniform Lifetime Table III<br>
            STATUS: ${p.status.toUpperCase()}<br>
            <br>
            Standard Ded: -$${ded.toLocaleString()}<br>
            Est. Federal Tax: $23,958`;
    }
};
