var chart;

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

function addEvent(){
  state.events.push({year:5,type:"expense",value:10000});
  renderAll();
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

/* =========================
   DASHBOARD
========================= */
function renderDashboard(){

  const d = calculate();

  document.getElementById("nw").innerText = money(d.netWorth);
  document.getElementById("inc").innerText = money(d.income);
  document.getElementById("expOut").innerText = money(d.expenses);
  document.getElementById("saveRate").innerText = d.savingsRate.toFixed(1)+"%";
  document.getElementById("succ").innerText = d.net > 0 ? "Good" : "Risk";

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
  const incDiv = document.getElementById("incomeList");

  incDiv.innerHTML = state.incomes.map((i,idx)=>`
    <div class="row">
      <input value="${i.amount}" oninput="state.incomes[${idx}].amount=+this.value;renderAll()">
      <select oninput="state.incomes[${idx}].freq=this.value;renderAll()">
        <option ${i.freq==="yearly"?"selected":""}>yearly</option>
        <option ${i.freq==="monthly"?"selected":""}>monthly</option>
      </select>
    </div>
  `).join("");

  /* EXPENSES */
  const expDiv = document.getElementById("expenseList");

  expDiv.innerHTML = state.expenses.map((e,idx)=>`
    <div class="row">
      <input value="${e.amount}" oninput="state.expenses[${idx}].amount=+this.value;renderAll()">
      <select oninput="state.expenses[${idx}].freq=this.value;renderAll()">
        <option ${e.freq==="yearly"?"selected":""}>yearly</option>
        <option ${e.freq==="monthly"?"selected":""}>monthly</option>
      </select>
      <select oninput="state.expenses[${idx}].cat=this.value;renderAll()">
        <option ${e.cat==="housing"?"selected":""}>housing</option>
        <option ${e.cat==="food"?"selected":""}>food</option>
        <option ${e.cat==="transport"?"selected":""}>transport</option>
        <option ${e.cat==="insurance"?"selected":""}>insurance</option>
        <option ${e.cat==="lifestyle"?"selected":""}>lifestyle</option>
      </select>
    </div>
  `).join("");

  /* ASSETS */
  const cash = document.getElementById("cash");
  const invest = document.getElementById("invest");
  const debt = document.getElementById("debt");

  cash.value = state.assets.cash || "";
  invest.value = state.assets.invest || "";
  debt.value = state.assets.debt || "";

  cash.oninput = e => { state.assets.cash = +e.target.value; renderAll(); };
  invest.oninput = e => { state.assets.invest = +e.target.value; renderAll(); };
  debt.oninput = e => { state.assets.debt = +e.target.value; renderAll(); };

  /* TAX */
  const filing = document.getElementById("filing");

  filing.value = state.filing;
  filing.oninput = e => {
    state.filing = e.target.value;
    renderAll();
  };
}
