function norm(a,f){
  return a*(f==="monthly"?12:f==="biweekly"?26:1);
}

/* TAX */
function calcTax(income, filing){
  let brackets={
    single:[[10000,0.1],[40000,0.12],[85000,0.22]],
    married_joint:[[20000,0.1],[80000,0.12],[170000,0.22]],
    head:[[15000,0.1],[55000,0.12],[90000,0.22]]
  };

  let tax=0,prev=0;
  for(let [limit,rate] of brackets[filing]){
    if(income>limit){
      tax+=(limit-prev)*rate;
      prev=limit;
    }else{
      tax+=(income-prev)*rate;
      break;
    }
  }
  return tax;
}

/* CORE CALC */
function calculate(){

  let income = state.incomes.reduce((s,i)=>s+norm(i.amount,i.freq),0);

  let expenses = state.expenses.reduce((s,e)=>s+norm(e.amount,e.freq),0);

  /* DEPENDENTS */
  let depCost = state.dependents.reduce((s,d)=>s+d.cost,0);
  expenses += depCost;

  /* ACCOUNT CONTRIBUTIONS */
  let contrib = state.accounts.reduce((s,a)=>{
    return s + (a.contrib || 0);
  },0);

  /* MATCH */
  let match = state.accounts.reduce((s,a)=>{
    if(a.match) return s + (a.contrib * a.match / 100);
    return s;
  },0);

  let totalSavings = contrib + match;

  let net = income - expenses - contrib;

  /* NET WORTH */
  let accountValue = state.accounts.reduce((s,a)=>s + (a.balance || 0),0);

  let netWorth =
    accountValue +
    (state.assets.cash||0) +
    (state.assets.invest||0) -
    (state.assets.debt||0);

  let savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  return {
    income,
    expenses,
    net,
    netWorth,
    savingsRate,
    contrib,
    match,
    totalSavings
  };
}
