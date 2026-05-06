function renderDashboardView(){
  var template = document.createElement('template');
  template.innerHTML = `
    <!-- DASHBOARD VIEW: SOURCE CARDS BEFORE ROUTER SPLIT -->
    <section class="content">
      <div class="grid cols-4">
        <div class="card"><div class="label">Path Status</div><div class="metric" id="pathStatus">Stable</div><div class="status-shell"><div class="status-fill" id="statusFill"></div></div><div class="sub" id="pathSummary">Your current path is being modeled.</div></div>
        <div class="card"><div class="label">Starting Net Worth</div><div class="metric" id="startingNetWorthMetric">$0</div><div class="sub">Cash + invested assets minus debt.</div></div>
        <div class="card"><div class="label">Gross Income</div><div class="metric" id="grossIncomeMetric">$0</div><div class="sub">Combined household earned income.</div></div>
        <div class="card"><div class="label">Projected Ending</div><div class="metric" id="endingPathMetric">$0</div><div class="sub">Modeled value at final projection age.</div></div>
      </div>

      <div class="grid cols-4">
        <div class="card"><div class="label">Estimated Federal Tax</div><div class="metric small" id="taxEstimateMetric">$0</div><div class="sub">Simplified V1 filing-status estimate.</div></div>
        <div class="card"><div class="label">After-Tax Surplus</div><div class="metric small" id="annualSurplusMetric">$0</div><div class="sub">Income after estimated tax and spend.</div></div>
        <div class="card"><div class="label">Current Spend</div><div class="metric small" id="currentSpendMetric">$0</div><div class="sub">Current household expense load.</div></div>
        <div class="card"><div class="label">Retirement Spend</div><div class="metric small" id="retireSpendMetric">$0</div><div class="sub">Target retirement lifestyle spend.</div></div>
      </div>

      <div class="grid cols-4">
        <div class="card"><div class="label">Minimum Path Value</div><div class="metric small" id="minPathMetric">$0</div><div class="sub">Lowest point in the projection.</div></div>
        <div class="card"><div class="label">Event Impact</div><div class="metric small" id="eventImpactMetric">$0</div><div class="sub">Net current-year modeled change from active life events.</div></div>
      </div>

      <div class="grid cols-2">
        <div class="card">
          <div class="section-head"><div><h3>Core Inputs</h3><p>Keep this simple. These drive the whole path before life events modify it.</p></div><div class="toggle"><button id="monthlyBtn" class="active" onclick="setMode('monthly')">Monthly</button><button id="annualBtn" onclick="setMode('annual')">Annual</button></div></div>
          <div class="form-grid">
            <div class="field"><label>Current Age</label><input id="age" type="number" value="40" oninput="commit()"></div>
            <div class="field"><label>Retirement Age</label><input id="retireAge" type="number" value="67" oninput="commit()"></div>
            <div class="field"><label>Filing Status</label><select id="filingStatus" onchange="commit()"><option value="single">Single</option><option value="married_joint" selected>Married Joint</option><option value="head_household">Head Household</option><option value="married_separate">Married Separate</option></select></div>
            <div class="field"><label>Income 1</label><input id="income1" type="number" value="85000" oninput="commit()"></div>
            <div class="field"><label>Income 2</label><input id="income2" type="number" value="0" oninput="commit()"></div>
            <div class="field"><label>Income 2 Retires At</label><input id="income2RetireAge" type="number" value="67" oninput="commit()"></div>
            <div class="field"><label>Current Spend</label><input id="currentSpend" type="number" value="45600" oninput="commit()"></div>
            <div class="field"><label>Retirement Spend</label><input id="retireSpend" type="number" value="38400" oninput="commit()"></div>
            <div class="field"><label>State</label><select id="taxState" onchange="commit()"><option value="TN" selected>Tennessee</option><option value="IL">Illinois</option><option value="MI">Michigan</option><option value="FL">Florida</option><option value="TX">Texas</option><option value="CA">California</option><option value="NY">New York</option><option value="CUSTOM">Custom / Manual</option></select></div>
            <div class="field"><label>County Tax Rate %</label><input id="countyTaxRate" type="number" step="0.01" value="0" oninput="commit()"></div>
            <div class="field"><label>City Tax Rate %</label><input id="cityTaxRate" type="number" step="0.01" value="0" oninput="commit()"></div>
            <div class="field"><label>Surplus Invested %</label><input id="captureRate" type="number" step="1" value="75" oninput="commit()"></div>
            <div class="field"><label>Inflation %</label><input id="inflationRate" type="number" step="0.1" value="3" oninput="commit()"></div>
            <div class="field"><label>Return Profile</label><select id="returnProfile" onchange="commit()"><option value="conservative">Conservative 3.5%</option><option value="moderate" selected>Moderate 4.5%</option><option value="growth">Growth 6.0%</option></select></div>
            <div class="field"><label>Invested Assets</label><input id="invested" type="number" value="125000" oninput="commit()"></div>
            <div class="field"><label>Cash</label><input id="cash" type="number" value="18000" oninput="commit()"></div>
            <div class="field"><label>Debt</label><input id="debt" type="number" value="22000" oninput="commit()"></div>
          </div>
        </div>

        <div class="card">
          <div class="section-head"><div><h3>Quick Tweaks</h3><p>Fast pressure tests without hunting through forms.</p></div></div>
          <div class="quick-grid">
            <button onclick="quickTweak('retireSpend',-100)">Retire Spend -100<small>Monthly lifestyle cut</small></button>
            <button onclick="quickTweak('retireSpend',100)">Retire Spend +100<small>Monthly lifestyle add</small></button>
            <button onclick="quickTweak('currentSpend',-100)">Current Spend -100<small>Monthly savings lift</small></button>
            <button onclick="quickTweak('income',5000)">Income +5k<small>Annual income bump</small></button>
            <button onclick="quickTweak('invested',10000)">Assets +10k<small>One-time asset lift</small></button>
            <button onclick="quickTweak('debt',-5000)">Debt -5k<small>Paydown test</small></button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="section-head">
          <div><h3>Life Events V1 Expanded</h3><p>Add/remove events. Supports future recurring expenses, income changes, one-time windfalls, and one-time expenses.</p></div>
          <button class="btn" onclick="addEvent()">+ Add Event</button>
        </div>
        <div class="event-list" id="eventList"></div>
      </div>

      <div class="grid cols-2">
        <div class="card"><div class="section-head"><div><h3>Path Projection</h3><p>Simple V1 projection: net worth path before and after life events.</p></div></div><div class="chart-wrap"><canvas id="pathChart"></canvas></div></div>
        <div class="card"><div class="section-head"><div><h3>What Changed</h3><p>Save a baseline, tweak inputs or life events, then compare.</p></div><div class="mini-actions"><button class="btn secondary" onclick="saveBaseline()">Save</button><button class="btn warn" onclick="clearBaseline()">Clear</button></div></div><div class="changed-list" id="changedList"><div class="empty">No baseline saved yet.</div></div></div>
      </div>
    </section>
`;
  return template.content.firstElementChild;
}

if(typeof window !== 'undefined'){ window.renderDashboardView = renderDashboardView; }
