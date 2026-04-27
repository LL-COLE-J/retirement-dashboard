let chart;

function show(v){
dashboard.style.display="none";
financials.style.display="none";
document.getElementById(v).style.display="block";
}

/* INCOME */
function addIncome(){
incomes.push({id:Date.now(),amount:0,freq:"yearly"});
renderIncome();
}

function renderIncome(){
incomeList.innerHTML=incomes.map(i=>`
<div class="row">
<input value="${i.amount}" oninput="iUpdate(${i.id},this.value)">
<select onchange="iFreq(${i.id},this.value)">
<option>yearly</option>
<option>monthly</option>
<option>biweekly</option>
</select>
</div>`).join("");
}

/* EXPENSE */
function addExpense(){
expenses.push({id:Date.now(),amount:0,freq:"yearly",cat:"housing"});
renderExpense();
}

function renderExpense(){
expenseList.innerHTML=expenses.map(e=>`
<div class="row">
<input value="${e.amount}" oninput="eUpdate(${e.id},this.value)">
<select onchange="eFreq(${e.id},this.value)">
<option>yearly</option>
<option>monthly</option>
<option>biweekly</option>
</select>
<select onchange="eCat(${e.id},this.value)">
<option>housing</option>
<option>food</option>
<option>transport</option>
<option>insurance</option>
<option>other</option>
</select>
</div>`).join("");
}

/* EVENTS */
function renderEvents(){
eventList.innerHTML=events.map(e=>`
<div class="row">
<input value="${e.year}" oninput="evYear(${e.id},this.value)">
<select onchange="evType(${e.id},this.value)">
<option>expense</option>
<option>income</option>
</select>
<input value="${e.value}" oninput="evVal(${e.id},this.value)">
</div>`).join("");
}

/* UPDATERS */
function iUpdate(id,val){incomes.find(x=>x.id===id).amount=+val;update();}
function iFreq(id,val){incomes.find(x=>x.id===id).freq=val;update();}
function eUpdate(id,val){expenses.find(x=>x.id===id).amount=+val;update();}
function eFreq(id,val){expenses.find(x=>x.id===id).freq=val;update();}
function eCat(id,val){expenses.find(x=>x.id===id).cat=val;}
function evYear(id,val){events.find(x=>x.id===id).year=+val;}
function evType(id,val){events.find(x=>x.id===id).type=val;}
function evVal(id,val){events.find(x=>x.id===id).value=+val;}

/* UPDATE DASHBOARD */
function update(){

let sim=simulate();

let incRaw=incomes.reduce((t,i)=>t+norm(i.amount,i.freq),0);
let tax=calcTax(incRaw,filing.value);
let inc=incRaw-tax;

let exp=expenses.reduce((t,e)=>t+norm(e.amount,e.freq),0);
let nwVal=(+cash.value||0)+(+invest.value||0)-(+debt.value||0);

nw.innerText="$"+nwVal.toLocaleString();
inc.innerText="$"+inc.toLocaleString();
expOut.innerText="$"+exp.toLocaleString();
succ.innerText=(sim.success*100).toFixed(0)+"%";

/* MILESTONES */
let ms=[];
if(nwVal>=exp*25) ms.push("Financial Independence");
if(nwVal>=1000000) ms.push("Millionaire");
milestonesOut.innerHTML=ms.join("<br>")||"None";

/* CATEGORY */
let cat={};
expenses.forEach(e=>{
let v=norm(e.amount,e.freq);
cat[e.cat]=(cat[e.cat]||0)+v;
});

categoryOut.innerHTML=Object.entries(cat)
.sort((a,b)=>b[1]-a[1])
.slice(0,3)
.map(([k,v])=>`${k}: $${v.toLocaleString()}`)
.join("<br>");

taxExplain.innerHTML=`Tax: $${tax.toLocaleString()}`;

/* CHART */
if(chart) chart.destroy();
chart=new Chart(chart,{
type:'line',
data:{labels:sim.path.map((_,i)=>i),datasets:[{data:sim.path}]}
});
}

/* INIT */
addIncome();
addExpense();
addEvent();

document.querySelectorAll("input,select").forEach(i=>i.addEventListener("input",update));
