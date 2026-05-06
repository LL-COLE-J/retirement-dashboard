# Bastion Save State 2.36i — Owner View Extracted

- Save State 2.36i active.
- Owner Command Center rendering now lives in `app/views/owner.js`.
- Root `index.html` loads `app/views/owner.js` and calls `renderOwnerView()` where the inline Owner view previously lived.
- `owner=true` behavior is preserved exactly; Dashboard, Profile, Advisor, Scenarios, Timeline, Tax & RMD, and Reports remain in the same user flow.
- Profile view rendering remains in `app/views/profile.js`.
