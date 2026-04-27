let incomes=[],expenses=[],events=[];

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

/* EVENTS */
function addEvent(){
events.push({id:Date.now(),year:5,type:"expense",value:10000});
renderEvents();
}
