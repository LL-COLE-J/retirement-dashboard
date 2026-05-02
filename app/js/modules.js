/* ==========================================================================
   MODULES.JS - Bastion Advisor Intelligence / Phase 2.9
   Works with current engine.js + ui.js model
   ========================================================================== */

function getAdvisorAnalysis(p, res) {
  const income = p.incomes.reduce((s, i) => s + Number(i.val || 0), 0);
  const assets = p.assets.reduce((s, a) => s + Number(a.val || 0), 0);
  const yearsToRetire = Math.max(0, p.ageRet - p.ageNow);

  const insights = [];
  let status = "Stable";

  if (income <= 0) {
    status = "At Risk";
    insights.push("Income is missing. Add income before relying on the projection.");
  }

  if (assets < income * 0.5 && p.ageNow >= 40) {
    status = "Watch";
    insights.push("Assets appear low compared with income and age. Retirement funding pressure may increase.");
  }

  if (yearsToRetire <= 5) {
    status = "High Priority";
    insights.push("Retirement is close. Liquidity, tax order, and withdrawal timing matter more now.");
  }

  if (res.terminal < 0) {
    status = "At Risk";
    insights.push("Projection ends below zero. Spending, retirement age, or savings assumptions need adjustment.");
  }

  if (res.totalTax > 250000) {
    insights.push("Projected tax drag is meaningful. Bastion should evaluate Roth, taxable, and traditional withdrawal order.");
  }

  if (!insights.length) {
    insights.push("No immediate red flag detected. Next step is deeper tax and life-event modeling.");
  }

  return {
    status,
    yearsToRetire,
    income,
    assets,
    primaryAction: insights[0],
    insights
  };
}

function renderAdvisorPanel(p, res) {
  let panel = document.getElementById("advisor-panel");

  if (!panel) {
    panel = document.createElement("div");
    panel.id = "advisor-panel";
    panel.className = "card";
    document.querySelector(".main").appendChild(panel);
  }

  const a = getAdvisorAnalysis(p, res);

  panel.innerHTML = `
    <h3>Advisor Intelligence</h3>
    <div><b>Status:</b> ${a.status}</div>
    <div><b>Years to Retirement:</b> ${a.yearsToRetire}</div>
    <div><b>Primary Move:</b> ${a.primaryAction}</div>
    <br>
    <ul>
      ${a.insights.map(i => `<li>${i}</li>`).join("")}
    </ul>
  `;
}

function renderProfilePanel(p) {
  let panel = document.getElementById("profile-panel");

  if (!panel) {
    panel = document.createElement("div");
    panel.id = "profile-panel";
    panel.className = "card";
    document.querySelector(".main").appendChild(panel);
  }

  panel.innerHTML = `
    <h3>Profile Summary</h3>
    <div><b>Age Now:</b> ${p.ageNow}</div>
    <div><b>Retirement Age:</b> ${p.ageRet}</div>
    <div><b>Filing Status:</b> ${p.status}</div>
    <div><b>Income Streams:</b> ${p.incomes.length}</div>
    <div><b>Asset Accounts:</b> ${p.assets.length}</div>
  `;
}
