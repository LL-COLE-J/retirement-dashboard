function renderProfileView(coreCard, profileIds, assumptionIds, eventsCard){
  var profileView = document.createElement('section'); profileView.id='profileView'; profileView.className='view';
  var profileCard = document.createElement('div'); profileCard.className='card';
  profileCard.innerHTML = '<div class="section-head"><div><h3>Profile</h3><p>Input center for household, income, spending, debts, life events, and tax setup.</p></div></div><div id="planSetupSummary" class="dashboard-summary" style="margin-bottom:10px">Plan setup appears after model run.</div><div class="mini-list" id="profileSections"></div>';
  profileView.appendChild(profileCard);
  buildProfileInputCenter(coreCard, profileIds, assumptionIds, eventsCard, profileView.querySelector('#profileSections'));
  return profileView;
}

function buildProfileInputCenter(coreCard, profileIds, assumptionIds, eventsCard, profileHolder){
  var holder = profileHolder || el('profileSections');
  if(!holder || !coreCard) return;
  function section(title, openByDefault){
    var details = document.createElement('details');
    if(openByDefault) details.setAttribute('open','open');
    details.className = 'section-block';
    details.innerHTML = '<summary>'+title+'</summary><div class="compact-grid"></div>';
    holder.appendChild(details);
    return details.querySelector('.compact-grid');
  }
  var household = section('Household', true);
  var income = section('Income', true);
  var retirementIncome = section('Retirement Income', false);
  var expenses = section('Expenses', false);
  var debts = section('Debts', false);
  var lifeEvents = section('Life Events', false);
  var locationTaxes = section('Location & Taxes', false);
  moveFieldsFromSource(coreCard,['age','retireAge'],household.id = 'householdGrid');
  moveFieldsFromSource(coreCard,['income1','income2','income2RetireAge'],income.id = 'incomeGrid');
  moveFieldsFromSource(coreCard,['currentSpend','retireSpend','captureRate','inflationRate','returnProfile','invested','cash'],expenses.id = 'expenseGrid');
  moveFieldsFromSource(coreCard,['debt'],debts.id = 'debtGrid');
  moveFieldsFromSource(coreCard,['filingStatus','taxState','countyTaxRate','cityTaxRate'],locationTaxes.id = 'locationTaxGrid');
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
    helper.innerHTML='<strong>Life events are managed in Scenarios.</strong><br>Use the Scenarios tab to add or edit events.';
    lifeEvents.appendChild(helper);
  }
}
