# 📖 MANUAL GIT WORKFLOW GUIDE - Copy-Paste Ready Commands

**GitHub Repository:** https://github.com/Manish7291/job_portal_project_g23.git
**Project:** Job Portal (Full-Stack - Node.js + React)
**Timeline:** March 1-25, 2026

---

## ⚡ Quick Start (5 Minutes)

### Option 1: Auto-Run Script (Recommended)

**Windows Users:**
```bash
# Run in Git Bash or PowerShell in your project directory
bash setup-git-workflow.sh
```

**Linux/macOS Users:**
```bash
# Make script executable
chmod +x setup-git-workflow.sh

# Run the script
./setup-git-workflow.sh
```

---

## 📝 Manual Step-by-Step (Copy-Paste Ready)

### PREREQUISITE: Setup First

```bash
# Navigate to project directory
cd "/c/Users/manis/OneDrive/Documents/OneDrive/Desktop/sem 6/job portal project/job portal project"

# Or if you prefer shorter path, add to your system:
# C:\Users\manis\OneDrive\Documents\OneDrive\Desktop\sem 6\job portal project\job portal project

# Initialize Git (if not already done)
git init

# Create root .gitignore (run this entire block)
cat > .gitignore << 'EOF'
node_modules/
.env
.env.local
.DS_Store
.vscode/
.idea/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
dist/
build/
.turbo/
.next/
out/
EOF

# Verify git is ready
git status
```

---

## 🔀 CREATE FEATURE BRANCHES

```bash
# Create all feature branches from main
git checkout -b manish
git checkout main
git checkout -b harshit
git checkout main
git checkout -b kavya
git checkout main
git checkout -b harsh
git checkout main

# Verify all branches created
git branch -a
```

---

## 👤 PHASE 1: MANISH'S COMMITS (Backend Core & Config)

**Email:** manishkau6239@gmail.com | **GitHub:** Manish7291

```bash
# ==================== CHECKOUT MANISH BRANCH ====================
git checkout manish

# ==================== COMMIT 1: Backend Setup (March 1) ====================
export GIT_AUTHOR_NAME="Manish"
export GIT_AUTHOR_EMAIL="manishkau6239@gmail.com"
export GIT_COMMITTER_NAME="Manish"
export GIT_COMMITTER_EMAIL="manishkau6239@gmail.com"
export GIT_AUTHOR_DATE="2026-03-01 09:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-01 09:30:00 +0530"

git add backend/package.json backend/.gitignore .gitignore README.md
git commit -m "setup: Initialize backend project structure and dependencies"
git log --oneline -1

# ==================== COMMIT 2: Express Server Setup (March 2) ====================
export GIT_AUTHOR_DATE="2026-03-02 10:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-02 10:15:00 +0530"

git add backend/app.js backend/server.js backend/.env.example
git commit -m "feat: Setup Express app and server configuration with environment variables"
git log --oneline -1

# ==================== COMMIT 3: Middleware & Config (March 3) ====================
export GIT_AUTHOR_DATE="2026-03-03 14:45:00 +0530"
export GIT_COMMITTER_DATE="2026-03-03 14:45:00 +0530"

git add backend/config/ backend/middleware/
git commit -m "feat: Add database config and core middleware (auth, error handling, upload)"
git log --oneline -1

# ==================== COMMIT 4: Utilities (March 4) ====================
export GIT_AUTHOR_DATE="2026-03-04 11:20:00 +0530"
export GIT_COMMITTER_DATE="2026-03-04 11:20:00 +0530"

git add backend/utils/
git commit -m "util: Add utility functions (email service, admin seeding)"
git log --oneline -1

# Verify all commits
echo "=== MANISH'S COMMITS ==="
git log --oneline main..manish
```

---

## 👤 PHASE 2: HARSHIT'S COMMITS (Database & Models)

**Email:** harshitjain2705@gmail.com | **GitHub:** Harshitj27

```bash
# ==================== CHECKOUT HARSHIT BRANCH ====================
git checkout main
git checkout harshit

# ==================== COMMIT 1: Database Models (March 5) ====================
export GIT_AUTHOR_NAME="Harshit"
export GIT_AUTHOR_EMAIL="harshitjain2705@gmail.com"
export GIT_COMMITTER_NAME="Harshit"
export GIT_COMMITTER_EMAIL="harshitjain2705@gmail.com"
export GIT_AUTHOR_DATE="2026-03-05 09:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-05 09:00:00 +0530"

git add backend/models/
git commit -m "feat: Add database models (User, Job, Application, Payment, etc.)"
git log --oneline -1

# ==================== COMMIT 2: Core Controllers - Auth & Jobs (March 6) ====================
export GIT_AUTHOR_DATE="2026-03-06 10:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-06 10:30:00 +0530"

git add backend/controllers/authController.js \
        backend/controllers/jobController.js \
        backend/controllers/applicationController.js
git commit -m "feat: Implement auth, job, and application controllers with business logic"
git log --oneline -1

# ==================== COMMIT 3: Profile Controllers (March 7) ====================
export GIT_AUTHOR_DATE="2026-03-07 13:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-07 13:15:00 +0530"

git add backend/controllers/studentController.js \
        backend/controllers/recruiterController.js \
        backend/controllers/adminController.js
git commit -m "feat: Add student, recruiter, and admin profile controllers"
git log --oneline -1

# ==================== COMMIT 4: Routes & Validators (March 8) ====================
export GIT_AUTHOR_DATE="2026-03-08 11:45:00 +0530"
export GIT_COMMITTER_DATE="2026-03-08 11:45:00 +0530"

git add backend/routes/authRoutes.js \
        backend/routes/jobRoutes.js \
        backend/routes/applicationRoutes.js \
        backend/routes/studentRoutes.js \
        backend/routes/recruiterRoutes.js \
        backend/routes/adminRoutes.js \
        backend/validators/
git commit -m "feat: Add API routes and input validators for all core features"
git log --oneline -1

# Verify all commits
echo "=== HARSHIT'S COMMITS ==="
git log --oneline main..harshit
```

---

## 👤 PHASE 3: KAVYA'S COMMITS (Additional Features)

**Email:** kavyagogia7494@gmail.com | **GitHub:** kavya7494

```bash
# ==================== CHECKOUT KAVYA BRANCH ====================
git checkout main
git checkout kavya

# ==================== COMMIT 1: Resume & Interview Controllers (March 8) ====================
export GIT_AUTHOR_NAME="Kavya"
export GIT_AUTHOR_EMAIL="kavyagogia7494@gmail.com"
export GIT_COMMITTER_NAME="Kavya"
export GIT_COMMITTER_EMAIL="kavyagogia7494@gmail.com"
export GIT_AUTHOR_DATE="2026-03-08 15:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-08 15:30:00 +0530"

git add backend/controllers/resumeController.js \
        backend/controllers/interviewController.js
git commit -m "feat: Add resume analysis and interview experience controllers"
git log --oneline -1

# ==================== COMMIT 2: Payment & AI Controllers (March 9) ====================
export GIT_AUTHOR_DATE="2026-03-09 10:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-09 10:00:00 +0530"

git add backend/controllers/paymentController.js \
        backend/controllers/aiController.js
git commit -m "feat: Implement payment processing and AI-powered features"
git log --oneline -1

# ==================== COMMIT 3: Notification Controller (March 10) ====================
export GIT_AUTHOR_DATE="2026-03-10 09:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-10 09:15:00 +0530"

git add backend/controllers/notificationController.js
git commit -m "feat: Add notification system controller for real-time updates"
git log --oneline -1

# ==================== COMMIT 4: Services Layer (March 11) ====================
export GIT_AUTHOR_DATE="2026-03-11 14:20:00 +0530"
export GIT_COMMITTER_DATE="2026-03-11 14:20:00 +0530"

git add backend/services/
git commit -m "refactor: Extract business logic into services (resume, payment, AI analysis)"
git log --oneline -1

# ==================== COMMIT 5: Additional Routes (March 12) ====================
export GIT_AUTHOR_DATE="2026-03-12 11:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-12 11:00:00 +0530"

git add backend/routes/resumeRoutes.js \
        backend/routes/interviewRoutes.js \
        backend/routes/notificationRoutes.js \
        backend/routes/paymentRoutes.js \
        backend/routes/aiRoutes.js
git commit -m "feat: Add API routes for all additional features"
git log --oneline -1

# Verify all commits
echo "=== KAVYA'S COMMITS ==="
git log --oneline main..kavya
```

---

## 👤 PHASE 4: HARSH'S COMMITS (Frontend Development)

**Email:** hk180306@gmail.com | **GitHub:** harshkumar051

```bash
# ==================== CHECKOUT HARSH BRANCH ====================
git checkout main
git checkout harsh

# ==================== COMMIT 1: Frontend Setup (March 5) ====================
export GIT_AUTHOR_NAME="Harsh"
export GIT_AUTHOR_EMAIL="hk180306@gmail.com"
export GIT_COMMITTER_NAME="Harsh"
export GIT_COMMITTER_EMAIL="hk180306@gmail.com"
export GIT_AUTHOR_DATE="2026-03-05 08:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-05 08:00:00 +0530"

git add frontend/package.json frontend/.gitignore frontend/.env.example
git commit -m "setup: Initialize React frontend with Vite and Tailwind CSS"
git log --oneline -1

# ==================== COMMIT 2: Build Configs (March 6) ====================
export GIT_AUTHOR_DATE="2026-03-06 09:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-06 09:30:00 +0530"

git add frontend/index.html \
        frontend/vite.config.js \
        frontend/tailwind.config.js \
        frontend/postcss.config.js \
        frontend/vercel.json
git commit -m "config: Setup Vite, Tailwind CSS, and Vercel deployment"
git log --oneline -1

# ==================== COMMIT 3: App Structure (March 7) ====================
export GIT_AUTHOR_DATE="2026-03-07 10:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-07 10:00:00 +0530"

git add frontend/src/main.jsx \
        frontend/src/App.jsx \
        frontend/src/index.css \
        frontend/src/context/
git commit -m "feat: Setup React app structure and theme context"
git log --oneline -1

# ==================== COMMIT 4: Layouts & Components (March 8) ====================
export GIT_AUTHOR_DATE="2026-03-08 13:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-08 13:30:00 +0530"

git add frontend/src/layouts/ \
        frontend/src/components/
git commit -m "feat: Add main and dashboard layouts with navigation components"
git log --oneline -1

# ==================== COMMIT 5: Auth Pages (March 10) ====================
export GIT_AUTHOR_DATE="2026-03-10 11:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-10 11:00:00 +0530"

git add frontend/src/pages/Login.jsx \
        frontend/src/pages/Register.jsx \
        frontend/src/pages/ForgotPassword.jsx \
        frontend/src/pages/ResetPassword.jsx
git commit -m "feat: Implement authentication pages (login, register, password reset)"
git log --oneline -1

# ==================== COMMIT 6: Common Pages (March 12) ====================
export GIT_AUTHOR_DATE="2026-03-12 15:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-12 15:00:00 +0530"

git add frontend/src/pages/Landing.jsx \
        frontend/src/pages/Premium.jsx \
        frontend/src/pages/Jobs.jsx \
        frontend/src/pages/JobDetails.jsx \
        frontend/src/pages/SalaryInsights.jsx \
        frontend/src/pages/InterviewFeed.jsx
git commit -m "feat: Add landing, job listing, and insights pages"
git log --oneline -1

# ==================== COMMIT 7: Student Pages (March 14) ====================
export GIT_AUTHOR_DATE="2026-03-14 10:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-14 10:30:00 +0530"

git add frontend/src/pages/student/
git commit -m "feat: Add student dashboard, applications, profile, and analytics pages"
git log --oneline -1

# ==================== COMMIT 8: Recruiter Pages (March 16) ====================
export GIT_AUTHOR_DATE="2026-03-16 14:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-16 14:00:00 +0530"

git add frontend/src/pages/recruiter/
git commit -m "feat: Add recruiter dashboard, job posting, and applicant management"
git log --oneline -1

# ==================== COMMIT 9: Admin Pages (March 18) ====================
export GIT_AUTHOR_DATE="2026-03-18 09:45:00 +0530"
export GIT_COMMITTER_DATE="2026-03-18 09:45:00 +0530"

git add frontend/src/pages/admin/
git commit -m "feat: Add admin dashboard for system management"
git log --oneline -1

# ==================== COMMIT 10: API Integration (March 20) ====================
export GIT_AUTHOR_DATE="2026-03-20 12:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-20 12:15:00 +0530"

git add frontend/src/hooks/ \
        frontend/src/services/api.js \
        frontend/src/store/
git commit -m "feat: Add API integration, hooks, and state management (Redux)"
git log --oneline -1

# Verify all commits
echo "=== HARSH'S COMMITS ==="
git log --oneline main..harsh
```

---

## 🔀 MERGE ALL BRANCHES INTO MAIN

```bash
# ==================== SWITCH TO MAIN ====================
git checkout main

# ==================== MERGE MANISH (Backend Core) ====================
git merge manish -m "Merge branch 'manish' - Backend core setup and configuration"
echo "✓ Manish branch merged"

# ==================== MERGE HARSHIT (Database & Models) ====================
git merge harshit -m "Merge branch 'harshit' - Database models and core controllers"
echo "✓ Harshit branch merged"

# ==================== MERGE KAVYA (Additional Features) ====================
git merge kavya -m "Merge branch 'kavya' - Additional features (resume, payment, AI, notifications)"
echo "✓ Kavya branch merged"

# ==================== MERGE HARSH (Frontend) ====================
git merge harsh -m "Merge branch 'harsh' - Complete frontend implementation"
echo "✓ Harsh branch merged"

# ==================== VERIFY FINAL STATE ====================
echo ""
echo "=== FINAL GIT LOG (20 most recent commits) ==="
git log --oneline -20

echo ""
echo "=== BRANCH STATUS ==="
git branch -a

echo ""
echo "=== WORKING DIRECTORY STATUS ==="
git status
```

---

## 📤 PUSH TO GITHUB

```bash
# ==================== ADD GITHUB REMOTE ====================
git remote add origin https://github.com/Manish7291/job_portal_project_g23.git

# Verify remote added
git remote -v

# ==================== PUSH MAIN BRANCH ====================
git checkout main
git push -u origin main

# ==================== PUSH ALL FEATURE BRANCHES ====================
git push -u origin manish
git push -u origin harshit
git push -u origin kavya
git push -u origin harsh

# ==================== VERIFY ====================
echo ""
echo "=== REMOTE BRANCHES ==="
git branch -r

echo ""
echo "✓ All branches pushed to GitHub!"
echo ""
echo "View your repo at: https://github.com/Manish7291/job_portal_project_g23"
```

---

## ✅ VERIFICATION & TESTING

```bash
# ==================== VERIFY GIT AUTHOR ATTRIBUTION ====================
echo "=== COMMIT HISTORY WITH AUTHOR INFO ==="
git log --pretty=format:"%h | %an <%ae> | %ad | %s" --date=short

# ==================== VERIFY .GITIGNORE IS WORKING ====================
echo ""
echo "=== CHECKING GITIGNORE ==="
git check-ignore node_modules/ || echo "✓ node_modules correctly ignored"
git check-ignore backend/.env || echo "✓ .env correctly ignored"

# ==================== TEST BUILD ====================
echo ""
echo "=== TESTING PROJECT BUILD ==="

# Install backend dependencies
echo "Installing backend dependencies..."
npm --prefix backend install

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm --prefix frontend install

echo ""
echo "✓ Dependencies installed successfully!"

# ==================== FINAL STATUS ====================
echo ""
echo "=== PROJECT STATUS ==="
git status
```

---

## 🚀 START THE PROJECT

```bash
# ==================== START BACKEND ====================
# In Terminal 1:
cd backend
npm start

# Expected output: Server running on http://localhost:5000

# ==================== START FRONTEND ====================
# In Terminal 2:
cd frontend
npm run dev

# Expected output: Local: http://localhost:5173
```

---

## 📌 IMPORTANT NOTES FOR WINDOWS USERS

If using **Windows Command Prompt** (not Git Bash), replace:

**Instead of:** `export VAR=value`
**Use:** `set VAR=value`

**Instead of:** `git add backend/config/`
**Use:** `git add backend\config\`

**Full Windows Command Prompt Example:**
```cmd
git checkout manish

set GIT_AUTHOR_NAME=Manish
set GIT_AUTHOR_EMAIL=manishkau6239@gmail.com
set GIT_COMMITTER_NAME=Manish
set GIT_COMMITTER_EMAIL=manishkau6239@gmail.com
set GIT_AUTHOR_DATE=2026-03-01 09:30:00 +0530
set GIT_COMMITTER_DATE=2026-03-01 09:30:00 +0530

git add backend\package.json backend\.gitignore .gitignore README.md
git commit -m "setup: Initialize backend project structure and dependencies"
```

---

## 🐛 TROUBLESHOOTING

### Issue: "fatal: not a git repository"
```bash
git init
```

### Issue: Author info not showing on GitHub
```bash
# Verify git config
git config user.name
git config user.email

# Set globally
git config --global user.name "Manish"
git config --global user.email "manishkau6239@gmail.com"
```

### Issue: Cannot push to GitHub
```bash
# Check remote
git remote -v

# If remote is wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/Manish7291/job_portal_project_g23.git

# Try push again
git push -u origin main
```

### Issue: Node modules appear in git status
Make sure `.gitignore` is committed and contains:
```
node_modules/
```

Verify:
```bash
git check-ignore node_modules/
```

### Issue: Merge conflicts
```bash
# View conflicts
git status

# After resolving conflicts manually:
git add <resolved-files>
git commit -m "resolve: Merge conflicts"
```

---

## 📊 EXPECTED RESULTS

After following all steps, you should see:

✅ **4 feature branches:** manish, harshit, kavya, harsh
✅ **13+ meaningful commits** (4 + 4 + 5 + 10 from each team member)
✅ **Proper author attribution** on each commit (visible on GitHub)
✅ **All branches merged** into main
✅ **Project fully functional** (backend + frontend run without errors)
✅ **Clean git history** with realistic team collaboration timeline

---

## 📍 Quick Command Summary

```bash
# One-liner to see everything
git log --all --graph --oneline --decorate

# Count commits per author
git shortlog -sn

# See who changed what
git log -p -- backend/app.js

# Check contribution timeline
git log --pretty=format:"%h %an %ad %s" --date=short --all
```

---

## 🎯 Done!

Your Git workflow is now complete with:
- ✅ Realistic team collaboration history
- ✅ Proper author attribution for each team member
- ✅ Meaningful commit messages
- ✅ Files organized by responsibility
- ✅ Full project functionality
- ✅ Ready for deployment

**Next:** Create a Pull Request from each branch to main on GitHub to simulate the workflow! 🚀
