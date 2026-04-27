let chart;

function show(view){
dashboard.style.display="none";
financials.style.display="none";
moduleView.style.display="none";
document.getElementById(view).style.display="block";
}

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

/* CORE */
function getIncome(){return incomes.reduce((t,i)=>t+norm(i.amount,i.freq),0);}
function getExpenses(){return expenses.reduce((t,e)=>t+norm(e.amount,e.freq),0);}
function getNetWorth(){return (+cash.value||0)+(+invest.value||0)-(+debt.value||0);}
function getTax(){return calcTax(getIncome(), filing.value);}

/* UPDATE */
function update(){

let sim = simulate();

let inc = getIncome();
let exp = getExpenses();
let nw = getNetWorth();
let tax = getTax();

/* FIXED IDS */
document.getElementById("nw").innerText="$"+nw.toLocaleString();
document.getElementById("inc").innerText="$"+(inc-tax).toLocaleString();
document.getElementById("expOut").innerText="$"+exp.toLocaleString();
document.getElementById("succ").innerText=(sim.success*100).toFixed(0)+"%";

/* INSIGHTS */
milestonesOut.innerHTML = getInsights().join("<br>");

/* CHART */
if(chart) chart.destroy();
chart=new Chart(document.getElementById("chart"),{
type:'line',
data:{labels:sim.path.map((_,i)=>i),datasets:[{data:sim.path}]}
});
}

/* INIT */
addIncome();
addExpense();
addEvent();

document.querySelectorAll("input,select").forEach(i=>i.addEventListener("input",update));
