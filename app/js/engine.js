function calc(p){

  // ===== Totals =====
  let income = p.income.reduce((a,b)=>a+b,0);
  let assets = p.assets.reduce((a,b)=>a+b,0);

  // ===== Basic tax logic (better than flat) =====
  let tax = 0;

  if (p.status === "single") {
    if (income < 50000) tax = income * 0.12;
    else if (income < 100000) tax = income * 0.18;
    else tax = income * 0.24;
  }

  if (p.status === "married_joint") {
    if (income < 80000) tax = income * 0.12;
    else if (income < 160000) tax = income * 0.18;
    else tax = income * 0.24;
  }

  // ===== Net income =====
  let net = income - tax;

  // ===== Simple projection =====
  let years = p.retire - p.age;
  let projected = assets;

  for(let i=0;i<years;i++){
    projected += net * 0.2;     // savings rate assumption
    projected *= 1.05;          // growth rate
  }

  // ===== DTI placeholder (we refine later) =====
  let dti = income > 0 ? (tax / income) * 100 : 0;

  return {
    income,
    assets,
    tax,
    net,
    projected,
    dti
  };
}
