# Script to verify post-fix audit results

Write-Host "=== Post-Fix Audit Verification ===" -ForegroundColor Green
Write-Host ""

# Check backend audit results
Write-Host "Backend Audit Results:" -ForegroundColor Yellow
if (Test-Path "backend/post-fix-audit.json") {
    $backendAudit = Get-Content "backend/post-fix-audit.json" | ConvertFrom-Json
    $backendVulns = $backendAudit.metadata.vulnerabilities.total
    Write-Host "  - Total vulnerabilities: $backendVulns" -ForegroundColor $(if ($backendVulns -eq 0) { 'Green' } else { 'Red' })
    Write-Host "  - Status: $(if ($backendVulns -eq 0) { 'PASS - 0 vulnerabilities' } else { 'FAIL - Vulnerabilities found' })" -ForegroundColor $(if ($backendVulns -eq 0) { 'Green' } else { 'Red' })
} else {
    Write-Host "  - ERROR: backend/post-fix-audit.json not found" -ForegroundColor Red
}

Write-Host ""

# Check frontend audit results
Write-Host "Frontend Audit Results:" -ForegroundColor Yellow
if (Test-Path "frontend/post-fix-audit.json") {
    $frontendAudit = Get-Content "frontend/post-fix-audit.json" | ConvertFrom-Json
    $frontendVulns = $frontendAudit.metadata.vulnerabilities.total
    Write-Host "  - Total vulnerabilities: $frontendVulns" -ForegroundColor $(if ($frontendVulns -eq 0) { 'Green' } else { 'Red' })
    Write-Host "  - Status: $(if ($frontendVulns -eq 0) { 'PASS - 0 vulnerabilities' } else { 'FAIL - Vulnerabilities found' })" -ForegroundColor $(if ($frontendVulns -eq 0) { 'Green' } else { 'Red' })
} else {
    Write-Host "  - ERROR: frontend/post-fix-audit.json not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Green

$backendExists = Test-Path "backend/post-fix-audit.json"
$frontendExists = Test-Path "frontend/post-fix-audit.json"

if ($backendExists -and $frontendExists) {
    $backendAudit = Get-Content "backend/post-fix-audit.json" | ConvertFrom-Json
    $frontendAudit = Get-Content "frontend/post-fix-audit.json" | ConvertFrom-Json
    $totalVulns = $backendAudit.metadata.vulnerabilities.total + $frontendAudit.metadata.vulnerabilities.total
    
    if ($totalVulns -eq 0) {
        Write-Host "✅ SUCCESS: Both backend and frontend show 0 vulnerabilities" -ForegroundColor Green
        Write-Host "✅ Vulnerability resolution verified" -ForegroundColor Green
    } else {
        Write-Host "❌ FAILURE: $totalVulns vulnerabilities still present" -ForegroundColor Red
    }
} else {
    Write-Host "❌ FAILURE: Missing audit files" -ForegroundColor Red
}

