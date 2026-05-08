Write-Host "=== Bastion Local Check ==="

$errors = 0
$expectedRepoPath = "/workspace/retirement-dashboard"
$repoPath = (Get-Location).Path.Replace('\','/')

Write-Host "Repository path: $repoPath"
if ($repoPath -ne $expectedRepoPath) {
  Write-Host "ERROR: expected repo path $expectedRepoPath"
  $errors++
}

Write-Host ""
Write-Host "Branch status:"
git status --short --branch

Write-Host ""
Write-Host "Remotes:"
$remoteOutput = git remote -v
if ($remoteOutput) {
  $remoteOutput | ForEach-Object { Write-Host $_ }
} else {
  Write-Host "No git remotes configured for this sandbox."
}

Write-Host ""
Write-Host "Latest commit:"
git log --oneline -1

Write-Host ""
Write-Host "Branch policy: local branch name is not required to be main for Codex sandbox validation."


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
Write-Host "Working tree changes:"
git status --short

$indexHtml = Get-Content "index.html" -Raw
$saveStateDoc = Get-Content "SAVE_STATE.md" -Raw
$ownerView = if (Test-Path "app/views/owner.js") { Get-Content "app/views/owner.js" -Raw } else { "" }

$lt = [char]60; $eq = [char]61; $gt = [char]62
$conflictPattern = "^(" + (($lt.ToString()) * 7) + "|" + (($eq.ToString()) * 7) + "|" + (($gt.ToString()) * 7) + ")"
$conflictScan = git grep -n -I -E $conflictPattern -- .
if ($LASTEXITCODE -eq 0 -and $conflictScan) {
  Write-Host "ERROR: merge conflict markers found:"
  $conflictScan | ForEach-Object { Write-Host $_ }
  $errors++
} else {
  Write-Host "OK: no merge conflict markers found in tracked text files"
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

$uiSave = [regex]::Match($indexHtml, "Bastion Save State ([^<`n]+)").Groups[1].Value.Trim()
$docSave = [regex]::Match($saveStateDoc, "Bastion Save State ([^`n]+)").Groups[1].Value.Trim()
if ($uiSave -and $docSave -and $uiSave -ne $docSave) {
  Write-Host "ERROR: Save State mismatch between UI ($uiSave) and SAVE_STATE.md ($docSave)"
  $errors++
}

Write-Host ""
Write-Host "Firebase hardening posture:"
if (Test-Path "firestore.rules") {
  $openRules = Select-String -Path "firestore.rules" -Pattern "allow\s+read\s*,\s*write\s*:\s*if\s+true"
  if ($openRules) {
    Write-Host "WARN: temporary Firestore allow read/write if true rules found; audit required before beta/production"
    $openRules | ForEach-Object { Write-Host ("{0}:{1}: {2}" -f $_.Path, $_.LineNumber, $_.Line.Trim()) }
  } else {
    Write-Host "OK: no temporary Firestore allow read/write if true rules found"
  }
}
$trackedEnv = git ls-files | Select-String -Pattern "(^|/)\.env(\.|$)"
if ($trackedEnv) {
  Write-Host "ERROR: tracked environment file found"
  $trackedEnv | ForEach-Object { Write-Host $_ }
  $errors++
} else {
  Write-Host "OK: no tracked .env files found"
}

if ($errors -eq 0) {
  Write-Host ""
  Write-Host "Bastion check passed"
  exit 0
} else {
  Write-Host ""
  Write-Host "Bastion check failed"
  exit 1
}
