Write-Host "=== Bastion Local Check ==="

$errors = 0

if (!(Test-Path "index.html")) {
  Write-Host "ERROR: index.html missing"
  $errors++
} else {
  Write-Host "OK: index.html exists"
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

$indexHtml = Get-Content "index.html" -Raw
$saveStateDoc = Get-Content "SAVE_STATE.md" -Raw
$ownerView = if (Test-Path "app/views/owner.js") { Get-Content "app/views/owner.js" -Raw } else { "" }

$conflictTokens = @(([char]60).ToString() * 7, ([char]61).ToString() * 7, ([char]62).ToString() * 7)
if ($conflictTokens | Where-Object { $indexHtml.Contains($_) -or $ownerView.Contains($_) }) {
  Write-Host "ERROR: merge conflict markers found in index.html or app/views/owner.js"
  $errors++
}

if ($indexHtml -match "codex[-_/ ]branch") {
  Write-Host "ERROR: branch artifact text found in index.html"
  $errors++
}

if ($indexHtml -notmatch "function showView\(") {
  Write-Host "ERROR: showView routing function missing"
  $errors++
}

$hasDashboardBinding = $indexHtml -match "data-view=\"dashboard\"" -or $indexHtml -match "'dashboard'"
$hasProfileBinding = $indexHtml -match "data-view=\"profile\"" -or $indexHtml -match "'profile'"
if (!$hasDashboardBinding -or !$hasProfileBinding) {
  Write-Host "ERROR: navigation data-view bindings missing"
  $errors++
}

if ($indexHtml -notmatch "id=\"ownerDashboard\"" -and $ownerView -notmatch "id=\"ownerDashboard\"") {
  Write-Host "ERROR: owner dashboard route shell missing"
  $errors++
}

if ($indexHtml -match ">Life Events Builder<|>Add Debt<|Assumptions</h3>") {
  Write-Host "ERROR: dashboard/profile builder artifact found in source"
  $errors++
}

$uiSave = [regex]::Match($indexHtml, "Bastion Save State (\d+\.\d+)").Groups[1].Value
$docSave = [regex]::Match($saveStateDoc, "Save State (\d+\.\d+)").Groups[1].Value
if ($uiSave -and $docSave -and $uiSave -ne $docSave) {
  Write-Host "ERROR: Save State mismatch between UI ($uiSave) and SAVE_STATE.md ($docSave)"
  $errors++
}

if ($errors -eq 0) {
  Write-Host ""
  Write-Host "Bastion check passed"
} else {
  Write-Host ""
  Write-Host "Bastion check failed"
}
