# Bastion Save State 2.36h Patch — Profile Dropdown Options

Current status:
- Save State 2.36h patch active.
- Profile dropdown option restoration runs after `renderProfileView()` rebuilds the extracted Profile view.
- Existing Dashboard, Owner Dashboard (`owner=true`), routing, calculations, and Profile layout are preserved.
- Root `index.html` still loads extracted views from `app/views/`.

Patch completed:
- Restored Profile dropdown option values for filing status, state/location, return profile, and known Profile select IDs if they are present.
- Added a Profile-only safety initializer so blank extracted select options are rebuilt without changing populated selects.

Validation status:
- Profile opens and dropdowns show expected options in runtime validation.
- Dropdown selections continue to save through existing `commit()` / `readState()` flow.
- Dashboard opens normally in runtime validation.
- Owner Dashboard opens with `owner=true` in runtime validation.
- `scripts/check-bastion.ps1` was attempted but the container does not have `pwsh` installed.
