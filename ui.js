var chart;

/* =========================
   ADDERS
========================= */
function addAccount(){
  state.accounts.push({type:"brokerage",balance:0,contrib:0});
  renderAll();
}

function addDependent(){
  state.dependents.push({age:5,cost:10000});
  renderAll();
}

function addIncome(){
  state.incomes.push({amount:0,freq:"yearly"});
  renderAll();
}

function addExpense(){
  state.expenses.push({amount:0,freq:"yearly",cat:"housing"});
  renderAll();
}

function addEvent(){
  state.events.push({year:5,type:"expense",value:10000});
  renderAll();
}

function manualSave(){
  saveProfile();
  alert("Profile Saved");
}

function manualLoad(){
  loadProfile();
  renderAll();
  alert("Profile Loaded");
}
function openModule(name){
  document.getElementById("milestonesOut").innerText =
    name + " coming soon";
}

/* =========================
   NAVIGATION
========================= */
function show(page){
  localStorage.setItem("page", page);

  document.getElementById("dashboard").style.display =
    page === "dashboard" ? "block" : "none";

  document.getElementById("financials").style.display =
    page === "financials" ? "block" : "none";
}

/* =========================
   INIT
========================= */
window.onload = () => {
  loadProfile();

  const savedPage = localStorage.getItem("page") || "dashboard";
  show(savedPage);

  renderAll();
};

/* =========================
   STORAGE
========================= */
function saveProfile(){
  localStorage.setItem("avora_profile", JSON.stringify(state));
}

function loadProfile(){
  const data = localStorage.getItem("avora_profile");
  if(data){
    state = JSON.parse(data);
  }
}

/* =========================
   FORMAT
========================= */
function money(n){
  return "$" + Number(n || 0).toLocaleString();
}

/* =========================
   MAIN RENDER
========================= */
function renderAll(){
  renderDashboard();
  renderFinancials();
  saveProfile();
}

function clearIncome(){
  state.incomes = [];
  renderAll();
}

function clearExpenses(){
  state.expenses = [];
  renderAll();
}

function clearEvents(){
  state.events = [];
  renderAll();
}

function clearAccounts(){
  state.accounts = [];
  renderAll();
}

function clearDependents(){
  state.dependents = [];
  renderAll();
}

/* =========================
   DASHBOARD
========================= */
function renderDashboard(){

  const d = calculate();

  document.getElementById("nw").innerText = money(d.netWorth);
  document.getElementById("inc").innerText = money(d.income);
  document.getElementById("expOut").innerText = money(d.expenses);
  document.getElementById("saveRate").innerText = d.savingsRate.toFixed(1)+"%";

  // FIXED (only once)
  document.getElementById("succ").innerText =
    d.net > 0 ? "Surplus" : "Deficit";

  // NEW: savings insight
  if(document.getElementById("savingsOut")){
    document.getElementById("savingsOut").innerText =
      "Annual Savings: " + money(d.totalSavings || 0);
  }

  const ctx = document.getElementById("chart").getContext("2d");

  const data = [...Array(30).keys()].map(i => d.netWorth + i * d.net);

  if(chart){
    chart.data.datasets[0].data = data;
    chart.update();
  } else {
    chart = new Chart(ctx,{
      type:"line",
      data:{
        labels:[...Array(30).keys()],
        datasets:[{
          label:"Projection",
          data:data,
          borderWidth:2,
          tension:0.3
        }]
      }
    });
  }
}

/* =========================
   FINANCIALS
========================= */
function renderFinancials(){

  /* =========================
     INCOME
  ========================= */
  const incDiv = document.getElementById("incomeList");

  incDiv.innerHTML = state.incomes.map((i,idx)=>`
    <div class="row">
      <input placeholder="Amount" value="${i.amount}"
        oninput="state.incomes[${idx}].amount=this.value"
        onblur="state.incomes[${idx}].amount=+this.value;renderAll()">

      <select onchange="state.incomes[${idx}].freq=this.value;renderAll()">
        <option ${i.freq==="yearly"?"selected":""}>yearly</option>
        <option ${i.freq==="monthly"?"selected":""}>monthly</option>
      </select>
    </div>
  `).join("");

  /* =========================
     EXPENSES
  ========================= */
  const expDiv = document.getElementById("expenseList");

  expDiv.innerHTML = state.expenses.map((e,idx)=>`
    <div class="row">
      <input placeholder="Amount" value="${e.amount}"
        oninput="state.expenses[${idx}].amount=this.value"
        onblur="state.expenses[${idx}].amount=+this.value;renderAll()">

      <select onchange="state.expenses[${idx}].freq=this.value;renderAll()">
        <option ${e.freq==="yearly"?"selected":""}>yearly</option>
        <option ${e.freq==="monthly"?"selected":""}>monthly</option>
      </select>

      <select onchange="state.expenses[${idx}].cat=this.value;renderAll()">
        <option ${e.cat==="housing"?"selected":""}>housing</option>
        <option ${e.cat==="food"?"selected":""}>food</option>
        <option ${e.cat==="transport"?"selected":""}>transport</option>
        <option ${e.cat==="insurance"?"selected":""}>insurance</option>
        <option ${e.cat==="lifestyle"?"selected":""}>lifestyle</option>
      </select>
    </div>
  `).join("");

  /* =========================
     ACCOUNTS
  ========================= */
  const accDiv = document.getElementById("accountList");

  accDiv.innerHTML = state.accounts.map((a,idx)=>`
    <div class="row">
      <input placeholder="Type (401k, roth...)" value="${a.type}"
        oninput="state.accounts[${idx}].type=this.value">

      <input placeholder="Balance" value="${a.balance}"
        oninput="state.accounts[${idx}].balance=this.value"
        onblur="state.accounts[${idx}].balance=+this.value;renderAll()">

      <input placeholder="Annual Contribution" value="${a.contrib||0}"
        oninput="state.accounts[${idx}].contrib=this.value"
        onblur="state.accounts[${idx}].contrib=+this.value;renderAll()">
    </div>
  `).join("");

  /* =========================
     DEPENDENTS
  ========================= */
  const depDiv = document.getElementById("dependentList");

  depDiv.innerHTML = state.dependents.map((d,idx)=>`
    <div class="row">
      <input placeholder="Age" value="${d.age}"
        oninput="state.dependents[${idx}].age=this.value">

      <input placeholder="Annual Cost" value="${d.cost}"
        oninput="state.dependents[${idx}].cost=this.value"
        onblur="state.dependents[${idx}].cost=+this.value;renderAll()">
    </div>
  `).join("");

  /* =========================
     ASSETS
  ========================= */
  const cash = document.getElementById("cash");
  const invest = document.getElementById("invest");
  const debt = document.getElementById("debt");

  cash.value = state.assets.cash || "";
  invest.value = state.assets.invest || "";
  debt.value = state.assets.debt || "";

  cash.oninput = e => state.assets.cash = e.target.value;
  cash.onblur  = e => { state.assets.cash = +e.target.value; renderAll(); };

  invest.oninput = e => state.assets.invest = e.target.value;
  invest.onblur  = e => { state.assets.invest = +e.target.value; renderAll(); };

  debt.oninput = e => state.assets.debt = e.target.value;
  debt.onblur  = e => { state.assets.debt = +e.target.value; renderAll(); };

  /* =========================
     TAX
  ========================= */
  const filing = document.getElementById("filing");

  filing.value = state.filing;
  filing.onchange = e => {
    state.filing = e.target.value;
    renderAll();
  };
}
