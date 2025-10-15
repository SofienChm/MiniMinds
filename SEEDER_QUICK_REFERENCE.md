# 🚀 Database Seeder - Quick Reference

## ⚡ Quick Start

### Option 1: Automatic (Easiest)
Just restart your backend - seeding happens automatically!

```powershell
Set-Location "c:\laragon\www\daycare\DaycareAPI"
dotnet run
```

### Option 2: PowerShell Script
```powershell
# Check status
.\seed-database.ps1 -Action status

# Run seeder
.\seed-database.ps1 -Action run

# Reset database (clear + reseed)
.\seed-database.ps1 -Action reset
```

### Option 3: API Endpoints
```http
GET    http://localhost:5000/api/seed/status  # Check stats
POST   http://localhost:5000/api/seed/run     # Run seeder
DELETE http://localhost:5000/api/seed/clear   # Clear all data
POST   http://localhost:5000/api/seed/reset   # Clear + reseed
```

---

## 📊 What You Get

| Item | Count | Details |
|------|-------|---------|
| **Parents** | 10 | With colorful profile pictures |
| **Children** | 12 | With cute profile pictures & allergies |
| **Attendance** | ~250 | Last 30 days, realistic times |
| **Activities** | ~400 | Last 7 days, 3-5 per child/day |
| **Notifications** | ~30 | 2-4 per parent |
| **Admin User** | 1 | Email: admin@daycare.com, Pass: Admin@123 |

---

## 👥 Sample Data

### Parents
```
John Smith          - john.smith@email.com
Sarah Johnson       - sarah.johnson@email.com
Michael Williams    - michael.williams@email.com
Emily Brown         - emily.brown@email.com
David Davis         - david.davis@email.com
Jessica Miller      - jessica.miller@email.com
Robert Wilson       - robert.wilson@email.com
Amanda Moore        - amanda.moore@email.com
Christopher Taylor  - chris.taylor@email.com
Jennifer Anderson   - jennifer.anderson@email.com
```

### Children (with ages & allergies)
```
Emma Smith (3F)           - No allergies
Liam Smith (4M)           - Peanuts
Olivia Johnson (2F)       - Dairy
Noah Williams (3M)        - Eggs
Ava Brown (4F)            - No allergies
Sophia Brown (2F)         - Shellfish
Jackson Davis (3M)        - No allergies
Isabella Miller (2F)      - Gluten
Mason Wilson (4M)         - No allergies
Mia Moore (3F)            - No allergies
Ethan Taylor (2M)         - No allergies
Charlotte Anderson (4F)   - Tree nuts
```

---

## 🎯 Testing Scenarios

### Test Profile Pictures
✅ All parents have colorful circular avatars
✅ All children have cute smiley face avatars
✅ Default avatar shows if picture is removed

### Test Filtering (Children Page)
✅ Search: "Emma", "Smith", "Johnson"
✅ Date Range: Last 6 months
✅ Sort by Name: A-Z, Z-A
✅ Sort by Date: Oldest/Newest first

### Test Grid View
✅ Switch between List and Grid views
✅ Hover over cards to see lift effect
✅ Resize browser for responsive layout

### Test Attendance
✅ 30 days of records (weekdays only)
✅ Realistic check-in/out times
✅ 90% attendance rate

### Test Activities
✅ Multiple activities per child per day
✅ Various types: Meal, Nap, Play, Learning, Outdoor
✅ Realistic descriptions

---

## 🔧 Common Commands

### Check if seeded
```powershell
.\seed-database.ps1 -Action status
```

### Fresh start
```powershell
.\seed-database.ps1 -Action reset
```

### Clear everything
```powershell
.\seed-database.ps1 -Action clear
```

---

## 🐛 Troubleshooting

**No data appears?**
- Check if backend is running
- Look at console output for errors
- Try manual seeding: `.\seed-database.ps1 -Action run`

**Duplicate errors?**
- Reset database: `.\seed-database.ps1 -Action reset`

**Images not showing?**
- Check browser console
- Verify `default-avatar.svg` exists in frontend assets
- Clear browser cache (Ctrl+F5)

---

## 📝 Notes

- Seeder runs automatically on first startup
- Skips if data already exists
- Safe to run multiple times
- All dates are relative to current date
- Profile pictures are SVG (Base64 encoded)

---

## 🎉 Ready to Test!

1. ✅ Restart backend (seeding happens automatically)
2. ✅ Open frontend: http://localhost:4200
3. ✅ Navigate to Parents page - see 10 parents with pictures
4. ✅ Navigate to Children page - see 12 children with pictures
5. ✅ Try filters, sorting, and view modes
6. ✅ Check attendance and activities

**Enjoy your fully populated test database!** 🚀

---

For detailed documentation, see: `DATABASE_SEEDER_GUIDE.md`