// GLOBAL STATE (ONLY PLACE THIS EXISTS)

let state = {
  incomes: [],
  expenses: [],
  events: [],

  accounts: [
    {type:"checking", balance:0},
    {type:"401k", balance:0, contrib:0, match:0},
    {type:"roth", balance:0, contrib:0},
    {type:"brokerage", balance:0},
    {type:"hsa", balance:0}
  ],

  dependents: [],

  assets: {
    cash: 0,
    invest: 0,
    debt: 0
  },

  filing: "single"
};
