# Bastion Save State 2.36h — Profile View Extracted

- Save State 2.36h active.
- Profile view rendering now lives in `app/views/profile.js`.
- Root `index.html` calls `renderProfileView()` while preserving routing, navigation, UI, and calculations.
- Dashboard, Profile, Advisor, Scenarios, Timeline, Tax & RMD, and Reports remain in the same user flow.
