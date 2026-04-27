let chart;

/* =========================
   NAV
========================= */
function show(view){

const sections = ["dashboard","financials","moduleView"];

sections.forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.style.display = "none";
});

const target = document.getElementById(view);
if(target) target.style.display = "block";
}

/* =========================
   CORE CALCS
========================= */
function getIncome(){
return incomes.reduce((t,i)=>t+norm(i.amount,i.freq),0);
}

function getExpenses(){
return expenses.reduce((t,e)=>t+norm(e.amount,e.freq),0);
}

function getNetWorth(){
return (+cash.value||0)+(+invest.value||0)-(+debt.value||0);
}

function getTax(){
return calcTax(getIncome(), filing.value);
}

/* =========================
   MODULES
========================= */
function openModule(type){

show("moduleView");

moduleTitle.innerText = type;

let inc = getIncome();
let exp = getExpenses();
let tax = getTax();
let sim = simulate();

switch(type){

case "Chance of Success":
moduleContent.innerHTML = `<h2>${(sim.success*100).toFixed(1)}%</h2>`;
break;

case "Cash Flow":
moduleContent.innerHTML = `<h2>$${(inc-exp).toLocaleString()}</h2>`;
break;

case "Spending Breakdown":
let cat = getCategoryBreakdown();
moduleContent.innerHTML = Object.entries(cat)
.map(([k,v])=>`${k}: $${v.toLocaleString()}`).join("<br>");
break;

case "Milestones":
moduleContent.innerHTML = getMilestones().join("<br>");
break;

case "Tax Analytics":
moduleContent.innerHTML = `<h2>$${tax.toLocaleString()}</h2>`;
break;

default:
moduleContent.innerHTML = "Coming Soon";
}
}

/* =========================
   CATEGORY
========================= */
function getCategoryBreakdown(){
let cat={};
expenses.forEach(e=>{
let v=norm(e.amount,e.freq);
cat[e.cat]=(cat[e.cat]||0)+v;
});
return cat;
}

/* =========================
   MILESTONES
========================= */
function getMilestones(){
let nw = getNetWorth();
let exp = getExpenses();

let list=[];

if(nw>=exp*25) list.push("✔ Financial Independence");
if(nw>=1000000) list.push("✔ Millionaire");

if(list.length===0) list.push("No milestones reached yet");

return list;
}

/* =========================
   AI INSIGHTS
========================= */
function getInsights(){

let inc = getIncome();
let exp = getExpenses();
let nw = getNetWorth();
let tax = getTax();

let insights=[];

if(exp > inc) insights.push("🚨 Spending exceeds income");
if(exp > inc*0.7) insights.push("⚠️ High spending ratio");
if(nw < exp*5) insights.push("⚠️ Low buffer");
if(nw > exp*25) insights.push("✅ Financial independence");
if(tax > inc*0.25) insights.push("💡 High tax load");
if(events.length===0) insights.push("📌 No future events");

return insights;
}

/* =========================
   UPDATE DASHBOARD
========================= */
function update(){

let sim = simulate();

let inc = getIncome();
let exp = getExpenses();
let nw = getNetWorth();
let tax = getTax();

/* METRICS */
let savingsRate = inc > 0 ? ((inc-exp)/inc)*100 : 0;

const set = (id,val)=>{
  const el = document.getElementById(id);
  if(el) el.innerText = val;
};

set("nw","$"+nw.toLocaleString());
set("inc","$"+(inc-tax).toLocaleString());
set("expOut","$"+exp.toLocaleString());
set("succ",(sim.success*100).toFixed(0)+"%");
set("saveRate",savingsRate.toFixed(1)+"%");

/* INSIGHTS */
if(window.milestonesOut)
milestonesOut.innerHTML = getInsights().join("<br>");

/* CATEGORY */
if(window.categoryOut){
let cat = getCategoryBreakdown();
categoryOut.innerHTML = Object.entries(cat)
.sort((a,b)=>b[1]-a[1])
.slice(0,3)
.map(([k,v])=>`${k}: $${v.toLocaleString()}`)
.join("<br>");
}

/* TAX */
if(window.taxExplain)
taxExplain.innerHTML=`Estimated Tax: $${tax.toLocaleString()}`;

/* CHART */
const chartEl = document.getElementById("chart");
if(chartEl){
  if(chart) chart.destroy();
  chart = new Chart(chartEl,{
    type:'line',
    data:{
      labels:sim.path.map((_,i)=>i),
      datasets:[{
        label:"Portfolio Value",
        data:sim.path,
        borderWidth:2,
        tension:0.3
      }]
    }
  });
}
}
/* =========================
   INPUT BUILDERS
========================= */

function addIncome(){
incomes.push({id:Date.now(),amount:0,freq:"yearly"});
renderIncome();
}

function renderIncome(){
incomeList.innerHTML = incomes.map(i=>`
<div class="row">
<input value="${i.amount}" oninput="iUpdate(${i.id},this.value)">
<select onchange="iFreq(${i.id},this.value)">
<option value="yearly" ${i.freq==="yearly"?"selected":""}>yearly</option>
<option value="monthly" ${i.freq==="monthly"?"selected":""}>monthly</option>
<option value="biweekly" ${i.freq==="biweekly"?"selected":""}>biweekly</option>
</select>
</div>`).join("");

update(); // 🔥 critical
}

function addExpense(){
expenses.push({id:Date.now(),amount:0,freq:"yearly",cat:"housing"});
renderExpense();
}

function renderExpense(){
expenseList.innerHTML = expenses.map(e=>`
<div class="row">
<input value="${e.amount}" oninput="eUpdate(${e.id},this.value)">
<select onchange="eFreq(${e.id},this.value)">
<option value="yearly" ${e.freq==="yearly"?"selected":""}>yearly</option>
<option value="monthly" ${e.freq==="monthly"?"selected":""}>monthly</option>
<option value="biweekly" ${e.freq==="biweekly"?"selected":""}>biweekly</option>
</select>
<select onchange="eCat(${e.id},this.value)">
<option ${e.cat==="housing"?"selected":""}>housing</option>
<option ${e.cat==="food"?"selected":""}>food</option>
<option ${e.cat==="transport"?"selected":""}>transport</option>
<option ${e.cat==="insurance"?"selected":""}>insurance</option>
<option ${e.cat==="other"?"selected":""}>other</option>
</select>
</div>`).join("");

update(); // 🔥 critical
}

function addEvent(){
events.push({id:Date.now(),year:5,type:"expense",value:10000});
renderEvents();
}

function renderEvents(){
eventList.innerHTML = events.map(e=>`
<div class="row">
<input value="${e.year}" oninput="evYear(${e.id},this.value)">
<select onchange="evType(${e.id},this.value)">
<option value="expense" ${e.type==="expense"?"selected":""}>expense</option>
<option value="income" ${e.type==="income"?"selected":""}>income</option>
</select>
<input value="${e.value}" oninput="evVal(${e.id},this.value)">
</div>`).join("");

update(); // 🔥 critical
}

/* =========================
   UPDATERS
========================= */
function iUpdate(id,val){incomes.find(x=>x.id===id).amount=+val;update();}
function iFreq(id,val){incomes.find(x=>x.id===id).freq=val;update();}
function eUpdate(id,val){expenses.find(x=>x.id===id).amount=+val;update();}
function eFreq(id,val){expenses.find(x=>x.id===id).freq=val;update();}
function eCat(id,val){expenses.find(x=>x.id===id).cat=val;}
function evYear(id,val){events.find(x=>x.id===id).year=+val;}
function evType(id,val){events.find(x=>x.id===id).type=val;}
function evVal(id,val){events.find(x=>x.id===id).value=+val;}

/* =========================
   INIT
========================= */
addIncome();
addExpense();
addEvent();

document.querySelectorAll("input,select").forEach(i=>i.addEventListener("input",update));
