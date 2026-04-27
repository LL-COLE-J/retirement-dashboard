let chart;

/* =========================
   NAVIGATION
========================= */
function show(view){
document.getElementById("dashboard").style.display="none";
document.getElementById("financials").style.display="none";
document.getElementById("moduleView").style.display="none";

document.getElementById(view).style.display="block";
}

/* =========================
   MODULE NAV
========================= */
function openModule(type){

show("moduleView");

let title = document.getElementById("moduleTitle");
let content = document.getElementById("moduleContent");

title.innerText = type;

let inc = getIncome();
let exp = getExpenses();
let nw = getNetWorth();

if(type==="Cash Flow"){
content.innerHTML = `
<h3>$${(inc-exp).toLocaleString()}</h3>
<p>Net yearly cash flow</p>
`;
}

if(type==="Spending Breakdown"){
let cat = getCategoryBreakdown();
content.innerHTML = Object.entries(cat)
.map(([k,v])=>`${k}: $${v.toLocaleString()}`)
.join("<br>");
}

if(type==="Milestones"){
content.innerHTML = getMilestones().join("<br>");
}

if(type==="Tax Analytics"){
content.innerHTML = `Estimated Tax: $${getTax().toLocaleString()}`;
}

if(type==="Chance of Success"){
let sim = simulate();
content.innerHTML = `<h2>${(sim.success*100).toFixed(1)}%</h2>`;
}

if(type==="Scenario Compare"){
content.innerHTML = "Compare scenarios coming next layer";
}

/* coming soon */
if(content.innerHTML===""){
content.innerHTML = "<p>Coming Soon</p>";
}
}

/* =========================
   CORE CALCULATORS
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
   CATEGORY BREAKDOWN
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
   AI INSIGHTS (UPGRADED)
========================= */
function getInsights(){

let inc = getIncome();
let exp = getExpenses();
let nw = getNetWorth();
let tax = getTax();

let insights=[];

if(exp > inc){
insights.push("🚨 Spending exceeds income — plan will fail");
}

if(exp > inc*0.7){
insights.push("⚠️ High spending ratio — limited savings ability");
}

if(nw < exp*5){
insights.push("⚠️ Low financial buffer — risk is elevated");
}

if(nw > exp*25){
insights.push("✅ Financial independence achieved");
}

if(tax > inc*0.25){
insights.push("💡 Taxes are significant — optimization opportunity");
}

if(events.length===0){
insights.push("📌 No future events planned — projections may be unrealistic");
}

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

nwEl.innerText="$"+nw.toLocaleString();
incEl.innerText="$"+(inc-tax).toLocaleString();
expOut.innerText="$"+exp.toLocaleString();
succ.innerText=(sim.success*100).toFixed(0)+"%";

/* INSIGHTS */
let insights = getInsights();
milestonesOut.innerHTML = insights.join("<br>");

/* CATEGORY */
let cat = getCategoryBreakdown();
categoryOut.innerHTML = Object.entries(cat)
.sort((a,b)=>b[1]-a[1])
.slice(0,3)
.map(([k,v])=>`${k}: $${v.toLocaleString()}`)
.join("<br>");

taxExplain.innerHTML=`Estimated Tax: $${tax.toLocaleString()}`;

/* CHART */
if(chart) chart.destroy();
chart=new Chart(chart,{
type:'line',
data:{labels:sim.path.map((_,i)=>i),datasets:[{data:sim.path}]}
});
}

/* =========================
   INIT
========================= */
addIncome();
addExpense();
addEvent();

document.querySelectorAll("input,select").forEach(i=>i.addEventListener("input",update));
