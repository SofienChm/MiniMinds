# Daycare Admin Panel - Setup Guide

## Prerequisites Installation Status

✅ **Node.js** - Installed (v22.19.0)
❌ **. NET 8 SDK** - Not installed
⚠️ **MySQL** - Check Laragon installation

## Step 1: Install .NET 8 SDK

1. Download .NET 8 SDK from: https://dotnet.microsoft.com/download/dotnet/8.0
2. Run the installer
3. Verify installation: `dotnet --version`

## Step 2: Install Entity Framework Core Tools

After installing .NET SDK, run:
```powershell
dotnet tool install --global dotnet-ef
```

## Step 3: Configure MySQL Database

### Option A: Using Laragon (Recommended)
1. Start Laragon
2. Ensure MySQL service is running
3. The connection string in `appsettings.json` is already configured for Laragon:
   ```
   Server=localhost;Database=DaycareDB;User=root;Password=;
   ```

### Option B: Using Standalone MySQL
1. Install MySQL Server
2. Update connection string in `DaycareAPI/appsettings.json`

## Step 4: Create Database

Once .NET SDK is installed:

```powershell
cd c:\laragon\www\daycare\DaycareAPI
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Step 5: Start Backend API

```powershell
cd c:\laragon\www\daycare\DaycareAPI
dotnet run
```

The API will be available at: http://localhost:5000

## Step 6: Start Angular Frontend

The npm install is currently running. Once complete:

```powershell
cd c:\laragon\www\daycare\daycare-admin
npm start
```

Or:

```powershell
cd c:\laragon\www\daycare\daycare-admin
ng serve
```

The application will be available at: http://localhost:4200

## Step 7: Create First Admin User

1. Navigate to http://localhost:4200/register
2. Create your admin account:
   - Full Name: Your Name
   - Email: admin@daycare.com
   - Password: Your secure password

## Default Configuration

### Backend API
- **URL**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger

### Frontend
- **URL**: http://localhost:4200
- **API Endpoint**: Configured in `src/environments/environment.ts`

### Database
- **Server**: localhost
- **Database**: DaycareDB
- **User**: root
- **Password**: (empty for Laragon default)

## Troubleshooting

### Issue: "dotnet command not found"
- Restart your terminal/PowerShell after installing .NET SDK
- Verify PATH environment variable includes .NET SDK

### Issue: "MySQL connection failed"
- Ensure MySQL service is running in Laragon
- Check connection string in `appsettings.json`
- Verify MySQL credentials

### Issue: "npm install fails"
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Issue: "Port already in use"
- Backend: Change port in `Properties/launchSettings.json`
- Frontend: Run `ng serve --port 4201`

## Project Structure

```
daycare/
├── DaycareAPI/              # .NET 8 Backend
│   ├── Controllers/         # API Controllers
│   ├── Models/             # Entity Models
│   ├── DTOs/               # Data Transfer Objects
│   ├── Data/               # Database Context
│   └── Program.cs          # Application Entry Point
│
└── daycare-admin/          # Angular 17+ Frontend
    ├── src/
    │   ├── app/
    │   │   ├── components/ # Shared Components (Header, Sidebar)
    │   │   ├── pages/      # Page Components
    │   │   ├── services/   # API Services
    │   │   ├── guards/     # Route Guards
    │   │   ├── interceptors/ # HTTP Interceptors
    │   │   ├── models/     # TypeScript Interfaces
    │   │   └── layouts/    # Layout Components
    │   └── environments/   # Environment Configuration
    └── package.json
```

## Next Steps After Setup

1. **Test Authentication**: Login with your created account
2. **Add Parents**: Navigate to Parents page and add parent records
3. **Add Children**: Navigate to Children page and link children to parents
4. **Track Activities**: Use Activities page to log daily activities
5. **Manage Attendance**: Use Attendance page for check-in/check-out

## API Endpoints

All endpoints are documented in Swagger UI at http://localhost:5000/swagger

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user

### Parents
- GET `/api/parents` - Get all parents
- GET `/api/parents/{id}` - Get parent by ID
- POST `/api/parents` - Create parent
- PUT `/api/parents/{id}` - Update parent
- DELETE `/api/parents/{id}` - Delete parent

### Children
- GET `/api/children` - Get all children
- GET `/api/children/{id}` - Get child by ID
- POST `/api/children` - Create child
- PUT `/api/children/{id}` - Update child
- DELETE `/api/children/{id}` - Delete child

### Daily Activities
- GET `/api/dailyactivities` - Get all activities
- GET `/api/dailyactivities/{id}` - Get activity by ID
- GET `/api/dailyactivities/child/{childId}` - Get activities by child
- POST `/api/dailyactivities` - Create activity
- PUT `/api/dailyactivities/{id}` - Update activity
- DELETE `/api/dailyactivities/{id}` - Delete activity

### Attendance
- GET `/api/attendance` - Get all attendance records
- GET `/api/attendance/today` - Get today's attendance
- POST `/api/attendance/checkin` - Check-in child
- POST `/api/attendance/checkout/{id}` - Check-out child

### Notifications
- GET `/api/notifications` - Get user notifications
- GET `/api/notifications/unread-count` - Get unread count
- PUT `/api/notifications/{id}/mark-read` - Mark as read

## Security Notes

⚠️ **Important for Production:**

1. Change JWT Secret in `appsettings.json`
2. Use strong passwords for database
3. Enable HTTPS
4. Update CORS policy to specific origins
5. Implement rate limiting
6. Add input validation and sanitization
7. Enable logging and monitoring

## Support

For issues or questions, refer to:
- Angular Documentation: https://angular.io/docs
- .NET Documentation: https://docs.microsoft.com/dotnet
- Bootstrap Documentation: https://getbootstrap.com/docs