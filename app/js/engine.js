
const BASTION_ENGINE = {
    run(p) {
        const standardDed = p.status === 'married' ? 32200 : 16100;
        const income = p.incomes.reduce((s, i) => s + i.val, 0);
        const taxableBase = Math.max(0, income - standardDed);
        let assets = p.assets.reduce((s, a) => s + a.val, 0);
        const timeline = [];
        let totalTax = 0;

        for (let age = p.ageNow; age <= 90; age++) {
            if (age < p.ageRet) assets *= 1.07;
            else { assets *= 1.04; assets -= 80000; totalTax += 15000; }
            timeline.push({ age, v: Math.round(assets) });
        }
        return { timeline, terminal: timeline[timeline.length - 1].v, totalTax, taxableBase, standardDed };
    },
    getAudit(p, res) {
        return `
<b>[HOUSEHOLD AUDIT]</b><br>
Filing Status: ${p.status.toUpperCase()}<br>
Dependents: ${document.getElementById('deps').value} (Credit: $0)<br>
Standard Deduction: -$${res.standardDed.toLocaleString()}<br>
Taxable Base: $${res.taxableBase.toLocaleString()}<br>
Est. Federal Liability: $${Math.round(res.taxableBase * 0.22).toLocaleString()}`;
    }
};
