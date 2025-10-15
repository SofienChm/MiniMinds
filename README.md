# Daycare Management System

A comprehensive daycare admin panel for managing children, parents, daily activities, and attendance tracking.

## Technology Stack

### Frontend
- **Framework**: Angular 17+
- **UI**: Bootstrap 5
- **Authentication**: OAuth2/Identity Server

### Backend
- **Framework**: .NET 8 Web API
- **Database**: MySQL
- **ORM**: Entity Framework Core
- **Authentication**: ASP.NET Core Identity with JWT

## Project Structure

```
daycare/
├── DaycareAPI/              # Backend .NET 8 API
│   ├── Controllers/         # API Controllers
│   ├── Models/             # Data Models
│   ├── Data/               # Database Context
│   ├── Services/           # Business Logic
│   ├── DTOs/               # Data Transfer Objects
│   └── Program.cs          # Entry Point
│
└── daycare-admin/          # Frontend Angular App
    ├── src/
    │   ├── app/
    │   │   ├── components/ # Reusable Components
    │   │   ├── pages/      # Page Components
    │   │   ├── services/   # API Services
    │   │   ├── models/     # TypeScript Models
    │   │   └── guards/     # Route Guards
    │   └── assets/         # Static Assets
    └── angular.json
```

## Features

1. **Authentication**
   - Login page
   - Sign up page
   - JWT-based authentication

2. **Parent Management**
   - Create, Read, Update, Delete parents
   - Parent profile management

3. **Children Management**
   - CRUD operations for children
   - Link children to parents

4. **Daily Activities**
   - Track naps, meals, and other activities
   - Activity logs per child

5. **Attendance Tracking**
   - Check-in and check-out functionality
   - Attendance history

6. **UI Components**
   - Sidebar navigation (left)
   - Header with user info and notifications (top)
   - Content area (center)

## Prerequisites

- Node.js 18+ and npm
- .NET 8 SDK
- MySQL Server
- Angular CLI (`npm install -g @angular/cli`)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd DaycareAPI
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Configure application settings:
   - Copy `appsettings.example.json` to `appsettings.json`
   - Update the database connection string with your MySQL credentials
   - Generate a secure JWT key (at least 32 characters)
   - Update `appsettings.Development.json` for local development

4. Run migrations:
   ```bash
   dotnet ef database update
   ```

5. Run the API:
   ```bash
   dotnet run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd daycare-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API URL in `src/environments/environment.ts`

4. Run the application:
   ```bash
   ng serve
   ```

5. Open browser at `http://localhost:4200`

## Default Credentials

- **Email**: admin@daycare.com
- **Password**: Admin@123

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET/POST/PUT/DELETE /api/parents` - Parent CRUD
- `GET/POST/PUT/DELETE /api/children` - Children CRUD
- `GET/POST /api/activities` - Daily activities
- `POST /api/attendance/checkin` - Check-in
- `POST /api/attendance/checkout` - Check-out

## License

MIT