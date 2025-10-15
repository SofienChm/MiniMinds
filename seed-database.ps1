# Database Seeder Management Script
# This script helps you manage database seeding for the Daycare application

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("status", "run", "clear", "reset", "help")]
    [string]$Action = "help"
)

$apiUrl = "http://localhost:5000/api/seed"

function Show-Help {
    Write-Host ""
    Write-Host "🌱 Database Seeder Management Script" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Usage: .\seed-database.ps1 -Action <action>" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Available Actions:" -ForegroundColor Cyan
    Write-Host "  status  - Check current database statistics"
    Write-Host "  run     - Run the seeder (add test data)"
    Write-Host "  clear   - Clear all data from database"
    Write-Host "  reset   - Clear and reseed database"
    Write-Host "  help    - Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\seed-database.ps1 -Action status"
    Write-Host "  .\seed-database.ps1 -Action run"
    Write-Host "  .\seed-database.ps1 -Action reset"
    Write-Host ""
}

function Get-Status {
    Write-Host ""
    Write-Host "📊 Checking database status..." -ForegroundColor Cyan
    
    try {
        $response = Invoke-RestMethod -Uri "$apiUrl/status" -Method Get
        
        Write-Host ""
        Write-Host "Database Statistics:" -ForegroundColor Green
        Write-Host "===================" -ForegroundColor Green
        Write-Host "Parents:          $($response.parents)" -ForegroundColor White
        Write-Host "Children:         $($response.children)" -ForegroundColor White
        Write-Host "Attendances:      $($response.attendances)" -ForegroundColor White
        Write-Host "Daily Activities: $($response.dailyActivities)" -ForegroundColor White
        Write-Host "Notifications:    $($response.notifications)" -ForegroundColor White
        Write-Host ""
        Write-Host "Timestamp: $($response.timestamp)" -ForegroundColor Gray
        Write-Host ""
    }
    catch {
        Write-Host ""
        Write-Host "❌ Error: Could not connect to API" -ForegroundColor Red
        Write-Host "Make sure the backend is running on http://localhost:5000" -ForegroundColor Yellow
        Write-Host ""
    }
}

function Run-Seeder {
    Write-Host ""
    Write-Host "🌱 Running database seeder..." -ForegroundColor Cyan
    
    try {
        $response = Invoke-RestMethod -Uri "$apiUrl/run" -Method Post
        
        if ($response.success) {
            Write-Host ""
            Write-Host "✅ $($response.message)" -ForegroundColor Green
            Write-Host ""
            Write-Host "Seeded Data:" -ForegroundColor Cyan
            Write-Host "  • 10 Parents with profile pictures"
            Write-Host "  • 12 Children with profile pictures"
            Write-Host "  • ~250 Attendance records"
            Write-Host "  • ~400 Daily activities"
            Write-Host "  • ~30 Notifications"
            Write-Host ""
            Write-Host "Admin Login:" -ForegroundColor Yellow
            Write-Host "  Email: admin@daycare.com"
            Write-Host "  Password: Admin@123"
            Write-Host ""
        }
        else {
            Write-Host ""
            Write-Host "⚠️ $($response.message)" -ForegroundColor Yellow
            Write-Host ""
        }
    }
    catch {
        Write-Host ""
        Write-Host "❌ Error: Could not run seeder" -ForegroundColor Red
        Write-Host "Make sure the backend is running on http://localhost:5000" -ForegroundColor Yellow
        Write-Host ""
    }
}

function Clear-Database {
    Write-Host ""
    Write-Host "⚠️  WARNING: This will delete ALL data from the database!" -ForegroundColor Red
    Write-Host ""
    $confirmation = Read-Host "Are you sure you want to continue? (yes/no)"
    
    if ($confirmation -ne "yes") {
        Write-Host ""
        Write-Host "❌ Operation cancelled" -ForegroundColor Yellow
        Write-Host ""
        return
    }
    
    Write-Host ""
    Write-Host "🗑️  Clearing database..." -ForegroundColor Cyan
    
    try {
        $response = Invoke-RestMethod -Uri "$apiUrl/clear" -Method Delete
        
        if ($response.success) {
            Write-Host ""
            Write-Host "✅ $($response.message)" -ForegroundColor Green
            Write-Host ""
        }
        else {
            Write-Host ""
            Write-Host "⚠️ $($response.message)" -ForegroundColor Yellow
            Write-Host ""
        }
    }
    catch {
        Write-Host ""
        Write-Host "❌ Error: Could not clear database" -ForegroundColor Red
        Write-Host "Make sure the backend is running on http://localhost:5000" -ForegroundColor Yellow
        Write-Host ""
    }
}

function Reset-Database {
    Write-Host ""
    Write-Host "🔄 This will clear and reseed the database with fresh test data" -ForegroundColor Cyan
    Write-Host ""
    $confirmation = Read-Host "Are you sure you want to continue? (yes/no)"
    
    if ($confirmation -ne "yes") {
        Write-Host ""
        Write-Host "❌ Operation cancelled" -ForegroundColor Yellow
        Write-Host ""
        return
    }
    
    Write-Host ""
    Write-Host "🔄 Resetting database..." -ForegroundColor Cyan
    
    try {
        $response = Invoke-RestMethod -Uri "$apiUrl/reset" -Method Post
        
        if ($response.success) {
            Write-Host ""
            Write-Host "✅ $($response.message)" -ForegroundColor Green
            Write-Host ""
            Write-Host "Fresh test data has been generated!" -ForegroundColor Cyan
            Write-Host ""
        }
        else {
            Write-Host ""
            Write-Host "⚠️ $($response.message)" -ForegroundColor Yellow
            Write-Host ""
        }
    }
    catch {
        Write-Host ""
        Write-Host "❌ Error: Could not reset database" -ForegroundColor Red
        Write-Host "Make sure the backend is running on http://localhost:5000" -ForegroundColor Yellow
        Write-Host ""
    }
}

# Main script execution
switch ($Action) {
    "status" { Get-Status }
    "run" { Run-Seeder }
    "clear" { Clear-Database }
    "reset" { Reset-Database }
    "help" { Show-Help }
    default { Show-Help }
}