import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { HiOutlineBriefcase, HiOutlineBell, HiOutlineUser, HiOutlineMenu, HiOutlineX, HiOutlineChevronDown } from 'react-icons/hi';
import { useState } from 'react';

export default function MainLayout() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { dispatch(logout()); navigate('/'); };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-dark-800/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <HiOutlineBriefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">JOBFLUX</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/jobs" className="text-gray-400 hover:text-white transition-colors">Jobs</Link>
              
              <div className="relative group py-5">
                <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 outline-none">
                  Services <HiOutlineChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-14 left-0 w-56 bg-dark-800 border border-white/5 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="py-2">
                    <Link to="/student/resume-analytics" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10">AI Resume Analytics</Link>
                    <Link to="/student/ai-simplifier" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10">AI Job Simplifier</Link>
                    <Link to="/interviews" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10">Interview Feed</Link>
                    <Link to="/salary-insights" className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10">Salary Insights</Link>
                  </div>
                </div>
              </div>

              <Link to="/premium" className="text-gray-400 hover:text-white transition-colors">Premium</Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link to={`/${user.role}/dashboard`} className="btn-secondary text-sm py-2 px-4">Dashboard</Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
                </>
              )}
            </div>

            <button className="md:hidden text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-dark-800 border-t border-white/5 px-4 py-4 space-y-4">
            <Link to="/jobs" className="block text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>Jobs</Link>
            
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Services</p>
              <div className="space-y-2 pl-3 border-l-2 border-white/5">
                <Link to="/student/resume-analytics" className="block text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>AI Resume Analytics</Link>
                <Link to="/student/ai-simplifier" className="block text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>AI Job Simplifier</Link>
                <Link to="/interviews" className="block text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>Interview Feed</Link>
                <Link to="/salary-insights" className="block text-sm text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>Salary Insights</Link>
              </div>
            </div>

            <Link to="/premium" className="block text-gray-400 hover:text-white" onClick={() => setMobileOpen(false)}>Premium</Link>

            <div className="pt-2 border-t border-white/5">
              {user ? (
                <div className="flex justify-between items-center">
                  <Link to={`/${user.role}/dashboard`} className="text-gray-200" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="text-red-400 text-sm">Logout</button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" className="btn-secondary text-sm py-2 text-center" onClick={() => setMobileOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-primary text-sm py-2 text-center" onClick={() => setMobileOpen(false)}>Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-dark-800/50 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2026 JOBFLUX. Smart Job Portal with AI Integration.</p>
        </div>
      </footer>
    </div>
  );
}
