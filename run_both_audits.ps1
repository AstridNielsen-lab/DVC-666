Write-Host "Starting fresh audits for both backend and frontend folders..."
Write-Host "=" * 60

# Backend Audit
Write-Host "Running fresh audit in backend folder..."
Set-Location "C:\devils-coin\Devils-Coin\backend"
Write-Host "Cleaning backend: removing node_modules and package-lock.json..."
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Write-Host "Installing backend dependencies..."
npm install
Write-Host "Running backend audit..."
npm audit --json | Out-File -FilePath "pre-fix-audit.json" -Encoding UTF8
Write-Host "Backend audit complete - results saved to backend/pre-fix-audit.json"
Write-Host ""

# Frontend Audit
Write-Host "Running fresh audit in frontend folder..."
Set-Location "C:\devils-coin\Devils-Coin\frontend"
Write-Host "Cleaning frontend: removing node_modules and package-lock.json..."
Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
Write-Host "Installing frontend dependencies..."
npm install
Write-Host "Running frontend audit..."
npm audit --json | Out-File -FilePath "pre-fix-audit.json" -Encoding UTF8
Write-Host "Frontend audit complete - results saved to frontend/pre-fix-audit.json"

Write-Host "=" * 60
Write-Host "Both audits completed successfully!"
Write-Host "Results saved to:"
Write-Host "  - backend/pre-fix-audit.json"
Write-Host "  - frontend/pre-fix-audit.json"
Write-Host ""
Write-Host "These files contain the current vulnerability tree and can be used to:"
Write-Host "  1. Compare against post-fix audits"
Write-Host "  2. Identify which packages pull vulnerable versions of axios, ws, nth-check, postcss, webpack-dev-server"

