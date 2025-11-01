# PowerShell script to start the backend server correctly
Set-Location $PSScriptRoot
Write-Host "Starting backend server from: $PWD" -ForegroundColor Green
Write-Host "Make sure you're in the backend directory!" -ForegroundColor Yellow
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload


