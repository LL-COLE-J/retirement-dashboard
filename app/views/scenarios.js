function renderScenariosView(existingView, eventsCard, tweakCard){
  var scenariosView = existingView || document.createElement('section');
  scenariosView.id = 'scenariosView';
  scenariosView.className = 'view';

  if(eventsCard) scenariosView.appendChild(eventsCard);
  if(tweakCard) scenariosView.appendChild(tweakCard);

  var phase210Card = document.createElement('div');
  phase210Card.className = 'card scenario-console-card';
  phase210Card.innerHTML = '<div class="section-head"><div><h3>Scenario Planning</h3><p>Scenario overlay applies only to scenario path. Baseline projection remains unchanged.</p></div></div>'+
    '<div class="view-status-banner"><span class="view-status-label status-mvp">MVP</span><span>Scenario controls support comparison and stress-test framing. Expanded event libraries, onboarding presets, and trusted-beta flows stay future scoped.</span></div>'+
    '<div class="scenario-visual-strip"><div><span>Property comparison</span><strong>Home A vs Home B</strong><small>Future relocation inputs stay Profile-owned.</small></div><div><span>Equity unlock</span><strong>Downsize / relocate</strong><small>Current phase is visual polish only.</small></div><div><span>Lifestyle score</span><strong>Clarity first</strong><small>Tradeoffs remain decision-focused.</small></div></div><div class="form-grid">'+
    '<div class="field"><label>First Retiree</label><select><option>Person 1</option><option>Person 2</option></select></div>'+
    '<div class="field"><label>Retires First Age</label><input id="scenarioFirstRetireAge" type="number" value="67" oninput="commit()"></div>'+
    '<div class="field"><label>Survivor Scenario</label><select id="scenarioSurvivor" onchange="commit()"><option value="off" selected>Off</option><option value="on">On</option></select></div>'+
    '<div class="field"><label>Medical / LTC Shock Type</label><select id="scenarioMedicalType" onchange="commit()"><option value="one_time" selected>One-time</option><option value="annual">Annual</option></select></div>'+
    '<div class="field"><label>Medical / LTC Shock Amount</label><input id="scenarioMedicalAmount" type="number" value="0" oninput="commit()"></div>'+
    '<div class="field"><label>Market Crash %</label><input id="scenarioMarketCrash" type="number" value="0" oninput="commit()"></div>'+
    '<div class="field"><label>Tax Increase %</label><input id="scenarioTaxIncrease" type="number" value="0" oninput="commit()"></div>'+
    '</div><div class="sub" id="scenarioComparison">Scenario comparison will update after projection run.</div>';
  scenariosView.appendChild(phase210Card);

  return scenariosView;
}
