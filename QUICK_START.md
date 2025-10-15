# Quick Start Guide

## Current Status

✅ **Angular Frontend** - Ready to run (dependencies installed)
❌ **.NET Backend** - Requires .NET 8 SDK installation

## Option 1: Start Frontend Only (For Development)

You can start the Angular frontend immediately to see the UI:

```powershell
cd c:\laragon\www\daycare\daycare-admin
npm start
```

Visit: http://localhost:4200

**Note**: API calls will fail until the backend is running.

## Option 2: Complete Setup (Frontend + Backend)

### Step 1: Install .NET 8 SDK

Download and install from: https://dotnet.microsoft.com/download/dotnet/8.0

### Step 2: Install EF Core Tools

```powershell
dotnet tool install --global dotnet-ef
```

### Step 3: Start MySQL (Laragon)

1. Open Laragon
2. Click "Start All" to start MySQL service

### Step 4: Setup Database

```powershell
cd c:\laragon\www\daycare\DaycareAPI
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Step 5: Start Backend

```powershell
# Option A: Use the script
.\start-backend.ps1

# Option B: Manual
cd c:\laragon\www\daycare\DaycareAPI
dotnet run
```

### Step 6: Start Frontend

Open a new PowerShell window:

```powershell
# Option A: Use the script
.\start-frontend.ps1

# Option B: Manual
cd c:\laragon\www\daycare\daycare-admin
npm start
```

## Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000
- **Swagger Documentation**: http://localhost:5000/swagger

## First Time Setup

1. Navigate to http://localhost:4200/register
2. Create your admin account
3. Login with your credentials
4. Start managing your daycare!

## Features Available

### 1. Authentication
- ✅ Login page with email/password
- ✅ Registration page for new users
- ✅ JWT token-based authentication
- ✅ Auto-redirect to login if not authenticated

### 2. Dashboard
- ✅ Statistics cards (Total Parents, Children, Check-ins)
- ✅ Today's attendance table
- ✅ Quick overview of daycare status

### 3. Parents Management
- ✅ View all parents in a table
- ✅ Search parents by name, email, or phone
- ✅ Add new parent (modal form)
- ✅ Edit parent details
- ✅ Delete parent (with confirmation)

### 4. Children Management
- ✅ View all children with parent information
- ✅ Search children by name
- ✅ Add new child (linked to parent)
- ✅ Edit child details
- ✅ Delete child
- ✅ Display age automatically calculated from date of birth
- ✅ Medical notes and allergies tracking

### 5. Daily Activities
- ✅ Log activities (Nap, Eat, Play, Diaper Change, Medicine, Other)
- ✅ Track activity time and duration
- ✅ Add notes and mood for each activity
- ✅ Filter activities by date and child
- ✅ View activity history

### 6. Attendance Tracking
- ✅ Check-in children with time stamp
- ✅ Check-out children
- ✅ View today's attendance
- ✅ Filter attendance by date
- ✅ Status badges (Present, Checked Out)
- ✅ Display check-in and check-out times

### 7. Layout & Navigation
- ✅ Left sidebar with navigation menu
- ✅ Top header with user profile
- ✅ User profile picture (or initials if no picture)
- ✅ Notification icon with unread count badge
- ✅ Notification dropdown with recent notifications
- ✅ Responsive layout with Bootstrap

## Technology Stack

### Frontend
- **Framework**: Angular 17+ (Standalone Components)
- **UI Library**: Bootstrap 5.3.3
- **Icons**: Bootstrap Icons
- **HTTP Client**: Angular HttpClient with Interceptors
- **Routing**: Angular Router with Guards
- **State Management**: RxJS BehaviorSubject

### Backend
- **Framework**: .NET 8 Web API
- **ORM**: Entity Framework Core 8
- **Database**: MySQL (via Pomelo.EntityFrameworkCore.MySql)
- **Authentication**: ASP.NET Core Identity + JWT
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
daycare/
├── DaycareAPI/                          # Backend API
│   ├── Controllers/
│   │   ├── AuthController.cs           # Login/Register
│   │   ├── ParentsController.cs        # Parent CRUD
│   │   ├── ChildrenController.cs       # Children CRUD
│   │   ├── DailyActivitiesController.cs # Activity tracking
│   │   ├── AttendanceController.cs     # Check-in/out
│   │   └── NotificationsController.cs  # Notifications
│   ├── Models/                         # Entity models
│   ├── DTOs/                           # Data transfer objects
│   ├── Data/
│   │   └── ApplicationDbContext.cs     # EF Core context
│   ├── Program.cs                      # App configuration
│   └── appsettings.json               # Configuration
│
└── daycare-admin/                      # Frontend App
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── header/            # Top header component
    │   │   │   └── sidebar/           # Left sidebar component
    │   │   ├── pages/
    │   │   │   ├── login/             # Login page
    │   │   │   ├── register/          # Registration page
    │   │   │   ├── dashboard/         # Dashboard page
    │   │   │   ├── parents/           # Parents management
    │   │   │   ├── children/          # Children management
    │   │   │   ├── activities/        # Daily activities
    │   │   │   └── attendance/        # Attendance tracking
    │   │   ├── services/              # API services
    │   │   ├── guards/                # Route guards
    │   │   ├── interceptors/          # HTTP interceptors
    │   │   ├── models/                # TypeScript interfaces
    │   │   ├── layouts/
    │   │   │   └── main-layout/       # Main layout wrapper
    │   │   ├── app.routes.ts          # Route configuration
    │   │   ├── app.config.ts          # App configuration
    │   │   └── app.component.ts       # Root component
    │   ├── environments/              # Environment configs
    │   ├── index.html                 # HTML entry point
    │   ├── main.ts                    # TypeScript entry point
    │   └── styles.css                 # Global styles
    └── package.json                   # Dependencies

```

## Troubleshooting

### Frontend starts but shows blank page
- Check browser console for errors
- Verify API URL in `src/environments/environment.ts`
- Ensure backend is running

### Cannot login
- Verify backend is running at http://localhost:5000
- Check database connection in backend
- Ensure user is registered first

### Database connection error
- Start MySQL in Laragon
- Verify connection string in `appsettings.json`
- Check if database migrations are applied

### Port already in use
- Frontend: `ng serve --port 4201`
- Backend: Change port in `Properties/launchSettings.json`

## Next Steps

1. ✅ Install .NET 8 SDK
2. ✅ Setup database with migrations
3. ✅ Start backend API
4. ✅ Start frontend application
5. ✅ Register your first admin user
6. ✅ Start managing your daycare!

## Need Help?

Refer to the detailed `SETUP_GUIDE.md` for more information.