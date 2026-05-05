function renderAdvisorView(advisorView){
  var advisorCard = document.createElement('div'); advisorCard.className='card';
  advisorCard.innerHTML = '<div class="section-head"><div><h3>Advisor</h3><p>Expanded interpretation of the current model.</p></div><button class="btn secondary" onclick="toggleDrawer(true)">Open Drawer</button></div><ul id="advisorPageList"></ul>';
  advisorView.appendChild(advisorCard);
  return advisorView;
}
