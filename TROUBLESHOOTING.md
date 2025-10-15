# Troubleshooting Guide

## Common Issues and Solutions

### 1. ❌ 400 Bad Request Error When Creating Child

**Error Message:**
```
POST http://localhost:5000/api/children 400 (Bad Request)
```

**Cause:**
- No parent was selected (parentId = 0)
- Gender field was empty
- Required fields were missing

**Solution:**
✅ **Fixed!** The application now:
1. Validates that a parent is selected before submitting
2. Validates that gender is selected
3. Shows clear error messages to the user
4. Disables the "Select Parent" option so it can't be submitted

**How to Use:**
1. **First, add a parent** in the Parents section
2. Then go to Children section and click "Add Child"
3. Fill in all required fields (marked with *)
4. Select a parent from the dropdown
5. Select a gender
6. Click Save

---

### 2. ❌ Frontend Not Loading / Compilation Errors

**Symptoms:**
- Angular app won't start
- Port 4200 not listening
- Build errors in console

**Common Causes & Solutions:**

#### A. Arrow Functions in Templates
**Error:** `Bindings cannot contain assignments`

**Wrong:**
```html
{{ attendances.filter(a => !a.checkOutTime).length }}
```

**Correct:**
```typescript
// In component.ts
getCheckedInCount(): number {
  return this.attendances.filter(a => !a.checkOutTime).length;
}
```
```html
<!-- In template -->
{{ getCheckedInCount() }}
```

#### B. Null Reference Errors
**Error:** `Object is possibly 'null'`

**Solution:** Use optional chaining or non-null assertion
```html
<!-- Use optional chaining -->
{{ currentUser?.firstName }}

<!-- Or non-null assertion when you're sure it exists -->
<img [src]="currentUser!.profilePicture">
```

---

### 3. ❌ Backend Not Running

**Check if backend is running:**
```powershell
netstat -ano | findstr "5000"
```

**If not running, start it:**
```powershell
$env:Path += ";C:\Program Files\dotnet"
cd c:\laragon\www\daycare\DaycareAPI
dotnet run
```

**Expected Output:**
```
Now listening on: http://localhost:5000
Application started.
```

---

### 4. ❌ Frontend Not Running

**Check if frontend is running:**
```powershell
netstat -ano | findstr "4200"
```

**If not running, start it:**
```powershell
cd c:\laragon\www\daycare\daycare-admin
npm start
```

**Expected Output:**
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

---

### 5. ❌ Database Connection Issues

**Error:** `Unable to connect to MySQL server`

**Solution:**
1. Make sure Laragon is running
2. Check MySQL service is started in Laragon
3. Verify connection string in `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=DaycareDB;User=root;Password=;"
}
```

---

### 6. ❌ CORS Errors

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
Check that CORS is properly configured in `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                       .AllowAnyMethod()
                       .AllowAnyHeader());
});
```

---

### 7. ❌ Authentication Issues

**Symptoms:**
- Can't login
- Token not being sent
- 401 Unauthorized errors

**Solutions:**

#### A. Check JWT Configuration
In `appsettings.json`:
```json
"Jwt": {
  "Key": "your-super-secret-key-min-32-characters-long",
  "Issuer": "DaycareAPI",
  "Audience": "DaycareClient"
}
```

#### B. Check Auth Interceptor
The interceptor should automatically add tokens to requests.
Check browser console for token in localStorage:
```javascript
localStorage.getItem('token')
```

#### C. Token Expired
Tokens expire after 24 hours. Just login again.

---

### 8. ❌ "Parent not found" Error

**Cause:** Trying to add a child before adding any parents

**Solution:**
1. Go to **Parents** section first
2. Add at least one parent
3. Then go to **Children** section
4. Now you can select the parent from the dropdown

---

### 9. ❌ Form Validation Not Working

**Symptoms:**
- Can submit empty forms
- No validation messages

**Check:**
1. Form has `#formName="ngForm"` attribute
2. Inputs have `name` attribute
3. Inputs have `required` attribute
4. Submit button has `[disabled]="!formName.valid"`

**Example:**
```html
<form #childForm="ngForm">
  <input type="text" name="firstName" [(ngModel)]="child.firstName" required>
  <button [disabled]="!childForm.valid">Save</button>
</form>
```

---

### 10. ❌ Changes Not Reflecting

**Solutions:**

#### A. Hard Refresh Browser
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

#### B. Clear Browser Cache
- Open DevTools (F12)
- Right-click refresh button
- Select "Empty Cache and Hard Reload"

#### C. Restart Angular Dev Server
```powershell
# Stop the server (Ctrl+C)
# Then restart
npm start
```

---

## Quick Diagnostic Commands

### Check All Services Status
```powershell
# Check backend
netstat -ano | findstr "5000"

# Check frontend
netstat -ano | findstr "4200"

# Check MySQL
Get-Process | Where-Object {$_.ProcessName -like "*mysql*"}
```

### View Backend Logs
```powershell
cd c:\laragon\www\daycare\DaycareAPI
dotnet run
# Watch the console output
```

### View Frontend Logs
```powershell
cd c:\laragon\www\daycare\daycare-admin
npm start
# Watch the console output
```

### Test API Directly
Open in browser:
- Swagger UI: http://localhost:5000/swagger
- Health check: http://localhost:5000/api/parents

---

## Getting Help

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Copy the full error message

### Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Find the failed request (red)
4. Click on it
5. Check "Response" tab for error details

### Check Backend Console
Look at the terminal where `dotnet run` is running for error messages.

---

## Prevention Tips

✅ **Always add parents before adding children**
✅ **Fill in all required fields (marked with *)**
✅ **Keep both backend and frontend running**
✅ **Check browser console for errors**
✅ **Use Swagger UI to test API endpoints**
✅ **Make sure MySQL is running in Laragon**

---

## Need More Help?

If you encounter an issue not listed here:
1. Check browser console (F12)
2. Check backend console output
3. Check network tab for failed requests
4. Look at the error message details
5. Search for the specific error message

---

**Last Updated:** After fixing the 400 Bad Request error for child creation