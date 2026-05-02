function calc(p){

  let income = p.income.reduce((a,b)=>a+b,0);
  let assets = p.assets.reduce((a,b)=>a+b,0);

  let tax = income * 0.2;

  return {
    wealth: assets,
    tax: tax
  };
}
