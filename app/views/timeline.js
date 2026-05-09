function renderTimelineView(){
  var timelineView = document.createElement('section');
  timelineView.id = 'timelineView';
  timelineView.className = 'view';

  var timelineCard = document.createElement('div'); timelineCard.className='card';
  timelineCard.innerHTML = '<div class="section-head"><div><h3>Timeline</h3><p>Simple life path markers based on the current profile inputs.</p></div></div><div class="view-status-banner"><span class="view-status-label status-mvp">MVP</span><span>Timeline is readable scenario context, not a complete planning calendar. Future refinements can expand labels and overlays without moving inputs out of Profile.</span></div><div class="timeline-intro"><div><h4>Your Financial Life Path</h4><p id="timelineScenarioLine">Scenario B retires at the same age.</p></div><div class="timeline-key"><span><i></i>Scenario A</span><span><i class="scenario-b-line"></i>Scenario B</span></div></div><div class="timeline-shell"><div class="timeline-track" id="timelineTrack"></div></div><div class="timeline-summary" id="timelineSummary"></div>';
  timelineView.appendChild(timelineCard);

  var timelineAdvisorCard = document.createElement('div'); timelineAdvisorCard.className='card';
  timelineAdvisorCard.innerHTML = '<div class="section-head"><div><h3>Advisor Insights</h3><p>Plain-English readout from the timeline and Scenario B comparison.</p></div></div><h4 class="advisor-actions-title">Recommended Actions</h4><ul class="advisor-insights" id="timelineAdvisorInsights"></ul>';
  timelineView.appendChild(timelineAdvisorCard);

  return timelineView;
}
