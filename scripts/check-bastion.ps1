Write-Host "=== Bastion Local Check ==="

$errors = 0

if (!(Test-Path "app\index.html")) {
  Write-Host "ERROR: app\index.html missing"
  $errors++
} else {
  Write-Host "OK: app/index.html exists"
}

if (!(Test-Path "AGENTS.md")) {
  Write-Host "ERROR: AGENTS.md missing"
  $errors++
}

if (!(Test-Path "SAVE_STATE.md")) {
  Write-Host "ERROR: SAVE_STATE.md missing"
  $errors++
}

if (!(Test-Path "ROADMAP.md")) {
  Write-Host "ERROR: ROADMAP.md missing"
  $errors++
}

if (!(Test-Path "REGRESSION_CHECKLIST.md")) {
  Write-Host "ERROR: REGRESSION_CHECKLIST.md missing"
  $errors++
}

Write-Host ""
git status --short

if ($errors -eq 0) {
  Write-Host ""
  Write-Host "Bastion check passed"
} else {
  Write-Host ""
  Write-Host "Bastion check failed"
}