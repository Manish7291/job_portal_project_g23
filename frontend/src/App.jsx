import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './store/slices/authSlice';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import InterviewFeed from './pages/InterviewFeed';
import SalaryInsights from './pages/SalaryInsights';
import Premium from './pages/Premium';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentApplications from './pages/student/Applications';
import ResumeAnalytics from './pages/student/ResumeAnalytics';
import SavedJobs from './pages/student/SavedJobs';
import AISimplifier from './pages/student/AISimplifier';

// Recruiter pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterProfile from './pages/recruiter/Profile';
import PostJob from './pages/recruiter/PostJob';
import ManageJobs from './pages/recruiter/ManageJobs';
import Applicants from './pages/recruiter/Applicants';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageRecruiters from './pages/admin/ManageRecruiters';
import ManagePayments from './pages/admin/ManagePayments';

// Route guard
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useSelector(state => state.auth);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user) dispatch(loadUser());
  }, []);

  return (
    <Routes>
      {/* Public routes with main layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/interviews" element={<InterviewFeed />} />
        <Route path="/salary-insights" element={<SalaryInsights />} />
        <Route path="/premium" element={<Premium />} />
      </Route>

      {/* Student dashboard */}
      <Route path="/student" element={<ProtectedRoute roles={['student']}><DashboardLayout role="student" /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="resume-analytics" element={<ResumeAnalytics />} />
        <Route path="ai-simplifier" element={<AISimplifier />} />
        <Route path="saved-jobs" element={<SavedJobs />} />
      </Route>

      {/* Recruiter dashboard */}
      <Route path="/recruiter" element={<ProtectedRoute roles={['recruiter']}><DashboardLayout role="recruiter" /></ProtectedRoute>}>
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="profile" element={<RecruiterProfile />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="manage-jobs" element={<ManageJobs />} />
        <Route path="jobs/:jobId/applicants" element={<Applicants />} />
      </Route>

      {/* Admin dashboard */}
      <Route path="/admin" element={<ProtectedRoute roles={['admin']}><DashboardLayout role="admin" /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="recruiters" element={<ManageRecruiters />} />
        <Route path="payments" element={<ManagePayments />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
