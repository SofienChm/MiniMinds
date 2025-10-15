# 🌱 Database Seeder Guide

## Overview

The database seeder automatically generates realistic test data for your daycare application, making it easy to test all features without manually creating records.

---

## 📊 What Gets Seeded?

### 1. **Roles** (3 roles)
- Admin
- Parent
- Staff

### 2. **Admin User** (1 user)
- **Email:** admin@daycare.com
- **Password:** Admin@123
- **Role:** Admin

### 3. **Parents** (10 parents)
- Complete profile information
- Profile pictures (colorful SVG avatars)
- Unique email addresses and phone numbers
- Realistic addresses

### 4. **Children** (12 children)
- Assigned to different parents
- Ages ranging from 2-4 years old
- Profile pictures (cute SVG avatars)
- Various allergies (some with, some without)
- Enrollment dates spread over the last 10 months
- Mix of boys and girls

### 5. **Attendance Records** (~250+ records)
- Last 30 days of attendance (excluding weekends)
- 90% attendance rate (realistic)
- Random check-in times (7-10 AM)
- Random check-out times (3-6 PM)
- Occasional notes

### 6. **Daily Activities** (~400+ records)
- Last 7 days of activities (excluding weekends)
- 3-5 activities per child per day
- Activity types:
  - Meals (breakfast, lunch, snacks)
  - Naps
  - Play time
  - Learning activities
  - Outdoor activities

### 7. **Notifications** (~30+ notifications)
- 2-4 notifications per parent
- Various messages (reminders, events, announcements)
- 60% marked as read (realistic)
- Created over the last 15 days

---

## 🚀 How to Use the Seeder

### Method 1: Automatic Seeding (On Startup)

The seeder runs automatically when you start the backend:

```powershell
Set-Location "c:\laragon\www\daycare\DaycareAPI"
dotnet run
```

**What happens:**
1. Database migrations are applied automatically
2. Seeder checks if data already exists
3. If database is empty, it seeds all data
4. If data exists, it skips seeding

**Console Output:**
```
Database migrations applied successfully.
Starting database seeding...
Role 'Admin' created.
Role 'Parent' created.
Role 'Staff' created.
Admin user created successfully.
10 parents seeded.
12 children seeded.
250+ attendance records seeded.
400+ daily activities seeded.
30+ notifications seeded.
Database seeding completed successfully!
```

---

### Method 2: Manual Seeding (Using API Endpoints)

You can also trigger seeding manually using the Seed API:

#### **Get Seeding Status**
```http
GET http://localhost:5000/api/seed/status
```

**Response:**
```json
{
  "parents": 10,
  "children": 12,
  "attendances": 252,
  "dailyActivities": 420,
  "notifications": 32,
  "timestamp": "2025-01-15T10:30:00"
}
```

#### **Run Seeder Manually**
```http
POST http://localhost:5000/api/seed/run
```

**Response:**
```json
{
  "success": true,
  "message": "Database seeded successfully!",
  "timestamp": "2025-01-15T10:30:00"
}
```

#### **Clear All Data**
```http
DELETE http://localhost:5000/api/seed/clear
```

⚠️ **WARNING:** This deletes all parents, children, attendance, activities, and notifications!

#### **Reset Database (Clear + Reseed)**
```http
POST http://localhost:5000/api/seed/reset
```

This is useful when you want fresh test data.

---

## 🧪 Testing with Seeded Data

### Test Profile Pictures
1. Navigate to **Parents** page
2. You'll see 10 parents with colorful profile pictures
3. Click on any parent to edit and see their picture

4. Navigate to **Children** page
5. You'll see 12 children with cute profile pictures
6. Switch to **Grid View** to see pictures more prominently

### Test Filtering & Sorting
1. On **Children** page:
   - **Search:** Try typing "Emma", "Liam", or "Smith"
   - **Date Filter:** Set date range to last 6 months
   - **Sort by Name:** See alphabetical order
   - **Sort by Date:** See enrollment order

### Test Attendance
1. Navigate to **Attendance** page
2. You'll see 30 days of attendance records
3. Check-in and check-out times are realistic
4. Some records have notes

### Test Daily Activities
1. Navigate to **Daily Activities** page
2. You'll see various activity types
3. Each child has multiple activities per day
4. Activities include meals, naps, play, learning, outdoor

### Test Notifications
1. Navigate to **Notifications** page
2. You'll see various notifications for parents
3. Some are read, some are unread

---

## 📋 Sample Data Details

### Parent Emails (for testing login if needed)
```
john.smith@email.com
sarah.johnson@email.com
michael.williams@email.com
emily.brown@email.com
david.davis@email.com
jessica.miller@email.com
robert.wilson@email.com
amanda.moore@email.com
chris.taylor@email.com
jennifer.anderson@email.com
```

### Admin Login
```
Email: admin@daycare.com
Password: Admin@123
```

### Children Names
```
Emma Smith (3 years old, Female)
Liam Smith (4 years old, Male, Peanut allergy)
Olivia Johnson (2 years old, Female, Dairy allergy)
Noah Williams (3 years old, Male, Egg allergy)
Ava Brown (4 years old, Female)
Sophia Brown (2 years old, Female, Shellfish allergy)
Jackson Davis (3 years old, Male)
Isabella Miller (2 years old, Female, Gluten allergy)
Mason Wilson (4 years old, Male)
Mia Moore (3 years old, Female)
Ethan Taylor (2 years old, Male)
Charlotte Anderson (4 years old, Female, Tree nut allergy)
```

---

## 🎨 Profile Picture Details

### Parent Pictures
- Colorful circular avatars
- 10 different colors
- Simple person silhouette design
- SVG format (Base64 encoded)
- Colors: Red, Teal, Blue, Coral, Mint, Yellow, Purple, Sky Blue, Orange, Green

### Child Pictures
- Pastel colored circular avatars
- 12 different colors
- Cute smiley face design
- SVG format (Base64 encoded)
- Colors: Pink, Sky Blue, Light Green, Lavender, Khaki, Peach, Light Blue, Beige, Lilac, Cream, Periwinkle, Mint

---

## 🔧 Customizing the Seeder

### Add More Parents/Children

Edit `DatabaseSeeder.cs` and add more entries to the lists:

```csharp
// In SeedParentsAndChildrenAsync method
var parents = new List<Parent>
{
    // Add more parents here
    new Parent
    {
        FirstName = "Your",
        LastName = "Name",
        Email = "your.email@email.com",
        PhoneNumber = "555-0111",
        Address = "Your Address",
        ProfilePicture = profilePictures[0],
        CreatedAt = DateTime.Now
    }
};
```

### Change Activity Types

Edit the `activityTypes` array in `SeedDailyActivitiesAsync`:

```csharp
var activityTypes = new[] { "Meal", "Nap", "Play", "Learning", "Outdoor", "Art", "Music" };
```

### Adjust Date Ranges

Change the loop ranges:

```csharp
// For more attendance records
for (int i = 0; i < 60; i++) // Change from 30 to 60 days

// For more activities
for (int i = 0; i < 14; i++) // Change from 7 to 14 days
```

---

## 🐛 Troubleshooting

### Seeder Not Running
**Problem:** No data appears after starting backend

**Solutions:**
1. Check console output for errors
2. Verify database connection in `appsettings.json`
3. Make sure MySQL server is running
4. Check if data already exists (seeder skips if data found)

### Duplicate Key Errors
**Problem:** Error about duplicate email addresses

**Solutions:**
1. Clear the database first: `POST /api/seed/clear`
2. Then reseed: `POST /api/seed/run`
3. Or use reset: `POST /api/seed/reset`

### Migration Errors
**Problem:** Error applying migrations

**Solutions:**
1. Check database connection string
2. Verify MySQL user has proper permissions
3. Manually apply migrations:
   ```powershell
   Set-Location "c:\laragon\www\daycare\DaycareAPI"
   dotnet ef database update
   ```

### Images Not Showing
**Problem:** Profile pictures don't display

**Solutions:**
1. Check browser console for errors
2. Verify Base64 encoding is correct
3. Check if `default-avatar.svg` exists in frontend assets
4. Clear browser cache

---

## 📊 Database Statistics After Seeding

| Entity | Count | Notes |
|--------|-------|-------|
| Roles | 3 | Admin, Parent, Staff |
| Users | 1 | Admin user |
| Parents | 10 | With profile pictures |
| Children | 12 | With profile pictures and allergies |
| Attendance | ~250 | Last 30 days, 90% rate |
| Daily Activities | ~400 | Last 7 days, 3-5 per child |
| Notifications | ~30 | 2-4 per parent |

**Total Records:** ~700+ records

---

## 🎯 Best Practices

### Development
- ✅ Use seeder for initial development testing
- ✅ Reset database when testing new features
- ✅ Keep seeder updated with new fields

### Testing
- ✅ Use seeded data for UI/UX testing
- ✅ Test filters and sorting with realistic data
- ✅ Verify performance with seeded records

### Production
- ⚠️ **NEVER** run seeder in production
- ⚠️ Disable seed endpoints in production
- ⚠️ Use proper data migration strategies

---

## 🔒 Security Notes

### Seed Controller Endpoints
The Seed Controller endpoints are currently **unprotected**. For production:

1. **Add Authorization:**
   ```csharp
   [Authorize(Roles = "Admin")]
   public class SeedController : ControllerBase
   ```

2. **Disable in Production:**
   ```csharp
   #if DEBUG
   [Route("api/[controller]")]
   [ApiController]
   public class SeedController : ControllerBase
   #endif
   ```

3. **Remove from Production Build:**
   - Don't deploy SeedController.cs to production
   - Comment out seeding code in Program.cs for production

---

## 🎉 Summary

Your database seeder is now ready to use! It will:

✅ Automatically seed data on first run
✅ Generate realistic test data
✅ Include profile pictures for all parents and children
✅ Create attendance records and activities
✅ Provide API endpoints for manual control
✅ Skip seeding if data already exists

**Next Steps:**
1. Restart your backend to trigger automatic seeding
2. Open your frontend and explore the seeded data
3. Test all features with realistic data
4. Use the Seed API endpoints to reset data when needed

Enjoy testing your daycare application! 🚀