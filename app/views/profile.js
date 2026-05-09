function renderProfileView(coreCard, profileIds, assumptionIds, eventsCard){
  var profileView = document.createElement('section'); profileView.id='profileView'; profileView.className='view profile-view';
  var profileCard = document.createElement('div'); profileCard.className='card';
  profileCard.innerHTML = '<div class="section-head profile-hero"><div><span class="eyebrow">Profile input center</span><h3>Profile</h3><p>Profile is Bastion’s advisor-grade intake workspace. Confirm household, income, expenses, assets, debts, retirement, tax, special-account, and scenario assumptions here before Bastion renders dashboard outputs.</p></div><div class="profile-trust-stack"><span>Inputs owned here</span><span>Outputs stay on Dashboard</span><span>No formula changes</span></div></div><div id="planSetupSummary" class="dashboard-summary profile-summary"><strong>Profile review checklist:</strong> Annual inputs are labeled “/ year,” monthly special-account placeholders are labeled “monthly,” and Dashboard remains output-only.</div><div class="profile-guidance-strip"><span>1. Confirm current household</span><span>2. Review annual cash flow</span><span>3. Check retirement assumptions</span></div><div class="mini-list profile-section-list" id="profileSections"></div>';
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

function ensureProfileField(target,id,label,controlHtml,helperText){
  if(!target) return;
  var existing = el(id);
  if(existing){
    var existingField = existing.closest ? existing.closest('.field') : null;
    if(existingField){
      existingField.classList.add('profile-field');
      var labelNode = existingField.querySelector ? existingField.querySelector('label') : null;
      if(labelNode) labelNode.textContent = label;
      var helperNode = existingField.querySelector ? existingField.querySelector('.profile-field-helper') : null;
      if(helperText && !helperNode){
        helperNode = document.createElement('small');
        helperNode.className = 'profile-field-helper';
        existingField.appendChild(helperNode);
      }
      if(helperNode) helperNode.textContent = helperText || '';
      if(existingField.parentNode !== target) target.appendChild(existingField);
    }
    return;
  }
  var field = document.createElement('div');
  field.className = 'field profile-field';
  var helper = helperText ? '<small class="profile-field-helper">'+helperText+'</small>' : '';
  field.innerHTML = '<label>'+label+'</label><div class="profile-control-wrap">'+controlHtml+'</div>'+helper;
  target.appendChild(field);
}

function ensureProfileCoreFields(grids,values){
  var opts = profileDropdownOptionSets();
  function value(id,defaultValue){ return values[id] !== undefined ? values[id] : defaultValue; }
  ensureProfileField(grids.household,'age','Current age','<input id="age" type="number" value="'+value('age','40')+'" oninput="commit()">','Years. Used as the starting point for the plan.');
  ensureProfileField(grids.income,'income1','Primary income / year','<input id="income1" type="number" value="'+value('income1','85000')+'" oninput="commit()">','Annual gross income before retirement.');
  ensureProfileField(grids.income,'income2','Secondary income / year','<input id="income2" type="number" value="'+value('income2','0')+'" oninput="commit()">','Optional annual gross income. Use 0 when not applicable.');
  ensureProfileField(grids.income,'income2RetireAge','Secondary income ends at age','<input id="income2RetireAge" type="number" value="'+value('income2RetireAge','67')+'" oninput="commit()">','Years. Supports a basic staggered retirement timing input.');
  ensureProfileField(grids.expenses,'currentSpend','Current spending / year','<input id="currentSpend" type="number" value="'+value('currentSpend','45600')+'" oninput="commit()">','Annual household spending used before retirement.');
  ensureProfileField(grids.assets,'invested','Invested assets','<input id="invested" type="number" value="'+value('invested','125000')+'" oninput="commit()">','Current invested balance; future phases will split asset types.');
  ensureProfileField(grids.assets,'cash','Cash reserves','<input id="cash" type="number" value="'+value('cash','18000')+'" oninput="commit()">','Liquid cash available today.');
  ensureProfileField(grids.debts,'debt','Total debt','<input id="debt" type="number" value="'+value('debt','22000')+'" oninput="commit()">','Current total debt; future phases will separate mortgage, auto, and other debt types.');
  ensureProfileField(grids.retirement,'retireAge','Target retirement age','<input id="retireAge" type="number" value="'+value('retireAge','67')+'" oninput="commit()">','Years. Used by the engine as the baseline retirement transition age.');
  ensureProfileField(grids.retirement,'retireSpend','Retirement spending / year','<input id="retireSpend" type="number" value="'+value('retireSpend','38400')+'" oninput="commit()">','Annual retirement spending estimate. Unknown/derived states are planned for later.');
  ensureProfileField(grids.scenarioAssumptions,'captureRate','Surplus invested %','<input id="captureRate" type="number" step="1" value="'+value('captureRate','75')+'" oninput="commit()">','Percent of surplus cash flow assumed to be invested.');
  ensureProfileField(grids.scenarioAssumptions,'inflationRate','Inflation assumption %','<input id="inflationRate" type="number" step="0.1" value="'+value('inflationRate','3')+'" oninput="commit()">','Annual inflation assumption. This remains a baseline assumption, not an expense lock.');
  ensureProfileField(grids.scenarioAssumptions,'returnProfile','Return profile','<select id="returnProfile" onchange="commit()">'+optionHtml(opts.returnProfile,value('returnProfile','moderate'))+'</select>','Simple return assumption profile; formulas are unchanged in 2.40b.');
  ensureProfileField(grids.locationTaxes,'filingStatus','Filing status','<select id="filingStatus" onchange="commit()">'+optionHtml(opts.filingStatus,value('filingStatus','married_joint'))+'</select>','Federal filing-status approximation used by the current tax model.');
  ensureProfileField(grids.locationTaxes,'taxState','Tax state','<select id="taxState" onchange="commit()">'+optionHtml(opts.taxState,value('taxState','TN'))+'</select>','State-level approximation. ZIP/jurisdiction modeling is future work.');
  ensureProfileField(grids.locationTaxes,'countyTaxRate','County tax rate %','<input id="countyTaxRate" type="number" step="0.01" value="'+value('countyTaxRate','0')+'" oninput="commit()">','Optional local rate percentage.');
  ensureProfileField(grids.locationTaxes,'cityTaxRate','City tax rate %','<input id="cityTaxRate" type="number" step="0.01" value="'+value('cityTaxRate','0')+'" oninput="commit()">','Optional local rate percentage.');
}

function buildProfileInputCenter(coreCard, profileIds, assumptionIds, eventsCard, profileHolder){
  var holder = profileHolder || el('profileSections');
  if(!holder || !coreCard) return;
  function section(title, description, openByDefault, note){
    var details = document.createElement('details');
    if(openByDefault) details.setAttribute('open','open');
    details.className = 'section-block profile-section';
    var noteHtml = note ? '<p class="profile-section-note">'+note+'</p>' : '';
    details.innerHTML = '<summary><div class="profile-section-title"><span>'+title+'</span><small>'+description+'</small></div><span class="profile-section-caret" aria-hidden="true">⌄</span></summary>'+noteHtml+'<div class="compact-grid"></div>';
    holder.appendChild(details);
    return details.querySelector('.compact-grid');
  }
  var household = section('Household','Who the plan starts with today.', true, 'Current 2.40b inputs stay intentionally simple. Future household modeling can add many family compositions without moving calculations into Profile.');
  var income = section('Income','Earned income streams and staggered timing.', true, 'Use annual gross amounts. Future phases can add multiple income types and payment frequencies.');
  var expenses = section('Expenses','Current spending assumptions only.', true, 'Expenses remain separate from return and inflation assumptions so later models can support estimated, unknown, or derived spending states.');
  var assets = section('Assets','Cash and invested balances currently available.', true, 'Future modeling should distinguish liquid, semi-liquid, and illiquid assets.');
  var debts = section('Debts','Current obligations that reduce starting net worth.', false, 'Debt is summarized in 2.40b. Housing and auto debt should later link to asset values and equity.');
  var retirement = section('Retirement','Target retirement timing and spending goal.', true, 'Retirement spending stays a baseline estimate for now; unknown/estimated/derived states are future work.');
  var locationTaxes = section('Tax Profile','Filing status and state/local approximation inputs.', false, 'Current tax inputs remain approximate. Future tax modeling should support state, jurisdiction, and ZIP-aware rules.');
  var specialAccounts = section('Special Accounts','Social Security and pension placeholders.', false, 'These fields prepare the Profile structure for future special-account modeling without changing engine formulas.');
  var scenarioAssumptions = section('Scenario Assumptions','Inflation, return profile, and surplus-investing assumptions.', false, 'Assumptions stay visible and editable here. Dashboard remains output-only.');
  var lifeEvents = section('Life Events','Scenario-owned events stay separate from baseline profile assumptions.', false, 'Life events are linked by workflow, not silently copied into baseline inputs.');
  var allProfileIds = ['age','retireAge','income1','income2','income2RetireAge','currentSpend','retireSpend','captureRate','inflationRate','returnProfile','invested','cash','debt','filingStatus','taxState','countyTaxRate','cityTaxRate'];
  var capturedValues = captureProfileFieldValues(coreCard,allProfileIds);
  household.id = 'householdGrid';
  income.id = 'incomeGrid';
  expenses.id = 'expenseGrid';
  assets.id = 'assetGrid';
  debts.id = 'debtGrid';
  retirement.id = 'retirementGrid';
  locationTaxes.id = 'locationTaxGrid';
  specialAccounts.id = 'specialAccountsGrid';
  scenarioAssumptions.id = 'scenarioAssumptionsGrid';
  lifeEvents.id = 'lifeEventsGrid';
  moveFieldsFromSource(coreCard,['age'],'householdGrid');
  moveFieldsFromSource(coreCard,['income1','income2','income2RetireAge'],'incomeGrid');
  moveFieldsFromSource(coreCard,['currentSpend'],'expenseGrid');
  moveFieldsFromSource(coreCard,['invested','cash'],'assetGrid');
  moveFieldsFromSource(coreCard,['debt'],'debtGrid');
  moveFieldsFromSource(coreCard,['retireAge','retireSpend'],'retirementGrid');
  moveFieldsFromSource(coreCard,['filingStatus','taxState','countyTaxRate','cityTaxRate'],'locationTaxGrid');
  moveFieldsFromSource(coreCard,['captureRate','inflationRate','returnProfile'],'scenarioAssumptionsGrid');
  ensureProfileCoreFields({household:household,income:income,expenses:expenses,assets:assets,debts:debts,retirement:retirement,locationTaxes:locationTaxes,scenarioAssumptions:scenarioAssumptions},capturedValues);
  var retirementFields = ['ssStartAge','ssMonthly','pensionStartAge','pensionMonthly'];
  for(var i=0;i<retirementFields.length;i++){
    var field = document.createElement('div'); field.className='field profile-field';
    if(retirementFields[i]==='ssStartAge') field.innerHTML='<label>Social Security start age</label><input id="ssStartAge" type="number" value="67" oninput="commit()"><small class="profile-field-helper">Placeholder age for future special-account modeling.</small>';
    if(retirementFields[i]==='ssMonthly') field.innerHTML='<label>Social Security monthly amount</label><div class="profile-control-wrap"><input id="ssMonthly" type="number" value="0" oninput="commit()"></div><small class="profile-field-helper">Monthly estimate. Use 0 when unknown.</small>';
    if(retirementFields[i]==='pensionStartAge') field.innerHTML='<label>Pension start age</label><input id="pensionStartAge" type="number" value="65" oninput="commit()"><small class="profile-field-helper">Placeholder age for future pension handling.</small>';
    if(retirementFields[i]==='pensionMonthly') field.innerHTML='<label>Pension monthly amount</label><div class="profile-control-wrap"><input id="pensionMonthly" type="number" value="0" oninput="commit()"></div><small class="profile-field-helper">Monthly estimate. Use 0 when not applicable.</small>';
    specialAccounts.appendChild(field);
  }
  if(eventsCard){
    var helper = document.createElement('div');
    helper.className='dashboard-summary profile-empty-note';
    helper.innerHTML='<strong>Life events are managed in Scenarios.</strong><br>Use the Scenarios tab to add, compare, or remove events without silently mutating baseline profile inputs.';
    lifeEvents.appendChild(helper);
  }
}
