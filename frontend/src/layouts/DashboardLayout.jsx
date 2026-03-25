import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { HiOutlineBriefcase, HiOutlineHome, HiOutlineUser, HiOutlineDocumentText, HiOutlineBookmark, HiOutlineClipboardList, HiOutlineChartBar, HiOutlinePlus, HiOutlineCog, HiOutlineUsers, HiOutlineCreditCard, HiOutlineSparkles, HiOutlineLogout, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useState } from 'react';

const sidebarLinks = {
  student: [
    { to: '/student/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
    { to: '/student/profile', icon: HiOutlineUser, label: 'Profile' },
    { to: '/student/applications', icon: HiOutlineClipboardList, label: 'Applications' },
    { to: '/student/resume-analytics', icon: HiOutlineDocumentText, label: 'Resume Analytics' },
    { to: '/student/ai-simplifier', icon: HiOutlineSparkles, label: 'AI Simplifier' },
    { to: '/student/saved-jobs', icon: HiOutlineBookmark, label: 'Saved Jobs' },
    { to: '/jobs', icon: HiOutlineBriefcase, label: 'Browse Jobs' },
    { to: '/premium', icon: HiOutlineSparkles, label: 'Premium' },
  ],
  recruiter: [
    { to: '/recruiter/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
    { to: '/recruiter/profile', icon: HiOutlineUser, label: 'Company Profile' },
    { to: '/recruiter/post-job', icon: HiOutlinePlus, label: 'Post Job' },
    { to: '/recruiter/manage-jobs', icon: HiOutlineBriefcase, label: 'Manage Jobs' },
  ],
  admin: [
    { to: '/admin/dashboard', icon: HiOutlineHome, label: 'Dashboard' },
    { to: '/admin/students', icon: HiOutlineUsers, label: 'Students' },
    { to: '/admin/recruiters', icon: HiOutlineBriefcase, label: 'Recruiters' },
    { to: '/admin/payments', icon: HiOutlineCreditCard, label: 'Payments' },
  ]
};

export default function DashboardLayout({ role }) {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = sidebarLinks[role] || [];

  return (
    <div className="min-h-screen flex bg-dark-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-800/95 backdrop-blur-xl border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <HiOutlineBriefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gradient">JOBFLUX</span>
            </Link>
            <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {links.map(link => (
              <NavLink key={link.to} to={link.to} end className={({ isActive }) => isActive ? 'sidebar-link-active' : 'sidebar-link'} onClick={() => setSidebarOpen(false)}>
                <link.icon className="w-5 h-5" />
                <span className="text-sm">{link.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="p-4 border-t border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button onClick={() => { dispatch(logout()); navigate('/'); }} className="sidebar-link w-full text-red-400 hover:text-red-300">
              <HiOutlineLogout className="w-5 h-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden text-gray-400" onClick={() => setSidebarOpen(true)}>
            <HiOutlineMenu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gradient capitalize">{role} Panel</h1>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
