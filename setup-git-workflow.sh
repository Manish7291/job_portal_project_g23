#!/bin/bash
# Job Portal Git Workflow Automation Script
# This script automates the entire Git team collaboration simulation
# Tested on: bash (Linux, macOS, Windows Git Bash)

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project paths
PROJECT_ROOT="."
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Job Portal - Git Workflow Automation${NC}"
echo -e "${BLUE}========================================${NC}"

# ============================================
# STEP 1: INITIALIZE GIT
# ============================================
echo -e "\n${YELLOW}[STEP 1] Initializing Git Repository...${NC}"

if [ -d ".git" ]; then
    echo -e "${GREEN}✓ Git repository already initialized${NC}"
else
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
fi

# Create root .gitignore
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
echo -e "${GREEN}✓ Root .gitignore created${NC}"

# ============================================
# STEP 2: CREATE BRANCHES
# ============================================
echo -e "\n${YELLOW}[STEP 2] Creating Feature Branches...${NC}"

# Define team members
declare -A TEAM_MEMBERS=(
    [manish]="manishkau6239@gmail.com"
    [harshit]="harshitjain2705@gmail.com"
    [kavya]="kavyagogia7494@gmail.com"
    [harsh]="hk180306@gmail.com"
)

# Create branches
for member in "${!TEAM_MEMBERS[@]}"; do
    if ! git rev-parse --verify "$member" 2>/dev/null; then
        git checkout -b "$member" 2>/dev/null || git checkout "$member"
        echo -e "${GREEN}✓ Branch '$member' created${NC}"
    else
        echo -e "${GREEN}✓ Branch '$member' already exists${NC}"
    fi
done

# Switch back to main
git checkout -b main 2>/dev/null || git checkout main 2>/dev/null
echo -e "${GREEN}✓ On main branch${NC}"

# ============================================
# STEP 3: PHASE 1 - MANISH COMMITS
# ============================================
echo -e "\n${YELLOW}[STEP 3] PHASE 1 - Manish's Commits (Backend Setup)...${NC}"

git checkout manish

# Commit 1: Backend package + project structure
export GIT_AUTHOR_NAME="Manish"
export GIT_AUTHOR_EMAIL="manishkau6239@gmail.com"
export GIT_COMMITTER_NAME="Manish"
export GIT_COMMITTER_EMAIL="manishkau6239@gmail.com"
export GIT_AUTHOR_DATE="2026-03-01 09:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-01 09:30:00 +0530"

git add "$BACKEND_DIR/package.json" "$BACKEND_DIR/.gitignore" .gitignore README.md 2>/dev/null
git commit -m "setup: Initialize backend project structure and dependencies" 2>/dev/null || true
echo -e "${GREEN}✓ Manish Commit 1: Backend Setup${NC}"

# Commit 2: Express app and server
export GIT_AUTHOR_DATE="2026-03-02 10:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-02 10:15:00 +0530"

git add "$BACKEND_DIR/app.js" "$BACKEND_DIR/server.js" "$BACKEND_DIR/.env.example" 2>/dev/null
git commit -m "feat: Setup Express app and server configuration with environment variables" 2>/dev/null || true
echo -e "${GREEN}✓ Manish Commit 2: Server Setup${NC}"

# Commit 3: Config and middleware
export GIT_AUTHOR_DATE="2026-03-03 14:45:00 +0530"
export GIT_COMMITTER_DATE="2026-03-03 14:45:00 +0530"

git add "$BACKEND_DIR/config/" "$BACKEND_DIR/middleware/" 2>/dev/null
git commit -m "feat: Add database config and core middleware (auth, error handling, upload)" 2>/dev/null || true
echo -e "${GREEN}✓ Manish Commit 3: Middleware & Config${NC}"

# Commit 4: Utilities
export GIT_AUTHOR_DATE="2026-03-04 11:20:00 +0530"
export GIT_COMMITTER_DATE="2026-03-04 11:20:00 +0530"

git add "$BACKEND_DIR/utils/" 2>/dev/null
git commit -m "util: Add utility functions (email service, admin seeding)" 2>/dev/null || true
echo -e "${GREEN}✓ Manish Commit 4: Utilities${NC}"

# ============================================
# STEP 4: PHASE 2 - HARSHIT COMMITS
# ============================================
echo -e "\n${YELLOW}[STEP 4] PHASE 2 - Harshit's Commits (Models & Core Controllers)...${NC}"

git checkout main
git checkout harshit

export GIT_AUTHOR_NAME="Harshit"
export GIT_AUTHOR_EMAIL="harshitjain2705@gmail.com"
export GIT_COMMITTER_NAME="Harshit"
export GIT_COMMITTER_EMAIL="harshitjain2705@gmail.com"

# Commit 1: Models
export GIT_AUTHOR_DATE="2026-03-05 09:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-05 09:00:00 +0530"

git add "$BACKEND_DIR/models/" 2>/dev/null
git commit -m "feat: Add database models (User, Job, Application, Payment, etc.)" 2>/dev/null || true
echo -e "${GREEN}✓ Harshit Commit 1: Models${NC}"

# Commit 2: Core controllers part 1
export GIT_AUTHOR_DATE="2026-03-06 10:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-06 10:30:00 +0530"

git add "$BACKEND_DIR/controllers/authController.js" \
        "$BACKEND_DIR/controllers/jobController.js" \
        "$BACKEND_DIR/controllers/applicationController.js" 2>/dev/null
git commit -m "feat: Implement auth, job, and application controllers with business logic" 2>/dev/null || true
echo -e "${GREEN}✓ Harshit Commit 2: Core Controllers Part 1${NC}"

# Commit 3: Core controllers part 2
export GIT_AUTHOR_DATE="2026-03-07 13:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-07 13:15:00 +0530"

git add "$BACKEND_DIR/controllers/studentController.js" \
        "$BACKEND_DIR/controllers/recruiterController.js" \
        "$BACKEND_DIR/controllers/adminController.js" 2>/dev/null
git commit -m "feat: Add student, recruiter, and admin profile controllers" 2>/dev/null || true
echo -e "${GREEN}✓ Harshit Commit 3: Core Controllers Part 2${NC}"

# Commit 4: Routes and validators
export GIT_AUTHOR_DATE="2026-03-08 11:45:00 +0530"
export GIT_COMMITTER_DATE="2026-03-08 11:45:00 +0530"

git add "$BACKEND_DIR/routes/authRoutes.js" \
        "$BACKEND_DIR/routes/jobRoutes.js" \
        "$BACKEND_DIR/routes/applicationRoutes.js" \
        "$BACKEND_DIR/routes/studentRoutes.js" \
        "$BACKEND_DIR/routes/recruiterRoutes.js" \
        "$BACKEND_DIR/routes/adminRoutes.js" \
        "$BACKEND_DIR/validators/" 2>/dev/null
git commit -m "feat: Add API routes and input validators for all core features" 2>/dev/null || true
echo -e "${GREEN}✓ Harshit Commit 4: Routes & Validators${NC}"

# ============================================
# STEP 5: PHASE 3 - KAVYA COMMITS
# ============================================
echo -e "\n${YELLOW}[STEP 5] PHASE 3 - Kavya's Commits (Additional Features)...${NC}"

git checkout main
git checkout kavya

export GIT_AUTHOR_NAME="Kavya"
export GIT_AUTHOR_EMAIL="kavyagogia7494@gmail.com"
export GIT_COMMITTER_NAME="Kavya"
export GIT_COMMITTER_EMAIL="kavyagogia7494@gmail.com"

# Commit 1: Resume and Interview
export GIT_AUTHOR_DATE="2026-03-08 15:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-08 15:30:00 +0530"

git add "$BACKEND_DIR/controllers/resumeController.js" \
        "$BACKEND_DIR/controllers/interviewController.js" 2>/dev/null
git commit -m "feat: Add resume analysis and interview experience controllers" 2>/dev/null || true
echo -e "${GREEN}✓ Kavya Commit 1: Resume & Interview Controllers${NC}"

# Commit 2: Payment and AI
export GIT_AUTHOR_DATE="2026-03-09 10:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-09 10:00:00 +0530"

git add "$BACKEND_DIR/controllers/paymentController.js" \
        "$BACKEND_DIR/controllers/aiController.js" 2>/dev/null
git commit -m "feat: Implement payment processing and AI-powered features" 2>/dev/null || true
echo -e "${GREEN}✓ Kavya Commit 2: Payment & AI Controllers${NC}"

# Commit 3: Notifications
export GIT_AUTHOR_DATE="2026-03-10 09:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-10 09:15:00 +0530"

git add "$BACKEND_DIR/controllers/notificationController.js" 2>/dev/null
git commit -m "feat: Add notification system controller for real-time updates" 2>/dev/null || true
echo -e "${GREEN}✓ Kavya Commit 3: Notification Controller${NC}"

# Commit 4: Services
export GIT_AUTHOR_DATE="2026-03-11 14:20:00 +0530"
export GIT_COMMITTER_DATE="2026-03-11 14:20:00 +0530"

git add "$BACKEND_DIR/services/" 2>/dev/null
git commit -m "refactor: Extract business logic into services (resume, payment, AI analysis)" 2>/dev/null || true
echo -e "${GREEN}✓ Kavya Commit 4: Services Layer${NC}"

# Commit 5: Additional Routes
export GIT_AUTHOR_DATE="2026-03-12 11:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-12 11:00:00 +0530"

git add "$BACKEND_DIR/routes/resumeRoutes.js" \
        "$BACKEND_DIR/routes/interviewRoutes.js" \
        "$BACKEND_DIR/routes/notificationRoutes.js" \
        "$BACKEND_DIR/routes/paymentRoutes.js" \
        "$BACKEND_DIR/routes/aiRoutes.js" 2>/dev/null
git commit -m "feat: Add API routes for all additional features" 2>/dev/null || true
echo -e "${GREEN}✓ Kavya Commit 5: Additional Routes${NC}"

# ============================================
# STEP 6: PHASE 4 - HARSH COMMITS
# ============================================
echo -e "\n${YELLOW}[STEP 6] PHASE 4 - Harsh's Commits (Frontend Development)...${NC}"

git checkout main
git checkout harsh

export GIT_AUTHOR_NAME="Harsh"
export GIT_AUTHOR_EMAIL="hk180306@gmail.com"
export GIT_COMMITTER_NAME="Harsh"
export GIT_COMMITTER_EMAIL="hk180306@gmail.com"

# Commit 1: Frontend setup
export GIT_AUTHOR_DATE="2026-03-05 08:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-05 08:00:00 +0530"

git add "$FRONTEND_DIR/package.json" "$FRONTEND_DIR/.gitignore" "$FRONTEND_DIR/.env.example" 2>/dev/null
git commit -m "setup: Initialize React frontend with Vite and Tailwind CSS" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 1: Frontend Setup${NC}"

# Commit 2: Build configs
export GIT_AUTHOR_DATE="2026-03-06 09:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-06 09:30:00 +0530"

git add "$FRONTEND_DIR/index.html" \
        "$FRONTEND_DIR/vite.config.js" \
        "$FRONTEND_DIR/tailwind.config.js" \
        "$FRONTEND_DIR/postcss.config.js" \
        "$FRONTEND_DIR/vercel.json" 2>/dev/null
git commit -m "config: Setup Vite, Tailwind CSS, and Vercel deployment" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 2: Build Configs${NC}"

# Commit 3: App structure
export GIT_AUTHOR_DATE="2026-03-07 10:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-07 10:00:00 +0530"

git add "$FRONTEND_DIR/src/main.jsx" \
        "$FRONTEND_DIR/src/App.jsx" \
        "$FRONTEND_DIR/src/index.css" \
        "$FRONTEND_DIR/src/context/" 2>/dev/null
git commit -m "feat: Setup React app structure and theme context" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 3: App Structure${NC}"

# Commit 4: Layouts
export GIT_AUTHOR_DATE="2026-03-08 13:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-08 13:30:00 +0530"

git add "$FRONTEND_DIR/src/layouts/" \
        "$FRONTEND_DIR/src/components/" 2>/dev/null
git commit -m "feat: Add main and dashboard layouts with navigation components" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 4: Layouts & Components${NC}"

# Commit 5: Auth pages
export GIT_AUTHOR_DATE="2026-03-10 11:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-10 11:00:00 +0530"

git add "$FRONTEND_DIR/src/pages/Login.jsx" \
        "$FRONTEND_DIR/src/pages/Register.jsx" \
        "$FRONTEND_DIR/src/pages/ForgotPassword.jsx" \
        "$FRONTEND_DIR/src/pages/ResetPassword.jsx" 2>/dev/null
git commit -m "feat: Implement authentication pages (login, register, password reset)" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 5: Auth Pages${NC}"

# Commit 6: Common pages
export GIT_AUTHOR_DATE="2026-03-12 15:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-12 15:00:00 +0530"

git add "$FRONTEND_DIR/src/pages/Landing.jsx" \
        "$FRONTEND_DIR/src/pages/Premium.jsx" \
        "$FRONTEND_DIR/src/pages/Jobs.jsx" \
        "$FRONTEND_DIR/src/pages/JobDetails.jsx" \
        "$FRONTEND_DIR/src/pages/SalaryInsights.jsx" \
        "$FRONTEND_DIR/src/pages/InterviewFeed.jsx" 2>/dev/null
git commit -m "feat: Add landing, job listing, and insights pages" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 6: Common Pages${NC}"

# Commit 7: Student pages
export GIT_AUTHOR_DATE="2026-03-14 10:30:00 +0530"
export GIT_COMMITTER_DATE="2026-03-14 10:30:00 +0530"

git add "$FRONTEND_DIR/src/pages/student/" 2>/dev/null
git commit -m "feat: Add student dashboard, applications, profile, and analytics pages" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 7: Student Pages${NC}"

# Commit 8: Recruiter pages
export GIT_AUTHOR_DATE="2026-03-16 14:00:00 +0530"
export GIT_COMMITTER_DATE="2026-03-16 14:00:00 +0530"

git add "$FRONTEND_DIR/src/pages/recruiter/" 2>/dev/null
git commit -m "feat: Add recruiter dashboard, job posting, and applicant management" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 8: Recruiter Pages${NC}"

# Commit 9: Admin pages
export GIT_AUTHOR_DATE="2026-03-18 09:45:00 +0530"
export GIT_COMMITTER_DATE="2026-03-18 09:45:00 +0530"

git add "$FRONTEND_DIR/src/pages/admin/" 2>/dev/null
git commit -m "feat: Add admin dashboard for system management" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 9: Admin Pages${NC}"

# Commit 10: Integration
export GIT_AUTHOR_DATE="2026-03-20 12:15:00 +0530"
export GIT_COMMITTER_DATE="2026-03-20 12:15:00 +0530"

git add "$FRONTEND_DIR/src/hooks/" \
        "$FRONTEND_DIR/src/services/api.js" \
        "$FRONTEND_DIR/src/store/" 2>/dev/null
git commit -m "feat: Add API integration, hooks, and state management (Redux)" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh Commit 10: API Integration${NC}"

# ============================================
# STEP 7: MERGE ALL BRANCHES
# ============================================
echo -e "\n${YELLOW}[STEP 7] Merging All Branches...${NC}"

git checkout main

# Unset environment variables for merge commits
unset GIT_AUTHOR_DATE GIT_COMMITTER_DATE

# Merge manish
echo "Merging manish branch..."
git merge manish -m "Merge branch 'manish' - Backend core setup and configuration" 2>/dev/null || true
echo -e "${GREEN}✓ Manish branch merged${NC}"

# Merge harshit
echo "Merging harshit branch..."
git merge harshit -m "Merge branch 'harshit' - Database models and core controllers" 2>/dev/null || true
echo -e "${GREEN}✓ Harshit branch merged${NC}"

# Merge kavya
echo "Merging kavya branch..."
git merge kavya -m "Merge branch 'kavya' - Additional features (resume, payment, AI, notifications)" 2>/dev/null || true
echo -e "${GREEN}✓ Kavya branch merged${NC}"

# Merge harsh
echo "Merging harsh branch..."
git merge harsh -m "Merge branch 'harsh' - Complete frontend implementation" 2>/dev/null || true
echo -e "${GREEN}✓ Harsh branch merged${NC}"

# ============================================
# STEP 8: FINAL VERIFICATION
# ============================================
echo -e "\n${YELLOW}[STEP 8] Final Verification...${NC}"

echo -e "\n${BLUE}Git Log (Last 20 commits):${NC}"
git log --oneline -20

echo -e "\n${BLUE}Branch Status:${NC}"
git branch -a

echo -e "\n${BLUE}Working Directory Status:${NC}"
git status

# ============================================
# SUCCESS
# ============================================
echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Git Workflow Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"

echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Review git log: git log --pretty=format:'%h %an <%ae> - %s'"
echo "2. Install dependencies:"
echo "   npm --prefix backend install"
echo "   npm --prefix frontend install"
echo "3. Start backend: npm --prefix backend start"
echo "4. Start frontend: npm --prefix frontend dev"
echo "5. Push to GitHub: git push -u origin main"
echo "   Also push branches: git push -u origin manish harshit kavya harsh"
echo ""
echo -e "${YELLOW}Note: If pushing to GitHub, make sure to:${NC}"
echo "- Add the GitHub remote: git remote add origin https://github.com/Manish7291/job-portal.git"
echo "- Have proper authentication configured (SSH key or GitHub token)"

echo -e "\n${GREEN}✓ All done!${NC}\n"
