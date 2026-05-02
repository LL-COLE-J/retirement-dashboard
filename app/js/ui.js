function addIncome(){
  let row = document.createElement("div");

  row.innerHTML = `
    <input class="incomeVal" value="0">
  `;

  document.getElementById("incomeRows").appendChild(row);
  render();
}

function addAsset(){
  let row = document.createElement("div");

  row.innerHTML = `
    <input class="assetVal" value="0">
  `;

  document.getElementById("assetRows").appendChild(row);
  render();
}

function render(){

  let p = normalize();
  let r = calc(p);

  // ===== Core Results =====
  document.getElementById("results").innerHTML = `
    Income: $${r.income}<br>
    Net Income: $${r.net}<br>
    Total Wealth: $${r.assets}<br>
    Projected: $${Math.round(r.projected)}<br>
    Tax: $${Math.round(r.tax)}
  `;

  // ===== AI Insight =====
  let metrics = {
    terminalWealth: r.projected,
    dti: r.dti,
    marketCrash: false,
    taxHike: false
  };

  if (typeof BASTION_AI !== "undefined") {
    let insight = BASTION_AI.generateInsight(metrics);
    document.getElementById("insight").innerText = insight;
  }
}

// Better event handling
document.addEventListener("input", render);

// Initial render
window.onload = () => {
  render();
};
