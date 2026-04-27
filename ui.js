let chart;

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
   ADDERS
========================= */
function addIncome(){
  state.incomes.push({amount:0,freq:"yearly"});
  renderAll();
}

function addExpense(){
  state.expenses.push({amount:0,freq:"yearly",cat:"housing"});
  renderAll();
}

function addAccount(){
  state.accounts.push({type:"brokerage",balance:0,contrib:0});
  renderAll();
}

function addDependent(){
  state.dependents.push({age:5,cost:10000});
  renderAll();
}

function addEvent(){
  state.events.push({year:5,type:"expense",value:10000});
  renderAll();
}

/* =========================
   CLEAR
========================= */
function clearIncome(){ state.incomes = []; renderAll(); }
function clearExpenses(){ state.expenses = []; renderAll(); }
function clearAccounts(){ state.accounts = []; renderAll(); }
function clearDependents(){ state.dependents = []; renderAll(); }

/* =========================
   SAVE / LOAD
========================= */
function manualSave(){
  saveProfile();
  alert("Profile Saved");
}

function manualLoad(){
  loadProfile();
  renderAll();
  alert("Profile Loaded");
}

/* =========================
   MODULE CLICK
========================= */
function openModule(name){
  document.getElementById("milestonesOut").innerText =
    name + " coming soon";
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
}

function commit(){
  saveProfile();
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

  document.getElementById("succ").innerText =
    d.net > 0 ? "Surplus" : "Deficit";

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

  /* INCOME */
  document.getElementById("incomeList").innerHTML =
    state.incomes.map((i,idx)=>`
      <div class="row">
        <input value="${i.amount || ""}"
          onblur="state.incomes[${idx}].amount=+this.value||0;commit()">

        <select onchange="state.incomes[${idx}].freq=this.value;commit()">
          <option ${i.freq==="yearly"?"selected":""}>yearly</option>
          <option ${i.freq==="monthly"?"selected":""}>monthly</option>
        </select>
      </div>
    `).join("");

  /* EXPENSES */
  document.getElementById("expenseList").innerHTML =
    state.expenses.map((e,idx)=>`
      <div class="row">
        <input value="${e.amount || ""}"
          onblur="state.expenses[${idx}].amount=+this.value||0;commit()">

        <select onchange="state.expenses[${idx}].freq=this.value;commit()">
          <option ${e.freq==="yearly"?"selected":""}>yearly</option>
          <option ${e.freq==="monthly"?"selected":""}>monthly</option>
        </select>

        <select onchange="state.expenses[${idx}].cat=this.value;commit()">
          <option ${e.cat==="housing"?"selected":""}>housing</option>
          <option ${e.cat==="food"?"selected":""}>food</option>
          <option ${e.cat==="transport"?"selected":""}>transport</option>
          <option ${e.cat==="insurance"?"selected":""}>insurance</option>
          <option ${e.cat==="lifestyle"?"selected":""}>lifestyle</option>
        </select>
      </div>
    `).join("");

  /* ACCOUNTS */
  document.getElementById("accountList").innerHTML =
    state.accounts.map((a,idx)=>`
      <div class="row">
        <input value="${a.type || ""}"
          onblur="state.accounts[${idx}].type=this.value;commit()">

        <input value="${a.balance || ""}"
          onblur="state.accounts[${idx}].balance=+this.value||0;commit()">

        <input value="${a.contrib || ""}"
          onblur="state.accounts[${idx}].contrib=+this.value||0;commit()">
      </div>
    `).join("");

  /* DEPENDENTS */
  document.getElementById("dependentList").innerHTML =
    state.dependents.map((d,idx)=>`
      <div class="row">
        <input value="${d.age || ""}"
          onblur="state.dependents[${idx}].age=+this.value||0">

        <input value="${d.cost || ""}"
          onblur="state.dependents[${idx}].cost=+this.value||0;commit()">
      </div>
    `).join("");

  /* ASSETS */
  const cash = document.getElementById("cash");
  const invest = document.getElementById("invest");
  const debt = document.getElementById("debt");

  cash.value = state.assets.cash || "";
  invest.value = state.assets.invest || "";
  debt.value = state.assets.debt || "";

  cash.onblur = e => { state.assets.cash = +e.target.value || 0; commit(); };
  invest.onblur = e => { state.assets.invest = +e.target.value || 0; commit(); };
  debt.onblur = e => { state.assets.debt = +e.target.value || 0; commit(); };
}
