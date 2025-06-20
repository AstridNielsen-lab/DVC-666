# Script to run npm audit --production in both backend and frontend folders
# and save outputs to post-fix-audit.json files

Write-Host "Running post-fix vulnerability audits..." -ForegroundColor Green

# Backend audit
Write-Host "\n=== Backend Audit ===" -ForegroundColor Yellow
Set-Location "backend"
try {
    npm audit --production *>&1 | Tee-Object -FilePath "post-fix-audit.json"
    Write-Host "Backend audit completed. Output saved to backend/post-fix-audit.json" -ForegroundColor Green
    
    # Display the results
    Write-Host "\nBackend Audit Results:" -ForegroundColor Cyan
    Get-Content "post-fix-audit.json" | Write-Host
} catch {
    Write-Host "Error running backend audit: $_" -ForegroundColor Red
}

# Frontend audit
Write-Host "\n=== Frontend Audit ===" -ForegroundColor Yellow
Set-Location "../frontend"
try {
    npm audit --production *>&1 | Tee-Object -FilePath "post-fix-audit.json"
    Write-Host "Frontend audit completed. Output saved to frontend/post-fix-audit.json" -ForegroundColor Green
    
    # Display the results
    Write-Host "\nFrontend Audit Results:" -ForegroundColor Cyan
    Get-Content "post-fix-audit.json" | Write-Host
} catch {
    Write-Host "Error running frontend audit: $_" -ForegroundColor Red
}

# Return to root directory
Set-Location ".."

Write-Host "\n=== Audit Summary ===" -ForegroundColor Green
Write-Host "Both audits completed. Check individual post-fix-audit.json files for details." -ForegroundColor Green

