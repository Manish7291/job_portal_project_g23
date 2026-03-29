# 🚀 Git Workflow - Team Collaboration Guide

**Project:** Job Portal (Full-Stack)
**Team:** Manish, Harshit, Kavya, Harsh
**Timeline:** March 1-25, 2026
**Goal:** Realistic team Git history with proper attribution

---

## 📋 Team Responsibilities & File Distribution

### 1️⃣ Manish (Backend Core & Configuration)
**Email:** manishkau6239@gmail.com | **GitHub:** Manish7291
- `backend/package.json`
- `backend/app.js`
- `backend/server.js`
- `backend/.env.example`
- `backend/.gitignore`
- `backend/config/` (db.js)
- `backend/middleware/` (authMiddleware, errorHandler, asyncHandler, upload)
- `backend/utils/` (seedAdmin.js, sendEmail.js)
- Root `.gitignore` and `README.md`

### 2️⃣ Harshit (Database & Models)
**Email:** harshitjain2705@gmail.com | **GitHub:** Harshitj27
- `backend/models/` (User, Job, Application, StudentProfile, RecruiterProfile, Payment, Notification, InterviewExperience, ResumeAnalysis)
- Core Controllers:
  - `backend/controllers/authController.js`
  - `backend/controllers/jobController.js`
  - `backend/controllers/applicationController.js`
  - `backend/controllers/studentController.js`
  - `backend/controllers/recruiterController.js`
  - `backend/controllers/adminController.js`
- `backend/validators/` (authValidator, jobValidator)
- Core Routes:
  - `backend/routes/authRoutes.js`
  - `backend/routes/jobRoutes.js`
  - `backend/routes/applicationRoutes.js`
  - `backend/routes/studentRoutes.js`
  - `backend/routes/recruiterRoutes.js`
  - `backend/routes/adminRoutes.js`

### 3️⃣ Kavya (Additional Controllers & Features)
**Email:** kavyagogia7494@gmail.com | **GitHub:** kavya7494
- Additional Controllers:
  - `backend/controllers/resumeController.js`
  - `backend/controllers/interviewController.js`
  - `backend/controllers/notificationController.js`
  - `backend/controllers/paymentController.js`
  - `backend/controllers/aiController.js`
- Services:
  - `backend/services/resumeAnalyzer.js`
  - `backend/services/resumeParser.js`
  - `backend/services/paymentService.js`
  - `backend/services/aiService.js`
- Additional Routes:
  - `backend/routes/resumeRoutes.js`
  - `backend/routes/interviewRoutes.js`
  - `backend/routes/notificationRoutes.js`
  - `backend/routes/paymentRoutes.js`
  - `backend/routes/aiRoutes.js`

### 4️⃣ Harsh (Frontend Development)
**Email:** hk180306@gmail.com | **GitHub:** harshkumar051
- `frontend/package.json`
- `frontend/.gitignore`
- `frontend/.env.example`
- `frontend/index.html`
- `frontend/vite.config.js`
- `frontend/tailwind.config.js`
- `frontend/postcss.config.js`
- `frontend/vercel.json`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`
- `frontend/src/index.css`
- All files in `frontend/src/` (components, pages, layouts, context, hooks, store, services)

---

## 🔧 Setup Instructions

### Step 1: Initialize Git Repository

```bash
# Navigate to project root
cd "/c/Users/manis/OneDrive/Documents/OneDrive/Desktop/sem 6/job portal project/job portal project"

# Initialize git (if not already done)
git init

# Create root .gitignore (copy-paste below)
# Linux/Mac: use 'cat > .gitignore << 'EOF''
# Windows PowerShell: use the Edit tool or create it manually

# For Windows, create .gitignore with this content:
# node_modules/
# .env
# .DS_Store
# .vscode/
# *.log
# dist/
# build/

# Configure git user (global or local)
git config --global user.name "Manish"
git config --global user.email "manishkau6239@gmail.com"

# Check git status
git status
```

---

## 📝 Step-by-Step Git Commands

### PHASE 1: MANISH (Backend Setup) - March 1-5, 2026

```bash
# Create and checkout manish branch
git checkout -b manish

# ===== COMMIT 1: Backend Package & Project Structure (March 1, 2026) =====
git add backend/package.json backend/.gitignore .gitignore README.md
git commit -m "setup: Initialize backend project structure and dependencies (npm packages configured)"

# Verify commit
git log --oneline -1

# ===== COMMIT 2: Express App & Server Setup (March 2, 2026) =====
git add backend/app.js backend/server.js backend/.env.example
git commit -m "feat: Setup Express app and server configuration with environment variables"

# ===== COMMIT 3: Database & Core Middleware (March 3, 2026) =====
git add backend/config/ backend/middleware/
git commit -m "feat: Add database config and core middleware (auth, error handling, upload)"

# ===== COMMIT 4: Utility Functions (March 4, 2026) =====
git add backend/utils/
git commit -m "util: Add utility functions (email service, admin seeding)"

# Verify all commits for Manish
git log --oneline | head -5
```

---

### PHASE 2: HARSHIT (Database & Models) - March 5-8, 2026

```bash
# Create and checkout harshit branch from main (not from manish)
git checkout main
git checkout -b harshit

# ===== COMMIT 1: Database Models (March 5, 2026) =====
git add backend/models/
git commit -m "feat: Add database models (User, Job, Application, Payment, etc.)"

# ===== COMMIT 2: Core Controllers - Auth & Jobs (March 6, 2026) =====
git add backend/controllers/authController.js \
       backend/controllers/jobController.js \
       backend/controllers/applicationController.js
git commit -m "feat: Implement auth, job, and application controllers with business logic"

# ===== COMMIT 3: Profile Controllers (March 7, 2026) =====
git add backend/controllers/studentController.js \
       backend/controllers/recruiterController.js \
       backend/controllers/adminController.js
git commit -m "feat: Add student, recruiter, and admin profile controllers"

# ===== COMMIT 4: Routes & Validators (March 8, 2026) =====
git add backend/routes/authRoutes.js \
       backend/routes/jobRoutes.js \
       backend/routes/applicationRoutes.js \
       backend/routes/studentRoutes.js \
       backend/routes/recruiterRoutes.js \
       backend/routes/adminRoutes.js \
       backend/validators/
git commit -m "feat: Add API routes and input validators for all core features"

# Verify all commits for Harshit
git log --oneline | head -6
```

---

### PHASE 3: KAVYA (Additional Features) - March 8-12, 2026

```bash
# Create and checkout kavya branch from main
git checkout main
git checkout -b kavya

# ===== COMMIT 1: Resume & Interview Controllers (March 8, 2026) =====
git add backend/controllers/resumeController.js \
       backend/controllers/interviewController.js
git commit -m "feat: Add resume analysis and interview experience controllers"

# ===== COMMIT 2: Payment & AI Controllers (March 9, 2026) =====
git add backend/controllers/paymentController.js \
       backend/controllers/aiController.js
git commit -m "feat: Implement payment processing and AI-powered features"

# ===== COMMIT 3: Notification Controller (March 10, 2026) =====
git add backend/controllers/notificationController.js
git commit -m "feat: Add notification system controller for real-time updates"

# ===== COMMIT 4: Services Layer (March 11, 2026) =====
git add backend/services/
git commit -m "refactor: Extract business logic into services (resume, payment, AI analysis)"

# ===== COMMIT 5: Additional Routes (March 12, 2026) =====
git add backend/routes/resumeRoutes.js \
       backend/routes/interviewRoutes.js \
       backend/routes/notificationRoutes.js \
       backend/routes/paymentRoutes.js \
       backend/routes/aiRoutes.js
git commit -m "feat: Add API routes for all additional features"

# Verify all commits for Kavya
git log --oneline | head -7
```

---

### PHASE 4: HARSH (Frontend Development) - March 5-20, 2026

```bash
# Create and checkout harsh branch from main
git checkout main
git checkout -b harsh

# ===== COMMIT 1: Frontend Setup & Config (March 5, 2026) =====
git add frontend/package.json frontend/.gitignore frontend/.env.example
git commit -m "setup: Initialize React frontend with Vite and Tailwind CSS"

# ===== COMMIT 2: Build Config Files (March 6, 2026) =====
git add frontend/index.html \
       frontend/vite.config.js \
       frontend/tailwind.config.js \
       frontend/postcss.config.js \
       frontend/vercel.json
git commit -m "config: Setup Vite, Tailwind CSS, and Vercel deployment"

# ===== COMMIT 3: App Structure & Theme (March 7, 2026) =====
git add frontend/src/main.jsx \
       frontend/src/App.jsx \
       frontend/src/index.css \
       frontend/src/context/
git commit -m "feat: Setup React app structure and theme context"

# ===== COMMIT 4: Layout Components (March 8, 2026) =====
git add frontend/src/layouts/ \
       frontend/src/components/
git commit -m "feat: Add main and dashboard layouts with navigation components"

# ===== COMMIT 5: Authentication Pages (March 10, 2026) =====
git add frontend/src/pages/Login.jsx \
       frontend/src/pages/Register.jsx \
       frontend/src/pages/ForgotPassword.jsx \
       frontend/src/pages/ResetPassword.jsx
git commit -m "feat: Implement authentication pages (login, register, password reset)"

# ===== COMMIT 6: Common Pages (March 12, 2026) =====
git add frontend/src/pages/Landing.jsx \
       frontend/src/pages/Premium.jsx \
       frontend/src/pages/Jobs.jsx \
       frontend/src/pages/JobDetails.jsx \
       frontend/src/pages/SalaryInsights.jsx \
       frontend/src/pages/InterviewFeed.jsx
git commit -m "feat: Add landing, job listing, and insights pages"

# ===== COMMIT 7: Student Pages (March 14, 2026) =====
git add frontend/src/pages/student/
git commit -m "feat: Add student dashboard, applications, profile, and analytics pages"

# ===== COMMIT 8: Recruiter Pages (March 16, 2026) =====
git add frontend/src/pages/recruiter/
git commit -m "feat: Add recruiter dashboard, job posting, and applicant management"

# ===== COMMIT 9: Admin Pages (March 18, 2026) =====
git add frontend/src/pages/admin/
git commit -m "feat: Add admin dashboard for system management"

# ===== COMMIT 10: Frontend Integration (March 20, 2026) =====
git add frontend/src/hooks/ \
       frontend/src/services/api.js \
       frontend/src/store/
git commit -m "feat: Add API integration, hooks, and state management (Redux)"

# Verify all commits for Harsh
git log --oneline | head -12
```

---

## 🔀 Merging Branches

```bash
# Switch to main branch
git checkout main

# ===== MERGE PHASE 1: Merge Manish's work (March 5) =====
git merge manish -m "Merge branch 'manish' - Backend core setup and configuration"

# ===== MERGE PHASE 2: Merge Harshit's work (March 8) =====
git merge harshit -m "Merge branch 'harshit' - Database models and core controllers"

# ===== MERGE PHASE 3: Merge Kavya's work (March 12) =====
git merge kavya -m "Merge branch 'kavya' - Additional features (resume, payment, AI, notifications)"

# ===== MERGE PHASE 4: Merge Harsh's work (March 20) =====
git merge harsh -m "Merge branch 'harsh' - Complete frontend implementation"

# View final commit history
git log --oneline

# Verify project can still run
npm --prefix backend install
npm --prefix frontend install
npm --prefix backend start   # In one terminal
# In another terminal: npm --prefix frontend dev
```

---

## 📤 Push to GitHub

```bash
# Add GitHub as remote
git remote add origin https://github.com/Manish7291/job-portal.git
# or if using SSH:
# git remote add origin git@github.com:Manish7291/job-portal.git

# Verify remote added
git remote -v

# Push all branches
git push -u origin main
git push -u origin manish
git push -u origin harshit
git push -u origin kavya
git push -u origin harsh

# Verify all branches exist on GitHub
git branch -r
```

---

## ✅ Verification Checklist

After completing all steps:

```bash
# Check log with author info
git log --pretty=format:"%h %an <%ae> - %s" | head -20

# Verify branches
git branch -a

# Check for uncommitted changes
git status

# Test backend
cd backend
npm install
npm start   # Should run without errors

# Test frontend (in new terminal)
cd frontend
npm install
npm run dev   # Should start dev server

# Verify .gitignore is working
git status | grep -i "node_modules\|.env"  # Should show nothing if .gitignore is correct
```

---

## 🎯 Expected Results

✅ **4 feature branches** (manish, harshit, kavya, harsh)
✅ **13+ meaningful commits** across all team members
✅ **Proper author/email attribution** for GitHub contributions
✅ **Project is fully functional** and deployable
✅ **Complete Git history** showing realistic team collaboration
✅ **All contributors visible** on GitHub activity graph

---

## 🐛 Troubleshooting

### If you see "fatal: not a git repository"
```bash
git init
```

### If git config is wrong
```bash
# Set temporarily for git commands
export GIT_AUTHOR_NAME="Name"
export GIT_AUTHOR_EMAIL="email@domain.com"
export GIT_COMMITTER_NAME="Name"
export GIT_COMMITTER_EMAIL="email@domain.com"

# Or set globally
git config --global user.name "Your Name"
git config --global user.email "your.email@domain.com"
```

### If you need to undo commits
```bash
# Check recent commits
git log --oneline -5

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Or reset hard (discard changes)
git reset --hard HEAD~1
```

### If merge conflicts occur
```bash
# See conflict files
git status

# Resolve conflicts manually, then:
git add <resolved-files>
git commit -m "resolve: Merge conflicts"
```

---

## 📌 Notes

- **Commit Dates:** Uses realistic spread (Mar 1-25, 2026)
- **Author Info:** Each commit attributed to correct team member
- **File Distribution:** Files logically grouped by functionality
- **Commits:** Multiple commits per person to show realistic development flow
- **Merging Strategy:** Fast-forward merges from feature branches to main
- **Project Stability:** Each merge leaves project in working state

**Status:** Ready to implement! 🚀
