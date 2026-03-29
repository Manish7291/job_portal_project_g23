# 🐛 JOBFLUX - Troubleshooting White Screen

## Symptoms
- Frontend loads to http://localhost:5173 but shows only white screen
- No errors visible

---

## Solution Steps (Try in Order)

### **1. Check Browser Console (MOST IMPORTANT)**
- Open Browser Dev Tools: **F12** or **Right Click → Inspect**
- Go to **Console** tab
- Look for any red errors
- **Take a screenshot and share the error messages**

---

### **2. Hard Refresh Browser**
```
Ctrl+Shift+Delete  (or Ctrl+F5 on Windows)
```
Clear cache and hard refresh

---

### **3. Kill All Processes and Restart**

**Close both terminal windows**, then:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```
Wait for: `JOBFLUX Server running...`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Wait for: `VITE ready in`

Then refresh browser

---

### **4. Check if Ports are Free**

**Windows PowerShell (as Admin):**
```powershell
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

If ports are in use, kill them:
```powershell
Stop-Process -Id <PID> -Force
```

---

### **5. Check Backend Health**

Open in browser or curl:
```
http://localhost:5000/api/health
```

Should show:
```json
{
  "success": true,
  "message": "JOBFLUX API is running"
}
```

---

### **6. Nuclear Option - Full Clean Install**

**Backend:**
```bash
cd backend
rm -r node_modules package-lock.json
npm install
npm start
```

**Frontend:**
```bash
cd frontend
rm -r node_modules package-lock.json .vite
npm install
npm run dev
```

---

## Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| White screen, no errors | Clear cache (Ctrl+Shift+Delete), hard refresh |
| Vite not compiling | Check terminal for errors, kill process and restart |
| Port already in use | Kill process on that port, try different port |
| Module not found error | Run `npm install` in that directory |
| MongoDB connection error | Check `.env` MONGODB_URI is correct |
| CORS errors in console | Ensure backend is running on 5000 |

---

## What Each Server Should Show

**Backend Terminal:**
```
JOBFLUX Server running in development mode on port 5000
MongoDB Connected: cluster-job.v0auo1b.mongodb.net
```

**Frontend Terminal:**
```
  VITE v5.0.12  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## Questions to Answer
1. What errors appear in browser console (F12)?
2. Does `http://localhost:5000/api/health` work?
3. What do the backend/frontend terminals show?
4. Have you tried clearing cache and hard refresh?

Share this info and I can help further!
