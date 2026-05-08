function renderTaxRmdView(){
  var taxCard = document.createElement('div'); taxCard.className='tax-page'; taxCard.id='taxRmdPage';
  taxCard.innerHTML = '<div class="tax-header"><div><div class="tax-pill">Tax & RMD clarity layer retained — 2.40</div><h3>Your Withdrawal Plan</h3><p>Lightweight tax-planning view for compliance, withdrawal order, and stress-tested downside.</p></div><span class="tax-pill">Save State 2.40</span></div>'+
    '<div class="tax-grid cols-2">'+
    '<div class="tax-card"><h4>Status</h4><div class="tax-metric tax-good" id="taxComplianceStatus">ON TRACK</div><div class="tax-muted" id="taxComplianceNote">One-line reason appears after projection.</div></div>'+
    '<div class="tax-card"><h4>Estimated Lifetime Taxes</h4><div class="tax-metric" id="lifetimeTaxMetric">Needs input</div><div class="tax-muted" id="taxImpactComparison">Withdrawal order recommendation appears after projection.</div></div>'+
    '</div>'+
    '<div class="tax-card"><h4>What this means for you</h4><div class="tax-muted" id="taxMeaning">Run the model for a plain-English summary.</div></div>'+
    '<div class="tax-card"><h4>Where risk could appear</h4><div class="tax-muted" id="taxRiskAreas">Risk areas appear after projection.</div></div>'+
    '<div class="tax-card"><h4>Your next best move</h4><div class="tax-muted" id="taxNextMove">Run the model to get one action-focused recommendation.</div></div>'+
    '<div class="tax-card"><h4>Withdrawal Strategy</h4><div class="tax-step-row"><div class="tax-step"><span>Step 1</span><strong>Taxable first</strong><div class="tax-muted">Use brokerage assets first to manage bracket creep.</div></div><div class="tax-step"><span>Step 2</span><strong>Tax-deferred second</strong><div class="tax-muted">Pull traditional balances to satisfy RMD and control taxes.</div></div><div class="tax-step"><span>Step 3</span><strong>Roth last</strong><div class="tax-muted">Preserve tax-free growth for flexibility and legacy.</div></div></div></div>'+
    '<div class="tax-grid cols-2">'+
    '<div class="tax-card"><h4>RMD Education</h4><div class="tax-muted">Required Minimum Distributions (RMDs) begin at age 73 for most tax-deferred accounts. Missing required distributions can create penalty risk.</div></div>'+
    '<div class="tax-card"><h4>RMD Schedule (5 years)</h4><div class="tax-table-wrap"><table class="tax-table"><thead><tr><th>Age</th><th>Tax-Deferred Balance</th><th>Divisor</th><th>RMD</th><th>Est. Tax</th></tr></thead><tbody id="rmdScheduleBody"><tr><td colspan="5">Needs input</td></tr></tbody></table></div></div>'+
    '</div>'+
    '<div class="tax-grid cols-2">'+
    '<div class="tax-card"><h4>Withdrawal Order Table</h4><div class="tax-muted" id="takeMoneyWhy">Needs input</div><div class="tax-muted" id="withdrawalExplain">Needs input</div></div>'+
    '<div class="tax-card tax-why"><h4>Why this order?</h4><div class="tax-muted">This sequence generally minimizes lifetime tax drag while preserving optionality for high-expense years.</div></div>'+
    '</div>'+
    '<div class="tax-grid cols-2">'+
    '<div class="tax-card"><h4>Scenario Impact Comparison</h4><div class="tax-muted" id="taxImpactDetail">Needs input</div></div>'+
    '<div class="tax-card"><h4>Stress Test</h4><div class="tax-muted" id="taxStress">Needs input</div></div>'+
    '</div>'+
    '<div class="tax-card"><h4>Bottom-line Recommendation</h4><div class="tax-muted" id="taxBottomLine">Needs input. Add account split and withdrawal assumptions to generate a stronger recommendation.</div><div class="tax-actions"><button class="tax-btn" onclick="showView(\'scenarios\')">Run New Scenario</button></div></div>';
  return taxCard;
}
