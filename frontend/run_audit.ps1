Write-Host "Running fresh audit in frontend folder..."
Set-Location "C:\devils-coin\Devils-Coin\frontend"
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
npm install
npm audit --json | Out-File -FilePath "pre-fix-audit.json" -Encoding UTF8
Write-Host "Frontend audit complete - results saved to pre-fix-audit.json"

