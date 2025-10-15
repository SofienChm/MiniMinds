# Application Flow Diagram

## 🔄 User Journey & Data Flow

### 1. Authentication Flow
```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ 1. Navigate to app
       ▼
┌─────────────────┐
│  Auth Guard     │ ──── Not Authenticated ───┐
│  (Route Check)  │                           │
└────────┬────────┘                           │
         │                                    │
         │ Authenticated                      │
         ▼                                    ▼
┌─────────────────┐                  ┌──────────────┐
│  Main Layout    │                  │ Login Page   │
│  (Dashboard)    │                  └──────┬───────┘
└─────────────────┘                         │
                                            │ 2. Enter credentials
                                            ▼
                                   ┌─────────────────┐
                                   │  Auth Service   │
                                   └────────┬────────┘
                                            │
                                            │ 3. POST /api/auth/login
                                            ▼
                                   ┌─────────────────┐
                                   │  Backend API    │
                                   │  (AuthController)│
                                   └────────┬────────┘
                                            │
                                            │ 4. Validate & Generate JWT
                                            ▼
                                   ┌─────────────────┐
                                   │    Database     │
                                   │  (AspNetUsers)  │
                                   └────────┬────────┘
                                            │
                                            │ 5. Return JWT Token
                                            ▼
                                   ┌─────────────────┐
                                   │  Auth Service   │
                                   │ (Store Token)   │
                                   └────────┬────────┘
                                            │
                                            │ 6. Redirect to Dashboard
                                            ▼
                                   ┌─────────────────┐
                                   │   Dashboard     │
                                   └─────────────────┘
```

### 2. Main Application Layout
```
┌────────────────────────────────────────────────────────────────┐
│                         HEADER COMPONENT                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  [Logo]              Daycare Admin Panel                 │  │
│  │                                          [👤 John Doe] 🔔│  │
│  │                                          [Logout]         │  │
│  └──────────────────────────────────────────────────────────┘  │
├──────────────┬─────────────────────────────────────────────────┤
│   SIDEBAR    │           CONTENT AREA (Router Outlet)          │
│  COMPONENT   │                                                 │
│              │  ┌───────────────────────────────────────────┐  │
│ 📊 Dashboard │  │                                           │  │
│ 👨‍👩‍👧 Parents   │  │         Current Page Component         │  │
│ 👶 Children  │  │                                           │  │
│ 🎯 Activities│  │    (Dashboard / Parents / Children /      │  │
│ ✅ Attendance│  │     Activities / Attendance)              │  │
│              │  │                                           │  │
│              │  └───────────────────────────────────────────┘  │
│              │                                                 │
└──────────────┴─────────────────────────────────────────────────┘
```

### 3. CRUD Operation Flow (Example: Parents)
```
┌──────────────┐
│ Parents Page │
└──────┬───────┘
       │
       │ 1. Component loads (ngOnInit)
       ▼
┌──────────────────┐
│ Parent Service   │
│ getParents()     │
└────────┬─────────┘
         │
         │ 2. HTTP GET /api/parents
         │    (Auth Interceptor adds JWT token)
         ▼
┌──────────────────┐
│  Backend API     │
│ ParentsController│
└────────┬─────────┘
         │
         │ 3. [Authorize] validates JWT
         │ 4. Query database
         ▼
┌──────────────────┐
│   Database       │
│  Parents Table   │
└────────┬─────────┘
         │
         │ 5. Return parent list
         ▼
┌──────────────────┐
│ Parent Service   │
│ (Observable)     │
└────────┬─────────┘
         │
         │ 6. Update component
         ▼
┌──────────────────┐
│ Parents Page     │
│ Display in table │
└──────────────────┘

USER ACTIONS:
├─ Add Parent ──────┐
│                   │ 1. Click "Add Parent"
│                   │ 2. Show modal form
│                   │ 3. Fill form & submit
│                   │ 4. POST /api/parents
│                   │ 5. Refresh list
│                   └─ Close modal
│
├─ Edit Parent ─────┐
│                   │ 1. Click edit icon
│                   │ 2. Load data in modal
│                   │ 3. Modify & submit
│                   │ 4. PUT /api/parents/{id}
│                   │ 5. Refresh list
│                   └─ Close modal
│
└─ Delete Parent ───┐
                    │ 1. Click delete icon
                    │ 2. Confirm deletion
                    │ 3. DELETE /api/parents/{id}
                    │ 4. Refresh list
                    └─ Show success message
```

### 4. Attendance Check-in Flow
```
┌──────────────────┐
│ Attendance Page  │
└────────┬─────────┘
         │
         │ 1. Load children list
         ▼
┌──────────────────┐
│  Child Service   │
│  getChildren()   │
└────────┬─────────┘
         │
         │ 2. GET /api/children
         ▼
┌──────────────────┐
│  Display List    │
│  [Check-in btn]  │
└────────┬─────────┘
         │
         │ 3. User clicks "Check-in"
         ▼
┌──────────────────┐
│ Attendance Svc   │
│  checkIn()       │
└────────┬─────────┘
         │
         │ 4. POST /api/attendance/checkin
         │    { childId: 123, checkInTime: "2024-01-15T08:30:00" }
         ▼
┌──────────────────────┐
│  Backend API         │
│ AttendanceController │
└────────┬─────────────┘
         │
         │ 5. Create attendance record
         ▼
┌──────────────────┐
│   Database       │
│ Attendance Table │
└────────┬─────────┘
         │
         │ 6. Return success
         ▼
┌──────────────────┐
│ Attendance Page  │
│ Update UI        │
│ Show "Present"   │
└──────────────────┘
```

### 5. Daily Activity Logging Flow
```
┌──────────────────┐
│ Activities Page  │
└────────┬─────────┘
         │
         │ 1. Click "Add Activity"
         ▼
┌──────────────────────────┐
│  Activity Modal Form     │
│  ┌────────────────────┐  │
│  │ Child: [Select]    │  │
│  │ Type: [Nap]        │  │
│  │ Time: [10:30 AM]   │  │
│  │ Duration: [30 min] │  │
│  │ Mood: [😊 Happy]   │  │
│  │ Notes: [...]       │  │
│  └────────────────────┘  │
└────────┬─────────────────┘
         │
         │ 2. Submit form
         ▼
┌──────────────────────┐
│ DailyActivity Svc    │
│ createActivity()     │
└────────┬─────────────┘
         │
         │ 3. POST /api/dailyactivities
         ▼
┌──────────────────────┐
│  Backend API         │
│ DailyActivitiesCtrl  │
└────────┬─────────────┘
         │
         │ 4. Save to database
         ▼
┌──────────────────────┐
│   Database           │
│ DailyActivities Tbl  │
└────────┬─────────────┘
         │
         │ 5. Return created activity
         ▼
┌──────────────────────┐
│ Activities Page      │
│ Refresh activity list│
│ Show in table        │
└──────────────────────┘
```

### 6. Header Notifications Flow
```
┌──────────────────┐
│ Header Component │
└────────┬─────────┘
         │
         │ 1. Component loads
         ▼
┌──────────────────────┐
│ Notification Service │
│ getUnreadCount()     │
└────────┬─────────────┘
         │
         │ 2. GET /api/notifications/unread-count
         ▼
┌──────────────────┐
│  Backend API     │
└────────┬─────────┘
         │
         │ 3. Count unread notifications
         ▼
┌──────────────────┐
│   Database       │
│ Notifications    │
└────────┬─────────┘
         │
         │ 4. Return count (e.g., 5)
         ▼
┌──────────────────┐
│ Header Component │
│ Show badge: 🔔 5 │
└────────┬─────────┘
         │
         │ 5. User clicks notification icon
         ▼
┌──────────────────────┐
│ Notification Service │
│ getNotifications()   │
└────────┬─────────────┘
         │
         │ 6. GET /api/notifications
         ▼
┌──────────────────┐
│  Backend API     │
└────────┬─────────┘
         │
         │ 7. Return notification list
         ▼
┌──────────────────┐
│ Header Component │
│ Show dropdown    │
│ with list        │
└────────┬─────────┘
         │
         │ 8. User clicks notification
         ▼
┌──────────────────────┐
│ Notification Service │
│ markAsRead(id)       │
└────────┬─────────────┘
         │
         │ 9. PUT /api/notifications/{id}/mark-read
         ▼
┌──────────────────┐
│  Backend API     │
│ Update IsRead    │
└────────┬─────────┘
         │
         │ 10. Update count
         ▼
┌──────────────────┐
│ Header Component │
│ Update badge: 🔔4│
└──────────────────┘
```

### 7. Data Relationships
```
┌─────────────────┐
│  ApplicationUser│
│  (AspNetUsers)  │
└────────┬────────┘
         │
         │ Creates
         ▼
┌─────────────────┐
│  Notifications  │
└─────────────────┘

┌─────────────────┐
│     Parent      │
└────────┬────────┘
         │
         │ Has Many
         ▼
┌─────────────────┐
│     Child       │
└────────┬────────┘
         │
         ├─── Has Many ───┐
         │                │
         ▼                ▼
┌─────────────────┐  ┌─────────────────┐
│ DailyActivities │  │   Attendance    │
└─────────────────┘  └─────────────────┘
```

### 8. HTTP Interceptor Flow
```
┌──────────────────┐
│  Any Component   │
│  makes API call  │
└────────┬─────────┘
         │
         │ HTTP Request
         ▼
┌──────────────────────┐
│  Auth Interceptor    │
│  (Automatic)         │
└────────┬─────────────┘
         │
         │ 1. Get token from localStorage
         │ 2. Add Authorization header
         │    "Bearer eyJhbGc..."
         ▼
┌──────────────────────┐
│  HTTP Request        │
│  with JWT token      │
└────────┬─────────────┘
         │
         │ Send to API
         ▼
┌──────────────────────┐
│  Backend API         │
│  [Authorize] checks  │
│  JWT token           │
└────────┬─────────────┘
         │
         ├─── Valid ────────┐
         │                  │
         │                  ▼
         │         ┌──────────────────┐
         │         │ Process Request  │
         │         │ Return Response  │
         │         └────────┬─────────┘
         │                  │
         │                  ▼
         │         ┌──────────────────┐
         │         │  Component       │
         │         │  receives data   │
         │         └──────────────────┘
         │
         └─── Invalid ──────┐
                            │
                            ▼
                   ┌──────────────────┐
                   │  401 Unauthorized│
                   └────────┬─────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │  Auth Guard      │
                   │  Redirect to     │
                   │  Login Page      │
                   └──────────────────┘
```

### 9. Component Lifecycle (Example: Dashboard)
```
┌──────────────────────┐
│  User navigates to   │
│  /dashboard          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Auth Guard          │
│  Check if logged in  │
└──────────┬───────────┘
           │
           │ ✅ Authenticated
           ▼
┌──────────────────────┐
│  Dashboard Component │
│  Constructor()       │
└──────────┬───────────┘
           │
           │ Inject services
           ▼
┌──────────────────────┐
│  ngOnInit()          │
│  Component loads     │
└──────────┬───────────┘
           │
           ├─── Load Parents ────┐
           │                     │
           │                     ▼
           │            ┌──────────────────┐
           │            │ ParentService    │
           │            │ getParents()     │
           │            └────────┬─────────┘
           │                     │
           │                     ▼
           │            ┌──────────────────┐
           │            │ Update stats     │
           │            │ totalParents = X │
           │            └──────────────────┘
           │
           ├─── Load Children ───┐
           │                     │
           │                     ▼
           │            ┌──────────────────┐
           │            │ ChildService     │
           │            │ getChildren()    │
           │            └────────┬─────────┘
           │                     │
           │                     ▼
           │            ┌──────────────────┐
           │            │ Update stats     │
           │            │ totalChildren = Y│
           │            └──────────────────┘
           │
           └─── Load Attendance ─┐
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ AttendanceService│
                        │ getTodayAttend() │
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │ Update stats     │
                        │ todayCheckIns = Z│
                        │ Display table    │
                        └──────────────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │  Render View     │
                        │  Show dashboard  │
                        └──────────────────┘
```

## 🔑 Key Concepts

### Angular Standalone Components
- No NgModule required
- Direct imports in component
- Lazy loading with loadComponent()

### RxJS Observables
- Async data streams
- Subscribe to get data
- Automatic unsubscribe with async pipe

### JWT Authentication
- Token stored in localStorage
- Automatically added to requests
- Validated on backend

### Bootstrap Modals
- Controlled by component state
- showModal = true/false
- No jQuery required

### RESTful API
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Status codes (200, 201, 400, 401, 404, 500)
- JSON request/response

---

This diagram shows how all the pieces work together to create a complete, functional daycare management system! 🎉