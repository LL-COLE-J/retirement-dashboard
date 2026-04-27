var chart;

/* NAVIGATION (FIXES TAB RESET ISSUE) */
function show(page){
  localStorage.setItem("page",page);

  document.getElementById("dashboard").style.display = page==="dashboard"?"block":"none";
  document.getElementById("financials").style.display = page==="financials"?"block":"none";
}

/* LOAD PAGE ON REFRESH */
window.onload = () => {

  loadProfile();

  let savedPage = localStorage.getItem("page") || "dashboard";
  show(savedPage);

  renderAll();
};

/* SAVE PROFILE */
function saveProfile(){
  localStorage.setItem("avora_profile", JSON.stringify(state));
}

/* LOAD PROFILE */
function loadProfile(){
  let data = localStorage.getItem("avora_profile");
  if(data){
    state = JSON.parse(data);
  }
}

/* ADD FUNCTIONS */
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

/* DEPENDENTS */
function addDependent(){
  state.dependents.push({age:5,cost:10000});
  renderAll();
}

/* ACCOUNTS */
function addAccount(){
  state.accounts.push({type:"401k",balance:0});
  renderAll();
}

/* RENDER */
function renderAll(){
  renderDashboard();
  renderFinancials();
  saveProfile();
}

/* DASHBOARD */
function renderDashboard(){

  let d = calculate();

  document.getElementById("nw").innerText = "$"+Math.round(d.netWorth);
  document.getElementById("inc").innerText = "$"+Math.round(d.income);
  document.getElementById("expOut").innerText = "$"+Math.round(d.expenses);
  document.getElementById("saveRate").innerText = d.savingsRate.toFixed(1)+"%";
  document.getElementById("succ").innerText = d.net>0?"Good":"Risk";

  let ctx = document.getElementById("chart").getContext("2d");

  if(chart) chart.destroy();

  chart = new Chart(ctx,{
    type:"line",
    data:{
      labels:[...Array(30).keys()],
      datasets:[{
        label:"Projection",
        data:[...Array(30).keys()].map(i=>d.netWorth+i*d.net),
        borderWidth:2
      }]
    }
  });
}

/* FINANCIALS */
function renderFinancials(){

  let incDiv = document.getElementById("incomeList");
  incDiv.innerHTML = "";

  state.incomes.forEach((i,idx)=>{
    incDiv.innerHTML += `
      <div class="row">
        <input value="${i.amount}" onchange="state.incomes[${idx}].amount=+this.value;renderAll()">
        <select onchange="state.incomes[${idx}].freq=this.value;renderAll()">
          <option ${i.freq==="yearly"?"selected":""}>yearly</option>
          <option ${i.freq==="monthly"?"selected":""}>monthly</option>
        </select>
      </div>
    `;
  });

  let expDiv = document.getElementById("expenseList");
  expDiv.innerHTML = "";

  state.expenses.forEach((e,idx)=>{
    expDiv.innerHTML += `
      <div class="row">
        <input value="${e.amount}" onchange="state.expenses[${idx}].amount=+this.value;renderAll()">
        <select onchange="state.expenses[${idx}].freq=this.value;renderAll()">
          <option ${e.freq==="yearly"?"selected":""}>yearly</option>
          <option ${e.freq==="monthly"?"selected":""}>monthly</option>
        </select>
        <select onchange="state.expenses[${idx}].cat=this.value;renderAll()">
          <option>housing</option>
          <option>food</option>
          <option>transport</option>
          <option>insurance</option>
          <option>lifestyle</option>
        </select>
      </div>
    `;
  });

  /* ASSETS */
  document.getElementById("cash").value = state.assets.cash || "";
  document.getElementById("invest").value = state.assets.invest || "";
  document.getElementById("debt").value = state.assets.debt || "";

  document.getElementById("cash").onchange = e=>{state.assets.cash=+e.target.value;renderAll()};
  document.getElementById("invest").onchange = e=>{state.assets.invest=+e.target.value;renderAll()};
  document.getElementById("debt").onchange = e=>{state.assets.debt=+e.target.value;renderAll()};

  document.getElementById("filing").value = state.filing;
  document.getElementById("filing").onchange = e=>{
    state.filing = e.target.value;
    renderAll();
  };
}
