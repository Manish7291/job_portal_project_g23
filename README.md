# JOBFLUX – Smart Job Portal with AI Integration

A production-grade full-stack MERN application with 3 user roles, AI-powered resume analysis, Razorpay payments, and a comprehensive job portal.

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, Tailwind CSS, Redux Toolkit, React Router, Chart.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas with Mongoose |
| **Auth** | JWT + Bcrypt |
| **File Upload** | Multer (resume PDF + profile photos) |
| **AI** | Gemini API |
| **Payments** | Razorpay |

## 📁 Project Structure

```
JOBFLUX/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/     # 11 controllers (auth, student, job, application, resume, ai, payment, recruiter, admin, notification, interview)
│   ├── middleware/       # Auth, error handler, upload, async handler
│   ├── models/          # 10 Mongoose models
│   ├── routes/          # 11 route files
│   ├── utils/           # Email utility
│   ├── validators/      # Auth & job validators
│   ├── uploads/         # Resume & photo storage
│   ├── app.js           # Express app
│   └── server.js        # Entry point
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── layouts/     # MainLayout, DashboardLayout
│       ├── pages/       # 22 pages (student, recruiter, admin, public)
│       ├── services/    # Axios API layer
│       ├── store/       # Redux Toolkit (auth slice)
│       ├── App.jsx      # Routing
│       └── main.jsx     # Entry with providers
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone & Install

```bash
# Backend
cd JOBFLUX/backend
cp .env.example .env   # Edit with your values
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment Variables

Edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/jobflux
JWT_SECRET=your_secure_random_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Create Admin User

Connect to your MongoDB and insert an admin user, or use the register API and manually update the role:

```bash
# Register via API, then in MongoDB:
db.users.updateOne({ email: "admin@jobflux.com" }, { $set: { role: "admin", isApproved: true } })
```

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev    # Runs on port 5000

# Terminal 2 - Frontend
cd frontend
npm run dev    # Runs on port 5173
```

## 🌐 Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy via Vercel CLI or connect GitHub repo
# vercel.json is included for SPA routing
```

### Backend → Render / Railway
- Set environment variables in the dashboard
- Build command: `npm install`
- Start command: `npm start`
- Set `CLIENT_URL` to your Vercel frontend URL

## 📋 Features

### Student
- ✅ Dashboard with profile strength meter
- ✅ Profile editor with photo & resume upload
- ✅ Job search, filter, save, apply
- ✅ Application tracking (6 statuses)
- ✅ Resume analytics (ATS score, suggestions)
- ✅ Premium membership via Razorpay

### Recruiter  
- ✅ Post, edit, delete jobs
- ✅ View & manage applicants
- ✅ Update application statuses
- ✅ AI job description simplifier
- ✅ Company profile & transparency metrics

### Admin
- ✅ Analytics dashboard
- ✅ Manage students & recruiters
- ✅ Approve recruiter accounts
- ✅ Monitor payments & revenue

### General
- ✅ Interview experience feed
- ✅ Salary insights with charts
- ✅ Premium membership system
- ✅ Notification system
- ✅ Role-based access control
- ✅ JWT auth with httpOnly cookies
- ✅ Security (helmet, CORS, rate limiting, sanitization)

## 📄 License

MIT
