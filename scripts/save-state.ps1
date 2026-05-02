Write-Host "=== Bastion Save State ==="

$version = Read-Host "Enter version"

git add .
git commit -m "Update save state to $version"
git push

Write-Host "Saved as $version"