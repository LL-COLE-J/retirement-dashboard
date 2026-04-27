function simulate(){

let runs=100,results=[],path=[];

for(let r=0;r<runs;r++){

let bal=(+cash.value||0)+(+invest.value||0)-(+debt.value||0);

let incRaw=incomes.reduce((t,i)=>t+norm(i.amount,i.freq),0);
let tax=calcTax(incRaw,filing.value);
let inc=incRaw-tax;

let exp=expenses.reduce((t,e)=>t+norm(e.amount,e.freq),0);

let arr=[];

for(let y=0;y<50;y++){

let ret=0.06+(Math.random()-0.5)*0.2;

/* EVENTS INJECTION */
events.forEach(ev=>{
if(ev.year===y){
bal += (ev.type==="income"?ev.value:-ev.value);
}
});

bal+=bal*ret + inc - exp;

arr.push(bal);
if(bal<=0) break;
}

results.push(arr.length);
if(r===0) path=arr;
}

let success=results.filter(x=>x>=30).length/runs;
return {success,path};
}
