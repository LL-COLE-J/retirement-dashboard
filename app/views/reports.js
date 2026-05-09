function renderReportsView() {
  var reportsView = document.createElement('section');
  reportsView.id = 'reportsView';
  reportsView.className = 'view';

  var reportsCard = document.createElement('div');
  reportsCard.className = 'card report-surface';
  reportsCard.innerHTML = '<div class="report-brand-row"><img class="brand-asset brand-report-img" src="assets/brand/bastion-report-mark.svg" alt="Bastion Insights Plan Snapshot Report"><span class="report-brand-note">Executive briefing brand system</span></div>'+
    '<div class="section-head"><div><h3>Plan Snapshot Report</h3><p>Share-ready summary of your current plan outputs.</p></div><button class="btn secondary" onclick="toggleDecisionReport(true)">Refresh Snapshot</button></div>'+
    '<div class="view-status-banner"><span class="view-status-label status-placeholder">Placeholder</span><span>Reports are a snapshot surface only. Export, advisor delivery, and full report generation remain future phases.</span></div>'+
    '<div class="grid cols-3 report-summary-grid">'+
    '<div class="card"><div class="label">Plan Status</div><div class="metric small" id="reportPlanStatus">-</div></div>'+
    '<div class="card"><div class="label">Run-Out Age</div><div class="metric small" id="reportRunOut">-</div></div>'+
    '<div class="card"><div class="label">Key Drivers</div><div class="sub" id="reportKeyDrivers">Run the model to populate key drivers.</div></div>'+
    '</div>'+
    '<div class="dashboard-summary brand-surface-card report-briefing-card"><strong>Scenario Summary</strong><br><span id="reportScenarioSummary">Run Scenario A vs B to fill this snapshot section.</span><br><br><strong>Tax/RMD Note</strong><br><span id="reportTaxNote">Tax and RMD summary appears after model run.</span><br><br><strong>Recommended Next Steps</strong><br><span id="reportNextSteps">Generate report after input updates.</span></div>';
  reportsView.appendChild(reportsCard);

  return reportsView;
}
