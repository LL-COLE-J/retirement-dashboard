let chart;

/* =========================
   NAV
========================= */
function show(view){
["dashboard","financials","moduleView"].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.style.display="none";
});
const target = document.getElementById(view);
if(target) target.style.display="block";
}

/* =========================
   HELPERS
========================= */
const el = id => document.getElementById(id);

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
return (+el("cash")?.value||0)+(+el("invest")?.value||0)-(+el("debt")?.value||0);
}
function getTax(){
return calcTax(getIncome(), el("filing")?.value);
}

/* =========================
   MODULES
========================= */
function openModule(type){

show("moduleView");

el("moduleTitle").innerText = type;

let inc = getIncome();
let exp = getExpenses();
let tax = getTax();
let sim = simulate();

switch(type){

case "Chance of Success":
el("moduleContent").innerHTML = `<h2>${(sim.success*100).toFixed(1)}%</h2>`;
break;

case "Cash Flow":
el("moduleContent").innerHTML = `<h2>$${(inc-exp).toLocaleString()}</h2>`;
break;

case "Spending Breakdown":
let cat = getCategoryBreakdown();
el("moduleContent").innerHTML = Object.entries(cat)
.map(([k,v])=>`${k}: $${v.toLocaleString()}`).join("<br>");
break;

case "Milestones":
el("moduleContent").innerHTML = getMilestones().join("<br>");
break;

case "Tax Analytics":
el("moduleContent").innerHTML = `<h2>$${tax.toLocaleString()}</h2>`;
break;

default:
el("moduleContent").innerHTML = "Coming Soon";
}
}

/* =========================
   CATEGORY + MILESTONES
========================= */
function getCategoryBreakdown(){
let cat={};
expenses.forEach(e=>{
let v=norm(e.amount,e.freq);
cat[e.cat]=(cat[e.cat]||0)+v;
});
return cat;
}

function getMilestones(){
let nw = getNetWorth();
let exp = getExpenses();
let list=[];
if(nw>=exp*25) list.push("✔ Financial Independence");
if(nw>=1000000) list.push("✔ Millionaire");
if(!list.length) list.push("No milestones yet");
return list;
}

/* =========================
   INSIGHTS
========================= */
function getInsights(){
let inc=getIncome(),exp=getExpenses(),nw=getNetWorth(),tax=getTax();
let i=[];
if(exp>inc)i.push("🚨 Spending exceeds income");
if(exp>inc*0.7)i.push("⚠️ High spending");
if(nw<exp*5)i.push("⚠️ Low buffer");
if(nw>exp*25)i.push("✅ Financial independence");
if(tax>inc*0.25)i.push("💡 High tax load");
if(!events.length)i.push("📌 No future events");
return i;
}

/* =========================
   UPDATE
========================= */
function update(){

let sim = simulate();
let inc = getIncome();
let exp = getExpenses();
let nw = getNetWorth();
let tax = getTax();

let savingsRate = inc>0?((inc-exp)/inc)*100:0;

const set=(id,val)=>{ if(el(id)) el(id).innerText=val };

set("nw","$"+nw.toLocaleString());
set("inc","$"+(inc-tax).toLocaleString());
set("expOut","$"+exp.toLocaleString());
set("succ",(sim.success*100).toFixed(0)+"%");
set("saveRate",savingsRate.toFixed(1)+"%");

if(el("milestonesOut"))
el("milestonesOut").innerHTML=getInsights().join("<br>");

if(el("categoryOut")){
let cat=getCategoryBreakdown();
el("categoryOut").innerHTML=Object.entries(cat)
.sort((a,b)=>b[1]-a[1])
.slice(0,3)
.map(([k,v])=>`${k}: $${v.toLocaleString()}`)
.join("<br>");
}

if(el("taxExplain"))
el("taxExplain").innerHTML=`Estimated Tax: $${tax.toLocaleString()}`;

const chartEl=el("chart");
if(chartEl){
if(chart)chart.destroy();
chart=new Chart(chartEl,{
type:'line',
data:{
labels:sim.path.map((_,i)=>i),
datasets:[{label:"Portfolio",data:sim.path}]
}
});
}
}

/* =========================
   INPUTS
========================= */
function addIncome(){incomes.push({id:Date.now(),amount:0,freq:"yearly"});renderIncome();}
function addExpense(){expenses.push({id:Date.now(),amount:0,freq:"yearly",cat:"housing"});renderExpense();}
function addEvent(){events.push({id:Date.now(),year:5,type:"expense",value:10000});renderEvents();}

function renderIncome(){
el("incomeList").innerHTML=incomes.map(i=>`
<div class="row">
<input value="${i.amount}" oninput="iUpdate(${i.id},this.value)">
<select onchange="iFreq(${i.id},this.value)">
<option ${i.freq==="yearly"?"selected":""}>yearly</option>
<option ${i.freq==="monthly"?"selected":""}>monthly</option>
<option ${i.freq==="biweekly"?"selected":""}>biweekly</option>
</select>
</div>`).join("");
update();
}

function renderExpense(){
el("expenseList").innerHTML=expenses.map(e=>`
<div class="row">
<input value="${e.amount}" oninput="eUpdate(${e.id},this.value)">
<select onchange="eFreq(${e.id},this.value)">
<option ${e.freq==="yearly"?"selected":""}>yearly</option>
<option ${e.freq==="monthly"?"selected":""}>monthly</option>
<option ${e.freq==="biweekly"?"selected":""}>biweekly</option>
</select>
<select onchange="eCat(${e.id},this.value)">
<option ${e.cat==="housing"?"selected":""}>housing</option>
<option ${e.cat==="food"?"selected":""}>food</option>
<option ${e.cat==="transport"?"selected":""}>transport</option>
<option ${e.cat==="insurance"?"selected":""}>insurance</option>
<option ${e.cat==="other"?"selected":""}>other</option>
</select>
</div>`).join("");
update();
}

function renderEvents(){
el("eventList").innerHTML=events.map(e=>`
<div class="row">
<input value="${e.year}" oninput="evYear(${e.id},this.value)">
<select onchange="evType(${e.id},this.value)">
<option ${e.type==="expense"?"selected":""}>expense</option>
<option ${e.type==="income"?"selected":""}>income</option>
</select>
<input value="${e.value}" oninput="evVal(${e.id},this.value)">
</div>`).join("");
update();
}

/* =========================
   UPDATE HANDLERS
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

["cash","invest","debt","filing"].forEach(id=>{
const input=el(id);
if(input) input.addEventListener("input",update);
});
