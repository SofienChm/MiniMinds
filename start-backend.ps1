# Start .NET Backend API
Write-Host "Starting Daycare API Backend..." -ForegroundColor Green
Write-Host "API URL: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Swagger UI: http://localhost:5000/swagger" -ForegroundColor Cyan
Write-Host ""

# Check if .NET SDK is installed
if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: .NET SDK is not installed!" -ForegroundColor Red
    Write-Host "Please install .NET 8 SDK from: https://dotnet.microsoft.com/download/dotnet/8.0" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After installation, run these commands:" -ForegroundColor Yellow
    Write-Host "  1. dotnet restore" -ForegroundColor White
    Write-Host "  2. dotnet ef migrations add InitialCreate" -ForegroundColor White
    Write-Host "  3. dotnet ef database update" -ForegroundColor White
    Write-Host "  4. dotnet run" -ForegroundColor White
    exit 1
}

Set-Location "c:\laragon\www\daycare\DaycareAPI"

# Check if migrations exist
if (!(Test-Path "Migrations")) {
    Write-Host "Creating database migrations..." -ForegroundColor Yellow
    dotnet ef migrations add InitialCreate
    
    Write-Host "Updating database..." -ForegroundColor Yellow
    dotnet ef database update
}

Write-Host "Starting API..." -ForegroundColor Green
dotnet run