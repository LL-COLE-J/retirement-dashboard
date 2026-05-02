function render(){

  const p = normalize();
  const r = calc(p);

  const ai = BASTION_AI.generateInsight({
    terminalWealth: r.wealth,
    dti: r.tax / (p.income.reduce((a,b)=>a+b,0) || 1)
  });

  document.getElementById("results").innerHTML = `
    Income: $${p.income.reduce((a,b)=>a+b,0)}
    <br>Net Income: $${p.income.reduce((a,b)=>a+b,0) - r.tax}
    <br>Total Wealth: $${r.wealth}
    <br>Projected: $${r.wealth * 1.05}
    <br>Tax: $${r.tax}
    <br><br>${ai}
  `;
}

/* ===== 2.9 ADDITIONS ===== */

function renderAdvisor(){

  const p = normalize();
  const income = p.income.reduce((a,b)=>a+b,0);
  const assets = p.assets.reduce((a,b)=>a+b,0);

  const savingsRate = income > 0 ? (income - (income*0.2)) / income : 0;

  let insight = "Stable";

  if(savingsRate < 0.1) insight = "Savings rate low";
  if(assets < income) insight = "Asset base weak";

  document.getElementById("advisor").innerHTML = `
    <strong>Advisor Intelligence</strong><br>
    Savings Rate: ${(savingsRate*100).toFixed(1)}%<br>
    Assets vs Income: ${assets > income ? "Strong" : "Weak"}<br>
    Insight: ${insight}
  `;
}

document.addEventListener("input", () => {
  render();
  renderAdvisor();
});

/* INIT */
render();
renderAdvisor();
