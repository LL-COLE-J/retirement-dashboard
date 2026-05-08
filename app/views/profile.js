function renderProfileView(coreCard, profileIds, assumptionIds, eventsCard){
  var profileView = document.createElement('section'); profileView.id='profileView'; profileView.className='view profile-view';
  var profileCard = document.createElement('div'); profileCard.className='card';
  profileCard.innerHTML = '<div class="section-head profile-hero"><div><span class="eyebrow">Profile input center</span><h3>Profile</h3><p>Keep assumptions organized before Bastion turns them into dashboard outputs. Missing or placeholder values should be resolved here, not on the Dashboard.</p></div><div class="profile-trust-stack"><span>Inputs owned here</span><span>Outputs stay on Dashboard</span><span>Calculations unchanged</span></div></div><div id="planSetupSummary" class="dashboard-summary profile-summary">Plan setup appears after model run. Use the sections below to confirm household facts, income, spending, assets, debts, tax profile, and retirement assumptions.</div><div class="mini-list profile-section-list" id="profileSections"></div>';
  profileView.appendChild(profileCard);
  buildProfileInputCenter(coreCard, profileIds, assumptionIds, eventsCard, profileView.querySelector('#profileSections'));
  restoreProfileDropdownOptions(profileView);
  return profileView;
}

function profileDropdownOptionSets(){
  return {
    filingStatus:[
      ['single','Single'],
      ['married_joint','Married Joint'],
      ['head_household','Head Household'],
      ['married_separate','Married Separate']
    ],
    taxState:[
      ['TN','Tennessee'],
      ['IL','Illinois'],
      ['MI','Michigan'],
      ['FL','Florida'],
      ['TX','Texas'],
      ['CA','California'],
      ['NY','New York'],
      ['CUSTOM','Custom / Manual']
    ],
    returnProfile:[
      ['conservative','Conservative 3.5%'],
      ['moderate','Moderate 4.5%'],
      ['growth','Growth 6.0%']
    ],
    retIncomeInflation:[
      ['no','No'],
      ['yes','Yes']
    ],
    householdType:[
      ['single','Single'],
      ['couple','Couple']
    ],
    retirementIncomeType:[
      ['ss','Social Security'],
      ['pension','Pension'],
      ['annuity','Annuity'],
      ['other','Other']
    ],
    debtType:[
      ['mortgage','Mortgage'],
      ['auto','Auto Loan'],
      ['credit_card','Credit Card'],
      ['student','Student Loan'],
      ['personal','Personal Loan'],
      ['other','Other Debt']
    ],
    lifeEventType:[
      ['recurring_expense','Recurring Expense'],
      ['income_change','Income Change'],
      ['windfall','One-Time Windfall'],
      ['one_time_expense','One-Time Expense'],
      ['medical_care','Medical / Long-Term Care'],
      ['pass_away','Pass-Away Scenario']
    ]
  };
}

function restoreProfileDropdownOptions(profileRoot){
  var root = profileRoot || el('profileView') || document;
  var optionSets = profileDropdownOptionSets();
  function applyOptions(id,options,defaultValue){
    var node = root.querySelector ? root.querySelector('#'+id) : null;
    if(!node || node.tagName !== 'SELECT') return;
    var current = node.value || defaultValue || '';
    var needsRestore = !node.options.length;
    for(var i=0;i<node.options.length;i++){
      if(!String(node.options[i].textContent || '').trim()) needsRestore = true;
    }
    if(!needsRestore) return;
    node.innerHTML = '';
    for(var j=0;j<options.length;j++){
      var opt = document.createElement('option');
      opt.value = options[j][0];
      opt.textContent = options[j][1];
      node.appendChild(opt);
    }
    node.value = current;
    if(node.value !== current && defaultValue) node.value = defaultValue;
  }
  applyOptions('filingStatus',optionSets.filingStatus,'married_joint');
  applyOptions('taxState',optionSets.taxState,'TN');
  applyOptions('returnProfile',optionSets.returnProfile,'moderate');
  applyOptions('retIncomeInflation',optionSets.retIncomeInflation,'no');
  applyOptions('householdType',optionSets.householdType,'single');
  applyOptions('retirementIncomeType',optionSets.retirementIncomeType,'ss');
  applyOptions('debtType',optionSets.debtType,'mortgage');
  applyOptions('lifeEventType',optionSets.lifeEventType,'recurring_expense');
}

function captureProfileFieldValues(sourceRoot,ids){
  var values = {};
  if(!sourceRoot) return values;
  for(var i=0;i<ids.length;i++){
    var node = sourceRoot.querySelector ? sourceRoot.querySelector('#'+ids[i]) : null;
    if(node) values[ids[i]] = node.value;
  }
  return values;
}

function optionHtml(options,selectedValue){
  var html = '';
  for(var i=0;i<options.length;i++){
    var selected = options[i][0] === selectedValue ? ' selected' : '';
    html += '<option value="'+options[i][0]+'"'+selected+'>'+options[i][1]+'</option>';
  }
  return html;
}

function ensureProfileField(target,id,label,controlHtml){
  if(!target || el(id)) return;
  var field = document.createElement('div');
  field.className = 'field';
  field.innerHTML = '<label>'+label+'</label>'+controlHtml;
  target.appendChild(field);
}

function ensureProfileCoreFields(grids,values){
  var opts = profileDropdownOptionSets();
  function value(id,defaultValue){ return values[id] !== undefined ? values[id] : defaultValue; }
  ensureProfileField(grids.household,'age','Current Age','<input id="age" type="number" value="'+value('age','40')+'" oninput="commit()">');
  ensureProfileField(grids.household,'retireAge','Retirement Age','<input id="retireAge" type="number" value="'+value('retireAge','67')+'" oninput="commit()">');
  ensureProfileField(grids.income,'income1','Primary Income','<input id="income1" type="number" value="'+value('income1','85000')+'" oninput="commit()">');
  ensureProfileField(grids.income,'income2','Secondary Income','<input id="income2" type="number" value="'+value('income2','0')+'" oninput="commit()">');
  ensureProfileField(grids.income,'income2RetireAge','Income 2 Retires At','<input id="income2RetireAge" type="number" value="'+value('income2RetireAge','67')+'" oninput="commit()">');
  ensureProfileField(grids.expenses,'currentSpend','Current Annual Spend','<input id="currentSpend" type="number" value="'+value('currentSpend','45600')+'" oninput="commit()">');
  ensureProfileField(grids.expenses,'retireSpend','Retirement Annual Spend','<input id="retireSpend" type="number" value="'+value('retireSpend','38400')+'" oninput="commit()">');
  ensureProfileField(grids.expenses,'captureRate','Surplus Invested %','<input id="captureRate" type="number" step="1" value="'+value('captureRate','75')+'" oninput="commit()">');
  ensureProfileField(grids.expenses,'inflationRate','Inflation %','<input id="inflationRate" type="number" step="0.1" value="'+value('inflationRate','3')+'" oninput="commit()">');
  ensureProfileField(grids.expenses,'returnProfile','Return Profile','<select id="returnProfile" onchange="commit()">'+optionHtml(opts.returnProfile,value('returnProfile','moderate'))+'</select>');
  ensureProfileField(grids.expenses,'invested','Invested Assets','<input id="invested" type="number" value="'+value('invested','125000')+'" oninput="commit()">');
  ensureProfileField(grids.expenses,'cash','Cash','<input id="cash" type="number" value="'+value('cash','18000')+'" oninput="commit()">');
  ensureProfileField(grids.debts,'debt','Total Debt','<input id="debt" type="number" value="'+value('debt','22000')+'" oninput="commit()">');
  ensureProfileField(grids.locationTaxes,'filingStatus','Filing Status','<select id="filingStatus" onchange="commit()">'+optionHtml(opts.filingStatus,value('filingStatus','married_joint'))+'</select>');
  ensureProfileField(grids.locationTaxes,'taxState','State','<select id="taxState" onchange="commit()">'+optionHtml(opts.taxState,value('taxState','TN'))+'</select>');
  ensureProfileField(grids.locationTaxes,'countyTaxRate','County Tax Rate %','<input id="countyTaxRate" type="number" step="0.01" value="'+value('countyTaxRate','0')+'" oninput="commit()">');
  ensureProfileField(grids.locationTaxes,'cityTaxRate','City Tax Rate %','<input id="cityTaxRate" type="number" step="0.01" value="'+value('cityTaxRate','0')+'" oninput="commit()">');
}

function buildProfileInputCenter(coreCard, profileIds, assumptionIds, eventsCard, profileHolder){
  var holder = profileHolder || el('profileSections');
  if(!holder || !coreCard) return;
  function section(title, description, openByDefault){
    var details = document.createElement('details');
    if(openByDefault) details.setAttribute('open','open');
    details.className = 'section-block profile-section';
    details.innerHTML = '<summary><span>'+title+'</span><small>'+description+'</small></summary><div class="compact-grid"></div>';
    holder.appendChild(details);
    return details.querySelector('.compact-grid');
  }
  var household = section('Household','Ages and retirement timing that anchor the projection.', true);
  var income = section('Income','Earned income streams and staggered retirement timing.', true);
  var retirementIncome = section('Retirement','Social Security and pension placeholders for future planning.', false);
  var expenses = section('Expenses & Assets','Spending, cash, invested assets, return, and inflation assumptions.', true);
  var debts = section('Debts','Current obligations that reduce starting net worth.', false);
  var locationTaxes = section('Tax Profile','Filing status and state/local approximation inputs.', false);
  var lifeEvents = section('Life Events','Scenario-owned events stay separate from baseline profile assumptions.', false);
  var allProfileIds = ['age','retireAge','income1','income2','income2RetireAge','currentSpend','retireSpend','captureRate','inflationRate','returnProfile','invested','cash','debt','filingStatus','taxState','countyTaxRate','cityTaxRate'];
  var capturedValues = captureProfileFieldValues(coreCard,allProfileIds);
  moveFieldsFromSource(coreCard,['age','retireAge'],household.id = 'householdGrid');
  moveFieldsFromSource(coreCard,['income1','income2','income2RetireAge'],income.id = 'incomeGrid');
  moveFieldsFromSource(coreCard,['currentSpend','retireSpend','captureRate','inflationRate','returnProfile','invested','cash'],expenses.id = 'expenseGrid');
  moveFieldsFromSource(coreCard,['debt'],debts.id = 'debtGrid');
  moveFieldsFromSource(coreCard,['filingStatus','taxState','countyTaxRate','cityTaxRate'],locationTaxes.id = 'locationTaxGrid');
  ensureProfileCoreFields({household:household,income:income,expenses:expenses,debts:debts,locationTaxes:locationTaxes},capturedValues);
  var retirementFields = ['ssStartAge','ssMonthly','pensionStartAge','pensionMonthly'];
  for(var i=0;i<retirementFields.length;i++){
    var field = document.createElement('div'); field.className='field';
    if(retirementFields[i]==='ssStartAge') field.innerHTML='<label>SS Start Age</label><input id="ssStartAge" type="number" value="67" oninput="commit()">';
    if(retirementFields[i]==='ssMonthly') field.innerHTML='<label>SS Monthly</label><input id="ssMonthly" type="number" value="0" oninput="commit()">';
    if(retirementFields[i]==='pensionStartAge') field.innerHTML='<label>Pension Start Age</label><input id="pensionStartAge" type="number" value="65" oninput="commit()">';
    if(retirementFields[i]==='pensionMonthly') field.innerHTML='<label>Pension Monthly</label><input id="pensionMonthly" type="number" value="0" oninput="commit()">';
    retirementIncome.appendChild(field);
  }
  if(eventsCard){
    var helper = document.createElement('div');
    helper.className='dashboard-summary';
    helper.innerHTML='<strong>Life events are managed in Scenarios.</strong><br>Use the Scenarios tab to add, compare, or remove events without silently mutating baseline profile inputs.';
    lifeEvents.appendChild(helper);
  }
}
