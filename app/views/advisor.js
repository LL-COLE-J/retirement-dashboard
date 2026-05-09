function renderAdvisorView(advisorView){
  var advisorCard = document.createElement('div'); advisorCard.className='card';
  advisorCard.innerHTML = '<div class="section-head"><div><h3>Advisor</h3><p>Expanded interpretation of the current model.</p></div><button class="btn secondary" onclick="toggleDrawer(true)">Open Drawer</button></div><div class="view-status-banner"><span class="view-status-label status-mvp">MVP</span><span>Advisor explains current outputs in plain English. Deeper financial intelligence and second-opinion workflow remain future scoped phases.</span></div><ul id="advisorPageList"></ul>';
  advisorView.appendChild(advisorCard);
  return advisorView;
}
