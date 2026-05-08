function renderOwnerView(){
  var template = document.createElement('template');
  template.innerHTML = `<section class="owner-dashboard" id="ownerDashboard" aria-label="Bastion Owner Command Center">
  <header class="owner-header">
    <div>
      <h1>Bastion Owner Command Center</h1>
      <p>Agent feedback, product intelligence, and build opportunities.</p>
    </div>
    <div class="owner-badge">Bastion Save State 2.40</div>
  </header>

  <section class="owner-section">
    <h2>Owner Command Summary</h2>
    <div class="owner-report-grid">
      <div class="owner-report-field"><span>Current Save State</span><strong id="ownerSummarySaveState">Bastion Save State 2.40</strong></div>
      <div class="owner-report-field"><span>Active Phase</span><strong id="ownerSummaryPhase">2.40 Beta UX Stabilization</strong></div>
      <div class="owner-report-field"><span>Queued Fixes</span><strong id="ownerSummaryQueued">0</strong></div>
      <div class="owner-report-field"><span>Parked Ideas</span><strong id="ownerSummaryParked">0</strong></div>
      <div class="owner-report-field"><span>Completed Validations</span><strong id="ownerSummaryCompleted">0</strong></div>
      <div class="owner-report-field"><span>Active Blockers</span><strong id="ownerSummaryWarnings">0</strong></div>
    </div>
  </section>

  <section class="owner-section">
    <h2>Active Blockers</h2>
    <div class="owner-table-wrap">
      <table class="owner-table">
        <thead><tr><th>Blocker</th><th>Affected Area</th><th>Severity</th><th>Recommended Fix</th><th>Status</th></tr></thead>
        <tbody id="ownerBlockerRows"></tbody>
      </table>
    </div>
  </section>

  <section class="owner-section">
    <h2>Active Agent Status</h2><div class="owner-grid" id="ownerActiveAgentCards"></div>
  </section>

  <section class="owner-section">
    <h2>Agent Feedback Inbox</h2>
    <div class="owner-table-wrap">
      <table class="owner-table">
        <thead><tr><th>Agent</th><th>Source</th><th>Finding</th><th>Recommendation</th><th>Priority</th><th>Status</th><th>Owner Actions</th></tr></thead>
        <tbody id="ownerFeedbackRows"></tbody>
      </table>
    </div>
  </section>

  <section class="owner-section">
    <div>
      <h2>Approved Build Queue</h2>
      <p class="owner-queue-note">Only owner-approved findings appear here. Queue status does not execute product changes.</p>
    </div>
    <div class="owner-table-wrap">
      <table class="owner-table">
        <thead><tr><th>Agent</th><th>Finding</th><th>Recommendation</th><th>Priority</th><th>Suggested Phase</th><th>Status</th></tr></thead>
        <tbody id="ownerBuildQueueRows"></tbody>
      </table>
    </div>
  </section>
  <section class="owner-section">
    <h2>Parked Ideas</h2>
    <div class="owner-table-wrap">
      <table class="owner-table">
        <thead><tr><th>Agent</th><th>Finding</th><th>Recommendation</th><th>Priority</th><th>Status</th></tr></thead>
        <tbody id="ownerParkedRows"></tbody>
      </table>
    </div>
  </section>
  <section class="owner-section">
    <h2>Daily Intelligence Report</h2>
    <div class="owner-panel owner-report">
      <div class="owner-toolbar">
        <div class="owner-report-status" id="ownerReportStatus">Firestore not connected yet - paste Firebase config locally.</div>
        <div class="owner-actions"><button class="owner-action" onclick="evaluateOwnerIntelligence('manual')">Refresh Intelligence</button><button class="owner-action primary" onclick="generateOwnerTestReport()">Generate Test Agent Report</button></div>
      </div>
      <h3 id="ownerReportTitle">Daily intelligence report</h3><div class="owner-report-grid"><div class="owner-report-field"><span>Date</span><strong id="ownerReportDate">Not loaded</strong></div><div class="owner-report-field"><span>Status</span><strong id="ownerReportState">Not connected</strong></div><div class="owner-report-field"><span>Source</span><strong>owner_reports/daily_test_report</strong></div></div>
      <div class="owner-report-summary" id="ownerReportSummary">Static agent cards remain available while Firestore is offline.</div><div class="owner-report-grid"><div class="owner-report-field"><span>Suggested Next Phase</span><strong id="ownerSuggestedNextPhase">Not loaded</strong></div><div class="owner-report-field"><span>Generated At</span><strong id="ownerGeneratedAt">Not loaded</strong></div><div class="owner-report-field"><span>Trust Notes</span><strong id="ownerTrustNotes">Not loaded</strong></div></div>
      <div class="owner-report-list"><div class="owner-report-field"><h4>Market Signals</h4><ul id="ownerMarketSignals"><li>Not loaded</li></ul></div><div class="owner-report-field"><h4>Consumer Ideas</h4><ul id="ownerConsumerIdeas"><li>Not loaded</li></ul></div><div class="owner-report-field"><h4>Enterprise Ideas</h4><ul id="ownerEnterpriseIdeas"><li>Not loaded</li></ul></div></div>
    </div>
  </section>
  <section class="owner-section">
    <div class="owner-toolbar"><h2>Completed Validations</h2><button class="owner-action" onclick="toggleOwnerCompleted()"><span id="ownerCompletedToggleLabel">Show completed validations</span></button></div>
    <div class="owner-table-wrap" id="ownerCompletedWrap" style="display:none;">
      <table class="owner-table"><thead><tr><th>Agent</th><th>Validation Completed</th><th>Related Phase</th><th>Session</th><th>Status</th></tr></thead><tbody id="ownerValidationRows"></tbody></table>
    </div>
    <div class="owner-empty-row" id="ownerCompletedHint">Completed validations hidden. Toggle to view.</div>
  </section>
</section>`;
  return template.content.firstElementChild;
}

if(typeof window !== 'undefined'){ window.renderOwnerView = renderOwnerView; }
