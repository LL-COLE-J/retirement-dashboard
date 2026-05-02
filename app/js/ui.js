function addIncome(){
  let row = document.createElement("div");

  row.innerHTML = `
    <input class="incomeVal" value="0">
  `;

  document.getElementById("incomeRows").appendChild(row);
}

function addAsset(){
  let row = document.createElement("div");

  row.innerHTML = `
    <input class="assetVal" value="0">
  `;

  document.getElementById("assetRows").appendChild(row);
}

function render(){
  let p = normalize();
  let r = calc(p);

  document.getElementById("results").innerHTML = `
    Total Wealth: $${r.wealth}<br>
    Total Tax: $${r.tax}
  `;
}

document.addEventListener("input", render);
