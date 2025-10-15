# Installation Checklist ✅

Use this checklist to set up and run your Daycare Admin Panel.

---

## 📋 Pre-Installation Checklist

### System Requirements
- [ ] Windows 10/11
- [ ] At least 4GB RAM
- [ ] 2GB free disk space

### Software Status
- [✅] **Node.js v22.19.0** - Installed
- [✅] **npm** - Installed
- [❌] **.NET 8 SDK** - Not installed (Required)
- [⚠️] **MySQL** - Check Laragon

---

## 🔧 Step 1: Install .NET 8 SDK

### Download & Install
- [ ] Go to: https://dotnet.microsoft.com/download/dotnet/8.0
- [ ] Download "SDK x64" for Windows
- [ ] Run the installer
- [ ] Follow installation wizard
- [ ] Restart your terminal/PowerShell

### Verify Installation
```powershell
dotnet --version
```
Expected output: `8.0.x`

- [ ] .NET SDK version displayed correctly

---

## 🛠️ Step 2: Install Entity Framework Core Tools

### Install Global Tool
```powershell
dotnet tool install --global dotnet-ef
```

### Verify Installation
```powershell
dotnet ef --version
```
Expected output: `Entity Framework Core .NET Command-line Tools 8.0.x`

- [ ] EF Core tools installed successfully

---

## 🗄️ Step 3: Setup MySQL Database

### Option A: Using Laragon (Recommended)
- [ ] Open Laragon application
- [ ] Click "Start All" button
- [ ] Verify MySQL service is running (green indicator)
- [ ] Default credentials:
  - Host: `localhost`
  - User: `root`
  - Password: (empty)
  - Port: `3306`

### Option B: Standalone MySQL
- [ ] Install MySQL Server 8.0+
- [ ] Note your credentials
- [ ] Update `DaycareAPI/appsettings.json` with your connection string

### Verify MySQL is Running
```powershell
# Test MySQL connection (if mysql client is installed)
mysql -u root -p
```

- [ ] MySQL is running and accessible

---

## 📦 Step 4: Install Backend Dependencies

### Navigate to Backend Folder
```powershell
cd c:\laragon\www\daycare\DaycareAPI
```

### Restore NuGet Packages
```powershell
dotnet restore
```

Expected output: `Restore succeeded`

- [ ] All NuGet packages restored successfully
- [ ] No errors displayed

---

## 🗃️ Step 5: Create Database

### Create Migration
```powershell
cd c:\laragon\www\daycare\DaycareAPI
dotnet ef migrations add InitialCreate
```

Expected output: `Done. To undo this action, use 'ef migrations remove'`

- [ ] Migration files created in `Migrations` folder

### Apply Migration to Database
```powershell
dotnet ef database update
```

Expected output: `Done.`

- [ ] Database `DaycareDB` created
- [ ] All tables created successfully

### Verify Database Creation
You can check in Laragon's HeidiSQL or any MySQL client:
- [ ] Database `DaycareDB` exists
- [ ] Tables created:
  - [ ] AspNetUsers
  - [ ] AspNetRoles
  - [ ] AspNetUserRoles
  - [ ] Parents
  - [ ] Children
  - [ ] DailyActivities
  - [ ] Attendance
  - [ ] Notifications

---

## 🚀 Step 6: Start Backend API

### Run the API
```powershell
cd c:\laragon\www\daycare\DaycareAPI
dotnet run
```

Or use the convenience script:
```powershell
cd c:\laragon\www\daycare
.\start-backend.ps1
```

Expected output:
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

### Verify Backend is Running
- [ ] Open browser: http://localhost:5000/swagger
- [ ] Swagger UI loads successfully
- [ ] All API endpoints visible

**Keep this terminal window open!**

---

## 🎨 Step 7: Verify Frontend Dependencies

### Check Node Modules
```powershell
cd c:\laragon\www\daycare\daycare-admin
Test-Path node_modules
```

Expected output: `True`

- [✅] node_modules folder exists (already installed)

### If node_modules doesn't exist:
```powershell
npm install
```

---

## 🌐 Step 8: Start Frontend Application

### Open New Terminal Window
**Important**: Keep the backend terminal running!

### Run Angular Dev Server
```powershell
cd c:\laragon\www\daycare\daycare-admin
npm start
```

Or use the convenience script:
```powershell
cd c:\laragon\www\daycare
.\start-frontend.ps1
```

Expected output:
```
** Angular Live Development Server is listening on localhost:4200 **
✔ Compiled successfully.
```

### Verify Frontend is Running
- [ ] Open browser: http://localhost:4200
- [ ] Application loads
- [ ] Login page displays

**Keep this terminal window open too!**

---

## 👤 Step 9: Create First User Account

### Register Admin User
- [ ] Navigate to: http://localhost:4200/register
- [ ] Fill in the form:
  - Full Name: `Admin User`
  - Email: `admin@daycare.com`
  - Password: `Admin@123` (or your secure password)
  - Confirm Password: (same as above)
- [ ] Click "Register"
- [ ] Registration successful
- [ ] Redirected to login page

### Login
- [ ] Enter email: `admin@daycare.com`
- [ ] Enter password: `Admin@123`
- [ ] Click "Login"
- [ ] Successfully logged in
- [ ] Redirected to Dashboard

---

## ✅ Step 10: Verify All Features

### Dashboard
- [ ] Dashboard page loads
- [ ] Statistics cards display (0 parents, 0 children, 0 check-ins)
- [ ] "No attendance records" message shows

### Parents Management
- [ ] Navigate to "Parents" from sidebar
- [ ] Page loads with empty table
- [ ] Click "Add Parent" button
- [ ] Modal form opens
- [ ] Fill in parent details:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Phone: `555-0100`
  - Address: `123 Main St`
  - Emergency Contact: `Jane Doe - 555-0101`
- [ ] Click "Save"
- [ ] Parent appears in table
- [ ] Edit parent (click edit icon)
- [ ] Update works correctly
- [ ] Search functionality works

### Children Management
- [ ] Navigate to "Children" from sidebar
- [ ] Click "Add Child"
- [ ] Fill in child details:
  - Name: `Emma Doe`
  - Date of Birth: (select date)
  - Parent: `John Doe` (from dropdown)
  - Medical Notes: `No allergies`
- [ ] Click "Save"
- [ ] Child appears in table with age calculated
- [ ] Edit and delete work correctly

### Daily Activities
- [ ] Navigate to "Activities" from sidebar
- [ ] Click "Add Activity"
- [ ] Fill in activity:
  - Child: `Emma Doe`
  - Activity Type: `Nap`
  - Activity Time: (current time)
  - Duration: `30`
  - Mood: `Happy`
  - Notes: `Slept well`
- [ ] Click "Save"
- [ ] Activity appears in table
- [ ] Filter by date works

### Attendance Tracking
- [ ] Navigate to "Attendance" from sidebar
- [ ] Click "Check-in" for Emma Doe
- [ ] Check-in time recorded
- [ ] Status shows "Present" badge
- [ ] Click "Check-out"
- [ ] Check-out time recorded
- [ ] Status shows "Checked Out" badge

### Header & Navigation
- [ ] User name displays in header
- [ ] User initials show (or profile picture)
- [ ] Notification icon visible
- [ ] Notification count badge works
- [ ] Click notification icon shows dropdown
- [ ] Logout button works
- [ ] After logout, redirected to login

---

## 🎉 Installation Complete!

If all checkboxes are checked, your Daycare Admin Panel is fully installed and working!

---

## 🐛 Troubleshooting

### Backend won't start
**Error**: `dotnet: command not found`
- [ ] Restart PowerShell after installing .NET SDK
- [ ] Check PATH environment variable

**Error**: `Unable to connect to database`
- [ ] Verify MySQL is running in Laragon
- [ ] Check connection string in `appsettings.json`
- [ ] Ensure database was created with `dotnet ef database update`

**Error**: `Port 5000 already in use`
- [ ] Stop other applications using port 5000
- [ ] Or change port in `Properties/launchSettings.json`

### Frontend won't start
**Error**: `npm: command not found`
- [ ] Verify Node.js is installed: `node --version`
- [ ] Reinstall Node.js if needed

**Error**: `Port 4200 already in use`
- [ ] Stop other Angular apps
- [ ] Or run: `ng serve --port 4201`

**Error**: `Module not found`
- [ ] Delete `node_modules` folder
- [ ] Delete `package-lock.json`
- [ ] Run `npm install` again

### Login Issues
**Error**: `Cannot connect to API`
- [ ] Verify backend is running at http://localhost:5000
- [ ] Check browser console for CORS errors
- [ ] Verify API URL in `src/environments/environment.ts`

**Error**: `Invalid credentials`
- [ ] Ensure you registered the user first
- [ ] Check email and password are correct
- [ ] Passwords are case-sensitive

### Database Issues
**Error**: `Table doesn't exist`
- [ ] Run migrations: `dotnet ef database update`
- [ ] Check if database was created in MySQL

**Error**: `Migration failed`
- [ ] Ensure MySQL is running
- [ ] Check connection string
- [ ] Delete `Migrations` folder and try again

---

## 📞 Need Help?

### Documentation Files
- `README.md` - Original project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `QUICK_START.md` - Quick start guide
- `PROJECT_SUMMARY.md` - Complete project summary
- `APPLICATION_FLOW.md` - Visual flow diagrams

### Online Resources
- Angular: https://angular.io/docs
- .NET: https://docs.microsoft.com/dotnet
- Entity Framework: https://docs.microsoft.com/ef/core
- Bootstrap: https://getbootstrap.com/docs

### API Documentation
- Swagger UI: http://localhost:5000/swagger (when backend is running)

---

## 🎯 Next Steps After Installation

1. **Customize Settings**
   - [ ] Update JWT secret in `appsettings.json`
   - [ ] Change database password
   - [ ] Configure email settings (if needed)

2. **Add Sample Data**
   - [ ] Add more parents
   - [ ] Add more children
   - [ ] Log some activities
   - [ ] Test attendance tracking

3. **Explore Features**
   - [ ] Try all CRUD operations
   - [ ] Test search functionality
   - [ ] Check notifications
   - [ ] Test date filtering

4. **Plan Enhancements**
   - [ ] Profile picture upload
   - [ ] Email notifications
   - [ ] Reports and analytics
   - [ ] Mobile responsiveness
   - [ ] Role-based access

---

## ✨ Congratulations!

You've successfully installed and configured your Daycare Admin Panel! 🎉

**Your application is now ready to manage your daycare operations.**

Happy managing! 🚀