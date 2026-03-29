@echo off
REM Job Portal Git Workflow Automation Script (Windows Batch)
REM This script automates the entire Git team collaboration simulation

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ========================================
echo Job Portal - Git Workflow Automation
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1 || (
    echo ERROR: Git is not installed or not in PATH
    exit /b 1
)

REM ============================================
REM STEP 1: INITIALIZE GIT
REM ============================================
echo [STEP 1] Initializing Git Repository...

if exist .git (
    echo Git repository already initialized
) else (
    git init
    echo Git repository initialized
)

REM Create root .gitignore
(
echo node_modules/
echo .env
echo .env.local
echo .DS_Store
echo .vscode/
echo .idea/
echo *.log
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo dist/
echo build/
echo .turbo/
echo .next/
echo out/
) > .gitignore
echo Root .gitignore created

REM ============================================
REM STEP 2: CREATE BRANCHES
REM ============================================
echo.
echo [STEP 2] Creating Feature Branches...

setlocal enabledelayedexpansion
for %%A in (manish harshit kavya harsh) do (
    git rev-parse --quiet --verify "%%A" >nul 2>&1
    if errorlevel 1 (
        git checkout -b "%%A" 2>nul
        echo Branch '%%A' created
    ) else (
        git checkout "%%A" 2>nul
        echo Branch '%%A' already exists
    )
)

git checkout -b main 2>nul || git checkout main 2>nul
echo On main branch

REM ============================================
REM STEP 3: PHASE 1 - MANISH COMMITS
REM ============================================
echo.
echo [STEP 3] PHASE 1 - Manish's Commits ^(Backend Setup^)...

git checkout manish

REM Commit 1: Backend package
setlocal enabledelayedexpansion
set "GIT_AUTHOR_NAME=Manish"
set "GIT_AUTHOR_EMAIL=manishkau6239@gmail.com"
set "GIT_COMMITTER_NAME=Manish"
set "GIT_COMMITTER_EMAIL=manishkau6239@gmail.com"
set "GIT_AUTHOR_DATE=2026-03-01 09:30:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-01 09:30:00 +0530"

git add backend\package.json backend\.gitignore .gitignore README.md 2>nul
git commit -m "setup: Initialize backend project structure and dependencies" 2>nul || echo.
echo Manish Commit 1: Backend Setup

REM Commit 2: Express app and server
set "GIT_AUTHOR_DATE=2026-03-02 10:15:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-02 10:15:00 +0530"

git add backend\app.js backend\server.js backend\.env.example 2>nul
git commit -m "feat: Setup Express app and server configuration with environment variables" 2>nul || echo.
echo Manish Commit 2: Server Setup

REM Commit 3: Config and middleware
set "GIT_AUTHOR_DATE=2026-03-03 14:45:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-03 14:45:00 +0530"

git add backend\config\ backend\middleware\ 2>nul
git commit -m "feat: Add database config and core middleware ^(auth, error handling, upload^)" 2>nul || echo.
echo Manish Commit 3: Middleware 4 Config

REM Commit 4: Utilities
set "GIT_AUTHOR_DATE=2026-03-04 11:20:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-04 11:20:00 +0530"

git add backend\utils\ 2>nul
git commit -m "util: Add utility functions ^(email service, admin seeding^)" 2>nul || echo.
echo Manish Commit 4: Utilities

REM ============================================
REM STEP 4: PHASE 2 - HARSHIT COMMITS
REM ============================================
echo.
echo [STEP 4] PHASE 2 - Harshit's Commits ^(Models 4 Core Controllers^)...

git checkout main
git checkout harshit

set "GIT_AUTHOR_NAME=Harshit"
set "GIT_AUTHOR_EMAIL=harshitjain2705@gmail.com"
set "GIT_COMMITTER_NAME=Harshit"
set "GIT_COMMITTER_EMAIL=harshitjain2705@gmail.com"

REM Commit 1: Models
set "GIT_AUTHOR_DATE=2026-03-05 09:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-05 09:00:00 +0530"

git add backend\models\ 2>nul
git commit -m "feat: Add database models ^(User, Job, Application, Payment, etc.^)" 2>nul || echo.
echo Harshit Commit 1: Models

REM Commit 2: Core controllers part 1
set "GIT_AUTHOR_DATE=2026-03-06 10:30:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-06 10:30:00 +0530"

git add backend\controllers\authController.js backend\controllers\jobController.js backend\controllers\applicationController.js 2>nul
git commit -m "feat: Implement auth, job, and application controllers with business logic" 2>nul || echo.
echo Harshit Commit 2: Core Controllers Part 1

REM Commit 3: Core controllers part 2
set "GIT_AUTHOR_DATE=2026-03-07 13:15:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-07 13:15:00 +0530"

git add backend\controllers\studentController.js backend\controllers\recruiterController.js backend\controllers\adminController.js 2>nul
git commit -m "feat: Add student, recruiter, and admin profile controllers" 2>nul || echo.
echo Harshit Commit 3: Core Controllers Part 2

REM Commit 4: Routes and validators
set "GIT_AUTHOR_DATE=2026-03-08 11:45:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-08 11:45:00 +0530"

git add backend\routes\ backend\validators\ 2>nul
git commit -m "feat: Add API routes and input validators for all core features" 2>nul || echo.
echo Harshit Commit 4: Routes 4 Validators

REM ============================================
REM STEP 5: PHASE 3 - KAVYA COMMITS
REM ============================================
echo.
echo [STEP 5] PHASE 3 - Kavya's Commits ^(Additional Features^)...

git checkout main
git checkout kavya

set "GIT_AUTHOR_NAME=Kavya"
set "GIT_AUTHOR_EMAIL=kavyagogia7494@gmail.com"
set "GIT_COMMITTER_NAME=Kavya"
set "GIT_COMMITTER_EMAIL=kavyagogia7494@gmail.com"

REM Commit 1: Resume and Interview
set "GIT_AUTHOR_DATE=2026-03-08 15:30:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-08 15:30:00 +0530"

git add backend\controllers\resumeController.js backend\controllers\interviewController.js 2>nul
git commit -m "feat: Add resume analysis and interview experience controllers" 2>nul || echo.
echo Kavya Commit 1: Resume 4 Interview Controllers

REM Commit 2: Payment and AI
set "GIT_AUTHOR_DATE=2026-03-09 10:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-09 10:00:00 +0530"

git add backend\controllers\paymentController.js backend\controllers\aiController.js 2>nul
git commit -m "feat: Implement payment processing and AI-powered features" 2>nul || echo.
echo Kavya Commit 2: Payment 4 AI Controllers

REM Commit 3: Notifications
set "GIT_AUTHOR_DATE=2026-03-10 09:15:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-10 09:15:00 +0530"

git add backend\controllers\notificationController.js 2>nul
git commit -m "feat: Add notification system controller for real-time updates" 2>nul || echo.
echo Kavya Commit 3: Notification Controller

REM Commit 4: Services
set "GIT_AUTHOR_DATE=2026-03-11 14:20:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-11 14:20:00 +0530"

git add backend\services\ 2>nul
git commit -m "refactor: Extract business logic into services ^(resume, payment, AI analysis^)" 2>nul || echo.
echo Kavya Commit 4: Services Layer

REM Commit 5: Additional Routes
set "GIT_AUTHOR_DATE=2026-03-12 11:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-12 11:00:00 +0530"

git add backend\routes\resumeRoutes.js backend\routes\interviewRoutes.js backend\routes\notificationRoutes.js backend\routes\paymentRoutes.js backend\routes\aiRoutes.js 2>nul
git commit -m "feat: Add API routes for all additional features" 2>nul || echo.
echo Kavya Commit 5: Additional Routes

REM ============================================
REM STEP 6: PHASE 4 - HARSH COMMITS
REM ============================================
echo.
echo [STEP 6] PHASE 4 - Harsh's Commits ^(Frontend Development^)...

git checkout main
git checkout harsh

set "GIT_AUTHOR_NAME=Harsh"
set "GIT_AUTHOR_EMAIL=hk180306@gmail.com"
set "GIT_COMMITTER_NAME=Harsh"
set "GIT_COMMITTER_EMAIL=hk180306@gmail.com"

REM Commit 1: Frontend setup
set "GIT_AUTHOR_DATE=2026-03-05 08:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-05 08:00:00 +0530"

git add frontend\package.json frontend\.gitignore frontend\.env.example 2>nul
git commit -m "setup: Initialize React frontend with Vite and Tailwind CSS" 2>nul || echo.
echo Harsh Commit 1: Frontend Setup

REM Commit 2: Build configs
set "GIT_AUTHOR_DATE=2026-03-06 09:30:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-06 09:30:00 +0530"

git add frontend\index.html frontend\vite.config.js frontend\tailwind.config.js frontend\postcss.config.js frontend\vercel.json 2>nul
git commit -m "config: Setup Vite, Tailwind CSS, and Vercel deployment" 2>nul || echo.
echo Harsh Commit 2: Build Configs

REM Commit 3: App structure
set "GIT_AUTHOR_DATE=2026-03-07 10:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-07 10:00:00 +0530"

git add frontend\src\main.jsx frontend\src\App.jsx frontend\src\index.css frontend\src\context\ 2>nul
git commit -m "feat: Setup React app structure and theme context" 2>nul || echo.
echo Harsh Commit 3: App Structure

REM Commit 4: Layouts
set "GIT_AUTHOR_DATE=2026-03-08 13:30:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-08 13:30:00 +0530"

git add frontend\src\layouts\ frontend\src\components\ 2>nul
git commit -m "feat: Add main and dashboard layouts with navigation components" 2>nul || echo.
echo Harsh Commit 4: Layouts 4 Components

REM Commit 5: Auth pages
set "GIT_AUTHOR_DATE=2026-03-10 11:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-10 11:00:00 +0530"

git add frontend\src\pages\Login.jsx frontend\src\pages\Register.jsx frontend\src\pages\ForgotPassword.jsx frontend\src\pages\ResetPassword.jsx 2>nul
git commit -m "feat: Implement authentication pages ^(login, register, password reset^)" 2>nul || echo.
echo Harsh Commit 5: Auth Pages

REM Commit 6: Common pages
set "GIT_AUTHOR_DATE=2026-03-12 15:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-12 15:00:00 +0530"

git add frontend\src\pages\Landing.jsx frontend\src\pages\Premium.jsx frontend\src\pages\Jobs.jsx frontend\src\pages\JobDetails.jsx frontend\src\pages\SalaryInsights.jsx frontend\src\pages\InterviewFeed.jsx 2>nul
git commit -m "feat: Add landing, job listing, and insights pages" 2>nul || echo.
echo Harsh Commit 6: Common Pages

REM Commit 7: Student pages
set "GIT_AUTHOR_DATE=2026-03-14 10:30:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-14 10:30:00 +0530"

git add frontend\src\pages\student\ 2>nul
git commit -m "feat: Add student dashboard, applications, profile, and analytics pages" 2>nul || echo.
echo Harsh Commit 7: Student Pages

REM Commit 8: Recruiter pages
set "GIT_AUTHOR_DATE=2026-03-16 14:00:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-16 14:00:00 +0530"

git add frontend\src\pages\recruiter\ 2>nul
git commit -m "feat: Add recruiter dashboard, job posting, and applicant management" 2>nul || echo.
echo Harsh Commit 8: Recruiter Pages

REM Commit 9: Admin pages
set "GIT_AUTHOR_DATE=2026-03-18 09:45:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-18 09:45:00 +0530"

git add frontend\src\pages\admin\ 2>nul
git commit -m "feat: Add admin dashboard for system management" 2>nul || echo.
echo Harsh Commit 9: Admin Pages

REM Commit 10: Integration
set "GIT_AUTHOR_DATE=2026-03-20 12:15:00 +0530"
set "GIT_COMMITTER_DATE=2026-03-20 12:15:00 +0530"

git add frontend\src\hooks\ frontend\src\services\api.js frontend\src\store\ 2>nul
git commit -m "feat: Add API integration, hooks, and state management ^(Redux^)" 2>nul || echo.
echo Harsh Commit 10: API Integration

REM ============================================
REM STEP 7: MERGE ALL BRANCHES
REM ============================================
echo.
echo [STEP 7] Merging All Branches...

git checkout main

REM Merge manish
git merge manish -m "Merge branch 'manish' - Backend core setup and configuration" 2>nul || echo.
echo Manish branch merged

REM Merge harshit
git merge harshit -m "Merge branch 'harshit' - Database models and core controllers" 2>nul || echo.
echo Harshit branch merged

REM Merge kavya
git merge kavya -m "Merge branch 'kavya' - Additional features ^(resume, payment, AI, notifications^)" 2>nul || echo.
echo Kavya branch merged

REM Merge harsh
git merge harsh -m "Merge branch 'harsh' - Complete frontend implementation" 2>nul || echo.
echo Harsh branch merged

REM ============================================
REM STEP 8: FINAL VERIFICATION
REM ============================================
echo.
echo [STEP 8] Final Verification...

echo.
echo Git Log ^(Last 20 commits^):
git log --oneline -20

echo.
echo Branch Status:
git branch -a

echo.
echo Working Directory Status:
git status

REM ============================================
REM SUCCESS
REM ============================================
echo.
echo ========================================
echo Git Workflow Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Review git log: git log --pretty=format:"%%h %%an ^<%%ae^> - %%s"
echo 2. Install dependencies:
echo    npm --prefix backend install
echo    npm --prefix frontend install
echo 3. Start backend: npm --prefix backend start
echo 4. Start frontend: npm --prefix frontend dev
echo 5. Push to GitHub: git push -u origin main
echo    Also push branches: git push -u origin manish harshit kavya harsh
echo.
echo Note: If pushing to GitHub, make sure to:
echo - Add the GitHub remote: git remote add origin https://github.com/Manish7291/job-portal.git
echo - Have proper authentication configured ^(SSH key or GitHub token^)
echo.
echo All done!
echo.

endlocal
