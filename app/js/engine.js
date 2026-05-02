const BASTION_ENGINE = {
  run(p) {
    const status = p.status === 'married' ? 'married' : 'single';
    const standardDed = status === 'married' ? 32200 : 16100;
    const income = p.incomes.reduce((s, i) => s + Number(i.val || 0), 0);
    const taxableBase = Math.max(0, income - standardDed);
    let assets = p.assets.reduce((s, a) => s + Number(a.val || 0), 0);
    const timeline = [];
    let totalTax = 0;
    const annualSpend = Number(p.annualSpend || 80000);
    const annualTaxRate = status === 'married' ? 0.2 : 0.22;

    for (let age = p.ageNow; age <= 90; age++) {
      if (age < p.ageRet) assets *= 1.07;
      else {
        assets *= 1.04;
        const withdrawal = Math.min(Math.max(assets, 0), annualSpend);
        assets -= withdrawal;
        totalTax += Math.max(0, taxableBase * annualTaxRate);
      }
      timeline.push({ age, v: Math.round(assets) });
    }

    return { timeline, terminal: timeline[timeline.length - 1].v, totalTax, taxableBase, standardDed };
  },

  getAudit(p, res) {
    return `
<b>[HOUSEHOLD AUDIT]</b><br>
Filing Status: ${p.status.toUpperCase()}<br>
Dependents: ${Number(p.deps || 0)} (Credit: $0)<br>
Standard Deduction: -$${res.standardDed.toLocaleString()}<br>
Taxable Base: $${res.taxableBase.toLocaleString()}<br>
Est. Federal Liability: $${Math.round(res.taxableBase * 0.22).toLocaleString()}`;
  }
};
