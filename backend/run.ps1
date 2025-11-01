# Ensure we're in the backend directory
Set-Location $PSScriptRoot
Write-Host "Current directory: $PWD" -ForegroundColor Cyan
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
