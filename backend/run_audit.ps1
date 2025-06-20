Write-Host "Running fresh audit in backend folder..."
Set-Location "C:\devils-coin\Devils-Coin\backend"
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
npm install
npm audit --json | Out-File -FilePath "pre-fix-audit.json" -Encoding UTF8
Write-Host "Backend audit complete - results saved to pre-fix-audit.json"

