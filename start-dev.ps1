# Devil's Coin Development Environment Startup Script
Write-Host "Starting Devil's Coin Development Environment..." -ForegroundColor Red
Write-Host ""

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

# Start backend server in a new window
Write-Host "Starting backend server..." -ForegroundColor Green
$backendDir = Get-Location
Start-Process cmd -ArgumentList "/k", "cd /d $backendDir && npm run dev" -WindowStyle Normal

# Wait for backend to start
Start-Sleep -Seconds 3

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location ..
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

# Start frontend server in a new window
Write-Host "Starting frontend server..." -ForegroundColor Green
$frontendDir = Get-Location
Start-Process cmd -ArgumentList "/k", "cd /d $frontendDir && npm start" -WindowStyle Normal

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Green
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Gray
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Gray
Write-Host "API Docs: http://localhost:5000/api-docs" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to continue..."
$null = Read-Host

